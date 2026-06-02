// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

/**
 * URL base do site. Pode ser sobrescrita por `SITE_URL` no ambiente
 * (ex: Vercel env vars ou .env local) sem precisar editar este arquivo.
 *
 * Quando o domínio próprio for comprado, basta setar SITE_URL=https://novo-dominio
 * que tudo (canonical, sitemap, robots.txt, schema.org, OG image URL) vai
 * apontar pro lugar certo.
 */
const SITE_URL = process.env.SITE_URL ?? "https://divulga-empresas.vercel.app";

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: [],
  },
  build: {
    inlineStylesheets: "auto",
  },
});
