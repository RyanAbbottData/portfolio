import { Link } from "react-router-dom";

function SiteNavBar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800 h-16 flex items-center px-8">
            <Link to="/" className="font-mono text-cyan-400 font-semibold text-lg tracking-tight mr-auto hover:text-cyan-300 transition-colors">
                Ryan Abbott
            </Link>
            <ul className="flex items-center gap-8 text-sm list-none m-0 p-0">
                <li><Link to="/about" className="text-cyan-400">About</Link></li>
                <li><Link to="/projects" className="text-cyan-400 hover:text-cyan-400 transition-colors">Projects</Link></li>
                <li><Link to="/resume" className="text-cyan-400">Resume</Link></li>
                <li>
                <Link
                    to="/rybot"
                    className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full hover:bg-cyan-500/20 hover:border-cyan-500/60 transition-all"
                >
                    Ask RyBot
                </Link>
                </li>
            </ul>
        </nav>
    )
}

export default SiteNavBar