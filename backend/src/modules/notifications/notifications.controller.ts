import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Notifications_Service } from "./notifications.service.js";
import { NotificationsCreateForm, NotificationsUpdateForm } from "./notifications.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Controller('notifications')

export class Notifications_Controller {
    constructor(
        private readonly _service: Notifications_Service,
    ) { }

    @Get()
    async getAll() {

        const notifications = await this._service.getAll();

        return { notifications };

    }

    @Get(':id')
    async getById(@Param('id') id: IdParam) {

        const notification = await this._service.getById(Number(id))

        return { notification };

    }

    @Post()
    async create(@Body() body: NotificationsCreateForm) {
        try {
            const created = await this._service.create(body)

            return { created }

        }
        catch (e) {

            throw new BadRequestException("----- Error: ", e.message);

        }
    }

    @Put()
    async update(@Body() body: NotificationsUpdateForm) {
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
