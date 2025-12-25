import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { TransactionCreateForm, TransactionUpdateForm } from "./transactions.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Injectable()
export class Transactions_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const transactionsFound = await this.prisma.invoice_details.findMany({
            include: {
                accounts: {
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
                        thumbnail_url: true,
                    }
                },
                payment_methods: {
                    select: {
                        id: true,
                        method_name: true,
                        provider: true,
                    }
                },
                invoices: {
                    select: {
                        id: true,
                        invoice_number: true,
                        total_amount: true,
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
        const transactionFound = await this.prisma.invoice_details.findFirst({
            where: { id: idParam.id },
            include: {
                accounts: true,
                courses: true,
                payment_methods: true,
                invoices: true
            }
        });

        return transactionFound;
    }

    async getByUserId(userId: number): Promise<any> {
        const transactionsFound = await this.prisma.invoice_details.findMany({
            where: { user_id: userId },
            include: {
                courses: {
                    select: {
                        id: true,
                        title: true,
                        thumbnail_url: true,
                    }
                },
                payment_methods: {
                    select: {
                        id: true,
                        method_name: true,
                        provider: true,
                    }
                },
                invoices: {
                    select: {
                        id: true,
                        invoice_number: true,
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
        const transactionsFound = await this.prisma.invoice_details.findMany({
            where: { course_id: courseId },
            include: {
                accounts: {
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
                },
                invoices: {
                    select: {
                        id: true,
                        invoice_number: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return transactionsFound;
    }

    async getByStatus(status: string): Promise<any> {
        const transactionsFound = await this.prisma.invoice_details.findMany({
            where: { status: status },
            include: {
                accounts: {
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
                },
                invoices: {
                    select: {
                        id: true,
                        invoice_number: true,
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
        const { id, ...data } = newTransaction as any;
        const created = await this.prisma.invoice_details.create({ 
            data 
        });

        return created;
    }

    async update(newTransaction: TransactionUpdateForm): Promise<any> {
        const { id, user_id, course_id, method_id, created_at, ...payload } = newTransaction as any;

        const updated = await this.prisma.invoice_details.update({
            where: { id },
            data: payload
        });

        return updated;
    }

    async delete(deletedId: number): Promise<any> {
        const deleted = await this.prisma.invoice_details.delete({ 
            where: { id: deletedId } 
        });

        return deleted;
    }
}
