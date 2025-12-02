import { Module } from "@nestjs/common";
import { Notifications_Controller } from "./notifications.controller.js";
import { Notifications_Service } from "./notifications.service.js";

@Module({
    controllers: [Notifications_Controller],
    providers: [Notifications_Service]
})
export class Notifications_Module { }
