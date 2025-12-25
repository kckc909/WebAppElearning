import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ClassMaterials_Service } from "./class_materials.service.js";
import type { ClassMaterialsCreateForm, ClassMaterialsUpdateForm } from "./class_materials.dto.js";

@Controller('class-materials')
export class ClassMaterials_Controller {

    constructor(private readonly service: ClassMaterials_Service) { }

    @Get()
    async getAll() {
        return await this.service.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.service.getById(parseInt(id));
    }

    @Get('class/:classId')
    async getByClassId(@Param('classId') classId: string) {
        return await this.service.getByClassId(parseInt(classId));
    }

    @Post()
    async create(@Body() newMaterial: ClassMaterialsCreateForm) {
        return await this.service.create(newMaterial);
    }

    @Put()
    async update(@Body() updatedMaterial: ClassMaterialsUpdateForm) {
        return await this.service.update(updatedMaterial);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(parseInt(id));
    }
}
