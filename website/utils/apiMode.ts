/**
 * API Mode Management Utility
 * Quản lý việc chuyển đổi giữa Mock Data và Database
 */

export const API_MODES = {
    MOCK: 'mock',
    DATABASE: 'database',
} as const;

export type ApiMode = (typeof API_MODES)[keyof typeof API_MODES];

export class ApiModeManager {
    private static readonly STORAGE_KEY = 'USE_MOCK_API';

    /**
     * Lấy chế độ API hiện tại
     */
    static getCurrentMode(): ApiMode {
        if (typeof window === 'undefined') return API_MODES.MOCK;

        const stored = localStorage.getItem(this.STORAGE_KEY);
        const useMock = stored === null ? true : stored === 'true';
        return useMock ? API_MODES.MOCK : API_MODES.DATABASE;
    }

    /**
     * Kiểm tra có đang dùng Mock API không
     */
    static isUsingMockAPI(): boolean {
        return this.getCurrentMode() === API_MODES.MOCK;
    }

    /**
     * Chuyển đổi chế độ API
     */
    static toggleMode(): ApiMode {
        const currentMode = this.getCurrentMode();
        const newMode = currentMode === API_MODES.MOCK ? API_MODES.DATABASE : API_MODES.MOCK;

        if (typeof window !== 'undefined') {
            localStorage.setItem(this.STORAGE_KEY, (newMode === API_MODES.MOCK).toString());
        }

        return newMode;
    }

    /**
     * Đặt chế độ API cụ thể
     */
    static setMode(mode: ApiMode): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.STORAGE_KEY, (mode === API_MODES.MOCK).toString());
        }
    }

    /**
     * Lấy thông tin về chế độ hiện tại
     */
    static getModeInfo(): { mode: ApiMode; label: string; description: string; color: string } {
        const mode = this.getCurrentMode();

        if (mode === API_MODES.MOCK) {
            return {
                mode,
                label: 'Mock Data',
                description: 'Sử dụng dữ liệu giả lập (không cần backend)',
                color: 'blue',
            };
        } else {
            return {
                mode,
                label: 'Database',
                description: 'Kết nối với backend thật (localhost:4000)',
                color: 'green',
            };
        }
    }
}

// Export cho backward compatibility
export const getCurrentApiMode = ApiModeManager.getCurrentMode;
export const isUsingMockAPI = ApiModeManager.isUsingMockAPI;
export const toggleApiMode = ApiModeManager.toggleMode;
