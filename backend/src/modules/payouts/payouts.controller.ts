import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Payouts_Service } from "./payouts.service.js";
import { PayoutCreateForm, PayoutUpdateForm } from "./payouts.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Controller('payouts')
export class Payouts_Controller {
    constructor(
        private readonly _service: Payouts_Service
    ) { }

    @Get()
    async getAll() {
        const payouts = await this._service.getAll();
        return payouts;
    }

    @Get(':id')
    async getById(@Param() id: IdParam) {
        if (!Number(id.id)) {
            throw new BadRequestException("id must be integer");
        }

        const payout = await this._service.getById(id);
        return payout;
    }

    @Get('instructor/:instructorId')
    async getByInstructorId(@Param('instructorId') instructorId: string) {
        if (!Number(instructorId)) {
            throw new BadRequestException("instructorId must be integer");
        }

        const payouts = await this._service.getByInstructorId(Number(instructorId));
        return payouts;
    }

    @Get('status/:status')
    async getByStatus(@Param('status') status: string) {
        if (!Number(status)) {
            throw new BadRequestException("status must be integer");
        }

        const payouts = await this._service.getByStatus(Number(status));
        return payouts;
    }

    @Post()
    async create(@Body() body: PayoutCreateForm) {
        try {
            const created = await this._service.create(body);
            return created;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    @Put(':id')
    async update(@Param() param: IdParam, @Body() body: PayoutUpdateForm) {
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

