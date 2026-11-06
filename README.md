# Site do Time Dev

Página do time de desenvolvimento, feita com React + Vite e componentes do [React Bits](https://reactbits.dev).

## Rodar

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:5173
npm run build     # gera a pasta dist/ pronta para publicar
```

A pasta `dist/` é estática: pode ir para qualquer servidor (Apache/XAMPP, IIS, GitHub Pages, Vercel). Ela funciona até dentro de uma subpasta.

## Publicar no GitHub Pages

O deploy é automático pelo workflow `.github/workflows/deploy.yml`: cada push na `main` gera o build e publica.

Na primeira vez, em **Settings → Pages**, escolha **Source: GitHub Actions**. O site fica em
`https://leonardo-muraro.github.io/equipe-dev-movimenta-cg/`.

## Páginas

- `index.html`: apresentação (hero + mostruário do time com QR Code). Feita para telão: a seção do time ocupa exatamente uma tela.
- `equipe.html`: detalhes de cada pessoa, aberta pelo QR Code. Feita para celular.

O QR Code aponta sozinho para `equipe.html` no mesmo endereço do site. Para fixar outro endereço, preencha `detailsUrl` em `src/data/team.js`.

## Editar conteúdo

Tudo fica em **`src/data/team.js`**:

- `teamName`: nome do time (topo, selo e rodapé)
- `headline`: frase principal, com uma linha por item
- `tagline`: texto de apoio
- `members`: integrantes
  - **Proficiências:** preencha `proficiencias` com uma lista curta, ex.: `['PHP', 'React', 'MySQL']`. Aparece na página de detalhes.
  - **Foto:** coloque o arquivo em `public/fotos/` e preencha `foto: './fotos/arquivo.jpg'`. Use proporção 4:5 (ex.: 800×1000).
  - **Redes sociais:** preencha `linkedin`, `instagram` e `github` com a URL completa. Redes deixadas como `null` não aparecem no card, e o @ do Instagram é exibido no card automaticamente.
  - Para mudar quais redes aparecem, edite `SOCIAL_ORDER`.

Sem foto, o carrossel e o card mostram um placeholder com as iniciais.

## Ajustes feitos no InfiniteMenu (React Bits)

- Correção: fotos nas posições 3, 6… do atlas apareciam "granuladas" (erro de precisão no shader).
- Correção: o autoplay não avançava (contava o tempo parado por quadro, e o loop dorme quando parado).
- Novos props: `pauseOnHover`, `travelZoom` e `travelDuration` (zoom out entre as pessoas) e `offsetX` (desloca a esfera na horizontal).
- Nome e ícones só aparecem quando a câmera termina de aproximar, e o tamanho da foto é calculado pela posição real da câmera.

## Componentes (src/components)

| Componente | Onde | Efeito |
|---|---|---|
| `GradientASCII` | fundo do hero e do time | gradiente feito de caracteres binários; no hero nasce do topo e no time nasce de baixo, na cor de quem está em destaque |
| `BlurText` | título | palavras surgem saindo do desfoque |
| `ShinyText` | selo acima do título | brilho passando pelo texto |
| `InfiniteMenu` | time (apresentação) | esfera de fotos; a pessoa da frente aparece grande, com nome e redes dentro da foto. Autoplay contínuo com zoom out entre as pessoas |
| `QRCodeSVG` (qrcode.react) | time (apresentação) | QR Code que abre a página de detalhes |

O `GradientASCII` ganhou o prop `flip` (customização deste projeto), que inverte o gradiente na vertical sem virar os caracteres.

As animações respeitam a configuração "reduzir movimento" do sistema.

Os componentes React Bits seguem a licença em `src/components/REACT-BITS-LICENSE.md`.
