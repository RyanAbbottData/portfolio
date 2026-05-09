import headshot from '../assets/headshot.png';

function AboutPage() {

    return (
        <div className="descr-and-image bg-slate-950 min-h-screen text-slate-100 animate-fade-in-up-delay flex gap-10">
            <div className="descrp flex-1 flex flex-col gap-y-8 items-center">
                <p className="welcome-title text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-100 mb-5 animate-fade-in-up">About Me</p>
                <br/>
                <br/>
                <div className="about-me font-mono text-xl max-w-md">
                    <p className='welcome-txt text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up-delay'>I’m an AI/ML engineer with about five years of experience building production systems involving machine learning, data pipelines, and cloud deployment. My background includes work in energy, government, and scientific research environments. Most recently, I've advised a large global enterprise on architecting a knowledge layer to leverage AI for their business.</p>
                </div>
                <br/>
                <br/>
                <div className="first-fact flex-1 flex-col font-mono text-left text-3xl">
                    <ul>
                        <li>- I deliver reliable production-grade systems at scale that produce meaningful results.</li>
                        <li>- I build and scheme modern AI architectures that drive business growth.</li>
                        <li>- I adapt and align to your business needs</li>
                        <li className="font-bold">- I make your business better.</li>
                    </ul>
                </div>
                <div className='history font-mono text-xl'>
                    <div className="about-me-2 flex-1 text-center max-w-md">
                        <p>With a Bachelor's of Science in Astrophysics from the University of Oklahoma, I have a strong quantitative foundation. When in college, I built and published a mobile application in Kotlin. As a senior, I fused the power of ML with astrophysics to identify rare stellar objects previously misidentified in the literature. After graduating, I jumped into industry</p>
                    </div>
                    <br/>
                    <div className="about-me-ib flex-1 text-center max-w-md">
                        <p>I worked as a Data Scientist and Data Engineer at IntelliBridge, an Agile Defense Company, for 2+ years. While there, I developed, containerized, and deployed a novel data matching service powered by ML. This functionality was leveraged both in internal data pipelines and in graph database creation. I built robust and reliable data pipelines in Databricks, delivering millions of datapoints daily to power government applications.</p>
                    </div>
                    <br/>
                    <div className="about-me-le flex-1 text-center max-w-md">
                        <p>Later, I made the transition to Liberty Energy where I build preventative maintenance systems and a fuel efficiency optimization service that delivered multi-million dollar company savings. Within these projects, I established key software engineering practices that guided the team to creating reliable and maintainable code.</p>
                    </div>
                    <br/>
                    <div className="about-me-now flex-1 text-center max-w-md">
                        <p>Now, I do AI consultation, assisting companies in understanding how to wrangle and construct RAG-based infrastructure around their data. I am also a freelance web developer, assembling websites for multiple local businesses.</p>
                    </div>
                </div>
            </div>
            <div className="img-sec ml-auto mr-20">
                <img className="img" src={headshot} alt="Ryan Abbott" />
            </div>
        </div>
    )

}

export default AboutPage