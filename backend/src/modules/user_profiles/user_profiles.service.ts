import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { UserProfilesCreateForm, UserProfilesUpdateForm } from "./user_profiles.dto.js";

@Injectable()
export class UserProfiles_Service {

    constructor(private readonly prisma: PrismaService) { }

    async getAll()
        : Promise<any> {

        const userProfilesFound = await this.prisma.user_profiles.findMany();

        return userProfilesFound;
    }

    async getById(id: number)
        : Promise<any> {

        const userProfileFound = await this.prisma.user_profiles.findFirst({
            where: { id: id },
        })

        return userProfileFound;
    }

    async create(newUserProfile: UserProfilesCreateForm)
        : Promise<any> {

        const created = await this.prisma.user_profiles.create({ data: newUserProfile })

        return created;
    }

    async update(newUserProfile: UserProfilesUpdateForm)
        : Promise<any> {

        const { id, ...payload } = newUserProfile

        const updated = await this.prisma.user_profiles.update({
            where: { id },
            data: payload
        })

        return updated;
    }

    async delete(deletedId: number)
        : Promise<any> {

        const deleted = await this.prisma.user_profiles.delete({ where: { id: deletedId } })

        return deleted
    }
}
