import { Injectable } from "@nestjs/common";

@Injectable()
export class HelperService {
    generateRandomCode() {
        const rdcode = Math.floor(100000 + Math.random() * 900000).toString();
        return rdcode;
    }

    generateRandomPassword() {
        const length = 10;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
        let password = '';

        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }


}