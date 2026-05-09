function LinkButton({ text, link }: { text: string; link: string }) {
    return <a href={link} target="_blank" rel="noopener noreferrer" className="text-white bg-blue-500 hover:bg-red-500 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">{text}</a>;
}

export default LinkButton