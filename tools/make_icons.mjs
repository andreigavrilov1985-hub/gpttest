// Renders the kitten into icons/*.png and icons/icon.svg. Run: node tools/make_icons.mjs
import { createRequire } from 'module';
import { writeFileSync } from 'fs';
import { kittenSVG } from '../js/kitten.js';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const cat = kittenSVG({ main: 'ginger', second: 'white', pattern: 'stripes' }, 'cheer', 100)
  .replace(/<svg[^>]*>/, '').replace('</svg>', '');
const icon = (pad) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<rect width="512" height="512" rx="${pad ? 0 : 112}" fill="#2bb3c9"/>
<circle cx="256" cy="300" r="190" fill="#bdeef3"/>
<ellipse cx="256" cy="440" rx="200" ry="60" fill="#ffe3a8"/>
<g transform="translate(${pad ? 151 : 126} ${pad ? 110 : 70}) scale(${pad ? 1.62 : 2})">${cat}</g></svg>`;
writeFileSync('icons/icon.svg', icon(false));
const browser = await chromium.launch();
const page = await browser.newPage();
for (const [name, size, pad] of [['icon-192.png', 192, false], ['icon-512.png', 512, false], ['icon-maskable-512.png', 512, true]]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<style>html,body{margin:0;background:transparent}</style>${icon(pad).replace('<svg ', `<svg width="${size}" height="${size}" `)}`);
  await page.screenshot({ path: `icons/${name}`, omitBackground: true });
}
await browser.close();
console.log('icons done');
