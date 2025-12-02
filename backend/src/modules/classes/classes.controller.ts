import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Classes_Service } from "./classes.service.js";
import { ClassesCreateForm, ClassesUpdateForm } from "./classes.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Controller('classes')

export class Classes_Controller {
    constructor(
        private readonly _service: Classes_Service,
    ) { }

    @Get()
    async getAll() {

        const classes = await this._service.getAll();

        return { classes };

    }

    @Get(':id')
    async getById(@Param('id') id: IdParam) {

        const classItem = await this._service.getById(Number(id))

        return { class: classItem };

    }

    @Post()
    async create(@Body() body: ClassesCreateForm) {
        try {
            const created = await this._service.create(body)

            return { created }

        }
        catch (e) {

            throw new BadRequestException("----- Error: ", e.message);

        }
    }

    @Put()
    async update(@Body() body: ClassesUpdateForm) {
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
