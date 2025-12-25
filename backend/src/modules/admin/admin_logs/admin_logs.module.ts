import { Module } from "@nestjs/common";
import { AdminLogs_Controller } from "./admin_logs.controller.js";
import { AdminLogs_Service } from "./admin_logs.service.js";

@Module({
    controllers: [AdminLogs_Controller],
    providers: [AdminLogs_Service],
    exports: [AdminLogs_Service]
})
export class AdminLogs_Module { }

