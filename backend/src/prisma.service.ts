import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, accounts_role } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(private configService: ConfigService) {
        super();
        this.ensureSuperAdmin()
    }

    async onModuleInit() {
        await this.$connect();
        console.log('Prisma connected');
    }

    async onModuleDestroy() {
        await this.$disconnect();
        console.log('Prisma disconnected');
    }

    private async ensureSuperAdmin() {
        try {
            // Check by username first
            let admin = await this.accounts.findUnique({
                where: { username: 'superadmin' }
            });

            // If not found by username, check by email
            if (!admin) {
                admin = await this.accounts.findUnique({
                    where: { email: 'kckc253261@gmail.com' }
                });
            }

            // Only create if truly doesn't exist
            if (!admin) {
                await this.accounts.create({
                    data: {
                        username: 'superadmin',
                        full_name: 'Super Administrator',
                        email: 'kckc253261@gmail.com',
                        password_hash: '000000', // password đã mã hoá
                        role: accounts_role.SUPER_ADMIN,
                    },
                });
                console.log('✅ SuperAdmin account created successfully');
            } else {
                console.log('✅ SuperAdmin account already exists');
            }
        } catch (error) {
            console.error('❌ Error ensuring SuperAdmin:', error.message);
        }
    }
}
