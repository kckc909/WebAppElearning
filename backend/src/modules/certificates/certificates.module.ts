import { Module } from "@nestjs/common";
import { Certificates_Controller } from "./certificates.controller.js";
import { Certificates_Service } from "./certificates.service.js";

@Module({
    controllers: [Certificates_Controller],
    providers: [Certificates_Service],
    exports: [Certificates_Service]
})
export class Certificates_Module { }

