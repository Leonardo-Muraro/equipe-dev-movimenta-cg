import { useEffect, useMemo, useRef, useState } from 'react';
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

// Abaixo desta largura o QR vai para baixo do menu e a esfera fica centralizada
const WIDE = 1000;

export default function TeamShowcase({ team, detailsUrl, onActiveChange }) {
  const items = useMemo(() => team.map(m => ({ image: m.image, title: m.nomeCurto })), [team]);
  const qrUrl = useMemo(() => resolveDetailsUrl(detailsUrl), [detailsUrl]);

  // Centraliza a esfera no espaço livre à esquerda do painel do QR Code
  const stageRef = useRef(null);
  const qrRef = useRef(null);
  const [offsetX, setOffsetX] = useState(0);
  useEffect(() => {
    const stage = stageRef.current;
    const qr = qrRef.current;
    if (!stage || !qr) return undefined;
    const update = () => {
      const width = stage.clientWidth;
      if (window.innerWidth < WIDE || !width) return setOffsetX(0);
      const free = qr.getBoundingClientRect().left - stage.getBoundingClientRect().left;
      setOffsetX(Math.max(-0.6, Math.min(0, (free / 2 / width) * 2 - 1)));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(stage);
    ro.observe(qr);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  // Sobreposto à foto da frente: nome embaixo (dentro da foto) e redes no lado direito
  const renderInfo = (_item, index, moving) => {
    const m = team[index];
    return (
      <div className="showcase-info" data-moving={moving}>
        <div className="showcase-info__scrim" />
        <h3 className="showcase-info__name">{m.nomeCurto}</h3>
        <SocialLinks socials={m.socials} name={m.nome} className="showcase-info__socials" size={26} />
      </div>
    );
  };

  return (
    <div className="showcase" ref={stageRef}>
      <div className="showcase__menu">
        <InfiniteMenu
          items={items}
          count={120}
          tileSize={0.66}
          zoom={1.85}
          offsetX={offsetX}
          autoplay={4.5 /* segundos de uma troca à outra (inclui a transição) */}
          pauseOnHover={false}
          travelZoom={1.1}
          travelDuration={1.3}
          grayscale
          dim={0.55}
          backgroundColor="transparent"
          renderInfo={renderInfo}
          onActiveChange={(_item, index) => onActiveChange?.(index)}
        />
      </div>

      <aside className="showcase__qr" ref={qrRef}>
        <p className="showcase__qr-title">Conheça nosso time</p>
        <div className="showcase__qr-code">
          <QRCodeSVG
            value={qrUrl}
            size={640}
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
