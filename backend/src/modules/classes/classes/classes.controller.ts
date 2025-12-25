import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Classes_Service } from "./classes.service.js";
import { ClassesCreateForm, ClassesUpdateForm } from "./classes.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

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

    /**
     * GET /classes/my - Get student's classes
     * Query params: student_id
     */
    @Get('my')
    async getMyClasses(@Query('student_id') studentId: string) {
        try {
            if (!studentId) {
                throw new BadRequestException('student_id is required');
            }

            const classes = await this._service.getStudentClasses(Number(studentId));
            return classes;
        } catch (e) {
            throw new BadRequestException('Failed to get student classes: ' + e.message);
        }
    }

    /**
     * GET /classes/:id/assignments - Get assignments for a class
     */
    @Get(':id/assignments')
    async getAssignments(@Param('id') id: string) {
        try {
            const assignments = await this._service.getAssignments(Number(id));
            return assignments;
        } catch (e) {
            throw new BadRequestException('Failed to get assignments: ' + e.message);
        }
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

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: ClassesUpdateForm) {
        try {

            const updated = await this._service.update(Number(id), body)

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
