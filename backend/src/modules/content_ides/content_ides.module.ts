import { Module } from "@nestjs/common";
import { ContentIdes_Controller } from "./content_ides.controller.js";
import { ContentIdes_Service } from "./content_ides.service.js";

@Module({
    controllers: [ContentIdes_Controller],
    providers: [ContentIdes_Service]
})
export class ContentIdes_Module { }
