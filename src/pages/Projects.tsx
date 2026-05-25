import { useEffect } from 'react';
import { LinkButton } from '../utils/links';
import { zip } from '../utils/arrays';
import SiteNavBar from '../utils/navbar';

type ProjectKey = 'mycode' | 'rybot' | 'mlbetl' | 'nbaetl' | 'weatherpred';

const PROJECTS: Record<ProjectKey, {
  label: string;
  description: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  tags: string[];
  githubPath: string;
  comingSoon?: boolean;
}> = {
  mycode: {
    label: 'MyCode',
    description: "an AI agent tailored to build code your way. MyCode uses reasoning to extract semantic meaning from your code, analyzing your exact preferences.",
    icon: 'fa-robot',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    tags: ['Python', 'Claude API', 'OpenAI', 'MCP', 'RAG'],
    githubPath: '/mycode'
  },
  rybot: {
    label: 'RyBot',
    description: "An AI-powered chatbot built on the Claude API, connected to an MCP Server. Ask it about my background, projects, or experience, and it answers with full context about who I am and what I've built.",
    icon: 'fa-robot',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    tags: ['Python', 'Claude API', 'MCP', 'RAG', 'TypeScript'],
    githubPath: '/rybot'
  },
  mlbetl: {
    label: 'MLB ML',
    description: 'An end-to-end machine learning pipeline for predicting MLB game outcomes.',
    icon: 'fa-chart-line',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
    border: 'border-sky-400/20',
    tags: ['Python', 'Scikit-learn', 'Supabase', 'PostgreSQL'],
    githubPath: '/mlb-etl',
    comingSoon: true
  },
  nbaetl: {
    label: 'NBA ML',
    description: 'A machine learning pipeline for predicted individual and team NBA outcomes.',
    icon: 'fa-chart-bar',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
    border: 'border-violet-400/20',
    tags: ['Python', 'ML'],
    githubPath: '/nba_etl',
    comingSoon: true
  },
  weatherpred: {
    label: 'Weather Prediction',
    description: 'Data science project to predict the temperature 15 minutes in the future. Includes EDA, feature engineering/selection, and model comparison/evaluation',
    icon: 'fa-cloud-sun',
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10',
    border: 'border-indigo-400/20',
    tags: ['Python', 'SciKit-Learn', 'ML'],
    githubPath: '/liberty_project',
  },
};

const PROJ_ORDER: ProjectKey[] = ['rybot', 'mlbetl', 'nbaetl', 'weatherpred'];

const ANIM_CLASSES = [
  'animate-fade-in-up',
  'animate-fade-in-up-delay',
  'animate-fade-in-up-delay-2',
  'animate-fade-in-up-delay-2',
];

function ProjectSection({
  projectName,
  projectDescrip,
  bg,
  border,
  tags,
  animClass,
  buttonLink,
  comingSoon = false,
}: {
  projectName: string;
  projectDescrip: string;
  bg: string;
  border: string;
  tags: string[];
  animClass: string;
  buttonLink: string;
  comingSoon?: boolean;
}) {
  return (
    <div className={`${bg} border ${border} rounded-xl p-8 flex flex-col hover:scale-[1.02] transition-all duration-200 ${animClass}`}>
      <h2 className="text-xl font-bold text-slate-100 mb-3">{projectName}</h2>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{projectDescrip}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map(tag => (
          <span
            key={tag}
            className="bg-slate-900 border border-slate-700 text-slate-400 text-xs px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div>
        {comingSoon ? (
          <span className="inline-flex items-center gap-2 border border-slate-700 text-slate-500 text-sm px-4 py-2.5 rounded-lg cursor-default">
            <i className="fas fa-clock text-xs" />
            Coming Soon
          </span>
        ) : (
          <LinkButton
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            icon="fab fa-github"
            label="View on GitHub"
          />
        )}
      </div>
    </div>
  );
}

function ProjectsPage() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100">

      <SiteNavBar />

      {/* ── Hero ── */}
      <section
        className="pt-32 pb-20 px-8 relative overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 10% 60%, rgba(99, 102, 241, 0.10) 0%, transparent 50%),
            radial-gradient(circle at 90% 10%, rgba(6, 182, 212, 0.08) 0%, transparent 45%)
          `,
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-cyan-400/70 font-mono text-xs tracking-[0.2em] uppercase mb-4 animate-fade-in-up">
            My Work
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-100 mb-4 animate-fade-in-up">
            Projects
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto animate-fade-in-up-delay">
            End-to-end ML systems, data pipelines, and AI applications.
          </p>
        </div>
      </section>

      {/* ── Project Cards ── */}
      <section className="pb-24 px-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {zip(PROJ_ORDER, ANIM_CLASSES).map(([key, animClass]) => {
            const proj = PROJECTS[key];
            return (
              <ProjectSection
                key={key}
                projectName={proj.label}
                projectDescrip={proj.description}
                bg={proj.bg}
                border={proj.border}
                tags={proj.tags}
                animClass={animClass}
                buttonLink={`https://github.com/RyanAbbottData${proj.githubPath}`}
                comingSoon={proj.comingSoon}
              />
            );
          })}
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

export default ProjectsPage;
