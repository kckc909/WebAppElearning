// A simple component to render pseudo-markdown content - dot list 
const SimpleMarkdown: React.FC<{ content: string }> = ({ content }) => {
    const lines = content.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeContent = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('```')) {
            if (inCodeBlock) {
                elements.push(
                    <pre key={i} className="bg-slate-100 text-slate-800 rounded-md p-4 my-4 overflow-x-auto text-sm">
                        <code>{codeContent.trim()}</code>
                    </pre>
                );
                codeContent = '';
            }
            inCodeBlock = !inCodeBlock;
        } else if (inCodeBlock) {
            codeContent += line + '\n';
        } else if (line.startsWith('## ')) {
            elements.push(<h2 key={i} className="text-2xl font-bold mt-6 mb-3 text-secondary">{line.substring(3)}</h2>);
        } else if (line.startsWith('### ')) {
            elements.push(<h3 key={i} className="text-xl font-bold mt-5 mb-2 text-secondary">{line.substring(4)}</h3>);
        } else if (line.trim() !== '') {
            elements.push(<p key={i} className="text-slate-700 leading-relaxed my-3">{line}</p>);
        }
    }

    return <>{elements}</>;
};

export default SimpleMarkdown;