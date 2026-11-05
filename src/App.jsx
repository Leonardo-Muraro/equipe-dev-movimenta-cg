import { useState } from 'react';
import { motion } from 'motion/react';
import GradientASCII from './components/GradientASCII';
import BlurText from './components/BlurText';
import ShinyText from './components/ShinyText';
import CircularCarousel from './components/CircularCarousel';
import ProfileCard from './components/ProfileCard';
import { site, team } from './data/team';

const ease = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, delay, ease }
});

// Caracteres binários para os fundos ASCII (do mais fraco ao mais forte)
const BINARY = ' 01';
const HERO_COLORS = ['#3b1fd1', '#1fa2ff', '#7cff67', '#f4f4f5'];

const slides = team.map(m => ({ src: m.image, alt: `Foto de ${m.nome}`, title: m.nomeCurto }));

export default function App() {
  const [active, setActive] = useState(0);
  const member = team[active];
  const scrollToTeam = () =>
    document.getElementById('time')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="page">
      {/* ───────── HERO ───────── */}
      <header className="hero">
        <div className="hero-bg" aria-hidden="true">
          <GradientASCII
            shape="rise"
            flip
            characters={BINARY}
            density={0.51}
            colors={HERO_COLORS}
            cellSize={16}
            glyphOpacity={0.8}
            gradientOpacity={0.9}
          />
        </div>
        <div className="hero-fade" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        <nav className="nav">
          <span className="brand">
            <span className="brand-dot" />
            {site.teamName}
          </span>
          <button className="nav-link" onClick={scrollToTeam}>
            Conheça o time
          </button>
        </nav>

        <div className="hero-content">
          <motion.div {...fadeUp(0.1)} className="eyebrow">
            <ShinyText text={`${team.length} desenvolvedores · ${site.teamName}`} speed={3} color="#a1a1aa" shineColor="#ffffff" />
          </motion.div>

          <div className="hero-title" role="heading" aria-level="1">
            {site.headline.map(line => (
              <BlurText key={line} text={line} delay={140} animateBy="words" direction="top" className="hero-line" />
            ))}
          </div>

          <motion.p {...fadeUp(0.9)} className="hero-tagline">
            {site.tagline}
          </motion.p>

          <motion.button {...fadeUp(1.1)} className="cta" onClick={scrollToTeam}>
            Ver o time
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5v14m0 0-6-6m6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>

        <motion.div
          className="scroll-hint"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <span />
        </motion.div>
      </header>

      {/* ───────── TIME ───────── */}
      <section className="team-section" style={{ '--member-accent': member.accent }}>
        {/* Fundo: grade de pontos interativa + brilho na cor do integrante em destaque */}
        <div className="team-bg" aria-hidden="true">
          <GradientASCII
            shape="rise"
            characters={BINARY}
            density={0.51}
            colors={['#0b0a10', member.accent, '#ffffff']}
            cellSize={16}
            glyphOpacity={0.8}
            gradientOpacity={0.85}
          />
          <div className="team-glow" />
          <div className="team-bg-fade" />
        </div>

      <main id="time" className="team">
        <div className="team-head">
          <motion.span {...fadeUp(0)} className="section-label">
            O time
          </motion.span>
          <motion.h2 {...fadeUp(0.08)} className="section-title">
            Quem faz acontecer
          </motion.h2>
          <motion.p {...fadeUp(0.16)} className="section-sub">
            Arraste o carrossel ou use as setas do teclado.
          </motion.p>
        </div>

        <motion.div
          className="team-stage"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.1, ease }}
        >
          <div className="carousel-wrap">
            <CircularCarousel
              items={slides}
              preset="cylinder"
              cardWidth={200}
              aspectRatio={0.8}
              gap={28}
              autoplay="step"
              interval={4}
              cornerRadius={18}
              fadeColor="#0b0a10"
              depthFade={0.6}
              captions
              onChange={setActive}
            />
          </div>

          <div className="profile-wrap" aria-live="polite">
            {/* troca do card: a key nova remonta o card com animação de entrada (sem travar em trocas rápidas) */}
              <motion.div
                key={member.nome}
                initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.45, ease }}
              >
                <ProfileCard
                  avatarUrl={member.image}
                  miniAvatarUrl={member.image}
                  name={member.nome}
                  title=""
                  handle={member.handle}
                  status={member.handle ? null : 'Time Dev'}
                  statusColor={member.accent}
                  socials={member.socials}
                  intro={false}
                  holo={0.7}
                  glare={0.45}
                  radius={20}
                />
              </motion.div>
          </div>
        </motion.div>
      </main>
      </section>

      <footer className="footer">
        <span>
          {site.teamName} · {new Date().getFullYear()}
        </span>
        <span className="footer-muted">Feito com café e React</span>
      </footer>
    </div>
  );
}
