/**
 * Assignments API Interface
 */

import { ApiResponse } from '../config';

export interface Assignment {
    id: number;
    class_id: number;
    title: string;
    description: string;
    deadline: string;
    total_points: number;
    created_at: string;
    created_by: number;
}

export interface AssignmentSubmission {
    id: number;
    assignment_id: number;
    student_id: number;
    student_name: string;
    submitted_at: string;
    content: string;
    attachments?: string[];
    grade?: number;
    feedback?: string;
    status: 'submitted' | 'graded' | 'late' | 'missing';
}

export interface IAssignmentsApi {
    getByClass(classId: number): Promise<ApiResponse<Assignment[]>>;
    getById(id: number): Promise<ApiResponse<Assignment>>;
    create(assignment: Omit<Assignment, 'id' | 'created_at'>): Promise<ApiResponse<Assignment>>;
    update(id: number, data: Partial<Assignment>): Promise<ApiResponse<Assignment>>;
    delete(id: number): Promise<ApiResponse<void>>;
    
    getSubmissions(assignmentId: number): Promise<ApiResponse<AssignmentSubmission[]>>;
    gradeSubmission(submissionId: number, grade: number, feedback?: string): Promise<ApiResponse<AssignmentSubmission>>;
}
