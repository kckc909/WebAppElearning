/**
 * MOCK IMPLEMENTATION: ClassesApi
 * Pure mock logic - NO if-else, NO database calls
 */

import { IClassesApi } from '../../interfaces/IClassesApi';
import { simulateDelay, successResponse, errorResponse, ApiResponse } from '../../config';
import { dataSource } from '../../../data/datasources/datasource.router';

export class MockClassesApi implements IClassesApi {
    async getCalendar(studentId: number): Promise<ApiResponse<any[]>> {
        await simulateDelay();

        // Lấy tất cả class_id của student
        const classStudents = dataSource.getStudentClasses(studentId);
        const myClassIds = classStudents.map((cs: any) => cs.class_id);

        // Lấy tất cả events từ các classes
        const allCalendar = dataSource.getClassCalendar(0); // Get all calendar entries
        const calendar = allCalendar
            .filter((c: any) => myClassIds.includes(c.class_id))
            .map((event: any) => {
                const classItem = dataSource.getClassById(event.class_id);
                const instructor = classItem ? dataSource.getAccountById(classItem.instructor_id) : null;
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

    async getClassCalendar(classId: number): Promise<ApiResponse<any[]>> {
        await simulateDelay();
        const calendar = dataSource.getClassCalendar(classId);
        return successResponse(calendar);
    }

    async getAssignments(classId: number): Promise<ApiResponse<any[]>> {
        await simulateDelay();
        const assignments = dataSource.getClassAssignments(classId);
        return successResponse(assignments);
    }

    async getMaterials(classId: number): Promise<ApiResponse<any[]>> {
        await simulateDelay();
        const materials = dataSource.getClassMaterials(classId);
        return successResponse(materials);
    }

    async getAll(params?: {
        instructor_id?: number;
        course_id?: number;
        status?: number;
    }): Promise<ApiResponse<any[]>> {
        await simulateDelay();
        const classes = dataSource.getAllClasses();
        let result = classes.map((c: any) => {
            const instructor = dataSource.getAccountById(c.instructor_id);
            const course = dataSource.getCourseById(c.course_id);
            const classStudents = dataSource.getStudentClasses(0); // Get all
            const students_count = classStudents.filter((cs: any) => cs.class_id === c.id).length;

            return {
                ...c,
                instructor,
                course,
                students_count
            };
        });

        if (params?.instructor_id) {
            result = result.filter((c: any) => c.instructor_id === params.instructor_id);
        }
        if (params?.course_id) {
            result = result.filter((c: any) => c.course_id === params.course_id);
        }
        if (params?.status !== undefined) {
            result = result.filter((c: any) => c.status === params.status);
        }

        return successResponse(result);
    }

    async getMyClasses(studentId: number): Promise<ApiResponse<any[]>> {
        await simulateDelay();

        const classStudents = dataSource.getStudentClasses(studentId);
        const myClassIds = classStudents.map((cs: any) => cs.class_id);
        const allClasses = dataSource.getAllClasses();

        const myClasses = allClasses
            .filter((c: any) => myClassIds.includes(c.id))
            .map((classItem: any) => {
                const instructor = dataSource.getAccountById(classItem.instructor_id);
                const course = dataSource.getCourseById(classItem.course_id);
                const calendar = dataSource.getClassCalendar(classItem.id);
                const nextEvent = calendar.find((cal: any) =>
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

    async getById(id: number): Promise<ApiResponse<any>> {
        await simulateDelay();
        const classItem = dataSource.getClassById(id);
        if (!classItem) {
            return errorResponse('Class not found', null);
        }

        const instructor = dataSource.getAccountById(classItem.instructor_id);
        const course = dataSource.getCourseById(classItem.course_id);
        const classStudents = dataSource.getStudentClasses(0); // Get all
        const students = classStudents
            .filter((cs: any) => cs.class_id === id)
            .map((cs: any) => {
                const student = dataSource.getAccountById(cs.student_id);
                return { ...cs, student };
            });
        const calendar = dataSource.getClassCalendar(id);
        const assignments = dataSource.getClassAssignments(id);
        const materials = dataSource.getClassMaterials(id);

        const result = {
            ...classItem,
            instructor,
            course,
            students,
            calendar,
            assignments,
            materials
        };

        return successResponse(result);
    }

    async join(classId: number, studentId: number): Promise<ApiResponse<any>> {
        await simulateDelay();

        // Check if already joined
        const classStudents = dataSource.getStudentClasses(0); // Get all
        const existing = classStudents.find((cs: any) => cs.class_id === classId && cs.student_id === studentId);
        if (existing) {
            return errorResponse('Already joined this class');
        }

        // Check capacity
        const classItem = dataSource.getClassById(classId);
        const currentCount = classStudents.filter((cs: any) => cs.class_id === classId).length;
        if (classItem && classItem.max_students && currentCount >= classItem.max_students) {
            return errorResponse('Class is full');
        }

        // Create enrollment
        const newEnrollment = {
            id: classStudents.length + 1,
            class_id: classId,
            student_id: studentId,
            joined_at: new Date().toISOString(),
            status: 1
        };

        (classStudents as any[]).push(newEnrollment);

        return successResponse(newEnrollment, 'Joined class successfully');
    }
}
