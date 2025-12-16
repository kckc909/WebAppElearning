/**
 * Classes API Service (Lớp học trực tuyến)
 */

import { USE_MOCK_API, simulateDelay, successResponse, errorResponse, ApiResponse } from './config';
import axiosInstance from './api';
import {
    CLASSES,
    CLASS_STUDENTS,
    CLASS_CALENDAR,
    CLASS_ASSIGNMENTS,
    CLASS_MATERIALS,
    ACCOUNTS,
    COURSES,
} from '../mockData';

class ClassesApiService {
    // GET /classes - Lấy danh sách lớp học
    async getAll(params?: { instructor_id?: number; course_id?: number; status?: number }): Promise<ApiResponse<any[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            let result = CLASSES.map(c => ({
                ...c,
                instructor: ACCOUNTS.find(a => a.id === c.instructor_id),
                course: COURSES.find(course => course.id === c.course_id),
                students_count: CLASS_STUDENTS.filter(cs => cs.class_id === c.id).length
            }));

            if (params?.instructor_id) {
                result = result.filter(c => c.instructor_id === params.instructor_id);
            }
            if (params?.course_id) {
                result = result.filter(c => c.course_id === params.course_id);
            }
            if (params?.status !== undefined) {
                result = result.filter(c => c.status === params.status);
            }

            return successResponse(result);
        }

        try {
            const response = await axiosInstance.get('/classes', { params });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch classes');
        }
    }

    // GET /classes/:id - Lấy chi tiết lớp học
    async getById(id: number): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const classItem = CLASSES.find(c => c.id === id);
            if (!classItem) {
                return errorResponse('Class not found', null);
            }

            const result = {
                ...classItem,
                instructor: ACCOUNTS.find(a => a.id === classItem.instructor_id),
                course: COURSES.find(c => c.id === classItem.course_id),
                students: CLASS_STUDENTS.filter(cs => cs.class_id === id).map(cs => {
                    const student = ACCOUNTS.find(a => a.id === cs.student_id);
                    return { ...cs, student };
                }),
                calendar: CLASS_CALENDAR.filter(c => c.class_id === id),
                assignments: CLASS_ASSIGNMENTS.filter(a => a.class_id === id),
                materials: CLASS_MATERIALS.filter(m => m.class_id === id)
            };

            return successResponse(result);
        }

        try {
            const response = await axiosInstance.get(`/classes/${id}`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch class');
        }
    }

    // GET /classes/my - Lấy lớp học của student
    async getMyClasses(studentId: number): Promise<ApiResponse<any[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const myClassIds = CLASS_STUDENTS.filter(cs => cs.student_id === studentId).map(cs => cs.class_id);
            const myClasses = CLASSES.filter(c => myClassIds.includes(c.id)).map(classItem => {
                const instructor = ACCOUNTS.find(a => a.id === classItem.instructor_id);
                const course = COURSES.find(c => c.id === classItem.course_id);
                const nextEvent = CLASS_CALENDAR.find(cal =>
                    cal.class_id === classItem.id &&
                    new Date(cal.event_date) > new Date()
                );

                return {
                    ...classItem,
                    instructor,
                    course,
                    nextSession: nextEvent ? {
                        id: nextEvent.id,
                        title: nextEvent.title,
                        instructor: instructor?.full_name,
                        startTime: nextEvent.event_date,
                        endTime: (nextEvent as any).end_time || nextEvent.event_date,
                        meetingLink: classItem.meeting_link,
                        isLive: false
                    } : null
                };
            });

            return successResponse(myClasses);
        }

        try {
            const response = await axiosInstance.get('/classes/my', { params: { student_id: studentId } });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch my classes');
        }
    }

    // GET /classes/calendar - Lấy lịch tất cả lớp học của student
    async getCalendar(studentId: number): Promise<ApiResponse<any[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            // Lấy tất cả class_id của student
            const myClassIds = CLASS_STUDENTS.filter(cs => cs.student_id === studentId).map(cs => cs.class_id);

            // Lấy tất cả events từ các classes
            const calendar = CLASS_CALENDAR
                .filter(c => myClassIds.includes(c.class_id))
                .map(event => {
                    const classItem = CLASSES.find(c => c.id === event.class_id);
                    const instructor = classItem ? ACCOUNTS.find(a => a.id === classItem.instructor_id) : null;
                    return {
                        ...event,
                        class_title: classItem?.title || '',
                        instructor: instructor?.full_name || '',
                        meeting_link: classItem?.meeting_link || '',
                        date: event.event_date
                    };
                });

            return successResponse(calendar);
        }

        try {
            const response = await axiosInstance.get('/classes/calendar', { params: { student_id: studentId } });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch calendar');
        }
    }

    // GET /classes/:classId/calendar - Lấy lịch 1 lớp học cụ thể
    async getClassCalendar(classId: number): Promise<ApiResponse<any[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const calendar = CLASS_CALENDAR.filter(c => c.class_id === classId);
            return successResponse(calendar);
        }

        try {
            const response = await axiosInstance.get(`/classes/${classId}/calendar`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch calendar');
        }
    }

    // GET /classes/:id/assignments - Lấy bài tập
    async getAssignments(classId: number): Promise<ApiResponse<any[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const assignments = CLASS_ASSIGNMENTS.filter(a => a.class_id === classId);
            return successResponse(assignments);
        }

        try {
            const response = await axiosInstance.get(`/classes/${classId}/assignments`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch assignments');
        }
    }

    // GET /classes/:id/materials - Lấy tài liệu
    async getMaterials(classId: number): Promise<ApiResponse<any[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const materials = CLASS_MATERIALS.filter(m => m.class_id === classId);
            return successResponse(materials);
        }

        try {
            const response = await axiosInstance.get(`/classes/${classId}/materials`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch materials');
        }
    }

    // POST /classes/:id/join - Tham gia lớp học
    async join(classId: number, studentId: number): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const existing = CLASS_STUDENTS.find(cs => cs.class_id === classId && cs.student_id === studentId);
            if (existing) {
                return errorResponse('Already joined this class');
            }

            const classItem = CLASSES.find(c => c.id === classId);
            const currentCount = CLASS_STUDENTS.filter(cs => cs.class_id === classId).length;
            if (classItem && classItem.max_students && currentCount >= classItem.max_students) {
                return errorResponse('Class is full');
            }

            const newEnrollment = {
                id: CLASS_STUDENTS.length + 1,
                class_id: classId,
                student_id: studentId,
                joined_at: new Date().toISOString(),
                status: 1
            };
            CLASS_STUDENTS.push(newEnrollment);
            return successResponse(newEnrollment, 'Joined class successfully');
        }

        try {
            const response = await axiosInstance.post(`/classes/${classId}/join`, { student_id: studentId });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to join class');
        }
    }
}

export const classesApi = new ClassesApiService();
