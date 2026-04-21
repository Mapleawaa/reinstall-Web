import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function seoAssetsPlugin(siteUrl) {
  const normalizedSiteUrl = siteUrl.replace(/\/$/, '')

  return {
    name: 'seo-assets-plugin',
    transformIndexHtml(html) {
      return html.replaceAll('%VITE_SITE_URL%', normalizedSiteUrl)
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nSitemap: ${normalizedSiteUrl}/sitemap.xml\n`,
      })

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${normalizedSiteUrl}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = mode === 'production'
    ? env.VITE_SITE_URL
    : env.VITE_SITE_URL || 'http://localhost:5173'

  if (mode === 'production' && !env.VITE_SITE_URL) {
    throw new Error('VITE_SITE_URL is required for production builds. Set it to https://unis.oowo.cc.')
  }

  return {
    base: './',
    plugins: [vue(), seoAssetsPlugin(siteUrl)],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  }
})
