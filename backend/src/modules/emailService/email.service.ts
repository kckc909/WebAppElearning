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

    async sendPasswordEmail(email: string, pass: string) {
        await this.checkEmailExistence(email)

        const subject = 'Mật khẩu Email của bạn';
        const html =
            `<p>Cảm ơn bạn đã đăng ký. 
            Hãy đặt lại mật khẩu sau khi sử dụng mật khẩu này. 
            Mật khẩu của bạn là: <b>${pass}</b></p>`;

        return await this.sendMail(email, subject, html)
    }
}
