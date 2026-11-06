import { useEffect, useRef, useState } from 'react';
import OptionWheel from '../components/OptionWheel';
import ProfileCard from '../components/ProfileCard';
import { site, team } from '../data/team';
import './EquipePage.css';
import './EquipeWheelPage.css';

// Página de TESTE: os cards de perfil dentro de um Option Wheel (arrastar para cima/baixo)
export default function EquipeWheelPage() {
  const [active, setActive] = useState(0);
  const member = team[active];

  // A altura de cada "linha" da roda acompanha a altura real do card. Os vizinhos encolhem
  // (scale 0.84), então 0.95 da altura deixa um respiro pequeno e mostra mais da roda
  const probeRef = useRef(null);
  const [rowHeight, setRowHeight] = useState(560);
  useEffect(() => {
    const el = probeRef.current;
    if (!el) return undefined;
    const update = () => setRowHeight(Math.round(el.getBoundingClientRect().height * 0.95));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const card = (m, selected) => (
    <ProfileCard
      avatarUrl={m.image}
      miniAvatarUrl={m.image}
      name={m.nome}
      title={m.proficiencias.length ? m.proficiencias.join(' · ') : 'Proficiências em breve'}
      handle={m.handle}
      status={m.handle ? null : 'Time Dev'}
      statusColor={m.accent}
      socials={m.socials}
      intro={false}
      enableTilt={selected}
      holo={0.7}
      glare={0.45}
      radius={22}
      className="wheel-profile"
    />
  );

  return (
    <div className="equipe wheel-page" style={{ '--member-accent': member.accent }}>
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

      <div className="wheel-page__intro">
        <h1 className="wheel-page__title">Conheça nosso time</h1>
        <p className="wheel-page__hint">
          <span className="wheel-page__count">
            {String(active + 1).padStart(2, '0')} / {String(team.length).padStart(2, '0')}
          </span>
          Arraste para cima ou para baixo
        </p>
      </div>

      <main className="wheel-page__stage">
        <OptionWheel
          items={team}
          getKey={m => m.nome}
          renderItem={(m, _i, selected) => <div className="wheel-card">{card(m, selected)}</div>}
          rowHeight={rowHeight}
          defaultSelected={0}
          loop
          side="left"
          tilt={12}
          curve={1}
          blur={1.2}
          fade={0.32}
          minOpacity={0.08}
          smoothing={220}
          inset={0}
          onChange={setActive}
          ariaLabel="Integrantes do time"
          className="team-wheel"
        />

        {/* card invisível só para medir a altura real e calcular o espaçamento da roda */}
        <div className="wheel-probe" aria-hidden="true" ref={probeRef}>
          {card(team[0], false)}
        </div>
      </main>
    </div>
  );
}
