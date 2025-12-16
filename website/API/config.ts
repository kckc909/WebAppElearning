/**
 * Mock API Configuration
 * Set USE_MOCK_API = false to use real backend API
 */

// Toggle này quyết định dùng Mock hay Real API
export const USE_MOCK_API = true;

// Delay mô phỏng network latency (ms)
export const MOCK_DELAY = 300;

// Helper function để simulate API delay
export const simulateDelay = (ms: number = MOCK_DELAY): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

export const successResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
    success: true,
    data,
    message
});

export const errorResponse = <T>(error: string, data?: T): ApiResponse<T> => ({
    success: false,
    data: data as T,
    error
});
