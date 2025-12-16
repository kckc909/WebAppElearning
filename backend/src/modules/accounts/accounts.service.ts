import { BadRequestException, Delete, Get, Injectable, Post, Put } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { AccountCreateForm, AccountUpdateForm } from "./accounts.dto.js";
import { IdParam } from "types/types.pipe.js";

@Injectable()
export class Accounts_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getByEmail(email: string) {
        const accFound = this.prisma.accounts.findFirst({
            where: {
                email: email
            }
        })
        return accFound;
    }

    async getByUsername(username: string) {
        const accFound = this.prisma.accounts.findFirst({
            where: {
                username: username
            }
        })
        return accFound
    }

    async getByLoginForm(emailOrUsername: string, password: string) {
        const accFound = await this.prisma.accounts.findFirst({
            where: {
                OR: [
                    { email: emailOrUsername },
                    { username: emailOrUsername }
                ],
                password_hash: password
            }
        })

        return accFound;
    }

    async getAll()
        : Promise<any> {

        const accountsFound = await this.prisma.accounts.findMany();

        return accountsFound;
    }

    async getById(idParam: IdParam)
        : Promise<any> {

        const accountFound = await this.prisma.accounts.findFirst({
            where: { id: idParam.id },
            select: {
                id: true,
                full_name: true,
            }
        })

        return accountFound;
    }

    async create(newUser: AccountCreateForm)
        : Promise<any> {

        const created = await this.prisma.accounts.create({ data: newUser })

        return created;
    }

    async update(newUser: AccountUpdateForm)
        : Promise<any> {

        const { id, ...payload } = newUser

        const updated = await this.prisma.accounts.update({
            where: { id },
            data: payload
        })

        return updated;
    }

    async delete(deletedId: number)
        : Promise<any> {

        const deleted = await this.prisma.accounts.delete({ where: { id: deletedId } })

        return deleted
    }
}
