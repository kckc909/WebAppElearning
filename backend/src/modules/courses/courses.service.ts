import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import { CoursesCreateForm } from "./courses.dto.js";
import { CoursesUpdateForm } from "./courses.dto.js";

@Injectable()
export class Courses_Service {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async getAll() {
        const coursesFound = await this.prisma.courses.findMany()

        return coursesFound;
    }

    getById(id: number) {
        const courseFound = this.prisma.courses.findFirst({
            where: {
                id: id
            }
        })

        return courseFound;
    }

    create(body: CoursesCreateForm) {


    }

    update(body: CoursesUpdateForm) {
        throw new Error("Method not implemented.");
    }

    delete(id: number) {
        throw new Error("Method not implemented.");
    }


}