import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { MessageCreateForm, MessageUpdateForm } from "./messages.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Injectable()
export class Messages_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const messagesFound = await this.prisma.messages.findMany({
            include: {
                users_messages_sender_idTousers: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                },
                users_messages_receiver_idTousers: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return messagesFound;
    }

    async getById(idParam: IdParam): Promise<any> {
        const messageFound = await this.prisma.messages.findFirst({
            where: { id: idParam.id },
            include: {
                users_messages_sender_idTousers: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                },
                users_messages_receiver_idTousers: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                }
            }
        });

        return messageFound;
    }

    async getByConversationId(conversationId: number): Promise<any> {
        const messagesFound = await this.prisma.messages.findMany({
            where: { conversation_id: conversationId },
            include: {
                users_messages_sender_idTousers: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                },
                users_messages_receiver_idTousers: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                }
            },
            orderBy: {
                created_at: 'asc'
            }
        });

        return messagesFound;
    }

    async getByUserId(userId: number): Promise<any> {
        const messagesFound = await this.prisma.messages.findMany({
            where: {
                OR: [
                    { sender_id: userId },
                    { receiver_id: userId }
                ]
            },
            include: {
                users_messages_sender_idTousers: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                },
                users_messages_receiver_idTousers: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return messagesFound;
    }

    async getConversationBetweenUsers(userId1: number, userId2: number): Promise<any> {
        const messagesFound = await this.prisma.messages.findMany({
            where: {
                OR: [
                    {
                        AND: [
                            { sender_id: userId1 },
                            { receiver_id: userId2 }
                        ]
                    },
                    {
                        AND: [
                            { sender_id: userId2 },
                            { receiver_id: userId1 }
                        ]
                    }
                ]
            },
            include: {
                users_messages_sender_idTousers: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                },
                users_messages_receiver_idTousers: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                }
            },
            orderBy: {
                created_at: 'asc'
            }
        });

        return messagesFound;
    }

    async create(newMessage: MessageCreateForm): Promise<any> {
        const created = await this.prisma.messages.create({ 
            data: newMessage 
        });

        return created;
    }

    async update(newMessage: MessageUpdateForm): Promise<any> {
        const { id, ...payload } = newMessage;

        const updated = await this.prisma.messages.update({
            where: { id },
            data: payload
        });

        return updated;
    }

    async delete(deletedId: number): Promise<any> {
        const deleted = await this.prisma.messages.delete({ 
            where: { id: deletedId } 
        });

        return deleted;
    }
}

