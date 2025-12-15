import { Module } from "@nestjs/common";
import { ClassSubmissions_Controller } from "./class_submissions.controller.js";
import { ClassSubmissions_Service } from "./class_submissions.service.js";

@Module({
    controllers: [ClassSubmissions_Controller],
    providers: [ClassSubmissions_Service]
})
export class ClassSubmissions_Module { }
