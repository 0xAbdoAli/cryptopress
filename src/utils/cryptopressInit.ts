import {writeFileSync,existsSync} from "fs"
import {join,parse} from "path"

import {rootProjectDir} from "./cryptopress"


function createPackageDotJson():string{
	  return `
{
  "name": "${parse(rootProjectDir).name}",
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
			console.log('[+] Stage (1) : Initing Project and Configing package.json ')
			
			const packageJsonPath=join(rootProjectDir,"package.json")
			if(existsSync(packageJsonPath)) return true ; // package.json already exists  
	  
			else{			  
				 writeFileSync(packageJsonPath,createPackageDotJson(),{
				 encoding:"utf-8"
				 });
				  if(existsSync(packageJsonPath)) return true ; //package.json created
				  else return cryptopressInit() ; // re try create package.json 
			}
	  	 
			
	  }
	  catch(err:unknown){
			console.error(`[-] Error While Createing package.json File ${err}`) ;
			return false ;
	  }

}


export{cryptopressInit}
