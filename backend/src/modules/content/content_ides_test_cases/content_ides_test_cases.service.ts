import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service.js';

@Injectable()
export class ContentIdesTestCasesService {
    constructor(private prisma: PrismaService) {}

    async getAll() {
        return await this.prisma.content_ides_test_cases.findMany({
            orderBy: { order_index: 'asc' }
        });
    }

    async getById(id: number) {
        return await this.prisma.content_ides_test_cases.findUnique({
            where: { id }
        });
    }

    async getByStarterId(starterId: number, includeHidden: boolean = false) {
        const where: any = { starter_id: starterId };
        
        if (!includeHidden) {
            where.is_hidden = false;
        }

        return await this.prisma.content_ides_test_cases.findMany({
            where,
            orderBy: { order_index: 'asc' }
        });
    }

    async create(data: {
        starter_id: number;
        test_name: string;
        input: string;
        expected_output: string;
        is_hidden?: boolean;
        points?: number;
        timeout_ms?: number;
        order_index?: number;
    }) {
        return await this.prisma.content_ides_test_cases.create({
            data: {
                starter_id: data.starter_id,
                test_name: data.test_name,
                input: data.input,
                expected_output: data.expected_output,
                is_hidden: data.is_hidden ?? false,
                points: data.points ?? 1,
                timeout_ms: data.timeout_ms ?? 5000,
                order_index: data.order_index ?? 0,
            }
        });
    }

    async update(id: number, data: {
        test_name?: string;
        input?: string;
        expected_output?: string;
        is_hidden?: boolean;
        points?: number;
        timeout_ms?: number;
        order_index?: number;
    }) {
        return await this.prisma.content_ides_test_cases.update({
            where: { id },
            data
        });
    }

    async delete(id: number) {
        return await this.prisma.content_ides_test_cases.delete({
            where: { id }
        });
    }

    async bulkCreate(starterId: number, testCases: Array<{
        test_name: string;
        input: string;
        expected_output: string;
        is_hidden?: boolean;
        points?: number;
        timeout_ms?: number;
    }>) {
        const promises = testCases.map((testCase, index) =>
            this.create({
                starter_id: starterId,
                test_name: testCase.test_name,
                input: testCase.input,
                expected_output: testCase.expected_output,
                is_hidden: testCase.is_hidden,
                points: testCase.points,
                timeout_ms: testCase.timeout_ms,
                order_index: index
            })
        );

        return await Promise.all(promises);
    }

    async runTests(starterId: number, userCode: string, language: string) {
        // Get all test cases (including hidden ones for grading)
        const testCases = await this.getByStarterId(starterId, true);

        // TODO: Implement code execution logic
        // This would typically call a sandboxed code execution service
        // For now, return mock results
        const results = testCases.map(testCase => ({
            test_name: testCase.test_name,
            passed: false,
            actual_output: '',
            expected_output: testCase.expected_output,
            error: 'Code execution not implemented yet',
            execution_time_ms: 0,
            points_earned: 0,
            is_hidden: testCase.is_hidden
        }));

        const totalPoints = testCases.reduce((sum, tc) => sum + tc.points, 0);
        const earnedPoints = results.filter(r => r.passed).reduce((sum, r) => {
            const testCase = testCases.find(tc => tc.test_name === r.test_name);
            return sum + (testCase?.points || 0);
        }, 0);

        return {
            results: results.filter(r => !r.is_hidden), // Don't show hidden test results
            total_tests: testCases.length,
            passed_tests: results.filter(r => r.passed).length,
            total_points: totalPoints,
            earned_points: earnedPoints,
            percentage: totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0
        };
    }
}
