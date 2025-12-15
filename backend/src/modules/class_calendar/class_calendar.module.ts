import { Module } from "@nestjs/common";
import { ClassCalendar_Controller } from "./class_calendar.controller.js";
import { ClassCalendar_Service } from "./class_calendar.service.js";

@Module({
    controllers: [ClassCalendar_Controller],
    providers: [ClassCalendar_Service]
})
export class ClassCalendar_Module { }
