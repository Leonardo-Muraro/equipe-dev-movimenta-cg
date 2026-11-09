// ─────────────────────────────────────────────────────────────
//  Tudo o que é conteúdo do site fica aqui.
//  Para trocar o nome do time ou adicionar fotos, edite só este arquivo.
// ─────────────────────────────────────────────────────────────

export const site = {
  // Nome do time (aparece no topo e no rodapé)
  teamName: 'Nosso Time Dev',
  // Frase principal do hero (cada item é uma linha)
  headline: ['Oito pessoas.', 'Um só código.'],
  // Linha de apoio abaixo do título
  tagline: 'O time por trás de cada linha, cada deploy e cada café da madrugada.',
  // Endereço para onde o QR Code aponta. null = calcula sozinho (equipe.html ao lado da página atual)
  detailsUrl: null
};

// Cores de destaque usadas no brilho de cada card (hover)
const ACCENTS = ['#7cff67', '#38bdf8', '#a78bfa', '#f472b6', '#fbbf24', '#34d399', '#fb7185', '#60a5fa'];

// Para usar uma foto real: coloque o arquivo em /public/fotos/
// e preencha `foto: './fotos/nome.jpg'` (proporção 4:5). Sem foto, um placeholder é gerado.
// `nomeCurto` (opcional): como o nome aparece no carrossel. Sem ele, usa primeiro + último nome.
// `proficiencias`: etiquetas curtas da página de detalhes. Padrão: áreas primeiro
// (Front-end, Back-end, Full Stack, Banco de Dados...) e depois tecnologias (PHP, MySQL).
// Banco de dados do time é sempre MySQL: quem tem 'Banco de Dados' também leva 'MySQL'.
// Redes sociais: cole a URL completa. Deixe null para esconder o ícone daquela rede.
const members = [
  {
    nome: 'Afonso Landfeldt Panhoti',
    foto: './fotos/afonso.jpg',
    proficiencias: ['Front-end'],
    linkedin: null,
    instagram: 'https://www.instagram.com/afonsolandfeldt',
    github: 'https://github.com/motlute19'
  },
  {
    nome: 'Bruna Vilas Boas',
    nomeCurto: 'Bruna Vilas Boas',
    foto: './fotos/bruna.jpg',
    proficiencias: ['Full Stack', 'Banco de Dados', 'PHP', 'MySQL'],
    linkedin: 'https://www.linkedin.com/in/bruna-vilas-boas-2a211b382/',
    instagram: 'https://www.instagram.com/bru_vilas',
    github: 'https://github.com/BrunaVilas'
  },
  {
    nome: 'Caio Alonso Ferreira',
    foto: './fotos/caio.jpg',
    proficiencias: ['Back-end', 'Banco de Dados', 'PHP', 'MySQL'],
    linkedin: 'https://www.linkedin.com/in/caio-alonso-ferreira-4258a32a0/',
    instagram: null,
    github: 'https://github.com/caioalonsoferreira'
  },
  {
    nome: 'Juliana Gabinio Costa',
    foto: './fotos/juliana.jpg',
    proficiencias: ['Full Stack', 'Banco de Dados', 'Web, Desktop e Mobile', 'MySQL'],
    linkedin: 'https://www.linkedin.com/in/juliana-gabinio/',
    instagram: 'https://www.instagram.com/scifiju',
    github: 'https://github.com/jabisaur'
  },
  {
    nome: 'Kauan Alonso Ferreira',
    foto: './fotos/kauan.jpg',
    proficiencias: ['Front-end', 'PHP'],
    linkedin: 'https://www.linkedin.com/in/kauan-alonso-ferreira-b618a62a0/',
    instagram: null,
    github: 'https://github.com/KAUANF2025'
  },
  {
    nome: 'Leonardo Almeida Muraro',
    foto: './fotos/leonardo.jpg',
    proficiencias: ['Full Stack', 'Banco de Dados', 'Automação', 'PHP', 'MySQL'],
    linkedin: 'https://www.linkedin.com/in/leonardo-muraro-37a626263/',
    instagram: 'https://www.instagram.com/leohigh',
    github: 'https://github.com/Leonardo-Muraro'
  },
  {
    nome: 'Pedro Augusto Jara Gonçalves',
    foto: './fotos/pedro.jpg',
    proficiencias: ['Back-end', 'Banco de Dados', 'Modelagem de Dados', 'PHP', 'MySQL'],
    linkedin: 'https://www.linkedin.com/in/pedrojara',
    instagram: null,
    github: 'https://github.com/Poor-Warrior'
  },
  {
    nome: 'Vilson Maciel Chaparro Filho',
    foto: './fotos/vilson.jpg',
    proficiencias: [],
    linkedin: 'https://www.linkedin.com/in/vilson-maciel-a86448251/',
    instagram: 'https://www.instagram.com/vilson0508',
    github: 'https://github.com/VilsonMaciel'
  }
];

// Quais redes aparecem no card, nesta ordem
export const SOCIAL_ORDER = ['linkedin', 'instagram', 'github'];

const initials = nome => {
  const parts = nome.split(' ').filter(p => p.length > 2 && !/^(filho|júnior|junior|neto|sobrinho)$/i.test(p));
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Placeholder em SVG: gradiente + iniciais + silhueta discreta
const placeholder = (nome, accent, i) => {
  const angle = (i * 45) % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">
  <defs>
    <linearGradient id="g" gradientTransform="rotate(${angle} .5 .5)">
      <stop offset="0" stop-color="${accent}" stop-opacity=".95"/>
      <stop offset="1" stop-color="#14121c"/>
    </linearGradient>
    <radialGradient id="r" cx=".5" cy=".35" r=".7">
      <stop offset="0" stop-color="#fff" stop-opacity=".18"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="500" fill="#14121c"/>
  <rect width="400" height="500" fill="url(#g)" opacity=".55"/>
  <rect width="400" height="500" fill="url(#r)"/>
  <circle cx="200" cy="330" r="62" fill="#fff" fill-opacity=".10"/>
  <path d="M70 500c10-80 64-122 130-122s120 42 130 122z" fill="#fff" fill-opacity=".10"/>
  <text x="200" y="190" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif"
    font-size="120" font-weight="700" fill="#fff" fill-opacity=".92" letter-spacing="-4">${initials(nome)}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

// Extrai o @ do Instagram a partir da URL (para exibir no card)
const instaHandle = url => {
  if (!url) return null;
  const m = url.match(/instagram\.com\/([^/?#]+)/i);
  return m ? m[1] : null;
};

export const team = members.map((m, i) => {
  const accent = ACCENTS[i % ACCENTS.length];
  const image = m.foto || placeholder(m.nome, accent, i);
  const parts = m.nome.split(' ');
  return {
    nome: m.nome,
    // nome curto para o card: primeiro + último sobrenome (sem Filho/Júnior)
    nomeCurto: m.nomeCurto || `${parts[0]} ${parts.filter(p => !/^(filho|júnior|junior|neto)$/i.test(p)).slice(-1)[0]}`,
    image,
    accent,
    handle: instaHandle(m.instagram),
    proficiencias: m.proficiencias || [],
    socials: SOCIAL_ORDER.filter(type => m[type]).map(type => ({ type, url: m[type] }))
  };
});
