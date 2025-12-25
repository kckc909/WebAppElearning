import { Module } from "@nestjs/common";
import { ClassExams_Controller } from "./class_exams.controller.js";
import { ClassExams_Service } from "./class_exams.service.js";

@Module({
    controllers: [ClassExams_Controller],
    providers: [ClassExams_Service]
})
export class ClassExams_Module { }
