import { Body, Controller, Post } from "@nestjs/common";
import { EmailService } from "./email.service.js";
import { HelperService } from "../../admin/helper/helper.service.js";
import { Email } from "./email.dto.js";

@Controller('email')
export class EmailController {
    constructor(
        private readonly _service: EmailService,
        private readonly _helper: HelperService
    ) { }

    @Post('vertify')
    async sendVertifiicationEmail(@Body() body: Email) {
        // tạm thời so sánh trên front cho đơn giản

        const code = this._helper.generateRandomCode();

        this._service.sendVerificationMail(body.email, code)

        return code;
    }
}
