import { Module } from "@nestjs/common";
import { Accounts_Controller } from "./accounts.controller.js";
import { Accounts_Service } from "./accounts.service.js";
import { HelperModule } from "../helper/helper.module.js";
import { EmailModule } from "../emailService/email.module.js";

@Module({
    imports: [
        HelperModule,
        EmailModule
    ],
    controllers: [Accounts_Controller],
    providers: [Accounts_Service]
})
export class Users_Module { }