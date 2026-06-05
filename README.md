# Divulga Empresas — site institucional

Site institucional e de conversão da **Divulga Empresas** (razão social: G.C DIVULGA EMPRESAS LTDA · CNPJ 64.597.498/0001-02). Agência de marketing de geolocalização — operação comercial em São José do Rio Preto-SP, sede fiscal em Potirendaba-SP. Stack: **Astro 5 + Tailwind 4**, deploy no **Vercel** em `divulgaempresasmarketing.com.br` (push em `main` faz deploy automático).

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

### Identidade fiscal vs comercial

A empresa é registrada em duas cidades diferentes:

- **Operação comercial** (visível em todo o site): **São José do Rio Preto-SP**
  - Aparece em: copy do site, meta tags `geo.*`, JSON-LD `geo.latitude/longitude`, mapa, footer principal
  - Coordenadas: `-20.8113, -49.3758`

- **Sede fiscal** (registrada no CNPJ, citada em pontos formais): **Potirendaba-SP**
  - Aparece em: JSON-LD `address` (streetAddress, postalCode), linha fiscal pequena no footer, páginas legais futuras
  - Endereço: Rua Luiz Pastorelli, 1788, Jardim Palmeiras, Potirendaba-SP, CEP 15.107-028

Essa separação é prática comum (empresa registrada em uma cidade, opera comercialmente em outra). O Schema.org `LocalBusiness` resolve isso usando `address` pro fiscal e `geo` pro comercial — ambos válidos.

### Como trocar o domínio

Tudo aponta pra uma única fonte: a env var **`SITE_URL`**. Hoje o default é `https://divulgaempresasmarketing.com.br`.

Pra configurar/trocar:

1. **DNS do domínio:** apontar pro Vercel (CNAME `cname.vercel-dns.com` ou A records que o painel mostra).
2. **Vercel → Settings → Domains:** adicionar o domínio.
3. **Vercel → Settings → Environment Variables** (opcional, se for outro domínio que não o default): `SITE_URL=https://novodominio.com.br`.
4. Redeploy.

Canonical, OG image URL, Schema.org URLs, sitemap e robots.txt vão todos usar `SITE_URL` automaticamente.

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

## Conformidade LGPD e Analytics

Sistema próprio de gestão de consentimento (sem dependência de bibliotecas externas tipo Cookiebot), integrado com Google Consent Mode v2 e Google Analytics 4. Tudo vanilla TS, sob nosso controle.

### Arquivos envolvidos

| Arquivo | Responsabilidade |
| --- | --- |
| `src/components/consent/ConsentManager.astro` | Banner inferior, modal de preferências, lógica de consent, expõe `window.DivulgaConsent` |
| `src/layouts/Layout.astro` (head) | Bootstrap do consent default (DENIED), aplica consent salvo, carrega GA4 |
| `src/components/legal/LegalLayout.astro` | Wrapper visual pras 3 páginas legais (back link, header, nav cruzada) |
| `src/pages/politica-de-privacidade.astro` | Política de Privacidade |
| `src/pages/termos-de-uso.astro` | Termos de Uso |
| `src/pages/politica-de-cookies.astro` | Política de Cookies (com botão "Abrir preferências") |
| `src/components/Footer.astro` | Linha legal com 4 links (3 páginas + botão preferências) |
| `.env.example` | Variáveis públicas (`PUBLIC_GA4_ID`, `PUBLIC_META_PIXEL_ID`) |

### Como o sistema funciona

1. **Bootstrap (head do Layout)**: roda `gtag('consent', 'default', ...)` com **tudo DENIED** (LGPD-first). Logo em seguida lê `localStorage.divulga_consent_v1` — se já houver consentimento salvo, aplica via `gtag('consent', 'update', ...)`. Isso roda **antes** do GA4 carregar, então nenhum hit sai sem consent.

2. **GA4 carrega**: só se `PUBLIC_GA4_ID` estiver setado. Configurado com `anonymize_ip: true` e `allow_google_signals: false`.

3. **Banner**: aparece quando não há consent salvo OU quando a versão dos termos foi atualizada (ver "Como forçar reconsentimento" abaixo).

4. **Modal de preferências**: aberto via "Personalizar" no banner, ou via `window.DivulgaConsent.open()` (botão no footer + botão na página de cookies).

5. **Cada decisão do usuário** (aceitar, rejeitar, salvar custom) grava no localStorage E dispara `gtag('consent', 'update', ...)` na hora.

### API pública

Disponível como `window.DivulgaConsent`:

```typescript
window.DivulgaConsent.open()        // abre o modal
window.DivulgaConsent.acceptAll()   // aceita tudo
window.DivulgaConsent.rejectAll()   // rejeita tudo (exceto necessários)
window.DivulgaConsent.get()         // retorna ConsentState | null
window.DivulgaConsent.reset()       // limpa consent e mostra banner
```

### Variáveis de ambiente

```bash
# .env (copiar do .env.example)
SITE_URL=                                  # opcional, sobrescreve default
PUBLIC_GA4_ID=G-4FV1N8PM5Z                 # vazio = não carrega GA4
PUBLIC_META_PIXEL_ID=                      # vazio = não carrega Pixel
```

Em produção, definir no Vercel: **Settings → Environment Variables**.

### Como adicionar uma nova categoria de cookie

1. Em `ConsentManager.astro`, adicionar `<section class="consent-cat">` com nome, descrição e `<input data-consent-toggle="nova_categoria">`.
2. Atualizar o tipo `Preferences` no script.
3. Adicionar lógica no `pushConsentUpdate` (mapear pra um `_storage` do Consent Mode v2 ou pra um SDK próprio).
4. Atualizar `defaultPreferences()`, `acceptAll()` e `saveCustom()`.
5. Documentar na Política de Cookies (categoria + tabela).

### Como forçar reconsentimento (após atualizar políticas)

No topo do `<script>` do `ConsentManager.astro`, incrementar a constante:

```typescript
const CONSENT_VERSION = "1.0"; // → "1.1"
```

Todo usuário com `version` antiga no localStorage vai ver o banner de novo automaticamente. O consent anterior fica no `history[]` pra rastro de auditoria.

### Como ativar o Meta Pixel quando o cliente decidir

1. Definir `PUBLIC_META_PIXEL_ID` no `.env` (ou nas env vars do Vercel) com o ID real.
2. Em `src/layouts/Layout.astro`, descomentar o bloco "META PIXEL" (procurar pelo comentário).
3. Em `src/components/consent/ConsentManager.astro`, dentro de `pushConsentUpdate()`, descomentar o bloco:
   ```typescript
   // if (typeof w.fbq === "function") {
   //   w.fbq("consent", prefs.marketing ? "grant" : "revoke");
   // }
   ```
4. Atualizar a Política de Cookies adicionando os cookies do Pixel na tabela de "Marketing".
5. Atualizar a Política de Privacidade marcando o parceiro Meta como ativo (remover o "Futuro — quando ativado").
6. Incrementar `CONSENT_VERSION` pra forçar reconsentimento (boa prática quando se ativa novo rastreamento).

### Como testar o consent mode no DevTools

1. Abra o site numa aba anônima (estado limpo).
2. DevTools → **Application** → Local Storage → confirme que `divulga_consent_v1` ainda **não existe**.
3. DevTools → **Network** → filtre por `google-analytics` ou `gtag` → confirme que NENHUM hit sai antes do consent.
4. Clique "Aceitar todos" no banner.
5. Network agora mostra hit pra `collect?...` do GA4 — coleta ativa.
6. DevTools → **Console** → rode `window.DivulgaConsent.get()` pra inspecionar o estado completo.
7. Pra inspecionar o que foi enviado pro Consent Mode:
   ```javascript
   window.dataLayer.filter(e => e?.[0] === 'consent')
   ```

### Validações recomendadas após deploy

1. **JSON-LD** (incluindo as 3 páginas legais): cole cada URL pública em https://validator.schema.org/ → confirme zero erros.
2. **Open Graph**: cole a URL em https://www.opengraph.xyz/.
3. **Lighthouse mobile**: target 90+ em Performance / Accessibility / Best Practices / SEO.
4. **Google Search Console**: submeter `sitemap-index.xml` (as 3 páginas legais entram automaticamente).
5. **Google Tag Assistant** (extensão Chrome): confirmar que GA4 só dispara com consent ativo.

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
