import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { InstructorVerificationCreateForm, InstructorVerificationUpdateForm } from "./instructor_verifications.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Injectable()
export class InstructorVerifications_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const verificationsFound = await this.prisma.instructor_verifications.findMany({
            include: {
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        avatar_url: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return verificationsFound;
    }

    async getById(idParam: IdParam): Promise<any> {
        const verificationFound = await this.prisma.instructor_verifications.findFirst({
            where: { id: idParam.id },
            include: {
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        avatar_url: true,
                    }
                }
            }
        });

        return verificationFound;
    }

    async getByUserId(userId: number): Promise<any> {
        const verificationFound = await this.prisma.instructor_verifications.findFirst({
            where: { user_id: userId },
            include: {
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        avatar_url: true,
                    }
                }
            }
        });

        return verificationFound;
    }

    async getByStatus(status: number): Promise<any> {
        const verificationsFound = await this.prisma.instructor_verifications.findMany({
            where: { status: status },
            include: {
                users: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                        avatar_url: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return verificationsFound;
    }

    async create(newVerification: InstructorVerificationCreateForm): Promise<any> {
        const created = await this.prisma.instructor_verifications.create({ 
            data: newVerification 
        });

        return created;
    }

    async update(newVerification: InstructorVerificationUpdateForm): Promise<any> {
        const { id, ...payload } = newVerification;

        const updated = await this.prisma.instructor_verifications.update({
            where: { id },
            data: payload
        });

        return updated;
    }

    async delete(deletedId: number): Promise<any> {
        const deleted = await this.prisma.instructor_verifications.delete({ 
            where: { id: deletedId } 
        });

        return deleted;
    }
}

