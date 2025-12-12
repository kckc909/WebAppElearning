import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { CourseCategoryCreateForm, CourseCategoryUpdateForm } from "./course_categories.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Injectable()
export class CourseCategories_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(): Promise<any> {
        const categoriesFound = await this.prisma.course_categories.findMany({
            include: {
                course_categories: true, // parent category
                other_course_categories: true, // child categories
                courses: {
                    select: {
                        id: true,
                        title: true,
                    }
                }
            }
        });

        return categoriesFound;
    }

    async getById(idParam: IdParam): Promise<any> {
        const categoryFound = await this.prisma.course_categories.findFirst({
            where: { id: idParam.id },
            include: {
                course_categories: true,
                other_course_categories: true,
                courses: {
                    select: {
                        id: true,
                        title: true,
                    }
                }
            }
        });

        return categoryFound;
    }

    async getByParentId(parentId: number): Promise<any> {
        const categoriesFound = await this.prisma.course_categories.findMany({
            where: { parent_id: parentId },
            include: {
                other_course_categories: true,
                courses: {
                    select: {
                        id: true,
                        title: true,
                    }
                }
            }
        });

        return categoriesFound;
    }

    async create(newCategory: CourseCategoryCreateForm): Promise<any> {
        const created = await this.prisma.course_categories.create({ 
            data: newCategory 
        });

        return created;
    }

    async update(newCategory: CourseCategoryUpdateForm): Promise<any> {
        const { id, ...payload } = newCategory;

        const updated = await this.prisma.course_categories.update({
            where: { id },
            data: payload
        });

        return updated;
    }

    async delete(deletedId: number): Promise<any> {
        const deleted = await this.prisma.course_categories.delete({ 
            where: { id: deletedId } 
        });

        return deleted;
    }
}

