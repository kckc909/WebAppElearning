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
import { Notifications_Module } from './modules/notifications/notifications.module.js';
import { UserProfiles_Module } from './modules/user_profiles/user_profiles.module.js';
import { Classes_Module } from './modules/classes/classes.module.js';
import { Courses_Module } from './modules/courses/courses.module.js';
import { Lessons_Module } from './modules/lessons/lessons.module.js';


@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    EmailModule,
    HelperModule,

    Users_Module,
    Classes_Module,
    Courses_Module,
    Lessons_Module,
    UserProfiles_Module,
    Notifications_Module,

  ],
  controllers: [AppController, Accounts_Controller],
  providers: [AppService, PrismaService, Accounts_Service, EmailService],
})
export class AppModule { }
