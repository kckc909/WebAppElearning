import { Module } from "@nestjs/common";
import { LessonContents_Controller } from "./lesson_contents.controller.js";
import { LessonContents_Service } from "./lesson_contents.service.js";

@Module({
    controllers: [LessonContents_Controller],
    providers: [LessonContents_Service]
})
export class LessonContents_Module { }
