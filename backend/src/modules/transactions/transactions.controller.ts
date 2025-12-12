import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Transactions_Service } from "./transactions.service.js";
import { TransactionCreateForm, TransactionUpdateForm } from "./transactions.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Controller('transactions')
export class Transactions_Controller {
    constructor(
        private readonly _service: Transactions_Service
    ) { }

    @Get()
    async getAll() {
        const transactions = await this._service.getAll();
        return transactions;
    }

    @Get(':id')
    async getById(@Param() id: IdParam) {
        if (!Number(id.id)) {
            throw new BadRequestException("id must be integer");
        }

        const transaction = await this._service.getById(id);
        return transaction;
    }

    @Get('user/:userId')
    async getByUserId(@Param('userId') userId: string) {
        if (!Number(userId)) {
            throw new BadRequestException("userId must be integer");
        }

        const transactions = await this._service.getByUserId(Number(userId));
        return transactions;
    }

    @Get('course/:courseId')
    async getByCourseId(@Param('courseId') courseId: string) {
        if (!Number(courseId)) {
            throw new BadRequestException("courseId must be integer");
        }

        const transactions = await this._service.getByCourseId(Number(courseId));
        return transactions;
    }

    @Get('status/:status')
    async getByStatus(@Param('status') status: string) {
        if (!Number(status)) {
            throw new BadRequestException("status must be integer");
        }

        const transactions = await this._service.getByStatus(Number(status));
        return transactions;
    }

    @Post()
    async create(@Body() body: TransactionCreateForm) {
        try {
            const created = await this._service.create(body);
            return created;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    @Put(':id')
    async update(@Param() param: IdParam, @Body() body: TransactionUpdateForm) {
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

