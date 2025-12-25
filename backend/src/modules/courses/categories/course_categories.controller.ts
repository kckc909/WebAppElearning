import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CourseCategories_Service } from "./course_categories.service.js";
import { CourseCategoryCreateForm, CourseCategoryUpdateForm } from "./course_categories.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Controller('course-categories')
export class CourseCategories_Controller {
    constructor(
        private readonly _service: CourseCategories_Service
    ) { }

    @Get()
    async getAll() {
        const categories = await this._service.getAll();
        return categories;
    }

    @Get(':id')
    async getById(@Param() id: IdParam) {
        if (!Number(id.id)) {
            throw new BadRequestException("id must be integer");
        }

        const category = await this._service.getById(id);
        return category;
    }

    @Get('parent/:parentId')
    async getByParentId(@Param('parentId') parentId: string) {
        if (!Number(parentId)) {
            throw new BadRequestException("parentId must be integer");
        }

        const categories = await this._service.getByParentId(Number(parentId));
        return categories;
    }

    @Post()
    async create(@Body() body: CourseCategoryCreateForm) {
        try {
            const created = await this._service.create(body);
            return created;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    @Put(':id')
    async update(@Param() param: IdParam, @Body() body: CourseCategoryUpdateForm) {
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

