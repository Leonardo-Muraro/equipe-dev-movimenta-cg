import { HugeiconsIcon } from '@hugeicons/react';
import { InstagramIcon, Linkedin01Icon, Github01Icon } from '@hugeicons/core-free-icons';

export const SOCIAL_LABELS = { instagram: 'Instagram', linkedin: 'LinkedIn', github: 'GitHub' };
const ICONS = { instagram: InstagramIcon, linkedin: Linkedin01Icon, github: Github01Icon };

export function SocialIcon({ type, size = 22 }) {
  return <HugeiconsIcon icon={ICONS[type]} size={size} strokeWidth={1.8} />;
}

// Lista de links sociais; cada link recebe a classe `${className}__item`
export function SocialLinks({ socials, name, className, size, showLabel = false, renderLabel }) {
  if (!socials?.length) return null;
  return (
    <div className={className}>
      {socials.map(({ type, url }) => (
        <a
          key={type}
          className={`${className}__item`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${SOCIAL_LABELS[type]} de ${name}`}
          title={SOCIAL_LABELS[type]}
        >
          <SocialIcon type={type} size={size} />
          {showLabel && <span>{renderLabel ? renderLabel(type, url) : SOCIAL_LABELS[type]}</span>}
        </a>
      ))}
    </div>
  );
}
