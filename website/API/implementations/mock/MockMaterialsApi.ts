/**
 * Mock Materials API Implementation
 */

import { IMaterialsApi, Material } from '../../interfaces/IMaterialsApi';
import { simulateDelay, successResponse, errorResponse, ApiResponse } from '../../config';
import { dataSource } from '../../../data/datasources/datasource.router';

export class MockMaterialsApi implements IMaterialsApi {
    async getByClass(classId: number): Promise<ApiResponse<Material[]>> {
        await simulateDelay();
        try {
            const materials = dataSource.getMaterialsByClass(classId);
            return successResponse(materials);
        } catch (error) {
            return errorResponse('Failed to fetch materials');
        }
    }

    async getById(id: number): Promise<ApiResponse<Material>> {
        await simulateDelay();
        try {
            const material = dataSource.getMaterialById(id);
            if (!material) {
                return errorResponse('Material not found');
            }
            return successResponse(material);
        } catch (error) {
            return errorResponse('Failed to fetch material');
        }
    }

    async upload(material: Omit<Material, 'id' | 'uploaded_at'>): Promise<ApiResponse<Material>> {
        await simulateDelay();
        try {
            const newMaterial = dataSource.uploadMaterial(material);
            return successResponse(newMaterial);
        } catch (error) {
            return errorResponse('Failed to upload material');
        }
    }

    async update(id: number, data: Partial<Material>): Promise<ApiResponse<Material>> {
        await simulateDelay();
        try {
            const updated = dataSource.updateMaterial(id, data);
            if (!updated) {
                return errorResponse('Material not found');
            }
            return successResponse(updated);
        } catch (error) {
            return errorResponse('Failed to update material');
        }
    }

    async delete(id: number): Promise<ApiResponse<void>> {
        await simulateDelay();
        try {
            dataSource.deleteMaterial(id);
            return successResponse(undefined);
        } catch (error) {
            return errorResponse('Failed to delete material');
        }
    }

    async download(id: number): Promise<ApiResponse<{ url: string }>> {
        await simulateDelay();
        try {
            const url = dataSource.getMaterialDownloadUrl(id);
            return successResponse({ url });
        } catch (error) {
            return errorResponse('Failed to get download URL');
        }
    }
}
