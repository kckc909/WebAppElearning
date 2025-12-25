import { Module } from "@nestjs/common";
import { Courses_Controller } from "./courses.controller.js";
import { Courses_Service } from "./courses.service.js";

@Module({
    controllers: [Courses_Controller],
    providers: [Courses_Service]
})
export class Courses_Module { }
