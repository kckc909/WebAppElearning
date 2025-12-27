import { Module } from '@nestjs/common';
import { SystemLogsController } from './system_logs.controller.js';
import { SystemLogsService } from './system_logs.service.js';

@Module({
    controllers: [SystemLogsController],
    providers: [SystemLogsService],
    exports: [SystemLogsService],
})
export class SystemLogsModule {}
