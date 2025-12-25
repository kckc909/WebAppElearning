import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { ClassCalendarCreateForm, ClassCalendarUpdateForm } from "./class_calendar.dto.js";

@Injectable()
export class ClassCalendar_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll()
        : Promise<any> {

        const eventsFound = await this.prisma.class_calendar.findMany({
            include: {
                classes: true
            }
        });

        return eventsFound;
    }

    async getById(id: number)
        : Promise<any> {

        const eventFound = await this.prisma.class_calendar.findFirst({
            where: { id: id },
            include: {
                classes: true
            }
        })

        return eventFound;
    }

    async getByClassId(classId: number)
        : Promise<any> {

        const eventsFound = await this.prisma.class_calendar.findMany({
            where: { class_id: classId },
            orderBy: {
                session_date: 'asc'
            }
        })

        return eventsFound;
    }

    async create(newEvent: ClassCalendarCreateForm)
        : Promise<any> {

        const { id, ...data } = newEvent as any;
        const created = await this.prisma.class_calendar.create({ data })

        return created;
    }

    async update(newEvent: ClassCalendarUpdateForm)
        : Promise<any> {

        const { id, ...payload } = newEvent

        const updated = await this.prisma.class_calendar.update({
            where: { id },
            data: payload
        })

        return updated;
    }

    async delete(deletedId: number)
        : Promise<any> {

        const deleted = await this.prisma.class_calendar.delete({ where: { id: deletedId } })

        return deleted
    }
}
