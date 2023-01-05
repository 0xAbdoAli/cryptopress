import {join} from "path"
import {mkdirSync,existsSync} from "fs"

const currentWorkingDir=process.cwd()

function createProjectMap():Map<string,string>{
	  
	  let projectMap :Map<string,string>= new Map<string,string>();
	 
	  projectMap.set("typescriptConfig", join(currentWorkingDir,"tsconfig.json"))
	  projectMap.set("jasmineConfig", join(currentWorkingDir,"spec","support","jasmine.json" ) )
	  projectMap.set("jasmineReporterConfig", join(currentWorkingDir,"src","tests","helpers","repoter.ts"))
	  projectMap.set("prettierConfig", join(currentWorkingDir,".prettierrc") )
	  projectMap.set("prettierIgnoreConfig", join(currentWorkingDir,".prettierignore") )
	  projectMap.set("eslintConfig", join(currentWorkingDir,".eslintrc.js") )
	  projectMap.set("eslintIgnoreConfig", join(currentWorkingDir,".eslintignore") )
	  projectMap.set("dotenvConfig",join(currentWorkingDir,".env") ) 
	  return projectMap ;
}





function finalDirsCheck(dirsToMake:Array<string>):boolean{
	  dirsToMake.forEach((dir,_index,_array)=>{if(!existsSync(dir)) return false;})
	  return true ;

}



function cryptopressStructuringProject():boolean{
	  
	  try{
			const dirsToMake=[
				  join(currentWorkingDir,"public"),
				  join(currentWorkingDir,"public","static"),
				  join(currentWorkingDir,"public","scripts"),
				  join(currentWorkingDir,"public","stylecheets"),
				  join(currentWorkingDir,"spec"),
				  join(currentWorkingDir,"spec","support"),
				  join(currentWorkingDir,"src"),
				  join(currentWorkingDir,"src","controllers"),
				  join(currentWorkingDir,"src","routes"),
				  join(currentWorkingDir,"src","middlewares"),
				  join(currentWorkingDir,"src","utils"),
				  join(currentWorkingDir,"src","models"),
				  join(currentWorkingDir,"src","tests"),
				  join(currentWorkingDir,"src","tests","helpers"),
				  join(currentWorkingDir,"src","views")
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

