import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ContentIdes_Service } from "./content_ides.service.js";
import type { ContentIdesCreateForm, ContentIdesUpdateForm } from "./content_ides.dto.js";

@Controller('content-ides')
export class ContentIdes_Controller {

    constructor(private readonly service: ContentIdes_Service) { }

    @Get()
    async getAll() {
        return await this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.service.getById(parseInt(id));
    }

    @Get('user/:userId')
    async getByUserId(@Param('userId') userId: string) {
        return await this.service.getByUserId(parseInt(userId));
    }

    @Get('content/:contentId')
    async getByContentId(@Param('contentId') contentId: string) {
        return await this.service.getByContentId(parseInt(contentId));
    }

    @Get('user/:userId/content/:contentId')
    async getByUserAndContent(
        @Param('userId') userId: string,
        @Param('contentId') contentId: string
    ) {
        return await this.service.getByUserAndContent(parseInt(userId), parseInt(contentId));
    }

    @Post()
    async create(@Body() newIde: ContentIdesCreateForm) {
        return await this.service.create(newIde);
    }

    @Put()
    async update(@Body() updatedIde: ContentIdesUpdateForm) {
        return await this.service.update(updatedIde);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(parseInt(id));
    }
}
