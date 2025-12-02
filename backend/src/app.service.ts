import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { createConnection } from 'mariadb';
import { EmailService } from './modules/emailService/email.service.js';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly _email: EmailService
  ) { }

  async getHello(): Promise<any> {
    const users = await this.prisma.accounts.findMany();
    return `Hello World! ${users.length}`;
  }

  async test_sendMail() {
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const res = await this._email.sendVerificationMail('kckc253261@gmail.com', verificationCode);

    return { res }
  }

  async test() {
    try {
      const conn = await createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "root",
        database: "website_milearn"
      });
      console.log("MariaDB OK");
      conn.end();

      return 'Check'
    } catch (e) {
      console.error("MariaDB FAIL:", e);
    }
  }
}
