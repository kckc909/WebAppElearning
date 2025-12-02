import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Lessons_Service } from "./lessons.service.js";
import { LessonsCreateForm, LessonsUpdateForm } from "./lessons.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Controller('lessons')

export class Lessons_Controller {
    constructor(
        private readonly _service: Lessons_Service,
    ) { }

    @Get()
    async getAll() {

        const lessons = await this._service.getAll();

        return { lessons };

    }

    @Get(':id')
    async getById(@Param('id') id: IdParam) {

        const lesson = await this._service.getById(Number(id))

        return { lesson };

    }

    @Post()
    async create(@Body() body: LessonsCreateForm) {
        try {
            const created = await this._service.create(body)

            return { created }

        }
        catch (e) {

            throw new BadRequestException("----- Error: ", e.message);

        }
    }

    @Put()
    async update(@Body() body: LessonsUpdateForm) {
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
