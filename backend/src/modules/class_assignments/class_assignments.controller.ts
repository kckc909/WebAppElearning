import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ClassAssignments_Service } from "./class_assignments.service.js";
import type { ClassAssignmentsCreateForm, ClassAssignmentsUpdateForm } from "./class_assignments.dto.js";

@Controller('class-assignments')
export class ClassAssignments_Controller {

    constructor(private readonly service: ClassAssignments_Service) { }

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
    async create(@Body() newAssignment: ClassAssignmentsCreateForm) {
        return await this.service.create(newAssignment);
    }

    @Put()
    async update(@Body() updatedAssignment: ClassAssignmentsUpdateForm) {
        return await this.service.update(updatedAssignment);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(parseInt(id));
    }
}
