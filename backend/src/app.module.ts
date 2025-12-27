import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma.module.js';
import { PrismaService } from './prisma.service.js';

import { CommonModule } from './common/common.module.js';
import { UploadModule } from './modules/upload/upload.module.js';

// === Auth ===
import { Users_Module } from './modules/auth/accounts/accounts.module.js';
import { Accounts_Controller } from './modules/auth/accounts/accounts.controller.js';
import { Accounts_Service } from './modules/auth/accounts/accounts.service.js';
import { UserProfiles_Module } from './modules/auth/user_profiles/user_profiles.module.js';

// === Courses ===
import { Courses_Module } from './modules/courses/courses/courses.module.js';
import { CourseCategories_Module } from './modules/courses/categories/course_categories.module.js';
import { CourseSections_Module } from './modules/courses/sections/course_sections.module.js';
import { Lessons_Module } from './modules/courses/lessons/lessons.module.js';
import { LessonContents_Module } from './modules/courses/lesson-contents/lesson_contents.module.js';
import { CourseReviews_Module } from './modules/courses/reviews/course_reviews.module.js';
import { CourseEnrollments_Module } from './modules/courses/enrollments/course_enrollments.module.js';
import { CourseProgress_Module } from './modules/courses/progress/course_progress.module.js';

// === Classes ===
import { Classes_Module } from './modules/classes/classes/classes.module.js';
import { ClassStudents_Module } from './modules/classes/students/class_students.module.js';
import { ClassCalendar_Module } from './modules/classes/calendar/class_calendar.module.js';
import { ClassMaterials_Module } from './modules/classes/materials/class_materials.module.js';
import { ClassAssignments_Module } from './modules/classes/assignments/class_assignments.module.js';
import { ClassSubmissions_Module } from './modules/classes/submissions/class_submissions.module.js';
import { ClassExams_Module } from './modules/classes/exams/class_exams.module.js';
import { ClassExamResults_Module } from './modules/classes/exam-results/class_exam_results.module.js';

// === Payments ===
import { CheckoutModule } from './modules/payments/checkout/checkout.module.js';
import { CartModule } from './modules/payments/cart/cart.module.js';
import { Transactions_Module } from './modules/payments/transactions/transactions.module.js';
import { PaymentMethods_Module } from './modules/payments/payment_methods/payment_methods.module.js';
import { Payouts_Module } from './modules/payments/payouts/payouts.module.js';

// === Certificates ===
import { Certificates_Module } from './modules/certificates/certificates/certificates.module.js';

// === Content ===
import { MediaModule } from './modules/content/media/media.module.js';
import { ContentIdes_Module } from './modules/content/content_ides/content_ides.module.js';
import { ContentIdesStarter_Module } from './modules/content/content_ides_starter/content_ides_starter.module.js';
import { ContentIdesTestCasesModule } from './modules/content/content_ides_test_cases/content_ides_test_cases.module.js';

// === Communication ===
import { Messages_Module } from './modules/communication/messages/messages.module.js';
import { Notifications_Module } from './modules/communication/notifications/notifications.module.js';
import { EmailModule } from './modules/communication/emailService/email.module.js';
import { EmailService } from './modules/communication/emailService/email.service.js';

// === Admin ===
import { AdminLogs_Module } from './modules/admin/admin_logs/admin_logs.module.js';
import { Stats_Module } from './modules/admin/stats/stats.module.js';
import { InstructorVerifications_Module } from './modules/admin/instructor_verifications/instructor_verifications.module.js';
import { HelperModule } from './modules/admin/helper/helper.module.js';
import { SystemLogsModule } from './modules/admin/system_logs/system_logs.module.js';
import { SystemSettingsModule } from './modules/admin/system_settings/system_settings.module.js';

// === Classes - Additional ===
import { AttendanceModule } from './modules/classes/attendance/attendance.module.js';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        PrismaModule,
        CommonModule,
        UploadModule,

        // === Auth ===
        Users_Module,
        UserProfiles_Module,

        // === Courses ===
        Courses_Module,
        CourseCategories_Module,
        CourseSections_Module,
        Lessons_Module,
        LessonContents_Module,
        CourseReviews_Module,
        CourseEnrollments_Module,
        CourseProgress_Module,

        // === Classes ===
        Classes_Module,
        ClassStudents_Module,
        ClassCalendar_Module,
        ClassMaterials_Module,
        ClassAssignments_Module,
        ClassSubmissions_Module,
        ClassExams_Module,
        ClassExamResults_Module,
        AttendanceModule,

        // === Payments ===
        CheckoutModule,
        CartModule,
        Transactions_Module,
        PaymentMethods_Module,
        Payouts_Module,

        // === Certificates ===
        Certificates_Module,

        // === Content ===
        MediaModule,
        ContentIdes_Module,
        ContentIdesStarter_Module,
        ContentIdesTestCasesModule,

        // === Communication ===
        Messages_Module,
        Notifications_Module,
        EmailModule,

        // === Admin ===
        AdminLogs_Module,
        Stats_Module,
        InstructorVerifications_Module,
        HelperModule,
        SystemLogsModule,
        SystemSettingsModule,
    ],
    controllers: [Accounts_Controller],
    providers: [PrismaService, Accounts_Service, EmailService],
})
export class AppModule { }
