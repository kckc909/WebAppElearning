import { Module } from "@nestjs/common";
import { PaymentMethods_Controller } from "./payment_methods.controller.js";
import { PaymentMethods_Service } from "./payment_methods.service.js";

@Module({
    controllers: [PaymentMethods_Controller],
    providers: [PaymentMethods_Service],
    exports: [PaymentMethods_Service]
})
export class PaymentMethods_Module { }

