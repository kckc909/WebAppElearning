import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import { NotificationsCreateForm, NotificationsUpdateForm } from "./notifications.dto.js";

@Injectable()
export class Notifications_Service {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(filters?: { user_id?: number; is_read?: boolean; type?: string }) {
        const where: any = {};
        if (filters?.user_id) where.user_id = filters.user_id;
        if (filters?.is_read !== undefined) where.is_read = filters.is_read;
        if (filters?.type) where.type = filters.type;

        const notifications = await this.prisma.notifications.findMany({
            where,
            orderBy: { created_at: 'desc' },
        });

        return notifications;
    }

    async getById(id: number) {
        const notification = await this.prisma.notifications.findFirst({
            where: { id },
        });

        return notification;
    }

    async create(body: NotificationsCreateForm) {
        const { id, ...data } = body as any;
        const created = await this.prisma.notifications.create({
            data: {
                ...data,
                is_read: false,
            },
        });

        return created;
    }

    async update(id: number, body: Partial<NotificationsUpdateForm>) {
        const { id: _, ...data } = body as any;
        const updated = await this.prisma.notifications.update({
            where: { id },
            data,
        });

        return updated;
    }

    async delete(id: number) {
        const deleted = await this.prisma.notifications.delete({
            where: { id },
        });

        return deleted;
    }

    async markAsRead(id: number) {
        const updated = await this.prisma.notifications.update({
            where: { id },
            data: {
                is_read: true,
                read_at: new Date(),
            },
        });

        return updated;
    }

    async markAllAsRead(userId: number) {
        const updated = await this.prisma.notifications.updateMany({
            where: {
                user_id: userId,
                is_read: false,
            },
            data: {
                is_read: true,
                read_at: new Date(),
            },
        });

        return updated;
    }
}