import { Module } from "@nestjs/common";
import { InstructorVerifications_Controller } from "./instructor_verifications.controller.js";
import { InstructorVerifications_Service } from "./instructor_verifications.service.js";

@Module({
    controllers: [InstructorVerifications_Controller],
    providers: [InstructorVerifications_Service],
    exports: [InstructorVerifications_Service]
})
export class InstructorVerifications_Module { }

