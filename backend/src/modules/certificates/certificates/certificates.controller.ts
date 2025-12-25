import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Certificates_Service } from "./certificates.service.js";
import { CertificateCreateForm, CertificateUpdateForm } from "./certificates.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Controller('certificates')
export class Certificates_Controller {
    constructor(
        private readonly _service: Certificates_Service
    ) { }

    @Get()
    async getAll() {
        const certificates = await this._service.getAll();
        return certificates;
    }

    @Get(':id')
    async getById(@Param() id: IdParam) {
        if (!Number(id.id)) {
            throw new BadRequestException("id must be integer");
        }

        const certificate = await this._service.getById(id);
        return certificate;
    }

    @Get('student/:studentId')
    async getByStudentId(@Param('studentId') studentId: string) {
        if (!Number(studentId)) {
            throw new BadRequestException("studentId must be integer");
        }

        const certificates = await this._service.getByStudentId(Number(studentId));
        return certificates;
    }

    @Get('course/:courseId')
    async getByCourseId(@Param('courseId') courseId: string) {
        if (!Number(courseId)) {
            throw new BadRequestException("courseId must be integer");
        }

        const certificates = await this._service.getByCourseId(Number(courseId));
        return certificates;
    }

    @Post()
    async create(@Body() body: CertificateCreateForm) {
        try {
            const created = await this._service.create(body);
            return created;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    @Put(':id')
    async update(@Param() param: IdParam, @Body() body: CertificateUpdateForm) {
        try {
            if (!Number(param.id)) {
                throw new BadRequestException("id must be integer");
            }

            body.id = param.id;
            const updated = await this._service.update(body);
            return updated;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    @Delete(':id')
    async delete(@Param() param: IdParam) {
        try {
            if (!Number(param.id)) {
                throw new BadRequestException("id must be integer");
            }

            const deleted = await this._service.delete(param.id);
            return deleted;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    @Post('claim')
    async claimCertificate(@Body() body: { student_id: number; course_id: number }) {
        try {
            if (!body.student_id || !body.course_id) {
                throw new BadRequestException("student_id and course_id are required");
            }

            const certificate = await this._service.claimCertificate(body.student_id, body.course_id);
            return certificate;
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }

    /**
     * Re-generate certificate image
     * POST /certificates/:id/regenerate
     * Tạo lại ảnh certificate với template mới, xóa ảnh cũ, update URL mới
     */
    @Post(':id/regenerate')
    async regenerateCertificate(@Param() param: IdParam) {
        try {
            if (!Number(param.id)) {
                throw new BadRequestException("id must be integer");
            }

            const certificate = await this._service.regenerateCertificateImage(param.id);
            return {
                success: true,
                message: 'Certificate image regenerated successfully',
                certificate
            };
        } catch (e) {
            throw new BadRequestException("Error: " + e.message);
        }
    }
}

