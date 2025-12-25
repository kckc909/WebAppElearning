import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Lessons_Service } from "./lessons.service.js";
import { LessonsCreateForm, LessonsUpdateForm } from "./lessons.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Controller('lessons')

export class Lessons_Controller {
    constructor(
        private readonly _service: Lessons_Service,
    ) { }

    @Get()
    async getAll() {

        const lessons = await this._service.getAll();

        return { success: true, data: lessons };

    }

    @Get(':id')
    async getById(@Param('id') id: string) {

        const lesson = await this._service.getById(Number(id))

        return { success: true, data: lesson };

    }

    @Post()
    async create(@Body() body: LessonsCreateForm) {
        try {
            const created = await this._service.create(body)

            return { success: true, data: created }

        }
        catch (e) {

            throw new BadRequestException("----- Error: ", e.message);

        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: LessonsUpdateForm) {
        try {

            const updated = await this._service.update(Number(id), body)

            return { success: true, data: updated }

        }
        catch (e) {

            throw new BadRequestException("----- Error: ", e.message);

        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            const deleted = await this._service.delete(Number(id))

            return { success: true, data: deleted };

        }
        catch (e) {

            throw new BadRequestException("----- Error: ", e.message);

        }
    }

    /**
     * PUT /lessons/:id/layout
     * Update layout_type for the draft version of a lesson
     */
    @Put(':id/layout')
    async updateLayout(
        @Param('id') id: string,
        @Body() body: { layout_type: string }
    ) {
        try {
            const updated = await this._service.updateLayout(Number(id), body.layout_type);
            return { success: true, data: updated };
        } catch (e) {
            throw new BadRequestException("----- Error: ", e.message);
        }
    }

    /**
     * PUT /lessons/:id/preview
     * Toggle preview status for a lesson (allow free preview)
     */
    @Put(':id/preview')
    async togglePreview(
        @Param('id') id: string,
        @Body() body: { is_preview: boolean }
    ) {
        try {
            const updated = await this._service.togglePreview(Number(id), body.is_preview);
            return { success: true, data: updated };
        } catch (e) {
            throw new BadRequestException("----- Error: ", e.message);
        }
    }
}
