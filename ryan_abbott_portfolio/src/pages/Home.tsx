import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TITLES = ['AI/ML Engineer', 'Data Engineer', 'Software Engineer', 'ML Systems Builder'];

function TypewriterTitle() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TITLES[titleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 100);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 50);
    } else {
      setIsDeleting(false);
      setTitleIdx(prev => (prev + 1) % TITLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, titleIdx]);

  return (
    <>
      <span className="text-cyan-400">{displayed}</span>
      <span className="cursor-blink text-cyan-400">|</span>
    </>
  );
}

const SKILLS = [
  { icon: 'fa-code',     color: 'text-cyan-400',   bg: 'bg-cyan-400/10',   border: 'border-cyan-400/20',   name: 'Python',     desc: 'ML & Data Engineering'   },
  { icon: 'fa-bolt',     color: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/20', name: 'Databricks', desc: 'Big Data & Lakehouse'     },
  { icon: 'fa-cloud',    color: 'text-sky-400',    bg: 'bg-sky-400/10',    border: 'border-sky-400/20',    name: 'AWS',        desc: 'Cloud Infrastructure'     },
  { icon: 'fa-database', color: 'text-violet-400', bg: 'bg-violet-400/10', border: 'border-violet-400/20', name: 'SQL',        desc: 'Data Modeling & Queries'  },
];

const SECONDARY_SKILLS = ['PyTorch', 'Scikit-learn', 'PySpark', 'React', 'TypeScript', 'Supabase', 'Git', 'Docker'];

const STATS = [
  { value: '5+',                label: 'Years Experience' },
  { value: 'Databricks + AWS',  label: 'Cloud Stack'      },
  { value: 'End-to-End',        label: 'ML Pipelines'     },
  { value: '3',                 label: 'Industries'       },
];

function Home() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-100">

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800 h-16 flex items-center px-8">
        <Link to="/" className="font-mono text-cyan-400 font-semibold text-lg tracking-tight mr-auto hover:text-cyan-300 transition-colors">
          Ryan Abbott
        </Link>
        <ul className="flex items-center gap-8 text-sm list-none m-0 p-0">
          <li><Link to="/mlb" className="text-slate-400 hover:text-cyan-400 transition-colors">MLB Stats</Link></li>
          <li><Link to="/about" className="text-slate-400 hover:text-cyan-400 transition-colors">About</Link></li>
          <li><span className="text-slate-600 cursor-default">Resume</span></li>
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

      {/* ── Hero ── */}
      <section
        className="min-h-screen flex flex-col justify-center items-center text-center px-8 pt-16 relative overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 85% 20%, rgba(6, 182, 212, 0.10) 0%, transparent 45%)
          `,
        }}
      >
        {/* subtle dot-grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-4xl w-full">
          <p className="text-cyan-400/70 font-mono text-sm tracking-[0.2em] uppercase mb-6 animate-fade-in-up">
            Hi, I'm
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-100 mb-5 animate-fade-in-up">
            Ryan Abbott
          </h1>
          <h2 className="text-2xl md:text-3xl font-light text-slate-300 mb-6 animate-fade-in-up-delay" style={{ minHeight: '2.5rem' }}>
            <TypewriterTitle />
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up-delay">
            Building production ML systems — from raw data ingestion to deployed models.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up-delay-2">
            <a
              href="https://github.com/RyanAbbottData"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-200"
            >
              <i className="fa fa-github text-lg" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ryan-abbott-6ba4b0233"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-200"
            >
              <i className="fa fa-linkedin text-lg" />
              LinkedIn
            </a>
            <Link
              to="/rybot"
              className="flex items-center gap-2 bg-cyan-500 text-slate-950 font-semibold px-6 py-3 rounded-lg hover:bg-cyan-400 transition-all duration-200"
            >
              Ask RyBot
              <i className="fa fa-arrow-right text-sm" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 animate-bounce">
          <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
          <i className="fa fa-chevron-down text-xs" />
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400/70 font-mono text-xs tracking-[0.2em] uppercase mb-3">What I work with</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Technical Expertise</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {SKILLS.map(skill => (
              <div
                key={skill.name}
                className={`${skill.bg} border ${skill.border} rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-200 cursor-default`}
              >
                <i className={`fa ${skill.icon} ${skill.color} text-3xl mb-4`} />
                <h3 className="text-slate-100 font-semibold text-lg mb-1">{skill.name}</h3>
                <p className="text-slate-500 text-xs">{skill.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {SECONDARY_SKILLS.map(s => (
              <span
                key={s}
                className="bg-slate-900 border border-slate-700 text-slate-400 text-sm px-4 py-1.5 rounded-full hover:border-slate-500 hover:text-slate-300 transition-colors cursor-default"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 border-y border-slate-800 bg-slate-900/40">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-slate-700">
            {STATS.map(stat => (
              <div key={stat.label} className="flex flex-col items-center text-center px-4">
                <span className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">{stat.value}</span>
                <span className="text-slate-400 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-cyan-400/70 font-mono text-xs tracking-[0.2em] uppercase mb-4">Get in touch</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Let's build something great.</h2>
          <p className="text-slate-400 text-lg mb-10">Open to roles in AI/ML Engineering and Data Engineering.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/RyanAbbottData"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-200"
            >
              <i className="fa fa-github" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ryan-abbott-6ba4b0233"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-200"
            >
              <i className="fa fa-linkedin" />
              LinkedIn
            </a>
            <a
              href="mailto:ryanabbott855@gmail.com"
              className="flex items-center gap-2 bg-cyan-500 text-slate-950 font-semibold px-6 py-3 rounded-lg hover:bg-cyan-400 transition-all duration-200"
            >
              <i className="fa fa-envelope" />
              Email Me
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800 py-6 text-center">
        <p className="text-slate-600 font-mono text-xs">
          Built with React + Tailwind · Ryan Abbott © {new Date().getFullYear()}
        </p>
      </footer>

    </div>
  );
}

export default Home;
