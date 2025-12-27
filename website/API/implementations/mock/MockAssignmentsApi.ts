/**
 * Mock Assignments API Implementation
 */

import { IAssignmentsApi, Assignment, AssignmentSubmission } from '../../interfaces/IAssignmentsApi';
import { simulateDelay, successResponse, errorResponse, ApiResponse } from '../../config';
import { dataSource } from '../../../data/datasources/datasource.router';

export class MockAssignmentsApi implements IAssignmentsApi {
    async getByClass(classId: number): Promise<ApiResponse<Assignment[]>> {
        await simulateDelay();
        try {
            const assignments = dataSource.getAssignmentsByClass(classId);
            return successResponse(assignments);
        } catch (error) {
            return errorResponse('Failed to fetch assignments');
        }
    }

    async getById(id: number): Promise<ApiResponse<Assignment>> {
        await simulateDelay();
        try {
            const assignment = dataSource.getAssignmentById(id);
            if (!assignment) {
                return errorResponse('Assignment not found');
            }
            return successResponse(assignment);
        } catch (error) {
            return errorResponse('Failed to fetch assignment');
        }
    }

    async create(assignment: Omit<Assignment, 'id' | 'created_at'>): Promise<ApiResponse<Assignment>> {
        await simulateDelay();
        try {
            const newAssignment = dataSource.createAssignment(assignment);
            return successResponse(newAssignment);
        } catch (error) {
            return errorResponse('Failed to create assignment');
        }
    }

    async update(id: number, data: Partial<Assignment>): Promise<ApiResponse<Assignment>> {
        await simulateDelay();
        try {
            const updated = dataSource.updateAssignment(id, data);
            if (!updated) {
                return errorResponse('Assignment not found');
            }
            return successResponse(updated);
        } catch (error) {
            return errorResponse('Failed to update assignment');
        }
    }

    async delete(id: number): Promise<ApiResponse<void>> {
        await simulateDelay();
        try {
            dataSource.deleteAssignment(id);
            return successResponse(undefined);
        } catch (error) {
            return errorResponse('Failed to delete assignment');
        }
    }

    async getSubmissions(assignmentId: number): Promise<ApiResponse<AssignmentSubmission[]>> {
        await simulateDelay();
        try {
            const submissions = dataSource.getAssignmentSubmissions(assignmentId);
            return successResponse(submissions);
        } catch (error) {
            return errorResponse('Failed to fetch submissions');
        }
    }

    async gradeSubmission(submissionId: number, grade: number, feedback?: string): Promise<ApiResponse<AssignmentSubmission>> {
        await simulateDelay();
        try {
            const graded = dataSource.gradeSubmission(submissionId, grade, feedback);
            if (!graded) {
                return errorResponse('Submission not found');
            }
            return successResponse(graded);
        } catch (error) {
            return errorResponse('Failed to grade submission');
        }
    }
}
