import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service.js';

@Injectable()
export class SystemLogsService {
    constructor(private prisma: PrismaService) {}

    async getAll(params?: {
        level?: string;
        category?: string;
        startDate?: string;
        endDate?: string;
        limit?: number;
        offset?: number;
    }) {
        const where: any = {};
        
        if (params?.level) where.level = params.level;
        if (params?.category) where.category = params.category;
        if (params?.startDate || params?.endDate) {
            where.created_at = {};
            if (params.startDate) where.created_at.gte = new Date(params.startDate);
            if (params.endDate) where.created_at.lte = new Date(params.endDate);
        }

        const logs = await this.prisma.system_logs.findMany({
            where,
            orderBy: { created_at: 'desc' },
            take: params?.limit || 100,
            skip: params?.offset || 0,
        });

        const total = await this.prisma.system_logs.count({ where });

        return { logs, total };
    }

    async getById(id: number) {
        return await this.prisma.system_logs.findUnique({
            where: { id }
        });
    }

    async create(data: {
        level: string;
        category?: string;
        message: string;
        context?: any;
    }) {
        return await this.prisma.system_logs.create({
            data: {
                level: data.level,
                category: data.category,
                message: data.message,
                context: data.context || null,
            }
        });
    }

    async deleteOldLogs(daysToKeep: number = 30) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

        const result = await this.prisma.system_logs.deleteMany({
            where: {
                created_at: {
                    lt: cutoffDate
                }
            }
        });

        return { deleted: result.count };
    }

    async getStats() {
        const total = await this.prisma.system_logs.count();
        
        const byLevel = await this.prisma.system_logs.groupBy({
            by: ['level'],
            _count: true,
        });

        const byCategory = await this.prisma.system_logs.groupBy({
            by: ['category'],
            _count: true,
            where: { category: { not: null } }
        });

        return {
            total,
            byLevel: byLevel.map(item => ({ level: item.level, count: item._count })),
            byCategory: byCategory.map(item => ({ category: item.category, count: item._count }))
        };
    }
}
