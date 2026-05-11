const VARIANT_CLASS = {
  outline: 'flex items-center gap-2 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-200',
  primary: 'flex items-center gap-2 bg-cyan-500 text-slate-950 font-semibold px-6 py-3 rounded-lg hover:bg-cyan-400 transition-all duration-200',
};

const TAB_ACTIVE_CLASS = 'w-full text-left flex items-center gap-2 border-l-2 border-l-cyan-400 border border-slate-700/50 bg-cyan-500/10 text-cyan-400 font-medium px-5 py-3 rounded-r-lg transition-all duration-200';
const TAB_INACTIVE_CLASS = 'w-full text-left flex items-center gap-2 border-l-2 border-l-transparent border border-slate-700/50 text-slate-400 px-5 py-3 rounded-r-lg hover:border-l-cyan-400/50 hover:text-slate-300 hover:bg-slate-800/50 transition-all duration-200';

function TabButton({ text, onClick, variant = 'outline', isActive }: { text: string; onClick: () => void; variant?: 'outline' | 'primary'; isActive?: boolean }) {
    const className = isActive === true ? TAB_ACTIVE_CLASS : isActive === false ? TAB_INACTIVE_CLASS : VARIANT_CLASS[variant];

    return (
        <button className={className} onClick={onClick}>{text}</button>
    );
}

export { TabButton };