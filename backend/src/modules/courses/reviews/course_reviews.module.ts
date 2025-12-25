import { Module } from "@nestjs/common";
import { CourseReviews_Controller } from "./course_reviews.controller.js";
import { CourseReviews_Service } from "./course_reviews.service.js";

@Module({
    controllers: [CourseReviews_Controller],
    providers: [CourseReviews_Service],
    exports: [CourseReviews_Service]
})
export class CourseReviews_Module { }

