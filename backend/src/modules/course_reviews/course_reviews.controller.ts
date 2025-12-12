import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CourseReviews_Service } from "./course_reviews.service.js";
import { CourseReviewCreateForm, CourseReviewUpdateForm } from "./course_reviews.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Controller('course-reviews')
export class CourseReviews_Controller {
    constructor(
        private readonly _service: CourseReviews_Service
    ) { }

    @Get()
    async getAll() {
        const reviews = await this._service.getAll();
        return reviews;
    }

    @Get(':id')
    async getById(@Param() id: IdParam) {
        if (!Number(id.id)) {
            throw new BadRequestException("id must be integer");
        }

        const review = await this._service.getById(id);
        return review;
    }

    @Get('course/:courseId')
    async getByCourseId(@Param('courseId') courseId: string) {
        if (!Number(courseId)) {
            throw new BadRequestException("courseId must be integer");
        }

        const reviews = await this._service.getByCourseId(Number(courseId));
        return reviews;
    }

    @Get('student/:studentId')
    async getByStudentId(@Param('studentId') studentId: string) {
        if (!Number(studentId)) {
            throw new BadRequestException("studentId must be integer");
        }

        const reviews = await this._service.getByStudentId(Number(studentId));
        return reviews;
    }

    @Post()
    async create(@Body() body: CourseReviewCreateForm) {
        try {
            const created = await this._service.create(body);
            return created;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    @Put(':id')
    async update(@Param() param: IdParam, @Body() body: CourseReviewUpdateForm) {
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

