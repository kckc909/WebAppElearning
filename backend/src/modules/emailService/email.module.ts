// src/email/email.module.ts
import { Module } from '@nestjs/common';
import { EmailService } from './email.service.js';
import { HelperModule } from '../helper/helper.module.js';
import { EmailController } from './email.controller.js';

@Module({
    imports: [HelperModule],
    controllers: [EmailController],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule { }
