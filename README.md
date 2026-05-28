# Divulga Empresas — site institucional

Site institucional e de conversão da Divulga Empresas, agência de marketing de geolocalização de Fernandópolis-SP. Stack: **Astro 5 + Tailwind 4**, deploy no **Vercel**.

O objetivo do site é gerar contato no WhatsApp dos sócios. Todo CTA aponta pra `wa.me/...`.

## Rodando localmente

Pré-requisitos: **Node 20+** e **npm 10+**.

```bash
npm install
npm run dev
```

Vai abrir em [http://localhost:4321](http://localhost:4321).

### Comandos

| Comando            | O que faz                              |
| ------------------ | -------------------------------------- |
| `npm run dev`      | Servidor de desenvolvimento com HMR    |
| `npm run build`    | Build de produção em `dist/`           |
| `npm run preview`  | Serve o `dist/` localmente pra testar  |

## Estrutura

```
src/
├── assets/logo/         logo oficial em PNG (processada com astro:assets)
├── components/          componentes de seção, um por arquivo
│   ├── Header.astro
│   ├── Hero.astro
│   ├── HeroAnimation.astro     mockup do Google com typewriter
│   ├── OQueFaz.astro           4 pilares
│   ├── AntesEDepois.astro      comparação visual
│   ├── ComoFunciona.astro      3 passos
│   ├── Diferenciais.astro
│   ├── Planos.astro            4 planos (Diamante destacado)
│   ├── ProvaSocial.astro       depoimentos + MapaRegiao
│   ├── MapaRegiao.astro        SVG do estado de SP com pin Fernandópolis
│   ├── Contato.astro           cards Gabriel/Carlos
│   ├── Footer.astro
│   ├── WhatsAppFloat.astro
│   └── icons/WhatsAppIcon.astro
├── layouts/Layout.astro        head, SEO, OG, schema LocalBusiness
├── pages/index.astro           página única, monta todos os componentes + script de reveal
└── styles/global.css           tokens da paleta, keyframes, reveal CSS

public/
├── favicon.svg
├── robots.txt                  Astro gera sitemap automaticamente
└── assets/
    ├── fotos/                  slots prontos pra fotos reais (ver abaixo)
    └── og-image.jpg            imagem do Open Graph (1200×630)
```

## Como trocar a logo

A logo oficial fica em `src/assets/logo/divulga-logo.png` (e uma cópia em `public/assets/logo/` pra acessos diretos). O Astro processa via `astro:assets` no Header e Footer, gerando WebP otimizado automaticamente.

Pra trocar:

1. Substitua o arquivo `src/assets/logo/divulga-logo.png` por uma versão atualizada (mantenha o mesmo nome).
2. Idealmente forneça uma versão SVG — se vier SVG, edite `Header.astro` e `Footer.astro` pra importar `divulga-logo.svg` em vez do PNG.

## Onde colocar as fotos quando chegarem

Os slots estão preparados em **`public/assets/fotos/`**. Os caminhos esperados:

| Caminho                                     | Onde aparece                              |
| ------------------------------------------- | ----------------------------------------- |
| `public/assets/fotos/gabriel.jpg`           | Card do Gabriel na seção Contato          |
| `public/assets/fotos/carlos.jpg`            | Card do Carlos na seção Contato           |
| `public/assets/fotos/depoimento-marcia.jpg` | Avatar do depoimento Márcia (Panificadora Poti) |
| `public/assets/fotos/depoimento-2.jpg`      | Avatar do depoimento João Ricardo         |
| `public/assets/fotos/depoimento-3.jpg`      | Avatar do depoimento Antônio Silva        |
| `public/assets/fotos/fachada-hero.jpg`      | Foto do estabelecimento no card animado do hero |
| `public/assets/fotos/antes-perfil.jpg`      | Opcional — versão fotográfica do "antes"  |
| `public/assets/fotos/depois-perfil.jpg`     | Opcional — versão fotográfica do "depois" |

Cada local de slot está marcado com comentário `slot pra foto real` no código. Por enquanto cada um exibe um placeholder visual (avatar com iniciais, gradiente colorido, fachada estilizada). Pra ativar uma foto, edite o componente correspondente e substitua o placeholder por `<Image src={...} />`.

## SEO

Editar `src/layouts/Layout.astro` pra ajustar:

- `<title>`, `<meta description>`
- Open Graph (título, descrição, imagem)
- Schema.org `LocalBusiness` (telefones, endereço, área atendida)

A URL canônica é definida no `astro.config.mjs` (`site:`). Atualize quando publicar com domínio próprio.

## Acessibilidade e performance

- `prefers-reduced-motion` respeitado: cursor do typewriter, pulse do pin, scroll reveal — todos desligam quando o usuário pede menos movimento.
- Imagens passam por `astro:assets` (WebP, responsivo).
- Animações usam JS vanilla + IntersectionObserver (zero bibliotecas).
- Foco visível em todos os links e botões.

## Deploy no Vercel

O projeto é detectado automaticamente como Astro. Sem necessidade de configurar `vercel.json`.

Push pra `main` faz deploy automático em produção.

```bash
# Primeiro deploy manual
npm i -g vercel
vercel login
vercel              # cria projeto na sua conta
vercel --prod       # promove a build pra produção
```

Quando comprar o domínio próprio, é só apontar o DNS pro Vercel e adicionar o domínio nas configurações do projeto.
