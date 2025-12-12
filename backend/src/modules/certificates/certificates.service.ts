import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { CertificateCreateForm, CertificateUpdateForm } from "./certificates.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Injectable()
export class Certificates_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const certificatesFound = await this.prisma.certificates.findMany({
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
                }
            }
        });

        return certificatesFound;
    }

    async getById(idParam: IdParam): Promise<any> {
        const certificateFound = await this.prisma.certificates.findFirst({
            where: { id: idParam.id },
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
                }
            }
        });

        return certificateFound;
    }

    async getByStudentId(studentId: number): Promise<any> {
        const certificatesFound = await this.prisma.certificates.findMany({
            where: { student_id: studentId },
            include: {
                courses: {
                    select: {
                        id: true,
                        title: true,
                        thumbnail: true,
                    }
                }
            }
        });

        return certificatesFound;
    }

    async getByCourseId(courseId: number): Promise<any> {
        const certificatesFound = await this.prisma.certificates.findMany({
            where: { course_id: courseId },
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

        return certificatesFound;
    }

    async create(newCertificate: CertificateCreateForm): Promise<any> {
        const created = await this.prisma.certificates.create({ 
            data: newCertificate 
        });

        return created;
    }

    async update(newCertificate: CertificateUpdateForm): Promise<any> {
        const { id, ...payload } = newCertificate;

        const updated = await this.prisma.certificates.update({
            where: { id },
            data: payload
        });

        return updated;
    }

    async delete(deletedId: number): Promise<any> {
        const deleted = await this.prisma.certificates.delete({ 
            where: { id: deletedId } 
        });

        return deleted;
    }
}

