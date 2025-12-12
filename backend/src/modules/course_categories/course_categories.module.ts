import { Module } from "@nestjs/common";
import { CourseCategories_Controller } from "./course_categories.controller.js";
import { CourseCategories_Service } from "./course_categories.service.js";

@Module({
    controllers: [CourseCategories_Controller],
    providers: [CourseCategories_Service],
    exports: [CourseCategories_Service]
})
export class CourseCategories_Module { }

