import { Module } from "@nestjs/common";
import { Classes_Controller } from "./classes.controller.js";
import { Classes_Service } from "./classes.service.js";

@Module({
    controllers: [Classes_Controller],
    providers: [Classes_Service]
})
export class Classes_Module { }
