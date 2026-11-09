import { useState } from 'react';
import CardWheel from '../components/CardWheel';
import LiteProfileCard from '../components/LiteProfileCard';
import { site, team } from '../data/team';
import './EquipePage.css';
import './EquipeWheelPage.css';

// Página de TESTE: cards de perfil numa roda vertical leve (rolagem nativa, sem bibliotecas)
export default function EquipeWheelPage() {
  const [active, setActive] = useState(0);
  const member = team[active];

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
          Deslize para cima ou para baixo
        </p>
      </div>

      <main className="wheel-page__stage">
        <CardWheel
          items={team}
          getKey={m => m.nome}
          renderItem={(m, i) => <LiteProfileCard member={m} eager={i < 2} />}
          onChange={setActive}
          tilt={12}
          ariaLabel="Integrantes do time"
        />
      </main>
    </div>
  );
}
