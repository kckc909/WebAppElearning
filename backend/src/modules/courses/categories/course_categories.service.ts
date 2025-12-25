import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { CourseCategoryCreateForm, CourseCategoryUpdateForm } from "./course_categories.dto.js";
import { IdParam } from "../../../../types/types.pipe.js";

@Injectable()
export class CourseCategories_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll(filters?: { is_active?: boolean; parent_id?: number }): Promise<any> {
        const where: any = {};
        if (filters?.is_active !== undefined) where.is_active = filters.is_active;
        if (filters?.parent_id !== undefined) where.parent_id = filters.parent_id;

        const categoriesFound = await this.prisma.course_categories.findMany({
            where,
            include: {
                course_categories: true,
                other_course_categories: true,
                courses: {
                    select: {
                        id: true,
                        title: true,
                        thumbnail_url: true,
                    }
                },
                _count: {
                    select: {
                        courses: true,
                    }
                }
            },
            orderBy: { order_index: 'asc' },
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
                        thumbnail_url: true,
                        price: true,
                        discount_price: true,
                    }
                },
                _count: {
                    select: {
                        courses: true,
                    }
                }
            }
        });

        return categoryFound;
    }

    async getByParentId(parentId: number): Promise<any> {
        const categoriesFound = await this.prisma.course_categories.findMany({
            where: { parent_id: parentId, is_active: true },
            include: {
                other_course_categories: true,
                courses: {
                    select: {
                        id: true,
                        title: true,
                    }
                },
                _count: {
                    select: {
                        courses: true,
                    }
                }
            },
            orderBy: { order_index: 'asc' },
        });

        return categoriesFound;
    }

    async create(newCategory: CourseCategoryCreateForm): Promise<any> {
        const { id, ...data } = newCategory as any;
        const created = await this.prisma.course_categories.create({ 
            data 
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

