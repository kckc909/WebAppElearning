import { Module } from '@nestjs/common';
import { Stats_Controller } from './stats.controller.js';
import { Stats_Service } from './stats.service.js';
import { PrismaService } from '../../../prisma.service.js';

@Module({
  controllers: [Stats_Controller],
  providers: [Stats_Service, PrismaService],
  exports: [Stats_Service],
})
export class Stats_Module {}
