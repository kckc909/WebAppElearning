import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

import mariadb, { PoolConfig } from 'mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(private configService: ConfigService) {

        const connectionString = configService.get<string>('DATABASE_URL_MARIADB');
        if (!connectionString) {
            throw new Error('DATABASE_URL_MARIADB environment variable is not set');
        }
        const adapter = new PrismaMariaDb(connectionString);
        super({
            adapter: adapter,
        });

        // const pool = mariadb.createPool({
        //     host: process.env.DB_HOST ?? 'localhost',
        //     user: process.env.DB_USER ?? 'root',
        //     password: process.env.DB_PASS ?? 'root',
        //     database: process.env.DB_NAME ?? 'website_milearn',
        //     port: Number(process.env.DB_PORT ?? 3306),
        //     connectionLimit: 10,
        // })
        // const adapter = new PrismaMariaDb(pool as PoolConfig);
        // super({ adapter });

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
        const admin = await this.accounts.findUnique({
            where: { username: 'superadmin' }
        });

        if (!admin) {
            await this.accounts.create({
                data: {
                    username: 'superadmin',
                    full_name: 'Super Administrator',
                    email: 'kckc253261@gmail.com',
                    password_hash: '000000', // password đã mã hoá
                    role: -1,
                },
            });
            console.log('⚠️ SuperAdmin bị xóa - đã tự động khôi phục!');
        }
    }
}
