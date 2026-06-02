import type { APIRoute } from "astro";

/* robots.txt dinâmico — gera o conteúdo a partir de Astro.site (que vem do
   astro.config.mjs, configurável via SITE_URL). Assim, ao trocar o domínio
   próprio, o robots.txt acompanha sem precisar editar à mão. */

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, "") ?? "";
  const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
