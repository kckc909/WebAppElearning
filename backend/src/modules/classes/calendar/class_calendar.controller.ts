import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ClassCalendar_Service } from "./class_calendar.service.js";
import type { ClassCalendarCreateForm, ClassCalendarUpdateForm } from "./class_calendar.dto.js";

@Controller('class-calendar')
export class ClassCalendar_Controller {

    constructor(private readonly service: ClassCalendar_Service) { }

    @Get()
    async getAll() {
        return await this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.service.getById(parseInt(id));
    }

    @Get('class/:classId')
    async getByClassId(@Param('classId') classId: string) {
        return await this.service.getByClassId(parseInt(classId));
    }

    @Post()
    async create(@Body() newEvent: ClassCalendarCreateForm) {
        return await this.service.create(newEvent);
    }

    @Put()
    async update(@Body() updatedEvent: ClassCalendarUpdateForm) {
        return await this.service.update(updatedEvent);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(parseInt(id));
    }
}
