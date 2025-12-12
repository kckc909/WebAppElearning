import { Module } from "@nestjs/common";
import { Messages_Controller } from "./messages.controller.js";
import { Messages_Service } from "./messages.service.js";

@Module({
    controllers: [Messages_Controller],
    providers: [Messages_Service],
    exports: [Messages_Service]
})
export class Messages_Module { }

