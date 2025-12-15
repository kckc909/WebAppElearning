import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ClassExamResults_Service } from "./class_exam_results.service.js";
import type { ClassExamResultsCreateForm, ClassExamResultsUpdateForm } from "./class_exam_results.dto.js";

@Controller('class-exam-results')
export class ClassExamResults_Controller {

    constructor(private readonly service: ClassExamResults_Service) { }

    @Get()
    async getAll() {
        return await this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.service.getById(parseInt(id));
    }

    @Get('exam/:examId')
    async getByExamId(@Param('examId') examId: string) {
        return await this.service.getByExamId(parseInt(examId));
    }

    @Get('student/:studentId')
    async getByStudentId(@Param('studentId') studentId: string) {
        return await this.service.getByStudentId(parseInt(studentId));
    }

    @Post()
    async create(@Body() newResult: ClassExamResultsCreateForm) {
        return await this.service.create(newResult);
    }

    @Put()
    async update(@Body() updatedResult: ClassExamResultsUpdateForm) {
        return await this.service.update(updatedResult);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(parseInt(id));
    }
}
