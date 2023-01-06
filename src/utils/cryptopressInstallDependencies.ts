import {existsSync} from "fs"
import {execSync} from "child_process"
import {join} from "path"
import { rootProjectDir } from "./cryptopress";

function cryptopressInstallDependencies():boolean{
	  try{
			console.log('[+] Stage (2) : Install Dependcies ')
			
			if( !existsSync(join(rootProjectDir,"package.json")) ) throw new Error("Error package.json Not Found");

			const installMainDependciesCommand = `npm install express helmet jasmine  jasmine-spec-reporter  supertest dotenv --save --prefix ${rootProjectDir}` ;
			
			const installDevDependciesCommand = `npm install typescript nodemon  ts-node rimraf eslint prettier  morgan  @types/express  @types/morgan  @types/jasmine @types/supertest @typescript-eslint/eslint-plugin @typescript-eslint/parser   eslint-config-prettier  eslint-plugin-prettier  --save-dev --prefix ${rootProjectDir}` ;
			
			execSync(installMainDependciesCommand) ;
			
			execSync(installDevDependciesCommand) ;
			
			return true ;
	  }
	  catch(err:unknown){
			
			console.error(` [-] Error While Installing Dependcies : ${err}`);
			
			return false
	  }
}

export {cryptopressInstallDependencies}
