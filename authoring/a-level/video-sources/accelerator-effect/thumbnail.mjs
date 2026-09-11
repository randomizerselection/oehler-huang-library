import fs from 'node:fs/promises';
import path from 'node:path';
import {chromium} from '@playwright/test';
const repo=path.resolve(import.meta.dirname,'../../../..');
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1});
await page.setContent(`<body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
<rect width="1280" height="720" fill="#f6f2e9"/><rect width="17" height="720" fill="#164b43"/>
<g font-family="Arial,Microsoft YaHei,sans-serif"><text x="69" y="69" font-size="23" font-weight="700" fill="#164b43">OEHLER-HUANG ECONOMICS</text>
<text x="69" y="188" font-size="75" font-weight="700" fill="#182d31">THE ACCELERATOR</text>
<text x="72" y="250" font-size="33" fill="#647073">加速效应 · A Level Economics</text>
<rect x="70" y="300" width="535" height="273" rx="18" fill="#e2eae2"/>
<rect x="632" y="300" width="575" height="273" rx="18" fill="#eee0d7"/>
<text x="105" y="354" font-size="27" font-weight="700" fill="#2767a0">DEMAND</text>
<text x="667" y="354" font-size="27" font-weight="700" fill="#b65b35">INVESTMENT</text>
<path d="M115 510 L265 460 L418 391" fill="none" stroke="#2767a0" stroke-width="15"/><path d="M384 388 L438 378 L413 427" fill="#2767a0"/>
<path d="M684 400 L854 454 L1044 515" fill="none" stroke="#b65b35" stroke-width="15"/><path d="M1011 480 L1067 524 L996 532" fill="#b65b35"/>
<text x="642" y="656" font-size="50" font-weight="700" text-anchor="middle" fill="#182d31">SALES UP. INVESTMENT DOWN?</text></g></svg></body>`);
await page.screenshot({path:path.join(repo,'authoring/a-level/outputs/videos/accelerator-effect/Accelerator-effect-thumbnail.png')});
await browser.close();
