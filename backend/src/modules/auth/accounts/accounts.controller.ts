import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException, UsePipes, ValidationPipe, Req } from "@nestjs/common";
import { Accounts_Service } from "./accounts.service.js";
import { AccountCreateForm, AccountUpdateForm, CheckExistsForm, LoginForm, RegisterForm } from "./accounts.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";
import { HelperService } from "../../admin/helper/helper.service.js";
import { EmailService } from "../../communication/emailService/email.service.js";
import type { Request } from 'express';

@Controller('accounts')

export class Accounts_Controller {
    constructor(
        private readonly _service: Accounts_Service,
        private readonly _helper: HelperService,
        private readonly _email: EmailService
    ) { }

    @Get()
    async getAll() {

        const accounts = await this._service.getAll();

        return accounts;

    }

    @Get(':id')
    async getById(@Param() id: IdParam) {

        if (!Number(id.id)) {
            throw new BadRequestException("id must is interger")
        }

        const account = await this._service.getById(id)

        return account;

    }

    @Post()
    async create(@Body() body: AccountCreateForm) {
        try {
            // tạo mk random
            const new_password = this._helper.generateRandomPassword()
            body.password_hash = new_password
            
            // tạo trong db
            const created = await this._service.create(body)

            // Gửi email với thông tin tài khoản
            await this._email.sendPasswordEmail(
                body.email, 
                new_password,
                body.username,
                body.full_name
            );

            return created

        }
        catch (e) {

            throw new BadRequestException("----- Error: ", e.message);

        }
    }

    @Put(':id')
    async update(@Body() body: AccountUpdateForm) {
        try {

            // Hash password

            const updated = await this._service.update(body)

            return updated

        }
        catch (e) {

            throw new BadRequestException("----- Error: ", e.message);

        }
    }

    @Delete(':id')
    async delete(@Param() param: IdParam) {
        try {
            const deleted = await this._service.delete(param.id)

            return deleted;

        }
        catch (e) {

            throw new BadRequestException("----- Error: ", e.message);

        }
    }

    @Post('login')
    async login(@Body() body: LoginForm, @Req() req: Request) {
        // Trim username và password
        const username = body.username?.trim();
        const password = body.password?.trim();

        // Validate không có space trong password
        if (password && password.includes(' ')) {
            throw new BadRequestException('Mật khẩu không được chứa khoảng trắng');
        }

        const accFound = await this._service.getByLoginForm(username, password)

        if (accFound) {
            // Log successful login to audit_logs
            await this._service.logAuditAction({
                user_id: accFound.id,
                action: 'LOGIN',
                resource_type: 'accounts',
                resource_id: BigInt(accFound.id),
                new_values: {
                    username: accFound.username,
                    role: accFound.role,
                    login_time: new Date().toISOString()
                },
                ip_address: req.ip || req.socket.remoteAddress,
                user_agent: req.headers['user-agent']
            });

            // Update last_login_at
            await this._service.updateLastLogin(accFound.id);

            return accFound;
        } else {
            // Log failed login attempt
            await this._service.logAuditAction({
                user_id: null,
                action: 'LOGIN_FAILED',
                resource_type: 'accounts',
                resource_id: null,
                new_values: {
                    username: username,
                    reason: 'Invalid credentials'
                },
                ip_address: req.ip || req.socket.remoteAddress,
                user_agent: req.headers['user-agent']
            });

            throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không đúng');
        }
    }

    @Post('exists')
    async exists(@Body() body: CheckExistsForm) {
        const email = body.email
        const username = body.username

        const emailFound = await this._service.getByEmail(email);
        if (emailFound) {
            return { error: "Email đã được sử dụng trong hệ thống! " }
        }

        const usernameFound = await this._service.getByUsername(username)
        if (usernameFound) {
            return { error: "Username đã được sử dụng trong hệ thống! " }
        }
    }

    @Post('register')
    async register(@Body() body: RegisterForm) {
        try {
            // Validate email và username chưa tồn tại
            const emailFound = await this._service.getByEmail(body.email);
            if (emailFound) {
                throw new BadRequestException('Email đã được sử dụng trong hệ thống!');
            }

            const usernameFound = await this._service.getByUsername(body.username);
            if (usernameFound) {
                throw new BadRequestException('Username đã được sử dụng trong hệ thống!');
            }

            // Lưu password gốc để gửi email
            const plainPassword = body.password_hash;

            // Tạo data cho account
            const accountData: AccountCreateForm = {
                ...body,
                role: 'STUDENT',
                status: 1,
            };

            // Tạo tài khoản (service sẽ tự hash password)
            const created = await this._service.create(accountData);

            // Gửi email thông báo đăng ký thành công với thông tin tài khoản
            await this._email.sendPasswordEmail(
                body.email,
                plainPassword, // Gửi password gốc (chưa hash)
                body.username,
                body.full_name
            );

            return {
                success: true,
                message: 'Đăng ký thành công! Thông tin tài khoản đã được gửi đến email của bạn.',
                data: created
            };

        } catch (e) {
            throw new BadRequestException(e.message || 'Đăng ký thất bại');
        }
    }

    @Post('forgot-password')
    async forgotPassword(@Body() body: { email: string, username: string }) {
        try {
            const { email, username } = body;

            if (!email || !username) {
                throw new BadRequestException('Email và username là bắt buộc');
            }

            // Tìm user theo username
            const user = await this._service.getByUsername(username);

            if (!user) {
                throw new BadRequestException('Username không tồn tại trong hệ thống');
            }

            // Kiểm tra email có khớp không
            // if (user.email !== email) {
            //     throw new BadRequestException('Email không khớp với tài khoản');
            // }

            // Tạo mật khẩu mới random
            const newPassword = this._helper.generateRandomPassword();

            // Cập nhật mật khẩu mới (sẽ được hash trong service)
            await this._service.update({
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                username: user.username || username,
                password_hash: newPassword,
            });

            // Gửi email với mật khẩu mới, username và full name
            await this._email.sendPasswordEmail(
                email,
                newPassword,
                user.username || username,
                user.full_name || undefined
            );

            return {
                success: true,
                message: 'Thông tin tài khoản đã được gửi đến email của bạn'
            };

        } catch (e) {
            throw new BadRequestException(e.message || 'Đã xảy ra lỗi');
        }
    }

    @Put(':id/change-password')
    async changePassword(
        @Param('id') id: string,
        @Body() body: { old_password: string; new_password: string }
    ) {
        try {
            // Trim passwords
            const old_password = body.old_password?.trim();
            const new_password = body.new_password?.trim();

            if (!old_password || !new_password) {
                throw new BadRequestException('Vui lòng cung cấp đầy đủ thông tin');
            }

            // Validate không có space trong password
            if (new_password.includes(' ')) {
                throw new BadRequestException('Mật khẩu không được chứa khoảng trắng');
            }

            if (new_password.length < 6) {
                throw new BadRequestException('Mật khẩu mới phải có ít nhất 6 ký tự');
            }

            const userId = Number(id);
            if (isNaN(userId)) {
                throw new BadRequestException('ID không hợp lệ');
            }

            // Get user
            const user = await this._service.getById({ id: userId });
            if (!user) {
                throw new BadRequestException('Không tìm thấy tài khoản');
            }

            // Verify old password - trim old_password khi verify
            const isValidPassword = await this._service.verifyPassword(
                user.username || user.email,
                old_password
            );

            if (!isValidPassword) {
                throw new UnauthorizedException('Mật khẩu hiện tại không đúng');
            }

            // Update with new password
            await this._service.update({
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                username: user.username,
                password_hash: new_password,
            });

            return {
                success: true,
                message: 'Đổi mật khẩu thành công!'
            };

        } catch (e) {
            if (e instanceof UnauthorizedException) {
                throw e;
            }
            throw new BadRequestException(e.message || 'Không thể đổi mật khẩu');
        }
    }
}   