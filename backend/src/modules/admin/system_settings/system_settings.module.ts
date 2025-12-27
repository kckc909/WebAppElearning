import { Module } from '@nestjs/common';
import { SystemSettingsController } from './system_settings.controller.js';
import { SystemSettingsService } from './system_settings.service.js';

@Module({
    controllers: [SystemSettingsController],
    providers: [SystemSettingsService],
    exports: [SystemSettingsService],
})
export class SystemSettingsModule {}
