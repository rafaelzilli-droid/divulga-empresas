# Divulga Empresas — site institucional

Site institucional e de conversão da Divulga Empresas, agência de marketing de geolocalização de São José do Rio Preto-SP. Stack: **Astro 5 + Tailwind 4**, deploy no **Vercel** (push em `main` faz deploy automático).

O objetivo do site é gerar contato no WhatsApp dos sócios. Todo CTA aponta pra `wa.me/...`.

## Rodando localmente

Pré-requisitos: **Node 20+** e **npm 10+**.

```bash
npm install
npm run dev
```

Vai abrir em [http://localhost:4321](http://localhost:4321).

### Comandos

| Comando                   | O que faz                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| `npm run dev`             | Servidor de desenvolvimento com HMR                                                             |
| `npm run build`           | Build de produção em `dist/` (gera og-image + favicons antes, via prebuild)                     |
| `npm run preview`         | Serve o `dist/` localmente pra testar                                                           |
| `npm run generate-assets` | Regenera og-image.png e favicons PNG a partir da logo + favicon.svg                             |

## Estrutura

```
src/
├── assets/logo/                 logo oficial em PNG (processada com astro:assets)
├── components/                  componentes de seção, um por arquivo
│   ├── Header.astro             header sticky + drawer hamburguer (mobile)
│   ├── Hero.astro
│   ├── HeroAnimation.astro      mockup do Google animado + fotos rotacionando
│   ├── OQueFaz.astro            4 pilares
│   ├── AntesEDepois.astro       comparação visual da Panificadora Poti
│   ├── ComoFunciona.astro       3 passos
│   ├── Diferenciais.astro
│   ├── Planos.astro             4 planos (Diamante destacado)
│   ├── FAQ.astro                accordion single de 5 perguntas
│   ├── ProvaSocial.astro        3 depoimentos
│   ├── MapaRegiao.astro         SVG do estado de SP, seção própria
│   ├── Contato.astro            cards Gabriel/Carlos
│   ├── Footer.astro
│   ├── WhatsAppFloat.astro
│   └── icons/WhatsAppIcon.astro
├── layouts/Layout.astro         head, SEO, OG, schema.org @graph
├── pages/
│   ├── index.astro              página única
│   └── robots.txt.ts            robots.txt dinâmico (usa Astro.site)
└── styles/global.css            tokens da paleta, keyframes, reveal CSS

assets/fotos/                    fotos reais (FORA de public/ — entram via astro:assets)
├── animacao/                    fotos por nicho pro card do hero
├── padaria/                     fotos da Panificadora Poti (antes/depois)
├── vendedores/                  Gabriel e Carlos
└── depoimentos/                 Alessandro, Isabella, Dayane

public/                          arquivos servidos sem processamento
├── favicon.svg                  ícone vetorial (fonte pros PNGs gerados)
├── favicon-16x16.png            ← gerado por scripts/generate-assets.mjs
├── favicon-32x32.png            ← gerado
├── apple-touch-icon.png         ← gerado
├── android-chrome-192x192.png   ← gerado
├── android-chrome-512x512.png   ← gerado
├── og-image.png                 ← gerado (1200x630, logo no branco)
├── site.webmanifest             PWA básico
└── assets/logo/divulga-logo.png referência pública da logo

scripts/
└── generate-assets.mjs          gera og-image + favicons via sharp
```

## Como trocar a logo

A logo oficial fica em `src/assets/logo/divulga-logo.png` (e uma cópia em `public/assets/logo/`).

1. Substitua o arquivo `src/assets/logo/divulga-logo.png` por uma versão atualizada (mantenha o mesmo nome).
2. Rode `npm run generate-assets` pra regenerar a og-image (que usa essa logo).
3. Se a logo vier em SVG, edite `Header.astro` e `Footer.astro` pra importar `divulga-logo.svg` em vez do PNG.

Pra trocar o ícone do pin (favicon), edite `public/favicon.svg` e rode `npm run generate-assets`.

## Como adicionar/trocar fotos reais

As fotos ficam em `assets/fotos/<categoria>/<nome>.png` (raiz do projeto, fora de `public/` e `src/`). Os componentes carregam tudo via `import.meta.glob` — se o arquivo existir, vai pra produção otimizado via `astro:assets`. Se não existir, o componente usa fallback (placeholder colorido ou iniciais).

Estrutura esperada:

| Caminho                                    | Onde aparece                                                    |
| ------------------------------------------ | --------------------------------------------------------------- |
| `assets/fotos/animacao/<nicho>.png`        | Card do hero, rotacionando (marmoraria, padaria, oficina...)    |
| `assets/fotos/padaria/potidepois1..3.png`  | Grid de 3 fotos no card "depois" do Antes/Depois                |
| `assets/fotos/vendedores/gabriel.png`      | Avatar 88px na seção Contato                                    |
| `assets/fotos/vendedores/carlos.png`       | Avatar 88px na seção Contato                                    |
| `assets/fotos/depoimentos/<nome>.png`      | Avatar 44px nos depoimentos (alessandro, isabella, dayane)      |

Pra adicionar uma foto, só salvar nesse path e fazer commit — não precisa mexer no código.

## SEO

O site tem SEO técnico completo configurado. Tudo centralizado em **`src/layouts/Layout.astro`**.

### O que está configurado

- **Meta tags básicas**: title, description, author, keywords, robots, viewport, charset, theme-color
- **Geo tags**: `geo.region`, `geo.placename`, `geo.position`, `ICBM` (São José do Rio Preto -20.81, -49.37)
- **Canonical URL** absoluta calculada a partir de `Astro.site`
- **Open Graph** completo: type, site_name, locale, title, description, url, image (1200x630), image:alt
- **Twitter Card**: summary_large_image com imagem e alt
- **Schema.org @graph** com 3 nodes:
  - `LocalBusiness` (endereço, geo, telefone, área atendida, horário)
  - `Service` (gestão de perfil GMN) com `Offers` dos 4 planos
  - `FAQPage` espelhando as 5 perguntas da seção FAQ visual
- **Favicons** em 5 tamanhos (16, 32, 180, 192, 512) + SVG + `site.webmanifest`
- **`robots.txt`** dinâmico em `src/pages/robots.txt.ts` (usa `Astro.site`)
- **Sitemap** automático via `@astrojs/sitemap` (em `/sitemap-index.xml`)

### Como trocar o domínio quando comprar

Tudo aponta pra uma única fonte: a env var **`SITE_URL`**. Hoje o default é `https://divulga-empresas.vercel.app`.

Quando o cliente comprar o domínio próprio:

1. **No Vercel** (Dashboard → Settings → Environment Variables), adicione:
   ```
   SITE_URL=https://novodominio.com.br
   ```
2. Aponte o DNS do domínio pro Vercel (CNAME ou A record).
3. Adicione o domínio na aba "Domains" do projeto Vercel.
4. Redeploy.

Pronto. Canonical, OG image URL, Schema.org URLs, sitemap e robots.txt vão todos passar a usar o novo domínio sem mexer no código.

Pra testar localmente com URL diferente:

```bash
SITE_URL=https://meu-teste.com npm run build
```

### Onde estão os assets de SEO

- **og-image.png**: gerada por script em `public/og-image.png` (1200x630, logo no branco). Pra regenerar: `npm run generate-assets`.
- **Favicons**: `public/favicon.svg` é a fonte; os PNGs (16/32/180/192/512) são gerados pelo mesmo script.
- **site.webmanifest**: `public/site.webmanifest` (PWA básico).

Se quiser uma og-image custom (com textos, mais elementos), edite `public/og-image.png` à mão (1200x630) ou modifique `scripts/generate-assets.mjs`.

### Validações recomendadas após deploy

1. **JSON-LD**: cole a URL pública em https://validator.schema.org/ → confirme zero erros nos 3 nodes (LocalBusiness, Service, FAQPage).
2. **Open Graph**: cole a URL em https://www.opengraph.xyz/ → confirme que a og-image aparece bonita (1200x630, logo centrada no branco).
3. **Lighthouse mobile**: Chrome DevTools → Lighthouse → Mobile → Categories all → Run. Target: 90+ em Performance / Accessibility / Best Practices / SEO.
4. **Google Search Console** (depois de configurar): submeter `sitemap.xml` (https://search.google.com/search-console).

## Acessibilidade e performance

- `lang="pt-BR"` no `<html>`, hierarquia de headings limpa (h1 → h2 → h3)
- `prefers-reduced-motion` respeitado em todas as animações (typewriter, scroll reveal, drawer mobile, accordion FAQ, pin do mapa)
- Imagens passam por `astro:assets` (WebP, responsivo, lazy)
- Animações usam JS vanilla + IntersectionObserver (zero bibliotecas client)
- Foco visível em todos os links e botões
- `rel="noopener noreferrer"` em todos os links `target="_blank"`
- Drawer mobile com focus trap, scroll lock, ESC fecha

## Deploy no Vercel

O projeto é detectado automaticamente como Astro. Push pra `main` faz deploy automático.

```bash
# Primeiro deploy manual (só pra criar o projeto na conta)
npm i -g vercel
vercel login
vercel              # cria projeto na sua conta
vercel --prod       # promove a build pra produção
```

Após isso, todo `git push origin main` dispara um deploy automático.

Para trocar a URL/domínio, ver seção [Como trocar o domínio](#como-trocar-o-domínio-quando-comprar).
