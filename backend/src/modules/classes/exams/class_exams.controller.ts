import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ClassExams_Service } from "./class_exams.service.js";
import type { ClassExamsCreateForm, ClassExamsUpdateForm } from "./class_exams.dto.js";

@Controller('class-exams')
export class ClassExams_Controller {

    constructor(private readonly service: ClassExams_Service) { }

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
    async create(@Body() newExam: ClassExamsCreateForm) {
        return await this.service.create(newExam);
    }

    @Put()
    async update(@Body() updatedExam: ClassExamsUpdateForm) {
        return await this.service.update(updatedExam);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(parseInt(id));
    }
}
