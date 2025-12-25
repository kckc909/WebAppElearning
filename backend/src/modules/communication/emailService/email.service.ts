// email.service.ts
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import * as validateEmail from 'deep-email-validator';
import nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    async checkEmailExistence(email: string): Promise<boolean> {

        const result = await validateEmail.validate({
            email,
            validateRegex: true,
            validateMx: true,
            validateDisposable: true,
            validateSMTP: false,
        });

        if (!result.valid) {
            throw new BadRequestException(
                `Email không hợp lệ hoặc không tồn tại. Chi tiết: ${result.reason}`,
            );
        }
        return true;
    }

    async sendMail(to: string, subject: string, html: string) {
        try {
            const info = await this.transporter.sendMail({
                from: `"MiLearn LMS" <${process.env.MAIL_USER}>`,
                to,
                subject,
                html,
            });
            console.log('Mail sent successfully:', info.response);
            return info;
        } catch (error) {
            console.error('Lỗi gửi mail:', error.message);

            throw new InternalServerErrorException(
                'Không gửi được mail. Vui lòng kiểm tra lại cấu hình server email.',
            );
        }
    }

    async sendVerificationMail(email: string, code: string) {
        await this.checkEmailExistence(email);

        const subject = 'Mã xác nhận của bạn';
        const html =
            `<p>Cảm ơn bạn đã đăng ký. Mã xác nhận của bạn là: <b>${code}</b></p>`;

        return await this.sendMail(email, subject, html);
    }

    async sendPasswordEmail(email: string, pass: string, username?: string, fullName?: string) {
        await this.checkEmailExistence(email)

        const subject = 'Thông tin tài khoản của bạn';
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #333;">Xin chào ${fullName || 'bạn'},</h2>
                <p>Đây là thông tin tài khoản của bạn:</p>
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                    ${username ? `<p style="margin: 10px 0;"><strong>Tên đăng nhập:</strong> ${username}</p>` : ''}
                    <p style="margin: 10px 0;"><strong>Mật khẩu:</strong> <span style="color: #e74c3c; font-weight: bold;">${pass}</span></p>
                </div>
                <p style="color: #e74c3c;"><strong>⚠️ Lưu ý:</strong> Vui lòng đổi mật khẩu sau khi đăng nhập để bảo mật tài khoản.</p>
                <p>Trân trọng,<br/>Đội ngũ MiLearn LMS</p>
            </div>
        `;

        return await this.sendMail(email, subject, html)
    }
}
