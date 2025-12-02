import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import { NotificationsCreateForm } from "./notifications.dto.js";
import { NotificationsUpdateForm } from "./notifications.dto.js";

@Injectable()
export class Notifications_Service {
    getAll() {
        throw new Error("Method not implemented.");
    }
    getById(arg0: number) {
        throw new Error("Method not implemented.");
    }
    create(body: NotificationsCreateForm) {
        throw new Error("Method not implemented.");
    }
    update(body: NotificationsUpdateForm) {
        throw new Error("Method not implemented.");
    }
    delete(id: number) {
        throw new Error("Method not implemented.");
    }
    constructor(
        private readonly prisma: PrismaService
    ) {


        

    }
}