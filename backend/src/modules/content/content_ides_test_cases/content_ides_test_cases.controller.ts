import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ContentIdesTestCasesService } from './content_ides_test_cases.service.js';

@Controller('content-ides-test-cases')
export class ContentIdesTestCasesController {
    constructor(private readonly service: ContentIdesTestCasesService) {}

    @Get()
    async getAll() {
        return await this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.service.getById(parseInt(id));
    }

    @Get('starter/:starterId')
    async getByStarterId(
        @Param('starterId') starterId: string,
        @Query('includeHidden') includeHidden?: string
    ) {
        return await this.service.getByStarterId(
            parseInt(starterId),
            includeHidden === 'true'
        );
    }

    @Post()
    async create(@Body() data: {
        starter_id: number;
        test_name: string;
        input: string;
        expected_output: string;
        is_hidden?: boolean;
        points?: number;
        timeout_ms?: number;
        order_index?: number;
    }) {
        return await this.service.create(data);
    }

    @Post('bulk')
    async bulkCreate(@Body() data: {
        starter_id: number;
        test_cases: Array<{
            test_name: string;
            input: string;
            expected_output: string;
            is_hidden?: boolean;
            points?: number;
            timeout_ms?: number;
        }>;
    }) {
        return await this.service.bulkCreate(data.starter_id, data.test_cases);
    }

    @Post('run')
    async runTests(@Body() data: {
        starter_id: number;
        user_code: string;
        language: string;
    }) {
        return await this.service.runTests(
            data.starter_id,
            data.user_code,
            data.language
        );
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() data: {
            test_name?: string;
            input?: string;
            expected_output?: string;
            is_hidden?: boolean;
            points?: number;
            timeout_ms?: number;
            order_index?: number;
        }
    ) {
        return await this.service.update(parseInt(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(parseInt(id));
    }
}
