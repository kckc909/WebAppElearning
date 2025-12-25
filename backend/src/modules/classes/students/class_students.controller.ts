import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ClassStudents_Service } from "./class_students.service.js";
import type { ClassStudentsCreateForm, ClassStudentsUpdateForm } from "./class_students.dto.js";

@Controller('class-students')
export class ClassStudents_Controller {

    constructor(private readonly service: ClassStudents_Service) { }

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

    @Get('student/:studentId')
    async getByStudentId(@Param('studentId') studentId: string) {
        return await this.service.getByStudentId(parseInt(studentId));
    }

    @Post()
    async create(@Body() newEnrollment: ClassStudentsCreateForm) {
        return await this.service.create(newEnrollment);
    }

    @Put()
    async update(@Body() updatedEnrollment: ClassStudentsUpdateForm) {
        return await this.service.update(updatedEnrollment);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(parseInt(id));
    }
}
