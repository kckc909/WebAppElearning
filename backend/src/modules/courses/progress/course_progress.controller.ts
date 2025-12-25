import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CourseProgress_Service } from "./course_progress.service.js";
import { CourseProgressCreateForm, CourseProgressUpdateForm } from "./course_progress.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Controller('course-progress')
export class CourseProgress_Controller {
    constructor(
        private readonly _service: CourseProgress_Service
    ) { }

    @Get()
    async getAll() {
        const progress = await this._service.getAll();
        return progress;
    }

    @Get(':id')
    async getById(@Param() id: IdParam) {
        if (!Number(id.id)) {
            throw new BadRequestException("id must be integer");
        }

        const progress = await this._service.getById(id);
        return progress;
    }

    @Get('enrollment/:enrollmentId')
    async getByEnrollmentId(@Param('enrollmentId') enrollmentId: string) {
        if (!Number(enrollmentId)) {
            throw new BadRequestException("enrollmentId must be integer");
        }

        const progress = await this._service.getByEnrollmentId(Number(enrollmentId));
        return progress;
    }

    @Post()
    async create(@Body() body: CourseProgressCreateForm) {
        try {
            const created = await this._service.create(body);
            return created;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    @Put(':id')
    async update(@Param() param: IdParam, @Body() body: CourseProgressUpdateForm) {
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

