import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';

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
import { Certificates_Module } from './modules/certificates/certificates.module.js';
import { CourseCategories_Module } from './modules/course_categories/course_categories.module.js';
import { CourseEnrollments_Module } from './modules/course_enrollments/course_enrollments.module.js';
import { CourseProgress_Module } from './modules/course_progress/course_progress.module.js';
import { CourseReviews_Module } from './modules/course_reviews/course_reviews.module.js';
import { CourseSections_Module } from './modules/course_sections/course_sections.module.js';
import { InstructorVerifications_Module } from './modules/instructor_verifications/instructor_verifications.module.js';
import { Messages_Module } from './modules/messages/messages.module.js';
import { PaymentMethods_Module } from './modules/payment_methods/payment_methods.module.js';
import { Payouts_Module } from './modules/payouts/payouts.module.js';
import { Transactions_Module } from './modules/transactions/transactions.module.js';
import { AdminLogs_Module } from './modules/admin_logs/admin_logs.module.js';
import { ClassAssignments_Module } from './modules/class_assignments/class_assignments.module.js';
import { ClassCalendar_Module } from './modules/class_calendar/class_calendar.module.js';
import { ClassExams_Module } from './modules/class_exams/class_exams.module.js';
import { ClassExamResults_Module } from './modules/class_exam_results/class_exam_results.module.js';
import { ClassMaterials_Module } from './modules/class_materials/class_materials.module.js';
import { ClassStudents_Module } from './modules/class_students/class_students.module.js';
import { ClassSubmissions_Module } from './modules/class_submissions/class_submissions.module.js';
import { LessonContents_Module } from './modules/lesson_contents/lesson_contents.module.js';
import { ContentIdes_Module } from './modules/content_ides/content_ides.module.js';
import { ContentIdesStarter_Module } from './modules/content_ides_starter/content_ides_starter.module.js';


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
        Certificates_Module,
        CourseCategories_Module,
        CourseEnrollments_Module,
        CourseProgress_Module,
        CourseReviews_Module,
        CourseSections_Module,
        InstructorVerifications_Module,
        Messages_Module,
        PaymentMethods_Module,
        Payouts_Module,
        Transactions_Module,
        AdminLogs_Module,
        ClassAssignments_Module,
        ClassCalendar_Module,
        ClassExams_Module,
        ClassExamResults_Module,
        ClassMaterials_Module,
        ClassStudents_Module,
        ClassSubmissions_Module,
        LessonContents_Module,
        ContentIdes_Module,
        ContentIdesStarter_Module,

    ],
    controllers: [AppController, Accounts_Controller],
    providers: [AppService, PrismaService, Accounts_Service, EmailService],
})
export class AppModule { }
