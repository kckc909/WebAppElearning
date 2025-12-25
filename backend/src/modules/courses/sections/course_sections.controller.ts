import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CourseSections_Service } from "./course_sections.service.js";
import { CourseSectionCreateForm, CourseSectionUpdateForm } from "./course_sections.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Controller('course-sections')
export class CourseSections_Controller {
    constructor(
        private readonly _service: CourseSections_Service
    ) { }

    @Get()
    async getAll() {
        const sections = await this._service.getAll();
        return sections;
    }

    @Get(':id')
    async getById(@Param() id: IdParam) {
        if (!Number(id.id)) {
            throw new BadRequestException("id must be integer");
        }

        const section = await this._service.getById(id);
        return section;
    }

    @Get('course/:courseId')
    async getByCourseId(@Param('courseId') courseId: string) {
        if (!Number(courseId)) {
            throw new BadRequestException("courseId must be integer");
        }

        const sections = await this._service.getByCourseId(Number(courseId));
        return sections;
    }

    @Post()
    async create(@Body() body: CourseSectionCreateForm) {
        try {
            const created = await this._service.create(body);
            return created;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    @Put(':id')
    async update(@Param() param: IdParam, @Body() body: CourseSectionUpdateForm) {
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

