// src/email/email.module.ts
import { Module } from '@nestjs/common';
import { HelperService as HelperService } from './helper.service.js';

@Module({
    providers: [HelperService],
    exports: [HelperService],
})
export class HelperModule { }
