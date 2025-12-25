import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Courses_Service } from "./courses.service.js";
import { CoursesCreateForm, CoursesUpdateForm } from "./courses.dto.js";

@Controller('courses')
export class Courses_Controller {
    constructor(
        private readonly _service: Courses_Service,
    ) { }

    @Get()
    async getAll(
        @Query('category_id') category_id?: string,
        @Query('instructor_id') instructor_id?: string,
        @Query('search') search?: string,
        @Query('status') status?: string,
        @Query('is_featured') is_featured?: string,
    ) {
        const filters = {
            category_id: category_id ? Number(category_id) : undefined,
            instructor_id: instructor_id ? Number(instructor_id) : undefined,
            search,
            status,
            is_featured: is_featured === 'true' ? true : is_featured === 'false' ? false : undefined,
        };

        const courses = await this._service.getAll(filters);
        return { success: true, data: courses };
    }

    @Get('featured')
    async getFeatured() {
        const courses = await this._service.getAll({ is_featured: true, status: 'PUBLISHED' });
        return { success: true, data: courses };
    }

    @Get('pending')
    async getPending() {
        const courses = await this._service.getPendingCourses();
        return { success: true, data: courses };
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const course = await this._service.getById(Number(id));
        
        if (!course) {
            throw new BadRequestException('Course not found');
        }

        return { success: true, data: course };
    }

    @Get(':id/sections')
    async getSections(@Param('id') id: string) {
        const sections = await this._service.getSections(Number(id));
        return { success: true, data: sections };
    }

    @Get(':id/reviews')
    async getReviews(@Param('id') id: string) {
        const reviews = await this._service.getReviews(Number(id));
        return { success: true, data: reviews };
    }

    @Post()
    async create(@Body() body: CoursesCreateForm) {
        try {
            const created = await this._service.create(body);
            return { success: true, data: created, message: 'Course created successfully' };
        } catch (e: any) {
            console.error('Create course error:', e);
            throw new BadRequestException(e.message);
        }
    }

    @Post(':id/reviews')
    async addReview(
        @Param('id') id: string,
        @Body() body: { student_id: number; rating: number; comment: string }
    ) {
        try {
            const review = await this._service.addReview(
                Number(id),
                body.student_id,
                body.rating,
                body.comment
            );
            return { success: true, data: review };
        } catch (e: any) {
            throw new BadRequestException(e.message);
        }
    }

    @Post(':id/enroll')
    async enroll(
        @Param('id') id: string,
        @Body() body: { student_id: number }
    ) {
        try {
            const enrollment = await this._service.enroll(Number(id), body.student_id);
            return { success: true, data: enrollment };
        } catch (e: any) {
            throw new BadRequestException(e.message);
        }
    }

    @Post(':id/submit')
    async submitForReview(
        @Param('id') id: string,
        @Body() body: { instructor_id: number }
    ) {
        try {
            const course = await this._service.submitForReview(Number(id), body.instructor_id);
            return { success: true, data: course, message: 'Course submitted for review' };
        } catch (e: any) {
            throw new BadRequestException(e.message);
        }
    }

    @Post(':id/approve')
    async approveCourse(
        @Param('id') id: string,
        @Body() body: { admin_id: number }
    ) {
        try {
            const course = await this._service.approveCourse(Number(id), body.admin_id);
            return { success: true, data: course, message: 'Course approved successfully' };
        } catch (e: any) {
            throw new BadRequestException(e.message);
        }
    }

    @Post(':id/reject')
    async rejectCourse(
        @Param('id') id: string,
        @Body() body: { admin_id: number; reason: string }
    ) {
        try {
            const course = await this._service.rejectCourse(Number(id), body.admin_id, body.reason);
            return { success: true, data: course, message: 'Course rejected' };
        } catch (e: any) {
            throw new BadRequestException(e.message);
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: CoursesUpdateForm
    ) {
        try {
            const updated = await this._service.update(Number(id), body);
            return { success: true, data: updated };
        } catch (e: any) {
            throw new BadRequestException(e.message);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            const deleted = await this._service.delete(Number(id));
            return { success: true, data: deleted };
        } catch (e: any) {
            throw new BadRequestException(e.message);
        }
    }
}
