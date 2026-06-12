export async function GET(context) {
  const base = 'https://aicostplanner.com';

  const pages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/claude-code-token-cost', priority: '0.9', changefreq: 'monthly' },
    { url: '/openrouter-credits', priority: '0.9', changefreq: 'monthly' },
    { url: '/video-generation-api-pricing', priority: '0.9', changefreq: 'monthly' },
    { url: '/openai-api-credits', priority: '0.8', changefreq: 'monthly' },
    { url: '/openai-api-billing', priority: '0.8', changefreq: 'monthly' },
    { url: '/openai-api-usage', priority: '0.8', changefreq: 'monthly' },
    { url: '/api-billing-mismatch', priority: '0.8', changefreq: 'monthly' },
    { url: '/coding-agent-cost', priority: '0.8', changefreq: 'monthly' },
    { url: '/agent-token-usage', priority: '0.8', changefreq: 'monthly' },
    { url: '/image-generation-api-pricing', priority: '0.8', changefreq: 'monthly' },
    { url: '/gpt-image-api-cost', priority: '0.8', changefreq: 'monthly' },
    { url: '/sora-api-pricing', priority: '0.7', changefreq: 'monthly' },
    { url: '/kling-api-pricing', priority: '0.8', changefreq: 'monthly' },
    { url: '/runway-api-pricing', priority: '0.7', changefreq: 'monthly' },
    { url: '/failed-generation-cost', priority: '0.8', changefreq: 'monthly' },
    { url: '/media-api-cost', priority: '0.8', changefreq: 'monthly' },
    { url: '/small-prepaid-test', priority: '0.8', changefreq: 'monthly' },
    { url: '/video-generation-api-cost', priority: '0.8', changefreq: 'monthly' },
    { url: '/image-generation-api-cost', priority: '0.8', changefreq: 'monthly' },
    { url: '/gpt-image-api-pricing', priority: '0.8', changefreq: 'monthly' },
    { url: '/veo-api-pricing', priority: '0.7', changefreq: 'monthly' },
    { url: '/seedance-api-pricing', priority: '0.7', changefreq: 'monthly' },
    { url: '/image-to-video-api-cost', priority: '0.8', changefreq: 'monthly' },
    { url: '/video-generation-webhook', priority: '0.8', changefreq: 'monthly' },
    { url: '/failed-video-generation-cost', priority: '0.8', changefreq: 'monthly' },
    { url: '/video-generation-timeout-cost', priority: '0.8', changefreq: 'monthly' },
    { url: '/product-video-api-cost', priority: '0.7', changefreq: 'monthly' },
    { url: '/realtime-voice-api-cost', priority: '0.8', changefreq: 'monthly' },
    { url: '/billing-transparency', priority: '0.8', changefreq: 'monthly' },
  ];

  const today = new Date().toISOString().split('T')[0];

  const urls = pages.map(({ url, priority, changefreq }) => {
    return `  <url><loc>${base}${url}/</loc><lastmod>${today}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
