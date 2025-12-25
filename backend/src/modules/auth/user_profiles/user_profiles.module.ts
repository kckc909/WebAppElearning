import { Module } from "@nestjs/common";
import { UserProfiles_Controller } from "./user_profiles.controller.js";
import { UserProfiles_Service } from "./user_profiles.service.js";

@Module({
    controllers: [UserProfiles_Controller],
    providers: [UserProfiles_Service]
})
export class UserProfiles_Module { }
