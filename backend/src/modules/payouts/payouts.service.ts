import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { PayoutCreateForm, PayoutUpdateForm } from "./payouts.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Injectable()
export class Payouts_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const payoutsFound = await this.prisma.payouts.findMany({
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
                paid_at: 'desc'
            }
        });

        return payoutsFound;
    }

    async getById(idParam: IdParam): Promise<any> {
        const payoutFound = await this.prisma.payouts.findFirst({
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

        return payoutFound;
    }

    async getByInstructorId(instructorId: number): Promise<any> {
        const payoutsFound = await this.prisma.payouts.findMany({
            where: { instructor_id: instructorId },
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
                paid_at: 'desc'
            }
        });

        return payoutsFound;
    }

    async getByStatus(status: number): Promise<any> {
        const payoutsFound = await this.prisma.payouts.findMany({
            where: { status: status },
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
                paid_at: 'desc'
            }
        });

        return payoutsFound;
    }

    async create(newPayout: PayoutCreateForm): Promise<any> {
        const created = await this.prisma.payouts.create({ 
            data: newPayout 
        });

        return created;
    }

    async update(newPayout: PayoutUpdateForm): Promise<any> {
        const { id, ...payload } = newPayout;

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

