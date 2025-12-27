import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, accounts_role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private static superAdminChecked = false;

    constructor(private configService: ConfigService) {
        super();
    }

    async onModuleInit() {
        await this.$connect();
        console.log('Prisma connected');
        
        // Chỉ chạy 1 lần duy nhất
        if (!PrismaService.superAdminChecked) {
            PrismaService.superAdminChecked = true;
            await this.ensureSuperAdmin();
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
        console.log('Prisma disconnected');
    }

    private async ensureSuperAdmin() {
        try {
            // Check if any superadmin exists (by username OR email OR role)
            const admin = await this.accounts.findFirst({
                where: {
                    OR: [
                        { username: 'superadmin' },
                        { email: 'superadmin@milearn.com' },
                        { role: accounts_role.SUPER_ADMIN }
                    ]
                }
            });

            if (!admin) {
                await this.accounts.create({
                    data: {
                        username: 'superadmin',
                        full_name: 'Super Administrator',
                        email: 'superadmin@milearn.com',
                        password_hash: await bcrypt.hash('123456', 10),
                        role: accounts_role.SUPER_ADMIN,
                        status: 1,
                        email_verified: true,
                    },
                });
                console.log('✅ SuperAdmin account created successfully');
                console.log('   📧 Email: superadmin@milearn.com');
                console.log('   🔑 Password: 123456');
            } else {
                console.log('✅ SuperAdmin account already exists');
            }
        } catch (error) {
            console.error('❌ Error ensuring SuperAdmin:', error.message);
        }
    }
}
