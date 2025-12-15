import { Module } from "@nestjs/common";
import { ContentIdesStarter_Controller } from "./content_ides_starter.controller.js";
import { ContentIdesStarter_Service } from "./content_ides_starter.service.js";

@Module({
    controllers: [ContentIdesStarter_Controller],
    providers: [ContentIdesStarter_Service]
})
export class ContentIdesStarter_Module { }
