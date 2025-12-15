import { Module } from "@nestjs/common";
import { ClassStudents_Controller } from "./class_students.controller.js";
import { ClassStudents_Service } from "./class_students.service.js";

@Module({
    controllers: [ClassStudents_Controller],
    providers: [ClassStudents_Service]
})
export class ClassStudents_Module { }
