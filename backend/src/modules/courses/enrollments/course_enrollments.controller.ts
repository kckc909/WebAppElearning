import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CourseEnrollments_Service } from "./course_enrollments.service.js";
import { CourseEnrollmentCreateForm, CourseEnrollmentUpdateForm } from "./course_enrollments.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Controller('course-enrollments')
export class CourseEnrollments_Controller {
    constructor(
        private readonly _service: CourseEnrollments_Service
    ) { }

    @Get()
    async getAll() {
        const enrollments = await this._service.getAll();
        return enrollments;
    }

    @Get(':id')
    async getById(@Param() id: IdParam) {
        if (!Number(id.id)) {
            throw new BadRequestException("id must be integer");
        }

        const enrollment = await this._service.getById(id);
        return enrollment;
    }

    @Get('student/:studentId')
    async getByStudentId(@Param('studentId') studentId: string) {
        if (!Number(studentId)) {
            throw new BadRequestException("studentId must be integer");
        }

        const enrollments = await this._service.getByStudentId(Number(studentId));
        return enrollments;
    }

    @Get('course/:courseId')
    async getByCourseId(@Param('courseId') courseId: string) {
        if (!Number(courseId)) {
            throw new BadRequestException("courseId must be integer");
        }

        const enrollments = await this._service.getByCourseId(Number(courseId));
        return enrollments;
    }

    @Post()
    async create(@Body() body: CourseEnrollmentCreateForm) {
        try {
            const created = await this._service.create(body);
            return created;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    @Put(':id')
    async update(@Param() param: IdParam, @Body() body: CourseEnrollmentUpdateForm) {
        try {
            if (!Number(param.id)) {
                throw new BadRequestException("id must be integer");
            }

            body.id = param.id;
            const updated = await this._service.update(body);
            return updated;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    @Delete(':id')
    async delete(@Param() param: IdParam) {
        try {
            if (!Number(param.id)) {
                throw new BadRequestException("id must be integer");
            }

            const deleted = await this._service.delete(param.id);
            return deleted;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }
}

// Alias controller for shorter route
@Controller('enrollments')
export class Enrollments_Controller {
    constructor(
        private readonly _service: CourseEnrollments_Service
    ) { }

    // GET /enrollments/my?student_id=13
    @Get('my')
    async getMyEnrollments(@Query('student_id') studentId: string) {
        if (!studentId || !Number(studentId)) {
            throw new BadRequestException("student_id query parameter is required and must be a number");
        }

        const enrollments = await this._service.getByStudentId(Number(studentId));
        return { success: true, data: enrollments };
    }

    // GET /enrollments/progress?course_id=1&student_id=13
    @Get('progress')
    async getCourseProgress(
        @Query('course_id') courseId: string,
        @Query('student_id') studentId: string
    ) {
        if (!courseId || !Number(courseId)) {
            throw new BadRequestException("course_id query parameter is required and must be a number");
        }
        if (!studentId || !Number(studentId)) {
            throw new BadRequestException("student_id query parameter is required and must be a number");
        }

        const enrollment = await this._service.getEnrollmentWithProgress(
            Number(courseId),
            Number(studentId)
        );

        return { success: true, data: enrollment };
    }

    // GET /enrollments/check?course_id=1&user_id=13
    @Get('check')
    async checkEnrollment(
        @Query('course_id') courseId: string,
        @Query('user_id') userId: string
    ) {
        if (!courseId || !Number(courseId)) {
            throw new BadRequestException("course_id query parameter is required and must be a number");
        }
        if (!userId || !Number(userId)) {
            throw new BadRequestException("user_id query parameter is required and must be a number");
        }

        const enrollment = await this._service.getEnrollmentWithProgress(
            Number(courseId),
            Number(userId)
        );

        if (enrollment) {
            return {
                success: true,
                is_enrolled: true,
                progress: enrollment.progress || 0,
                completed_lessons: enrollment.completed_lessons || 0,
                total_lessons: enrollment.total_lessons || 0,
                enrollment_id: enrollment.id
            };
        } else {
            return {
                success: true,
                is_enrolled: false,
                progress: 0,
                completed_lessons: 0,
                total_lessons: 0
            };
        }
    }


    // POST /enrollments/lessons/:lessonId/complete
    @Post('lessons/:lessonId/complete')
    async markLessonComplete(
        @Param('lessonId') lessonId: string,
        @Body() body: { user_id: number; course_id: number }
    ) {
        if (!lessonId || !Number(lessonId)) {
            throw new BadRequestException("lessonId must be a number");
        }
        if (!body.user_id || !Number(body.user_id)) {
            throw new BadRequestException("user_id is required");
        }
        if (!body.course_id || !Number(body.course_id)) {
            throw new BadRequestException("course_id is required");
        }

        const result = await this._service.markLessonComplete(
            Number(lessonId),
            body.user_id,
            body.course_id
        )
    }
}
