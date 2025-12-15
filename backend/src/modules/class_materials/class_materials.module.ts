import { Module } from "@nestjs/common";
import { ClassMaterials_Controller } from "./class_materials.controller.js";
import { ClassMaterials_Service } from "./class_materials.service.js";

@Module({
    controllers: [ClassMaterials_Controller],
    providers: [ClassMaterials_Service]
})
export class ClassMaterials_Module { }
