import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 18, opacity: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
            <button className="modal-close" onClick={onClose} aria-label="Close project details"><X size={19} /></button>
            <div className="modal-image"><img src={project.image} alt={project.alt} /></div>
            <div className="modal-content">
              <p className="eyebrow">SELECTED WORK / {project.number}</p>
              <h2 id="modal-title">{project.name}</h2>
              <div className="modal-meta"><span>{project.category}</span><span>{project.location}</span><span>{project.year}</span></div>
              <p className="modal-description">{project.description}</p>
              <div className="modal-details">
                {project.details.map((detail) => <span key={detail}><i />{detail}</span>)}
              </div>
              <a className="text-link" href="#contact" onClick={onClose}>Discuss a similar project <ArrowUpRight size={15} /></a>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
