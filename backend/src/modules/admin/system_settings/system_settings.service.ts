import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service.js';

@Injectable()
export class SystemSettingsService {
    constructor(private prisma: PrismaService) {}

    async getAll() {
        return await this.prisma.system_settings.findMany({
            orderBy: { key: 'asc' }
        });
    }

    async getByKey(key: string) {
        const setting = await this.prisma.system_settings.findUnique({
            where: { key }
        });

        if (!setting) return null;

        // Parse value based on type
        return {
            ...setting,
            parsedValue: this.parseValue(setting.value, setting.type)
        };
    }

    async create(data: {
        key: string;
        value: string;
        type?: string;
        description?: string;
    }) {
        return await this.prisma.system_settings.create({
            data: {
                key: data.key,
                value: data.value,
                type: data.type || 'string',
                description: data.description,
            }
        });
    }

    async update(id: number, data: {
        value?: string;
        type?: string;
        description?: string;
    }) {
        return await this.prisma.system_settings.update({
            where: { id },
            data: {
                value: data.value,
                type: data.type,
                description: data.description,
            }
        });
    }

    async updateByKey(key: string, value: string) {
        return await this.prisma.system_settings.update({
            where: { key },
            data: { value }
        });
    }

    async delete(id: number) {
        return await this.prisma.system_settings.delete({
            where: { id }
        });
    }

    async bulkUpdate(settings: Array<{ key: string; value: string }>) {
        const promises = settings.map(setting =>
            this.prisma.system_settings.update({
                where: { key: setting.key },
                data: { value: setting.value }
            })
        );

        return await Promise.all(promises);
    }

    private parseValue(value: string | null, type: string) {
        if (value === null) return null;

        switch (type) {
            case 'number':
                return parseFloat(value);
            case 'boolean':
                return value === 'true' || value === '1';
            case 'json':
                try {
                    return JSON.parse(value);
                } catch {
                    return value;
                }
            default:
                return value;
        }
    }
}
