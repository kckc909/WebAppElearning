import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { LessonContents_Service } from "./lesson_contents.service.js";
import type { LessonContentsCreateForm, LessonContentsUpdateForm } from "./lesson_contents.dto.js";

@Controller('lesson-contents')
export class LessonContents_Controller {

    constructor(private readonly service: LessonContents_Service) { }

    @Get()
    async getAll() {
        return await this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.service.getById(parseInt(id));
    }

    @Get('lesson-version/:lessonVersionId')
    async getByLessonVersionId(@Param('lessonVersionId') lessonVersionId: string) {
        return await this.service.getByLessonVersionId(parseInt(lessonVersionId));
    }

    @Post()
    async create(@Body() newContent: LessonContentsCreateForm) {
        return await this.service.create(newContent);
    }

    @Put()
    async update(@Body() updatedContent: LessonContentsUpdateForm) {
        return await this.service.update(updatedContent);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(parseInt(id));
    }
}
