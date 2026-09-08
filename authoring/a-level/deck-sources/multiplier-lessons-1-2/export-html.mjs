// Package the maintained, build-free source as ONE portable, offline HTML file.
// Native Node only; no application build, browser, Python or presentation export.
import fs from 'node:fs/promises';
import path from 'node:path';
const here=import.meta.dirname,source=path.resolve(here, '../../../../apps/library/a-level/lessons/9-1-1-multiplier'),root=path.resolve(here,'../..');
let html=await fs.readFile(path.join(source,'index.html'),'utf8');
html = html.replace(/<script>window\.ALEVEL_STUDENT_SELECTOR_BASE_URL\s*=\s*"\/student-selector\/";<\/script>\s*/g, '');
for(const match of [...html.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)]){
  const css=await fs.readFile(path.resolve(source,match[1]),'utf8');
  html=html.replace(match[0],()=>`<style>\n${css}\n</style>`);
}
for(const match of [...html.matchAll(/<script src="([^"]+)"><\/script>/g)]){
  let js=await fs.readFile(path.resolve(source,match[1]),'utf8');
  if(match[1]==='slides.js'){
    const imagePaths=[...new Set(
      [...js.matchAll(/image:\s*["']([^"']+)["']/g)]
        .map(imageMatch=>imageMatch[1])
        .filter(imagePath=>imagePath.startsWith('assets/'))
    )];
    for(const imagePath of imagePaths){
      const image=await fs.readFile(path.join(source,imagePath));
      const extension=path.extname(imagePath).toLowerCase();
      const mime=extension==='.png'?'image/png':'image/jpeg';
      const dataUri=`data:${mime};base64,${image.toString('base64')}`;
      js=js.replaceAll(`"${imagePath}"`,JSON.stringify(dataUri));
      js=js.replaceAll(`'${imagePath}'`,JSON.stringify(dataUri));
    }
  }
  html=html.replace(match[0],()=>`<script>\n${js.replaceAll('</script','<\\/script')}\n</script>`);
}
// The portable file never connects to the development live-reload server.
html=html.replace("if(/^https?:$/.test(location.protocol)&&['127.0.0.1','localhost'].includes(location.hostname)){",'if(false){');
const output=path.join(root,'outputs/multiplier-html/A-Level_Multiplier_Lessons_1-2.html');
await fs.mkdir(path.dirname(output),{recursive:true});
await fs.writeFile(output,html);
console.log(JSON.stringify({output,bytes:Buffer.byteLength(html),externalDependencies:0}));
