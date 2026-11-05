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

## Editar conteúdo

Tudo fica em **`src/data/team.js`**:

- `teamName`: nome do time (topo, selo e rodapé)
- `headline`: frase principal, com uma linha por item
- `tagline`: texto de apoio
- `members`: integrantes
  - **Foto:** coloque o arquivo em `public/fotos/` e preencha `foto: './fotos/arquivo.jpg'`. Use proporção 4:5 (ex.: 800×1000).
  - **Redes sociais:** preencha `linkedin`, `instagram` e `github` com a URL completa. Redes deixadas como `null` não aparecem no card, e o @ do Instagram é exibido no card automaticamente.
  - Para mudar quais redes aparecem, edite `SOCIAL_ORDER`.

Sem foto, o carrossel e o card mostram um placeholder com as iniciais.

## Componentes (src/components)

| Componente | Onde | Efeito |
|---|---|---|
| `GradientASCII` | fundo do hero e do time | gradiente feito de caracteres binários; no hero nasce do topo e no time nasce de baixo, na cor de quem está em destaque |
| `BlurText` | título | palavras surgem saindo do desfoque |
| `ShinyText` | selo acima do título | brilho passando pelo texto |
| `CircularCarousel` | time | carrossel 3D cilíndrico, arrastável e com autoplay |
| `ProfileCard` | time | card holográfico com inclinação 3D e redes sociais (customizado) |

O `GradientASCII` ganhou o prop `flip` (customização deste projeto), que inverte o gradiente na vertical sem virar os caracteres.

As animações respeitam a configuração "reduzir movimento" do sistema.

Os componentes React Bits seguem a licença em `src/components/REACT-BITS-LICENSE.md`.
