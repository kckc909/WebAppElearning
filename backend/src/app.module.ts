import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule

import { PrismaModule } from './prisma.module.js';
import { PrismaService } from './prisma.service.js';

import { Users_Module } from './modules/accounts/accounts.module.js';
import { Accounts_Controller } from './modules/accounts/accounts.controller.js';
import { Accounts_Service } from './modules/accounts/accounts.service.js';
import { HelperModule } from './modules/helper/helper.module.js';
import { EmailModule } from './modules/emailService/email.module.js';
import { EmailService } from './modules/emailService/email.service.js';


@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    EmailModule,
    HelperModule,

    Users_Module,

  ],
  controllers: [AppController, Accounts_Controller],
  providers: [AppService, PrismaService, Accounts_Service, EmailService],
})
export class AppModule { }
