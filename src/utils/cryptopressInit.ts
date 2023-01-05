import {writeFileSync,existsSync} from "fs"
import {join,parse} from "path"



function createPackageDotJson():string{
	  return `
{
  "name": "${parse(process.cwd()).name}",
  "version": "1.0.0",
  "description": "",
  "main": "./build/app.js",
  "scripts": {
    "dev": "nodemon ./src/app.ts",
    "start": "npx rimraf build && npx tsc && node ./build/app.js",
    "clean": "npx rimraf build",
    "build": "npx rimraf build && npx tsc",
    "test": "npx rimraf build && npx tsc && jasmine",
    "format": "npx prettier --write 'src/**/*.{ts,js}' ",
    "lint": "npx eslint . --ext .ts"
  },
  "keywords": [],
  "license": "ISC"
}
`

}


function cryptopressInit():boolean{
	  try{
			if(existsSync(join(process.cwd(),"package.json"))) return true ; // package.json already exists  
	  
			else{			  
				 writeFileSync("package.json",createPackageDotJson(),{
				 encoding:"utf-8"
				 });
				  if(existsSync(join(process.cwd(),"package.json"))) return true ; //package.json created
				  else return cryptopressInit() ; // re try create package.json 
			}
	  	 
			
	  }
	  catch(err:unknown){
			console.error(`[-] Error While Createing package.json File ${err}`) ;
			return false ;
	  }

}


export{cryptopressInit}
