import { motion } from 'motion/react';
import { SocialLinks } from '../components/SocialIcons';
import { site, team } from '../data/team';
import './EquipePage.css';

const ease = [0.22, 1, 0.36, 1];

// Texto de cada botão social: @ do Instagram, usuário do GitHub, "LinkedIn"
const socialLabel = (type, url) => {
  const path = url.replace(/[?#].*$/, '').replace(/\/$/, '').split('/').pop();
  if (type === 'instagram') return `@${path}`;
  if (type === 'github') return path;
  return 'LinkedIn';
};

export default function EquipePage() {
  return (
    <div className="equipe">
      <header className="equipe__top">
        <a className="equipe__back" href="./">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5m0 0 6-6m-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Início
        </a>
        <span className="brand">
          <span className="brand-dot" />
          {site.teamName}
        </span>
      </header>

      <div className="equipe__intro">
        <span className="section-label">O time</span>
        <h1 className="equipe__title">Conheça cada um</h1>
        <p className="equipe__sub">
          {team.length} pessoas, suas especialidades e onde encontrar cada uma.
        </p>
      </div>

      <main className="equipe__grid">
        {team.map((m, i) => (
          <motion.article
            key={m.nome}
            className="member"
            style={{ '--member-accent': m.accent }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease }}
          >
            <div className="member__photo">
              <img src={m.image} alt={`Foto de ${m.nome}`} loading={i < 2 ? 'eager' : 'lazy'} width="800" height="1000" />
            </div>

            <div className="member__body">
              <h2 className="member__name">{m.nome}</h2>

              <div className="member__skills">
                <span className="member__label">Proficiências</span>
                {m.proficiencias.length ? (
                  <ul>
                    {m.proficiencias.map(p => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="member__empty">Em breve</p>
                )}
              </div>

              <SocialLinks
                socials={m.socials}
                name={m.nome}
                className="member__socials"
                size={20}
                showLabel
                renderLabel={socialLabel}
              />
            </div>
          </motion.article>
        ))}
      </main>

      <footer className="footer">
        <span>
          {site.teamName} · {new Date().getFullYear()}
        </span>
        <span className="footer-muted">Feito com café e React</span>
      </footer>
    </div>
  );
}
