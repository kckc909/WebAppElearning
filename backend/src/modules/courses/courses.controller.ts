import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Courses_Service } from "./courses.service.js";
import { CoursesCreateForm, CoursesUpdateForm } from "./courses.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Controller('courses')

export class Courses_Controller {
    constructor(
        private readonly _service: Courses_Service,
    ) { }

    @Get()
    async getAll() {

        const courses = await this._service.getAll();

        return { courses };

    }

    @Get(':id')
    async getById(@Param('id') id: IdParam) {

        const course = await this._service.getById(Number(id))

        return { course };

    }

    @Post()
    async create(@Body() body: CoursesCreateForm) {
        try {
            const created = await this._service.create(body)

            return { created }

        }
        catch (e) {

            throw new BadRequestException("----- Error: ", e.message);

        }
    }

    @Put()
    async update(@Body() body: CoursesUpdateForm) {
        try {

            const updated = await this._service.update(body)

            return { updated }

        }
        catch (e) {

            throw new BadRequestException("----- Error: ", e.message);

        }
    }

    @Delete(':id')
    async delete(@Param() param: IdParam) {
        try {
            const deleted = await this._service.delete(param.id)

            return { deleted };

        }
        catch (e) {

            throw new BadRequestException("----- Error: ", e.message);

        }
    }
}
