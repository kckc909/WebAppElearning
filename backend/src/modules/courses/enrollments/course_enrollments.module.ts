import { Module } from "@nestjs/common";
import { CourseEnrollments_Controller, Enrollments_Controller } from "./course_enrollments.controller.js";
import { CourseEnrollments_Service } from "./course_enrollments.service.js";

@Module({
    controllers: [CourseEnrollments_Controller, Enrollments_Controller],
    providers: [CourseEnrollments_Service],
    exports: [CourseEnrollments_Service]
})
export class CourseEnrollments_Module { }

