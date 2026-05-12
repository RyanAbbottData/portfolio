import { useState } from 'react';
import { TabButton } from '../utils/button';
import SiteNavBar from '../utils/navbar';
import headshot from '../assets/headshot.png';

type ExpKey = 'college' | 'ib' | 'lib' | 'cons' | 'webd';

const EXPERIENCE: Record<ExpKey, { label: string; description: string }> = {
  college: {
    label: 'Education',
    description: "With a Bachelor's of Science in Astrophysics from the University of Oklahoma, I have a strong quantitative foundation. When in college, I built and published a mobile application in Kotlin. As a senior, I fused the power of ML with astrophysics to identify rare stellar objects previously misidentified in the literature. After graduating, I jumped into industry.",
  },
  ib: {
    label: 'IntelliBridge',
    description: "I worked as a Data Scientist and Data Engineer at IntelliBridge, an Agile Defense Company, for 2+ years. While there, I developed, containerized, and deployed a novel data matching service powered by ML. This functionality was leveraged both in internal data pipelines and in graph database creation. I built robust and reliable data pipelines in Databricks, delivering millions of datapoints daily to power government applications.",
  },
  lib: {
    label: 'Liberty Energy',
    description: "Later, I made the transition to Liberty Energy where I built preventative maintenance systems and a fuel efficiency optimization service that delivered multi-million dollar company savings. Within these projects, I established key software engineering practices that guided the team to creating reliable and maintainable code.",
  },
  cons: {
    label: 'AI/ML Consulting',
    description: "Now, I do AI consultation, assisting companies in understanding how to wrangle and construct RAG-based infrastructure around their data.",
  },
  webd: {
    label: 'Web Development',
    description: "I am also a freelance web developer, assembling websites for multiple local businesses.",
  },
};

const EXP_ORDER: ExpKey[] = ['college', 'ib', 'lib', 'cons', 'webd'];

const EXP_CLASS = 'text-slate-400 text-lg leading-relaxed';

const VALUE_PROPS = [
  {
    icon: 'fa-layer-group',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    heading: 'Production-Grade Scale',
    body: 'Reliable systems that handle real data volumes, deployed end-to-end with monitoring and maintainability built in.',
  },
  {
    icon: 'fa-brain',
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10',
    border: 'border-indigo-400/20',
    heading: 'Modern AI Architecture',
    body: 'RAG pipelines, vector stores, and LLM integrations designed to turn your data into a business asset.',
  },
  {
    icon: 'fa-arrows-rotate',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
    border: 'border-sky-400/20',
    heading: 'Business Alignment',
    body: 'I adapt to your stack and constraints, not the other way around.',
  },
  {
    icon: 'fa-chart-line',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
    border: 'border-violet-400/20',
    heading: 'Measurable Impact',
    body: 'Multi-million dollar savings and industry-crossing results that speak for themselves.',
  },
];

function AboutTabs({ expType }: { expType: ExpKey }) {
  const { label, description } = EXPERIENCE[expType];
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-slate-100 font-semibold text-xl">{label}</h3>
      </div>
      <p className={EXP_CLASS}>{description}</p>
    </div>
  );
}

function AboutPage() {
  const [activeExp, setActiveExp] = useState<ExpKey>('college');

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100">

      <SiteNavBar />

      {/* ── Hero ── */}
      <section
        className="pt-32 pb-20 px-8 relative overflow-hidden text-center"
        style={{
          background: `
            radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 85% 20%, rgba(6, 182, 212, 0.10) 0%, transparent 45%)
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
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-cyan-400/70 font-mono text-sm tracking-[0.2em] uppercase mb-6 animate-fade-in-up">
            Get to know me
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-100 mb-6 animate-fade-in-up">
            About Me
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed animate-fade-in-up-delay">
            AI/ML Engineer with 5+ years building production systems across energy, government, and scientific research.
          </p>
        </div>
      </section>

      {/* ── Bio + Photo ── */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <p className="text-cyan-400/70 font-mono text-xs tracking-[0.2em] uppercase mb-3">Background</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6">The Story</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              I'm an AI/ML engineer with about five years of experience building production systems
              involving machine learning, data pipelines, and cloud deployment. My background includes
              work in energy, government, and scientific research environments.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              Most recently, I've advised a large global enterprise on architecting a knowledge layer
              to leverage AI for their business. I bring a rigorous scientific mindset to every
              engineering problem I touch.
            </p>
          </div>
          <div className="animate-fade-in-up-delay flex justify-center md:justify-end">
            <div className="rounded-2xl ring-1 ring-cyan-400/30 shadow-[0_0_40px_rgba(6,182,212,0.15)] overflow-hidden max-w-xs w-full">
              <img src={headshot} alt="Ryan Abbott" className="w-full object-cover rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="py-20 px-8 border-y border-slate-800 bg-slate-900/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-cyan-400/70 font-mono text-xs tracking-[0.2em] uppercase mb-3">Where I've been</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Experience</h2>
          </div>
          <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start">
            <div className="flex flex-col gap-1 border-l border-slate-800">
              {EXP_ORDER.map(key => (
                <TabButton
                  key={key}
                  text={EXPERIENCE[key].label}
                  onClick={() => setActiveExp(key)}
                  isActive={activeExp === key}
                />
              ))}
            </div>
            <div
              key={activeExp}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 animate-fade-in-up min-h-[180px]"
            >
              <AboutTabs expType={activeExp} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Value Props ── */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-cyan-400/70 font-mono text-xs tracking-[0.2em] uppercase mb-3">Why work with me</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100">What I Bring</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up-delay">
            {VALUE_PROPS.map(card => (
              <div
                key={card.heading}
                className={`${card.bg} border ${card.border} rounded-xl p-6 flex flex-col hover:scale-105 transition-all duration-200 cursor-default`}
              >
<h3 className="text-slate-100 font-semibold text-lg mb-2">{card.heading}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
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

export default AboutPage;
