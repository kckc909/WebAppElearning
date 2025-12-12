import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { AdminLogCreateForm, AdminLogUpdateForm } from "./admin_logs.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Injectable()
export class AdminLogs_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const logsFound = await this.prisma.admin_logs.findMany({
            include: {
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return logsFound;
    }

    async getById(idParam: IdParam): Promise<any> {
        const logFound = await this.prisma.admin_logs.findFirst({
            where: { id: idParam.id },
            include: {
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                    }
                }
            }
        });

        return logFound;
    }

    async getByAdminId(adminId: number): Promise<any> {
        const logsFound = await this.prisma.admin_logs.findMany({
            where: { admin_id: adminId },
            include: {
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return logsFound;
    }

    async getByTargetTable(targetTable: string): Promise<any> {
        const logsFound = await this.prisma.admin_logs.findMany({
            where: { target_table: targetTable },
            include: {
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return logsFound;
    }

    async create(newLog: AdminLogCreateForm): Promise<any> {
        const created = await this.prisma.admin_logs.create({ 
            data: newLog 
        });

        return created;
    }

    async update(newLog: AdminLogUpdateForm): Promise<any> {
        const { id, ...payload } = newLog;

        const updated = await this.prisma.admin_logs.update({
            where: { id },
            data: payload
        });

        return updated;
    }

    async delete(deletedId: number): Promise<any> {
        const deleted = await this.prisma.admin_logs.delete({ 
            where: { id: deletedId } 
        });

        return deleted;
    }
}

