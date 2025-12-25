import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { AdminLogCreateForm, AdminLogUpdateForm } from "./admin_logs.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Injectable()
export class AdminLogs_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const logsFound = await this.prisma.audit_logs.findMany({
            orderBy: {
                created_at: 'desc'
            }
        });

        return logsFound;
    }

    async getById(idParam: IdParam): Promise<any> {
        const logFound = await this.prisma.audit_logs.findFirst({
            where: { id: idParam.id }
        });

        return logFound;
    }

    async getByUserId(userId: number): Promise<any> {
        const logsFound = await this.prisma.audit_logs.findMany({
            where: { user_id: userId },
            orderBy: {
                created_at: 'desc'
            }
        });

        return logsFound;
    }

    async getByResourceType(resourceType: string): Promise<any> {
        const logsFound = await this.prisma.audit_logs.findMany({
            where: { resource_type: resourceType },
            orderBy: {
                created_at: 'desc'
            }
        });

        return logsFound;
    }

    async create(newLog: AdminLogCreateForm): Promise<any> {
        const { id, ...data } = newLog as any;
        const created = await this.prisma.audit_logs.create({ 
            data 
        });

        return created;
    }

    async update(newLog: AdminLogUpdateForm): Promise<any> {
        const { id, user_id, created_at, ...payload } = newLog as any;

        const updated = await this.prisma.audit_logs.update({
            where: { id },
            data: payload
        });

        return updated;
    }

    async delete(deletedId: number): Promise<any> {
        const deleted = await this.prisma.audit_logs.delete({ 
            where: { id: deletedId } 
        });

        return deleted;
    }
}

