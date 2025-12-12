import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Messages_Service } from "./messages.service.js";
import { MessageCreateForm, MessageUpdateForm } from "./messages.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Controller('messages')
export class Messages_Controller {
    constructor(
        private readonly _service: Messages_Service
    ) { }

    @Get()
    async getAll() {
        const messages = await this._service.getAll();
        return messages;
    }

    @Get(':id')
    async getById(@Param() id: IdParam) {
        if (!Number(id.id)) {
            throw new BadRequestException("id must be integer");
        }

        const message = await this._service.getById(id);
        return message;
    }

    @Get('conversation/:conversationId')
    async getByConversationId(@Param('conversationId') conversationId: string) {
        if (!Number(conversationId)) {
            throw new BadRequestException("conversationId must be integer");
        }

        const messages = await this._service.getByConversationId(Number(conversationId));
        return messages;
    }

    @Get('user/:userId')
    async getByUserId(@Param('userId') userId: string) {
        if (!Number(userId)) {
            throw new BadRequestException("userId must be integer");
        }

        const messages = await this._service.getByUserId(Number(userId));
        return messages;
    }

    @Get('conversation/:userId1/:userId2')
    async getConversationBetweenUsers(
        @Param('userId1') userId1: string,
        @Param('userId2') userId2: string
    ) {
        if (!Number(userId1) || !Number(userId2)) {
            throw new BadRequestException("userIds must be integers");
        }

        const messages = await this._service.getConversationBetweenUsers(
            Number(userId1),
            Number(userId2)
        );
        return messages;
    }

    @Post()
    async create(@Body() body: MessageCreateForm) {
        try {
            const created = await this._service.create(body);
            return created;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    @Put(':id')
    async update(@Param() param: IdParam, @Body() body: MessageUpdateForm) {
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

