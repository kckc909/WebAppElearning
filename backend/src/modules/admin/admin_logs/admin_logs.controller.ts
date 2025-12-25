import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AdminLogs_Service } from "./admin_logs.service.js";
import { AdminLogCreateForm, AdminLogUpdateForm } from "./admin_logs.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Controller('admin-logs')
export class AdminLogs_Controller {
    constructor(
        private readonly _service: AdminLogs_Service
    ) { }

    @Get()
    async getAll() {
        const logs = await this._service.getAll();
        return logs;
    }

    @Get(':id')
    async getById(@Param() id: IdParam) {
        if (!Number(id.id)) {
            throw new BadRequestException("id must be integer");
        }

        const log = await this._service.getById(id);
        return log;
    }

    @Get('user/:userId')
    async getByUserId(@Param('userId') userId: string) {
        if (!Number(userId)) {
            throw new BadRequestException("userId must be integer");
        }

        const logs = await this._service.getByUserId(Number(userId));
        return logs;
    }

    @Get('resource/:resourceType')
    async getByResourceType(@Param('resourceType') resourceType: string) {
        const logs = await this._service.getByResourceType(resourceType);
        return logs;
    }

    @Post()
    async create(@Body() body: AdminLogCreateForm) {
        try {
            const created = await this._service.create(body);
            return created;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    @Put(':id')
    async update(@Param() param: IdParam, @Body() body: AdminLogUpdateForm) {
        try {
            if (!Number(param.id)) {
                throw new BadRequestException("id must be integer");
            }

            body.id = param.id;
            const updated = await this._service.update(body);
            return updated;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    @Delete(':id')
    async delete(@Param() param: IdParam) {
        try {
            if (!Number(param.id)) {
                throw new BadRequestException("id must be integer");
            }

            const deleted = await this._service.delete(param.id);
            return deleted;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }
}

