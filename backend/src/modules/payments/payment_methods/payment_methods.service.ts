import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { PaymentMethodCreateForm, PaymentMethodUpdateForm } from "./payment_methods.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Injectable()
export class PaymentMethods_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const methodsFound = await this.prisma.payment_methods.findMany({
            include: {
                invoice_details: {
                    select: {
                        id: true,
                        amount: true,
                        status: true,
                    }
                }
            }
        });

        return methodsFound;
    }

    async getActive(): Promise<any> {
        const methodsFound = await this.prisma.payment_methods.findMany({
            where: { is_active: true }
        });

        return methodsFound;
    }

    async getById(idParam: IdParam): Promise<any> {
        const methodFound = await this.prisma.payment_methods.findFirst({
            where: { id: idParam.id },
            include: {
                invoice_details: true
            }
        });

        return methodFound;
    }

    async create(newMethod: PaymentMethodCreateForm): Promise<any> {
        const { id, ...data } = newMethod as any;
        const created = await this.prisma.payment_methods.create({ 
            data 
        });

        return created;
    }

    async update(newMethod: PaymentMethodUpdateForm): Promise<any> {
        const { id, created_at, updated_at, ...payload } = newMethod as any;

        const updated = await this.prisma.payment_methods.update({
            where: { id },
            data: payload
        });

        return updated;
    }

    async delete(deletedId: number): Promise<any> {
        const deleted = await this.prisma.payment_methods.delete({ 
            where: { id: deletedId } 
        });

        return deleted;
    }
}

