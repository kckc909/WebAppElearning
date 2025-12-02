import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserProfiles_Service } from "./user_profiles.service.js";
import { UserProfilesCreateForm, UserProfilesUpdateForm } from "./user_profiles.dto.js";
import { IdParam } from "../../../types/types.pipe.js";

@Controller('user_profiles')

export class UserProfiles_Controller {
    constructor(
        private readonly _service: UserProfiles_Service,
    ) { }

    @Get()
    async getAll() {

        const user_profiles = await this._service.getAll();

        return { user_profiles };

    }

    @Get(':id')
    async getById(@Param('id') id: IdParam) {

        const user_profile = await this._service.getById(Number(id))

        return { user_profile };

    }

    @Post()
    async create(@Body() body: UserProfilesCreateForm) {
        try {
            const created = await this._service.create(body)

            return { created }

        }
        catch (e) {

            throw new BadRequestException("----- Error: ", e.message);

        }
    }

    @Put()
    async update(@Body() body: UserProfilesUpdateForm) {
        try {

            const updated = await this._service.update(body)

            return { updated }

        }
        catch (e) {

            throw new BadRequestException("----- Error: ", e.message);

        }
    }

    @Delete(':id')
    async delete(@Param() param: IdParam) {
        try {
            const deleted = await this._service.delete(param.id)

            return { deleted };

        }
        catch (e) {

            throw new BadRequestException("----- Error: ", e.message);

        }
    }
}
