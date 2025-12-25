import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ClassSubmissions_Service } from "./class_submissions.service.js";
import type { ClassSubmissionsCreateForm, ClassSubmissionsUpdateForm } from "./class_submissions.dto.js";

@Controller('class-submissions')
export class ClassSubmissions_Controller {

    constructor(private readonly service: ClassSubmissions_Service) { }

    @Get()
    async getAll() {
        return await this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.service.getById(parseInt(id));
    }

    @Get('assignment/:assignmentId')
    async getByAssignmentId(@Param('assignmentId') assignmentId: string) {
        return await this.service.getByAssignmentId(parseInt(assignmentId));
    }

    @Get('student/:studentId')
    async getByStudentId(@Param('studentId') studentId: string) {
        return await this.service.getByStudentId(parseInt(studentId));
    }

    @Post()
    async create(@Body() newSubmission: ClassSubmissionsCreateForm) {
        return await this.service.create(newSubmission);
    }

    @Put()
    async update(@Body() updatedSubmission: ClassSubmissionsUpdateForm) {
        return await this.service.update(updatedSubmission);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(parseInt(id));
    }
}
