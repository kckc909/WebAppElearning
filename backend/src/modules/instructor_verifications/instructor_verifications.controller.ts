import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { InstructorVerifications_Service } from "./instructor_verifications.service.js";
import { InstructorVerificationCreateForm, InstructorVerificationUpdateForm } from "./instructor_verifications.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Controller('instructor-verifications')
export class InstructorVerifications_Controller {
    constructor(
        private readonly _service: InstructorVerifications_Service
    ) { }

    @Get()
    async getAll() {
        const verifications = await this._service.getAll();
        return verifications;
    }

    @Get(':id')
    async getById(@Param() id: IdParam) {
        if (!Number(id.id)) {
            throw new BadRequestException("id must be integer");
        }

        const verification = await this._service.getById(id);
        return verification;
    }

    @Get('user/:userId')
    async getByUserId(@Param('userId') userId: string) {
        if (!Number(userId)) {
            throw new BadRequestException("userId must be integer");
        }

        const verification = await this._service.getByUserId(Number(userId));
        return verification;
    }

    @Get('status/:status')
    async getByStatus(@Param('status') status: string) {
        if (!Number(status)) {
            throw new BadRequestException("status must be integer");
        }

        const verifications = await this._service.getByStatus(Number(status));
        return verifications;
    }

    @Post()
    async create(@Body() body: InstructorVerificationCreateForm) {
        try {
            const created = await this._service.create(body);
            return created;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    @Put(':id')
    async update(@Param() param: IdParam, @Body() body: InstructorVerificationUpdateForm) {
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

