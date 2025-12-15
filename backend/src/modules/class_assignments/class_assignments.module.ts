import { Module } from "@nestjs/common";
import { ClassAssignments_Controller } from "./class_assignments.controller.js";
import { ClassAssignments_Service } from "./class_assignments.service.js";

@Module({
    controllers: [ClassAssignments_Controller],
    providers: [ClassAssignments_Service]
})
export class ClassAssignments_Module { }
