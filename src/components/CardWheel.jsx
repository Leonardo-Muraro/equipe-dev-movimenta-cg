import { useCallback, useEffect, useRef } from 'react';
import './CardWheel.css';

// Roda vertical leve, feita sem bibliotecas:
// - a rolagem é a NATIVA do navegador (dedo, roda do mouse, teclado), com scroll-snap
//   segurando um card por vez no centro; o celular cuida do arrasto e do embalo
// - a cada quadro de rolagem só os cards perto do centro recebem a curva da roda
//   (transform + opacity, que a GPU anima barato); sem blur
//
// props: items, renderItem(item, index), getKey(item, index), onChange(index), tilt (graus)
export default function CardWheel({ items, renderItem, getKey, onChange, tilt = 12, ariaLabel = 'Lista' }) {
  const scrollerRef = useRef(null);
  const itemRefs = useRef([]);
  const activeRef = useRef(-1);
  const rafRef = useRef(0);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const layout = useCallback(() => {
    rafRef.current = 0;
    const scroller = scrollerRef.current;
    const els = itemRefs.current;
    if (!scroller || !els[0]) return;

    const row = els[0].offsetHeight;
    // posição contínua da roda: 0 = primeiro card no centro, 1 = segundo...
    const pos = scroller.scrollTop / row;
    const tiltRad = (tilt * Math.PI) / 180;
    const radius = row / tiltRad;

    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!el) continue;
      const d = i - pos;
      const dist = Math.abs(d);
      if (dist > 2.6) {
        // longe do centro: some e não gasta nada
        if (el.style.opacity !== '0') {
          el.style.opacity = '0';
          el.style.transform = '';
        }
        continue;
      }
      // mesma geometria de uma roda: os cards seguem um arco, giram e encolhem
      const ang = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tiltRad));
      const x = -radius * (1 - Math.cos(ang));
      const y = radius * Math.sin(ang) - d * row; // corrige a posição reta do layout para o arco
      const p = Math.max(0, 1 - Math.min(dist, 1));
      const scale = 0.84 + 0.16 * p;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${((ang * 180) / Math.PI).toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      el.style.opacity = String(Math.max(0.1, 1 - dist * 0.38).toFixed(3));
      el.style.zIndex = String(10 - Math.round(dist * 2));
    }

    const index = Math.max(0, Math.min(items.length - 1, Math.round(pos)));
    if (index !== activeRef.current) {
      activeRef.current = index;
      els.forEach((el, i) => el?.classList.toggle('is-active', i === index));
      onChangeRef.current?.(index);
    }
  }, [items.length, tilt]);

  const schedule = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(layout);
  }, [layout]);

  // Espaço em cima e embaixo para o primeiro e o último card poderem ficar no centro
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;
    const pad = () => {
      const row = itemRefs.current[0]?.offsetHeight || 0;
      const space = Math.max(0, (scroller.clientHeight - row) / 2);
      scroller.style.setProperty('--wheel-pad', `${space}px`);
      schedule();
    };
    pad();
    const ro = new ResizeObserver(pad);
    ro.observe(scroller);
    if (itemRefs.current[0]) ro.observe(itemRefs.current[0]);
    scroller.addEventListener('scroll', schedule, { passive: true });
    return () => {
      ro.disconnect();
      scroller.removeEventListener('scroll', schedule);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [schedule]);

  const goTo = index => {
    const scroller = scrollerRef.current;
    const row = itemRefs.current[0]?.offsetHeight || 0;
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    scroller?.scrollTo({ top: clamped * row, behavior: 'smooth' });
  };

  // Setas do teclado: um card por vez
  const onKeyDown = e => {
    const delta = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    goTo(Math.max(activeRef.current, 0) + delta);
  };

  return (
    <div
      ref={scrollerRef}
      className="card-wheel"
      role="listbox"
      tabIndex={0}
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
    >
      {items.map((item, i) => (
        <div
          key={getKey ? getKey(item, i) : i}
          ref={el => {
            itemRefs.current[i] = el;
          }}
          className="card-wheel__item"
          role="option"
          aria-selected={activeRef.current === i}
          // tocar num card de cima/baixo traz ele para o centro
          onClick={() => {
            if (i !== activeRef.current) goTo(i);
          }}
        >
          {renderItem(item, i)}
        </div>
      ))}
    </div>
  );
}
