import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { TransactionCreateForm, TransactionUpdateForm } from "./transactions.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Injectable()
export class Transactions_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const transactionsFound = await this.prisma.transactions.findMany({
            include: {
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                    }
                },
                courses: {
                    select: {
                        id: true,
                        title: true,
                        thumbnail: true,
                    }
                },
                payment_methods: {
                    select: {
                        id: true,
                        method_name: true,
                        provider: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return transactionsFound;
    }

    async getById(idParam: IdParam): Promise<any> {
        const transactionFound = await this.prisma.transactions.findFirst({
            where: { id: idParam.id },
            include: {
                users: true,
                courses: true,
                payment_methods: true
            }
        });

        return transactionFound;
    }

    async getByUserId(userId: number): Promise<any> {
        const transactionsFound = await this.prisma.transactions.findMany({
            where: { user_id: userId },
            include: {
                courses: {
                    select: {
                        id: true,
                        title: true,
                        thumbnail: true,
                    }
                },
                payment_methods: {
                    select: {
                        id: true,
                        method_name: true,
                        provider: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return transactionsFound;
    }

    async getByCourseId(courseId: number): Promise<any> {
        const transactionsFound = await this.prisma.transactions.findMany({
            where: { course_id: courseId },
            include: {
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                    }
                },
                payment_methods: {
                    select: {
                        id: true,
                        method_name: true,
                        provider: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return transactionsFound;
    }

    async getByStatus(status: number): Promise<any> {
        const transactionsFound = await this.prisma.transactions.findMany({
            where: { status: status },
            include: {
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                    }
                },
                courses: {
                    select: {
                        id: true,
                        title: true,
                    }
                },
                payment_methods: {
                    select: {
                        id: true,
                        method_name: true,
                        provider: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return transactionsFound;
    }

    async create(newTransaction: TransactionCreateForm): Promise<any> {
        const created = await this.prisma.transactions.create({ 
            data: newTransaction 
        });

        return created;
    }

    async update(newTransaction: TransactionUpdateForm): Promise<any> {
        const { id, ...payload } = newTransaction;

        const updated = await this.prisma.transactions.update({
            where: { id },
            data: payload
        });

        return updated;
    }

    async delete(deletedId: number): Promise<any> {
        const deleted = await this.prisma.transactions.delete({ 
            where: { id: deletedId } 
        });

        return deleted;
    }
}

