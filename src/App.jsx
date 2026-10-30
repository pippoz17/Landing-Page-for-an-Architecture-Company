import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Instagram, Linkedin, MoveUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Reveal from './components/Reveal';
import Counter from './components/Counter';
import ProjectModal from './components/ProjectModal';
import { journal, projects, services } from './data/content';

const principles = [
  ['01', 'Context', 'Every project begins with understanding its surroundings.'],
  ['02', 'Purpose', 'Every space is designed around the people who experience it.'],
  ['03', 'Materiality', 'We celebrate natural textures, honest materials, and craftsmanship.'],
  ['04', 'Sustainability', 'We create environmentally conscious spaces that stand the test of time.'],
];

function SectionLabel({ children, light = false }) {
  return <div className={`section-label ${light ? 'section-label-light' : ''}`}><span className="label-dot" />{children}</div>;
}

function ProjectCard({ project, onOpen }) {
  return (
    <button className={`project-card project-${project.size}`} onClick={() => onOpen(project)} aria-label={`View ${project.name} project details`}>
      <div className="project-image-wrap"><img src={project.image} alt={project.alt} loading="lazy" /><span className="project-index">{project.number} / 04</span><span className="project-open"><ArrowUpRight size={21} /></span></div>
      <div className="project-info"><div><h3>{project.name}</h3><p>{project.location} <span>·</span> {project.category}</p></div><span className="project-year">{project.year}</span></div>
    </button>
  );
}

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [formStatus, setFormStatus] = useState('idle');
  const [formValues, setFormValues] = useState({ name: '', email: '', type: '', message: '' });
  const [formError, setFormError] = useState('');

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
    setFormError('');
    if (formStatus === 'success') setFormStatus('idle');
  };

  const submitEnquiry = (event) => {
    event.preventDefault();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim());
    if (!formValues.name.trim() || !emailIsValid || !formValues.type || formValues.message.trim().length < 12) {
      setFormError('Please complete every field. Enter a valid email and a message of at least 12 characters.');
      return;
    }
    setFormStatus('success');
  };

  return (
    <>
      <Header />
      <main>
        <section className="hero" id="home">
          <div className="hero-image" />
          <div className="hero-shade" />
          <div className="hero-inner container">
            <motion.div className="hero-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}><span className="label-dot" /> INDEPENDENT ARCHITECTURE & DESIGN STUDIO</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 1, ease: [0.22, 1, 0.36, 1] }}>Architecture is<br />the art of <em>living.</em></motion.h1>
            <motion.div className="hero-bottom" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.8 }}>
              <p className="hero-copy">We design meaningful spaces that connect people, nature, and the built environment.</p>
              <div className="hero-actions"><a className="button button-light" href="#projects">Explore our work <ArrowUpRight size={16} /></a><a className="hero-text-link" href="#contact">Start a project <span>↗</span></a></div>
              <div className="hero-location"><span>CHENNAI, INDIA</span><span>EST. 2011</span></div>
            </motion.div>
          </div>
          <a className="scroll-cue" href="#studio"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
          <div className="hero-side-note">SPACES THAT SHAPE THE WAY WE LIVE.</div>
        </section>

        <section className="studio-section section-pad" id="studio">
          <div className="container">
            <div className="studio-topline"><SectionLabel>01 / THE STUDIO</SectionLabel><span className="side-caption">THOUGHTFUL SPACES. LASTING IMPACT.</span></div>
            <div className="studio-grid">
              <Reveal className="studio-heading-wrap"><h2 className="display-heading">Designing spaces.<br /><em>Creating experiences.</em></h2><div className="studio-intro"><p>We believe architecture is more than the creation of buildings. It is the thoughtful composition of spaces, materials, light, and human experiences.</p><a className="text-link" href="#approach">Discover our studio <ArrowUpRight size={15} /></a></div></Reveal>
              <Reveal className="studio-visual" delay={0.12}><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=88" alt="Quiet modern living space framed by natural materials and daylight" loading="lazy" /><span className="image-caption">01 — LIGHT, SPACE & MATERIAL</span></Reveal>
              <Reveal className="studio-detail" delay={0.2}><img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85" alt="Close detail of warm natural wood and stone finishes" loading="lazy" /><p>Our work is grounded in a simple belief: the best spaces feel as though they could not have been made any other way.</p></Reveal>
            </div>
          </div>
        </section>

        <section className="projects-section section-pad" id="projects">
          <div className="container">
            <div className="section-heading-row"><div><SectionLabel>02 / SELECTED WORK</SectionLabel><Reveal><h2 className="display-heading">Selected <em>works.</em></h2></Reveal></div><p className="section-lede">A collection of spaces shaped by purpose, context, and imagination.</p></div>
            <div className="projects-grid">{projects.map((project, index) => <Reveal key={project.id} delay={index * 0.07}><ProjectCard project={project} onOpen={setActiveProject} /></Reveal>)}</div>
            <div className="projects-foot"><span>FOUR PROJECTS / A CONTINUING PRACTICE</span><a className="text-link" href="#contact">Discuss a project <ArrowUpRight size={15} /></a></div>
          </div>
        </section>

        <section className="approach-section section-pad" id="approach">
          <div className="container">
            <div className="approach-intro"><SectionLabel>03 / OUR APPROACH</SectionLabel><Reveal><h2 className="display-heading">Thoughtful by design.<br /><em>Timeless by nature.</em></h2></Reveal><p>Good work comes from asking better questions, looking closer, and making every decision count.</p></div>
            <div className="principles-list">{principles.map(([number, title, description], index) => <Reveal key={number} delay={index * 0.04} className="principle-row"><span className="principle-number">{number}</span><h3>{title}</h3><p>{description}</p><span className="principle-mark">↗</span></Reveal>)}</div>
          </div>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="container services-layout">
            <div className="services-heading"><SectionLabel>04 / CAPABILITIES</SectionLabel><h2 className="display-heading">What<br /><em>we do.</em></h2><p>From the first conversation to the final detail, we bring clarity and care to every scale of design.</p><a className="text-link" href="#contact">Work with us <ArrowUpRight size={15} /></a></div>
            <div className="services-list">{services.map((service, index) => <div className={`service-item ${activeService === index ? 'service-active' : ''}`} key={service.number} onMouseEnter={() => setActiveService(index)} onMouseLeave={() => setActiveService(null)}><button onClick={() => setActiveService(activeService === index ? null : index)} aria-expanded={activeService === index}><span className="service-number">{service.number}</span><span className="service-title">{service.title}</span><span className="service-arrow"><ArrowUpRight size={20} /></span></button><div className="service-description"><p>{service.description}</p></div></div>)}</div>
          </div>
        </section>

        <section className="journal-section section-pad" id="journal">
          <div className="container">
            <div className="section-heading-row journal-heading"><div><SectionLabel>05 / NOTES FROM THE STUDIO</SectionLabel><h2 className="display-heading">Ideas in <em>practice.</em></h2></div><p className="section-lede">Observations, material studies and thoughts that inform the way we work.</p></div>
            <div className="journal-grid">{journal.map((item, index) => <Reveal key={item.title} delay={index * 0.08} className="journal-card"><a href="#contact" aria-label={`Discuss: ${item.title}`}><div className="journal-image"><img src={item.image} alt={item.alt} loading="lazy" /><span><ArrowUpRight size={18} /></span></div><p className="journal-date">{item.date}</p><h3>{item.title}</h3><span className="journal-category">{item.category}</span></a></Reveal>)}</div>
          </div>
        </section>

        <section className="stats-section">
          <div className="container"><div className="stats-top"><SectionLabel light>06 / THE PRACTICE</SectionLabel><p>A considered body of work, built one collaboration at a time.</p></div><div className="stats-grid"><Counter value={15} suffix="+" label="Years of experience" /><Counter value={48} label="Completed projects" /><Counter value={12} label="Industry awards" /><Counter value={8} label="Cities reached" /></div><div className="stats-bottom"><span>INDEPENDENT THINKING. COLLABORATIVE MAKING.</span><span>2011 — 2026</span></div></div>
        </section>

        <section className="statement-section">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90" alt="Sculptural contemporary architecture in warm evening light" loading="lazy" />
          <div className="statement-overlay" />
          <Reveal className="statement-content"><SectionLabel light>DESIGN AS A WAY OF THINKING</SectionLabel><h2>Good architecture doesn't just occupy space. <em>It gives space meaning.</em></h2><span className="statement-credit">ATELIER / DESIGN PHILOSOPHY</span></Reveal>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-intro"><SectionLabel>07 / BEGIN A CONVERSATION</SectionLabel><h2 className="display-heading">Have a space<br /><em>in mind?</em></h2><p>Let's create something meaningful together.</p><div className="contact-details"><div><span>WRITE TO US</span><a href="mailto:hello@atelierstudio.com">hello@atelierstudio.com <ArrowUpRight size={14} /></a></div><div><span>FIND US</span><p>Chennai, India</p></div><div><span>FOLLOW ALONG</span><div className="social-links"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a></div></div></div></div>
              <div className="contact-form-wrap"><form className="contact-form" onSubmit={submitEnquiry} noValidate>
                <div className="form-row"><label>Your name<input name="name" value={formValues.name} onChange={updateField} placeholder="Name" autoComplete="name" /></label><label>Email address<input name="email" type="email" value={formValues.email} onChange={updateField} placeholder="Email" autoComplete="email" /></label></div>
                <label>What are you looking to create?<select name="type" value={formValues.type} onChange={updateField}><option value="">Select a project type</option><option>Residential architecture</option><option>Interior architecture</option><option>Commercial project</option><option>Hospitality</option><option>Landscape design</option><option>Consultation</option><option>Something else</option></select></label>
                <label>Tell us a little about it<textarea name="message" value={formValues.message} onChange={updateField} placeholder="A few details about your project, site or ideas..." rows="4" /></label>
                {formError && <p className="form-error" role="alert">{formError}</p>}
                {formStatus === 'success' && <div className="form-success" role="status"><span><Check size={16} /></span><div><strong>Enquiry details are ready.</strong><p>This form is a local website preview. Your information has not been sent to ATELIER.</p></div></div>}
                <button className="button button-dark form-submit" type="submit">Submit enquiry <ArrowUpRight size={16} /></button>
                <p className="form-note">A little about your project is all we need to begin.</p>
              </form></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top"><div className="footer-brand"><a className="footer-wordmark" href="#home">ATELIER<span>.</span></a><p>Architecture, interiors and thoughtful spaces for the way we live.</p></div><div className="footer-nav"><div><span>EXPLORE</span><a href="#studio">Studio</a><a href="#projects">Projects</a><a href="#services">Services</a><a href="#journal">Journal</a></div><div><span>GET IN TOUCH</span><a href="mailto:hello@atelierstudio.com">Email us</a><a href="#contact">Start a project</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div></div>
          <div className="footer-statement">Designed with intention.<br /><em>Built to inspire.</em></div>
          <div className="footer-bottom"><span>© 2026 ATELIER — ARCHITECTURE & DESIGN</span><span>CHENNAI, INDIA</span><a href="#home">BACK TO TOP ↑</a></div>
        </div>
      </footer>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
