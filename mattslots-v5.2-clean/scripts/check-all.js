const fs=require('fs'),path=require('path'),{spawnSync}=require('child_process');
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(x=>x.isDirectory()?walk(path.join(d,x.name)):[path.join(d,x.name)]);}
let bad=0;for(const f of walk(path.join(__dirname,'..','src')).filter(f=>f.endsWith('.js'))){const r=spawnSync(process.execPath,['--check',f],{encoding:'utf8'});if(r.status){bad++;console.error(r.stderr);}}
if(bad)process.exit(1);console.log('Syntaxe vérifiée.');
