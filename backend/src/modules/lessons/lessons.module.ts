import { Module } from "@nestjs/common";
import { Lessons_Controller } from "./lessons.controller.js";
import { Lessons_Service } from "./lessons.service.js";

@Module({
    controllers: [Lessons_Controller],
    providers: [Lessons_Service]
})
export class Lessons_Module { }
