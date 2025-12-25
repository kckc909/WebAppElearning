import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PaymentMethods_Service } from "./payment_methods.service.js";
import { PaymentMethodCreateForm, PaymentMethodUpdateForm } from "./payment_methods.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Controller('payment-methods')
export class PaymentMethods_Controller {
    constructor(
        private readonly _service: PaymentMethods_Service
    ) { }

    @Get()
    async getAll() {
        const methods = await this._service.getAll();
        return methods;
    }

    @Get('active')
    async getActive() {
        const methods = await this._service.getActive();
        return methods;
    }

    @Get(':id')
    async getById(@Param() id: IdParam) {
        if (!Number(id.id)) {
            throw new BadRequestException("id must be integer");
        }

        const method = await this._service.getById(id);
        return method;
    }

    @Post()
    async create(@Body() body: PaymentMethodCreateForm) {
        try {
            const created = await this._service.create(body);
            return created;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    @Put(':id')
    async update(@Param() param: IdParam, @Body() body: PaymentMethodUpdateForm) {
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

