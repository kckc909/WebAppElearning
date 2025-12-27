import { BadRequestException, Delete, Get, Injectable, Post, Put } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service.js";
import type { AccountCreateForm, AccountUpdateForm } from "./accounts.dto.js";
import { IdParam } from "types/types.pipe.js";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Accounts_Service {

    constructor(private readonly prisma: PrismaService) { }

    private readonly SALT_ROUNDS = 10;

    async getByEmail(email: string) {
        const accFound = this.prisma.accounts.findFirst({
            where: {
                email: email
            }
        })
        return accFound;
    }

    async getByUsername(username: string) {
        const accFound = this.prisma.accounts.findUnique({
            where: {
                username: username
            }
        })
        return accFound
    }

    async getByLoginForm(username: string, password: string) {
        const normalizedUsername = username.trim().toLowerCase();
        const trimmedPassword = password.trim();

        const account = await this.prisma.accounts.findUnique({
            where: { username: normalizedUsername }
        });

        // Fake hash để chống timing attack
        const hashToCompare =
            account?.password_hash ??
            '$2b$10$C6UzMDM.H6dfI/f/IKcEe.7pG5bJkG0wZ0pniS3pSke1w4l5E6C9K';

        const isPasswordValid = await bcrypt.compare(trimmedPassword, hashToCompare);

        if (!account || !isPasswordValid) {
            return null;
        }

        if (!account.status) {
            return null;
        }

        const { password_hash, ...result } = account;
        return result;
    }

    // Method riêng để verify password (không check status) - dùng cho change password
    async verifyPassword(username: string, password: string): Promise<boolean> {
        const normalizedUsername = username.trim().toLowerCase();
        const trimmedPassword = password.trim();

        const account = await this.prisma.accounts.findUnique({
            where: { username: normalizedUsername }
        });

        if (!account || !account.password_hash) {
            return false;
        }

        const isPasswordValid = await bcrypt.compare(trimmedPassword, account.password_hash);
        return isPasswordValid;
    }


    async getAll()
        : Promise<any> {

        const accountsFound = await this.prisma.accounts.findMany();

        return accountsFound;
    }

    async getById(idParam: IdParam)
        : Promise<any> {

        const accountFound = await this.prisma.accounts.findFirst({
            where: { id: idParam.id },
            select: {
                id: true,
                full_name: true,
                email: true,
                username: true,
                role: true,
                status: true,
                avatar_url: true,
                created_at: true,
                updated_at: true,
            }
        })

        return accountFound;
    }

    async create(newUser: AccountCreateForm)
        : Promise<any> {

        const { id, password_hash, ...data } = newUser as any;

        // Hash password trước khi lưu
        const hashedPassword = await bcrypt.hash(password_hash, this.SALT_ROUNDS);

        const created = await this.prisma.accounts.create({
            data: {
                ...data,
                password_hash: hashedPassword
            }
        })

        // Không trả về password_hash
        const { password_hash: _, ...result } = created;
        return result;
    }

    async update(newUser: AccountUpdateForm)
        : Promise<any> {

        const { id, created_at, updated_at, password_hash, ...payload } = newUser as any

        // Nếu có password mới, hash nó
        if (password_hash) {
            const hashedPassword = await bcrypt.hash(password_hash, this.SALT_ROUNDS);
            payload.password_hash = hashedPassword;
        }

        const updated = await this.prisma.accounts.update({
            where: { id },
            data: payload
        })

        // Không trả về password_hash
        const { password_hash: _, ...result } = updated;
        return result;
    }

    async delete(deletedId: number)
        : Promise<any> {

        const deleted = await this.prisma.accounts.delete({ where: { id: deletedId } })

        return deleted
    }

    async logAuditAction(data: {
        user_id: number | null;
        action: string;
        resource_type: string;
        resource_id: bigint | null;
        old_values?: any;
        new_values?: any;
        ip_address?: string;
        user_agent?: string;
    }) {
        try {
            await this.prisma.audit_logs.create({
                data: {
                    user_id: data.user_id,
                    action: data.action,
                    resource_type: data.resource_type,
                    resource_id: data.resource_id,
                    old_values: data.old_values || null,
                    new_values: data.new_values || null,
                    ip_address: data.ip_address,
                    user_agent: data.user_agent,
                }
            });
        } catch (error) {
            console.error('Failed to log audit action:', error);
        }
    }

    async updateLastLogin(userId: number) {
        try {
            await this.prisma.accounts.update({
                where: { id: userId },
                data: { last_login_at: new Date() }
            });
        } catch (error) {
            console.error('Failed to update last login:', error);
        }
    }
}
