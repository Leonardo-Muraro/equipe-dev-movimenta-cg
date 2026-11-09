import { SocialLinks } from './SocialIcons';
import './LiteProfileCard.css';

// Card de perfil leve: mesmo visual do ProfileCard (foto, nome, proficiências, rodapé com @ e redes),
// mas sem camadas holográficas, blend modes nem tilt 3D — só CSS estático, barato para o celular.
export default function LiteProfileCard({ member, eager = false }) {
  const m = member;
  return (
    <article className="lite-card" style={{ '--member-accent': m.accent }}>
      <div className="lite-card__photo">
        <img
          src={m.image}
          alt={`Foto de ${m.nome}`}
          width="800"
          height="1000"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable="false"
        />
        <div className="lite-card__info">
          <h2 className="lite-card__name">{m.nome}</h2>
          <p className="lite-card__skills">
            {m.proficiencias.length ? m.proficiencias.join(' · ') : 'Proficiências em breve'}
          </p>
        </div>
      </div>

      <footer className="lite-card__foot">
        <img className="lite-card__avatar" src={m.image} alt="" width="36" height="36" loading="lazy" decoding="async" />
        <span className="lite-card__handle">{m.handle ? `@${m.handle}` : 'Time Dev'}</span>
        <SocialLinks socials={m.socials} name={m.nome} className="lite-card__socials" size={18} />
      </footer>
    </article>
  );
}
