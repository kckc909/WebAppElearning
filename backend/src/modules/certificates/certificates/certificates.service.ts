import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { CertificateCreateForm, CertificateUpdateForm } from "./certificates.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";
import FormData from 'form-data';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get certificate template path
// From dist/src/modules/certificates -> scripts folder in same directory
const certificateTemplatePath = join(__dirname, 'scripts/certificate-template.js');

@Injectable()
export class Certificates_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const certificatesFound = await this.prisma.certificates.findMany({
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
                }
            }
        });

        return certificatesFound;
    }

    async getById(idParam: IdParam): Promise<any> {
        const certificateFound = await this.prisma.certificates.findFirst({
            where: { id: idParam.id },
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
                }
            }
        });

        return certificateFound;
    }

    async getByStudentId(studentId: number): Promise<any> {
        const certificatesFound = await this.prisma.certificates.findMany({
            where: { student_id: studentId },
            include: {
                // Student info
                accounts: {
                    select: {
                        id: true,
                        full_name: true,
                        email: true,
                    }
                },
                // Course and instructor info
                courses: {
                    select: {
                        id: true,
                        title: true,
                        thumbnail_url: true,
                        accounts: {
                            select: {
                                id: true,
                                full_name: true,
                            }
                        },
                        course_categories: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                }
            },
            orderBy: {
                issued_at: 'desc'
            }
        });

        return certificatesFound;
    }

    async getByCourseId(courseId: number): Promise<any> {
        const certificatesFound = await this.prisma.certificates.findMany({
            where: { course_id: courseId },
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

        return certificatesFound;
    }

    async create(newCertificate: CertificateCreateForm): Promise<any> {
        const { id, ...data } = newCertificate as any;
        const created = await this.prisma.certificates.create({
            data
        });

        return created;
    }

    async update(newCertificate: CertificateUpdateForm): Promise<any> {
        const { id, student_id, course_id, issued_at, ...payload } = newCertificate as any;

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

    /**
     * Claim certificate for a student who completed a course
     * Generates certificate code and URL
     */
    async claimCertificate(studentId: number, courseId: number): Promise<any> {
        // Check if certificate already exists
        const existing = await this.prisma.certificates.findFirst({
            where: {
                student_id: studentId,
                course_id: courseId
            }
        });

        if (existing) {
            return existing; // Already claimed
        }

        // Check if student completed the course
        const enrollment = await this.prisma.course_enrollments.findFirst({
            where: {
                student_id: studentId,
                course_id: courseId
            },
            include: {
                courses: {
                    select: {
                        certificate_threshold: true,
                        title: true,
                        accounts: {
                            select: {
                                full_name: true
                            }
                        }
                    }
                }
            }
        });

        if (!enrollment) {
            throw new Error('Enrollment not found');
        }

        const threshold = enrollment.courses.certificate_threshold || 100;
        if (enrollment.progress < threshold) {
            throw new Error(`Progress must be at least ${threshold}% to claim certificate`);
        }

        // Get student info
        const student = await this.prisma.accounts.findUnique({
            where: { id: studentId },
            select: { full_name: true }
        });

        if (!student) {
            throw new Error('Student not found');
        }

        // Generate certificate code (format: CERT-YYYYMMDD-XXXXX)
        const date = new Date();
        const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
        const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
        const certificateCode = `CERT-${dateStr}-${randomStr}`;

        // Generate certificate image
        const certificateData = {
            student_name: student.full_name,
            course_title: enrollment.courses.title,
            instructor_name: enrollment.courses.accounts.full_name,
            issued_at: date,
            certificate_code: certificateCode
        };

        // Dynamic import certificate template using file URL
        const templateFileUrl = pathToFileURL(certificateTemplatePath).href;
        const { generateCertificateImage } = await import(templateFileUrl);
        const imageBuffer = await generateCertificateImage(certificateData);

        // Upload to storage server
        const storageUrl = process.env.STORAGE_SERVER_URL || 'http://localhost:3001';
        const formData = new FormData();
        formData.append('file', imageBuffer, {
            filename: `${certificateCode}.png`,
            contentType: 'image/png'
        });
        formData.append('context', 'certificates');

        const fetch = (await import('node-fetch')).default;
        const uploadResponse = await fetch(`${storageUrl}/upload`, {
            method: 'POST',
            body: formData
        });

        if (!uploadResponse.ok) {
            throw new Error(`Failed to upload certificate image: ${uploadResponse.statusText}`);
        }

        const uploadResult = await uploadResponse.json();
        const certificateUrl = uploadResult.file?.url || uploadResult.url;
        const verificationUrl = `/verify/${certificateCode}`;

        // Create certificate
        const certificate = await this.prisma.certificates.create({
            data: {
                student_id: studentId,
                course_id: courseId,
                certificate_code: certificateCode,
                certificate_url: certificateUrl,
                verification_url: verificationUrl,
                issued_at: date
            },
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
                        accounts: {
                            select: {
                                id: true,
                                full_name: true,
                            }
                        }
                    }
                }
            }
        });

        return certificate;
    }

    /**
     * Re-generate certificate image
     * Tạo lại ảnh với template mới, xóa ảnh cũ (optional), update URL mới
     */
    async regenerateCertificateImage(certificateId: number): Promise<any> {
        // 1. Get certificate with full data
        const certificate = await this.prisma.certificates.findUnique({
            where: { id: certificateId },
            include: {
                accounts: {
                    select: {
                        full_name: true
                    }
                },
                courses: {
                    select: {
                        title: true,
                        accounts: {
                            select: {
                                full_name: true
                            }
                        }
                    }
                }
            }
        });

        if (!certificate) {
            throw new Error('Certificate not found');
        }

        // 2. Generate new certificate image
        const certificateData = {
            student_name: certificate.accounts.full_name,
            course_title: certificate.courses.title,
            instructor_name: certificate.courses.accounts.full_name,
            issued_at: certificate.issued_at,
            certificate_code: certificate.certificate_code
        };

        // Dynamic import certificate template using file URL
        const templateFileUrl = pathToFileURL(certificateTemplatePath).href;
        const { generateCertificateImage } = await import(templateFileUrl);
        const imageBuffer = await generateCertificateImage(certificateData);

        // 3. Upload new image to storage server
        const storageUrl = process.env.STORAGE_SERVER_URL || 'http://localhost:3001';
        const formData = new FormData();
        formData.append('file', imageBuffer, {
            filename: `${certificate.certificate_code}.png`,
            contentType: 'image/png'
        });
        formData.append('context', 'certificates');

        const fetch = (await import('node-fetch')).default;
        const uploadResponse = await fetch(`${storageUrl}/upload`, {
            method: 'POST',
            body: formData
        });

        if (!uploadResponse.ok) {
            throw new Error(`Failed to upload certificate image: ${uploadResponse.statusText}`);
        }

        const uploadResult = await uploadResponse.json();
        const newCertificateUrl = uploadResult.file?.url || uploadResult.url;

        // 4. Optional: Delete old image from storage
        // (Storage server sẽ tự overwrite file cùng tên)
        
        // 5. Update certificate URL in database
        const updatedCertificate = await this.prisma.certificates.update({
            where: { id: certificateId },
            data: {
                certificate_url: newCertificateUrl
            },
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
                        accounts: {
                            select: {
                                id: true,
                                full_name: true,
                            }
                        }
                    }
                }
            }
        });

        return updatedCertificate;
    }
}

