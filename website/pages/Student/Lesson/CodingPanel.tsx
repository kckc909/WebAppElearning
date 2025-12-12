import { useState } from "react";
import { Lesson } from "../../../types/types";

const CodingPanel: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
    const [code, setCode] = useState(lesson.starterCode || '');
    return (
        <div className="flex flex-col bg-slate-800 flex-1 h-full">
            <div className="flex-1 p-1 min-h-0">
                <textarea
                    aria-label="Code Editor"
                    className="w-full h-full bg-transparent text-slate-300 font-mono text-sm p-4 resize-none border-none focus:ring-0"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
            </div>
            <div className="flex-shrink-0 bg-black/30 border-t border-slate-700 p-2 flex items-center justify-between">
                <div className="flex-1 h-24 bg-black/20 rounded-md p-2 font-mono text-xs text-slate-400 overflow-y-auto" aria-live="polite">
                    &gt; Console output will appear here...
                </div>
                <button className="ml-4 rounded-md bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 flex items-center space-x-2">
                    <ion-icon name="play-outline" class="text-lg"></ion-icon>
                    <span>Run</span>
                </button>
            </div>
        </div> 
    );
};

export default CodingPanel;