import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException, UsePipes, ValidationPipe } from "@nestjs/common";
import { Accounts_Service } from "./accounts.service.js";
import { AccountCreateForm, AccountUpdateForm, CheckExistsForm, LoginForm } from "./accounts.dto.js";
import { IdParam } from "../../../types/types.pipe.js";
import { HelperService } from "../helper/helper.service.js";
import { EmailService } from "../emailService/email.service.js";
import { retryWhen } from "rxjs";
import { IsNotEmpty } from "class-validator";

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
            // const new_password = this._helper.generateRandomPassword()
            // body.password_hash = new_password
            // this._email.sendPasswordEmail(body.email, body.password_hash);


            // tạo trong db
            const created = await this._service.create(body)

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
    async login(@Body() body: LoginForm) {

        const accFound = await this._service.getByLoginForm(body.username, body.password)

        if (accFound) {
            return accFound;
        } else {
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
}   