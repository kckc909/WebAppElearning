import { Module } from '@nestjs/common';
import { ContentIdesTestCasesController } from './content_ides_test_cases.controller.js';
import { ContentIdesTestCasesService } from './content_ides_test_cases.service.js';

@Module({
    controllers: [ContentIdesTestCasesController],
    providers: [ContentIdesTestCasesService],
    exports: [ContentIdesTestCasesService],
})
export class ContentIdesTestCasesModule {}
