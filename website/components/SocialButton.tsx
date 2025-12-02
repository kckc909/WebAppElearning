const SocialButton: React.FC<{ icon: React.ComponentType<{ className?: string }>; provider: string }> = ({
    icon: Icon,
    provider,
}) => (
    <button
        type="button"
        className="flex-1 flex items-center justify-center space-x-2 border border-slate-300 rounded-md py-2.5 hover:bg-slate-50 transition-colors"
    >
        <Icon className="text-xl" />
        <span className="font-medium text-slate-600">{provider}</span>
    </button>
);

export default SocialButton;