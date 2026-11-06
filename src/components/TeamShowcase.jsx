import { useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import InfiniteMenu from './InfiniteMenu';
import { SocialLinks } from './SocialIcons';
import './TeamShowcase.css';

// Endereço da página de detalhes: o configurado em team.js ou equipe.html ao lado da página atual
const resolveDetailsUrl = configured => {
  if (configured) return configured;
  try {
    const url = new URL('equipe.html', window.location.href);
    url.hash = '';
    url.search = '';
    return url.href;
  } catch {
    return 'equipe.html';
  }
};

const prettyUrl = href => href.replace(/^https?:\/\//, '').replace(/\/$/, '');

export default function TeamShowcase({ team, detailsUrl, onActiveChange }) {
  const items = useMemo(
    () => team.map(m => ({ image: m.image, title: m.nomeCurto, description: m.proficiencias.join(' · ') })),
    [team]
  );
  const qrUrl = useMemo(() => resolveDetailsUrl(detailsUrl), [detailsUrl]);

  // Conteúdo sobreposto ao menu: nome à esquerda da foto, ícones dentro da foto (lado direito)
  // e proficiências à direita da foto.
  const renderInfo = (_item, index, moving) => {
    const m = team[index];
    return (
      <div className="showcase-info" data-moving={moving}>
        <h3 className="showcase-info__name">{m.nomeCurto}</h3>

        <SocialLinks socials={m.socials} name={m.nome} className="showcase-info__socials" size={24} />

        <div className="showcase-info__skills">
          <span className="showcase-info__label">Proficiências</span>
          {m.proficiencias.length ? (
            <ul>
              {m.proficiencias.map(p => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          ) : (
            <p className="showcase-info__empty">Em breve</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="showcase">
      <div className="showcase__menu">
        <InfiniteMenu
          items={items}
          count={120}
          tileSize={0.66}
          zoom={1.75}
          autoplay={3.5}
          grayscale
          dim={0.55}
          backgroundColor="transparent"
          renderInfo={renderInfo}
          onActiveChange={(_item, index) => onActiveChange?.(index)}
        />
      </div>

      <aside className="showcase__qr">
        <p className="showcase__qr-title">Conheça cada um</p>
        <div className="showcase__qr-code">
          <QRCodeSVG
            value={qrUrl}
            size={512}
            level="M"
            marginSize={2}
            bgColor="#f4f4f5"
            fgColor="#0b0a10"
            title="QR Code para a página de detalhes do time"
          />
        </div>
        <p className="showcase__qr-hint">Aponte a câmera do celular</p>
        <a className="showcase__qr-link" href={qrUrl}>
          <span className="showcase__qr-url">{prettyUrl(qrUrl)}</span>
          <span className="showcase__qr-cta">Ver detalhes do time</span>
        </a>
      </aside>
    </div>
  );
}
