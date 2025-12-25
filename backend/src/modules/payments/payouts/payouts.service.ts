import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { PayoutCreateForm, PayoutUpdateForm } from "./payouts.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Injectable()
export class Payouts_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const payoutsFound = await this.prisma.payouts.findMany({
            include: {
                accounts: {
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

        return payoutsFound;
    }

    async getById(idParam: IdParam): Promise<any> {
        const payoutFound = await this.prisma.payouts.findFirst({
            where: { id: idParam.id },
            include: {
                accounts: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                    }
                }
            }
        });

        return payoutFound;
    }

    async getByInstructorId(instructorId: number): Promise<any> {
        const payoutsFound = await this.prisma.payouts.findMany({
            where: { instructor_id: instructorId },
            include: {
                accounts: {
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

        return payoutsFound;
    }

    async getByStatus(status: string): Promise<any> {
        const payoutsFound = await this.prisma.payouts.findMany({
            where: { status: status },
            include: {
                accounts: {
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

        return payoutsFound;
    }

    async create(newPayout: PayoutCreateForm): Promise<any> {
        const { id, ...data } = newPayout as any;
        const created = await this.prisma.payouts.create({ 
            data 
        });

        return created;
    }

    async update(newPayout: PayoutUpdateForm): Promise<any> {
        const { id, instructor_id, created_at, paid_at, ...payload } = newPayout as any;

        const updated = await this.prisma.payouts.update({
            where: { id },
            data: payload
        });

        return updated;
    }

    async delete(deletedId: number): Promise<any> {
        const deleted = await this.prisma.payouts.delete({ 
            where: { id: deletedId } 
        });

        return deleted;
    }
}

