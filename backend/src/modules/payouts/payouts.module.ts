import { Module } from "@nestjs/common";
import { Payouts_Controller } from "./payouts.controller.js";
import { Payouts_Service } from "./payouts.service.js";

@Module({
    controllers: [Payouts_Controller],
    providers: [Payouts_Service],
    exports: [Payouts_Service]
})
export class Payouts_Module { }

