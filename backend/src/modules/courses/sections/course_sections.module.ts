import { Module } from "@nestjs/common";
import { CourseSections_Controller } from "./course_sections.controller.js";
import { CourseSections_Service } from "./course_sections.service.js";

@Module({
    controllers: [CourseSections_Controller],
    providers: [CourseSections_Service],
    exports: [CourseSections_Service]
})
export class CourseSections_Module { }

