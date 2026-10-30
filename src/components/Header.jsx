import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [
  ['Home', '#home'], ['Studio', '#studio'], ['Projects', '#projects'], ['Services', '#services'], ['Journal', '#journal'],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 36);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-is-open' : ''}`}>
      <a className="wordmark" href="#home" onClick={closeMenu} aria-label="ATELIER home">ATELIER<span>.</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </nav>
      <a className="header-contact" href="#contact">LET'S TALK <ArrowUpRight size={15} strokeWidth={1.6} /></a>
      <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}>
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <div className="mobile-menu" aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {links.map(([label, href], index) => <a key={label} href={href} onClick={closeMenu}><span>0{index + 1}</span>{label}</a>)}
          <a className="mobile-contact" href="#contact" onClick={closeMenu}>Start a conversation <ArrowUpRight size={18} /></a>
        </nav>
        <p>CHENNAI · INDIA</p>
      </div>
    </header>
  );
}
