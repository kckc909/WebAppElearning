import { Module } from "@nestjs/common";
import { ClassExamResults_Controller } from "./class_exam_results.controller.js";
import { ClassExamResults_Service } from "./class_exam_results.service.js";

@Module({
    controllers: [ClassExamResults_Controller],
    providers: [ClassExamResults_Service]
})
export class ClassExamResults_Module { }
