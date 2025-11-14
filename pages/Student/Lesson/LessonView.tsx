import { useState, useRef, useCallback, useEffect } from "react";

const LessonView: React.FC<{ leftContent: React.ReactNode, rightContent: React.ReactNode, layout: 'horizontal' | 'vertical' }> = ({ leftContent, rightContent, layout }) => {
    const [panelWidths, setPanelWidths] = useState([50, 50]);
    const isResizing = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        isResizing.current = true;
    };

    const handleMouseUp = useCallback(() => { isResizing.current = false; }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isResizing.current || !containerRef.current) return;
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const newLeftWidth = ((e.clientX - rect.left) / container.offsetWidth) * 100;
        const minWidth = 20, maxWidth = 80;
        if (newLeftWidth > minWidth && newLeftWidth < maxWidth) {
            setPanelWidths([newLeftWidth, 100 - newLeftWidth]);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    return (
        <div ref={containerRef} className="flex-1 flex flex-col lg:flex-row min-w-0">
            <div className="lg:overflow-y-auto bg-white" style={{ flexBasis: `${panelWidths[0]}%` }}>
                {leftContent}
            </div>
            <div onMouseDown={handleMouseDown} className="hidden lg:block w-2 bg-slate-200 hover:bg-primary transition-colors cursor-col-resize flex-shrink-0"></div>
            <div className="flex-1 flex" style={{ flexBasis: `${panelWidths[1]}%` }}>
                {rightContent}
            </div>
        </div>
    );
};

export default LessonView;