import { Module } from "@nestjs/common";
import { CourseProgress_Controller } from "./course_progress.controller.js";
import { CourseProgress_Service } from "./course_progress.service.js";

@Module({
    controllers: [CourseProgress_Controller],
    providers: [CourseProgress_Service],
    exports: [CourseProgress_Service]
})
export class CourseProgress_Module { }

