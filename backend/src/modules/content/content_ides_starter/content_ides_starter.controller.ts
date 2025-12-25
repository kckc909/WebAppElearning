import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ContentIdesStarter_Service } from "./content_ides_starter.service.js";
import type { ContentIdesStarterCreateForm, ContentIdesStarterUpdateForm } from "./content_ides_starter.dto.js";

@Controller('content-ides-starter')
export class ContentIdesStarter_Controller {

    constructor(private readonly service: ContentIdesStarter_Service) { }

    @Get()
    async getAll() {
        return await this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.service.getById(parseInt(id));
    }

    @Get('content/:contentId')
    async getByContentId(@Param('contentId') contentId: string) {
        return await this.service.getByContentId(parseInt(contentId));
    }

    @Get('content/:contentId/language/:language')
    async getByContentIdAndLanguage(
        @Param('contentId') contentId: string,
        @Param('language') language: string
    ) {
        return await this.service.getByContentIdAndLanguage(parseInt(contentId), language);
    }

    @Post()
    async create(@Body() newStarter: ContentIdesStarterCreateForm) {
        return await this.service.create(newStarter);
    }

    @Put()
    async update(@Body() updatedStarter: ContentIdesStarterUpdateForm) {
        return await this.service.update(updatedStarter);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(parseInt(id));
    }
}
