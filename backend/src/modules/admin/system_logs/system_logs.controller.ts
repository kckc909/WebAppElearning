import { Controller, Get, Post, Delete, Query, Param, Body, UseGuards } from '@nestjs/common';
import { SystemLogsService } from './system_logs.service.js';

@Controller('system-logs')
export class SystemLogsController {
    constructor(private readonly systemLogsService: SystemLogsService) {}

    @Get()
    async getAll(
        @Query('level') level?: string,
        @Query('category') category?: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('limit') limit?: string,
        @Query('offset') offset?: string,
    ) {
        return await this.systemLogsService.getAll({
            level,
            category,
            startDate,
            endDate,
            limit: limit ? parseInt(limit) : undefined,
            offset: offset ? parseInt(offset) : undefined,
        });
    }

    @Get('stats')
    async getStats() {
        return await this.systemLogsService.getStats();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.systemLogsService.getById(parseInt(id));
    }

    @Post()
    async create(@Body() data: {
        level: string;
        category?: string;
        message: string;
        context?: any;
    }) {
        return await this.systemLogsService.create(data);
    }

    @Delete('cleanup')
    async cleanup(@Query('days') days?: string) {
        const daysToKeep = days ? parseInt(days) : 30;
        return await this.systemLogsService.deleteOldLogs(daysToKeep);
    }
}
