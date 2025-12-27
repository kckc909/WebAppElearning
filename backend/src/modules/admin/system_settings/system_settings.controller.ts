import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { SystemSettingsService } from './system_settings.service.js';

@Controller('system-settings')
export class SystemSettingsController {
    constructor(private readonly systemSettingsService: SystemSettingsService) {}

    @Get()
    async getAll() {
        return await this.systemSettingsService.getAll();
    }

    @Get('key/:key')
    async getByKey(@Param('key') key: string) {
        return await this.systemSettingsService.getByKey(key);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.systemSettingsService.getByKey(id);
    }

    @Post()
    async create(@Body() data: {
        key: string;
        value: string;
        type?: string;
        description?: string;
    }) {
        return await this.systemSettingsService.create(data);
    }

    @Put('bulk')
    async bulkUpdate(@Body() data: { settings: Array<{ key: string; value: string }> }) {
        return await this.systemSettingsService.bulkUpdate(data.settings);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() data: {
            value?: string;
            type?: string;
            description?: string;
        }
    ) {
        return await this.systemSettingsService.update(parseInt(id), data);
    }

    @Put('key/:key')
    async updateByKey(
        @Param('key') key: string,
        @Body() data: { value: string }
    ) {
        return await this.systemSettingsService.updateByKey(key, data.value);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.systemSettingsService.delete(parseInt(id));
    }
}
