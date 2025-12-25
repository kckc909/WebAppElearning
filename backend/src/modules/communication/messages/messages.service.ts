import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { MessageCreateForm, MessageUpdateForm } from "./messages.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Injectable()
export class Messages_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const messagesFound = await this.prisma.messages.findMany({
            include: {
                accounts_messages_sender_idToaccounts: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                },
                accounts_messages_receiver_idToaccounts: {
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
                accounts_messages_sender_idToaccounts: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                },
                accounts_messages_receiver_idToaccounts: {
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
                accounts_messages_sender_idToaccounts: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                },
                accounts_messages_receiver_idToaccounts: {
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
                accounts_messages_sender_idToaccounts: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                },
                accounts_messages_receiver_idToaccounts: {
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
                accounts_messages_sender_idToaccounts: {
                    select: {
                        id: true,
                        full_name: true,
                        avatar_url: true,
                    }
                },
                accounts_messages_receiver_idToaccounts: {
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
        const { id, ...data } = newMessage as any;
        const created = await this.prisma.messages.create({ 
            data 
        });

        return created;
    }

    async update(newMessage: MessageUpdateForm): Promise<any> {
        const { id, sender_id, receiver_id, created_at, ...payload } = newMessage as any;

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

