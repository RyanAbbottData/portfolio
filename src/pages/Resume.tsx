import { Document, Page, pdfjs } from 'react-pdf';
import SiteNavBar from '../utils/navbar';
import resumePdf from '../assets/Ryan_Abbott_Resume.pdf';
import { LinkButton } from '../utils/links';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function Resume() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
            <SiteNavBar />

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
                        My professional history
                    </p>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-100 mb-6 animate-fade-in-up">
                        Resume
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed animate-fade-in-up-delay">
                        Download a copy of my latest resume.
                    </p>
                </div>
            </section>

            <section className="py-20 px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8 animate-fade-in-up">
                        <p className="text-cyan-400/70 font-mono text-xs tracking-[0.2em] uppercase mb-3">Document</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-6">Full Resume</h2>
                        <div className="flex justify-center">
                            <LinkButton href={resumePdf} download="Ryan_Abbott_Resume.pdf" label="Download PDF" icon="fa-solid fa-download" variant="primary" />
                        </div>
                    </div>
                    <div className="animate-fade-in-up-delay rounded-xl overflow-hidden border border-slate-700/50 shadow-[0_0_40px_rgba(6,182,212,0.08)] flex justify-center">
                        <Document
                            file={resumePdf}
                            loading={<div className="text-slate-400 p-8 font-mono text-sm">Loading...</div>}
                        >
                            <Page
                                pageNumber={1}
                                width={800}
                                renderAnnotationLayer={false}
                                renderTextLayer={false}
                            />
                        </Document>
                    </div>
                </div>
            </section>

            <footer className="border-t border-slate-800 py-6 text-center">
                <p className="text-slate-600 font-mono text-xs">
                    Built with React + Tailwind · Ryan Abbott © {new Date().getFullYear()}
                </p>
            </footer>
        </div>
    );
}

export default Resume;
