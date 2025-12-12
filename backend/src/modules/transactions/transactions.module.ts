import { Module } from "@nestjs/common";
import { Transactions_Controller } from "./transactions.controller.js";
import { Transactions_Service } from "./transactions.service.js";

@Module({
    controllers: [Transactions_Controller],
    providers: [Transactions_Service],
    exports: [Transactions_Service]
})
export class Transactions_Module { }

