import {join} from "path"
import {mkdirSync,existsSync} from "fs"

import { rootProjectDir } from "./cryptopress";

function createProjectMap():Map<string,string>{
	  
	  let projectMap :Map<string,string>= new Map<string,string>();
	 
	  projectMap.set("typescriptConfig", join(rootProjectDir,"tsconfig.json"))
	  projectMap.set("jasmineConfig", join(rootProjectDir,"spec","support","jasmine.json" ) )
	  projectMap.set("jasmineReporterConfig", join(rootProjectDir,"src","tests","helpers","repoter.ts"))
	  projectMap.set("prettierConfig", join(rootProjectDir,".prettierrc") )
	  projectMap.set("prettierIgnoreConfig", join(rootProjectDir,".prettierignore") )
	  projectMap.set("eslintConfig", join(rootProjectDir,".eslintrc.js") )
	  projectMap.set("eslintIgnoreConfig", join(rootProjectDir,".eslintignore") )
	  projectMap.set("dotenvConfig",join(rootProjectDir,".env") ) 
	  return projectMap ;
}





function finalDirsCheck(dirsToMake:Array<string>):boolean{
	  dirsToMake.forEach((dir,_index,_array)=>{if(!existsSync(dir)) return false;})
	  return true ;

}



function cryptopressStructuringProject():boolean{
		  
	  try{
			    console.log('[+] Stage (3) : Structuring Project And Files ')
				  
			    if( !existsSync(join(rootProjectDir,"package.json")) ) throw new Error("Error package.json Not Found");
				
				const dirsToMake=[
				  join(rootProjectDir,"public"),
				  join(rootProjectDir,"public","static"),
				  join(rootProjectDir,"public","scripts"),
				  join(rootProjectDir,"public","stylecheets"),
				  join(rootProjectDir,"spec"),
				  join(rootProjectDir,"spec","support"),
				  join(rootProjectDir,"src"),
				  join(rootProjectDir,"src","controllers"),
				  join(rootProjectDir,"src","routes"),
				  join(rootProjectDir,"src","middlewares"),
				  join(rootProjectDir,"src","utils"),
				  join(rootProjectDir,"src","models"),
				  join(rootProjectDir,"src","tests"),
				  join(rootProjectDir,"src","tests","helpers"),
				  join(rootProjectDir,"src","views")
				  ] ;

				  dirsToMake.forEach((dir,_index,_array)=>{if(!existsSync(dir)) mkdirSync(dir);})
			
				  return finalDirsCheck(dirsToMake) ;
			
	  }
	  
	  catch(err:unknown){
			console.error(`[-] Error While Structuring The Project : ${err}`) ;
			return false ;
	  }

}

export {createProjectMap,cryptopressStructuringProject}

