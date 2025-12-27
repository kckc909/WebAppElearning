import React, { useState } from 'react';
import { Database, FileText } from 'lucide-react';
import { ApiModeManager } from '../utils/apiMode';

interface ApiModeSwitchProps {
    compact?: boolean;
    showLabel?: boolean;
}

const ApiModeSwitch: React.FC<ApiModeSwitchProps> = ({ compact = false, showLabel = true }) => {
    const [useMockAPI, setUseMockAPI] = useState(() => ApiModeManager.isUsingMockAPI());

    const toggleMode = () => {
        const newMode = ApiModeManager.toggleMode();
        setUseMockAPI(newMode === 'mock');

        // Reload page to apply changes
        window.location.reload();
    };

    const modeInfo = ApiModeManager.getModeInfo();

    if (compact) {
        return (
            <button
                onClick={toggleMode}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:bg-slate-100 ${useMockAPI
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-green-600 bg-green-50'
                    }`}
                title={`Chuyển sang ${useMockAPI ? 'Database' : 'Mock Data'}`}
            >
                {useMockAPI ? <FileText className="w-4 h-4" /> : <Database className="w-4 h-4" />}
                {showLabel && (
                    <span className="truncate">
                        {useMockAPI ? 'Mock' : 'DB'}
                    </span>
                )}
                <div className={`w-2 h-2 rounded-full ${useMockAPI ? 'bg-blue-500' : 'bg-green-500'}`}></div>
            </button>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Chế độ:</span>
                <span className={`font-medium ${useMockAPI ? 'text-blue-600' : 'text-green-600'}`}>
                    {modeInfo.label}
                </span>
            </div>

            <button
                onClick={toggleMode}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${useMockAPI
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
            >
                {useMockAPI ? <FileText className="w-4 h-4" /> : <Database className="w-4 h-4" />}
                <span className="flex-1 text-left">{modeInfo.label}</span>
                <div className={`w-2 h-2 rounded-full ${useMockAPI ? 'bg-blue-500' : 'bg-green-500'}`}></div>
            </button>

            <p className="text-xs text-slate-400 text-center">
                {modeInfo.description}
            </p>
        </div>
    );
};

export default ApiModeSwitch;