import {cryptopressInit} from "./cryptopressInit"
import {cryptopressInstallDependencies} from "./cryptopressInstallDependencies"
import {cryptopressStructuringProject} from "./cryptopressStructuringProject"
import {cryptopressConfigingProject} from "./cryptopressConfigingProject"
import {cryptopressWriteingBasicApp} from "./cryptopressWriteingBasicApp"

import {createInterface} from "readline"
import {existsSync,mkdirSync} from "fs"


function banner():void{
	  console.log(`

 ██████╗██████╗ ██╗   ██╗██████╗ ████████╗ ██████╗  ██████╗ ██████╗ ███████╗███████╗███████╗
██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝██╔═══██╗ ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝
██║     ██████╔╝ ╚████╔╝ ██████╔╝   ██║   ██║   ██║ ██████╔╝██████╔╝█████╗  ███████╗███████╗
██║     ██╔══██╗  ╚██╔╝  ██╔═══╝    ██║   ██║   ██║ ██╔═══╝ ██╔══██╗██╔══╝  ╚════██║╚════██║
╚██████╗██║  ██║   ██║   ██║        ██║   ╚██████╔╝ ██║     ██║  ██║███████╗███████║███████║
 ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝        ╚═╝    ╚═════╝  ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝                                                                                                                                                                                                                                                                              
			 Create Express App Integreated with Typescript , Prettier , Eslint , Jasmine  in few Seconds !
 
[+] Created By 0xCrypt00o "Eslam Mohammed"

			git repo: https://github.com/Crypt00o/cryptopress.git
			npm package : https://npmjs.com/package/cryptopress.git

 `)

}


function usage():void{
	  console.log(`

[+] Usage :

	  cryptopress						"to init project in current directory"
	  cryptopress	/path/to/project	"to init project in spefic dir"
	  cryptopress	--help				"to dispaly this help"
	  				 

[+] Created By 0xCrypt00o "Eslam Mohammed"

			git repo: https://github.com/Crypt00o/cryptopress.git
			npm package : https://npmjs.com/package/cryptopress.git

`)
}


function getRootProjectDir():string{
	 try{
			banner()
			if(process.argv.length >3){
				  console.error()
				  usage()
				  process.exit()
			} 
	  
			else if(process.argv.length == 3)	{
				if(process.argv[2].toLowerCase() == "-h" || process.argv[2].toLowerCase() ==  "--help"){
						usage()
						process.exit()
				  }
				  else{
						process.cwd=()=>{return process.argv[2]}
						if(!existsSync(process.argv[2])) mkdirSync(process.argv[2])
						return process.argv[2]
				  }
			}
	  
			else return process.cwd()
	 }

	 catch(err:unknown){
			throw new Error(`[-] Error While Checking Root Project Dir : ${err}`)
	 }

}

function promptContinueOrAbort():boolean{
	  
	  console.log("Do You Want to Retry Createing Project From Last Step Error ?")
	  
	  const io= createInterface(process.stdin,process.stdout)
	  
	  let answer:boolean=false
	  
	  io.question("Y/N", (option)=>{
	
			if(option.toLowerCase()=="yes"|| option.toLowerCase()=="y" ){
				  console.log(`[+] Retry Again`)
				  answer=true
			}
			
			else{
				  console.log('[-] Aborting ')
				  answer=false
			}

			io.close()
	  })

	  return answer
	  
}

export const rootProjectDir=getRootProjectDir()

export function main():void{

	  try{
			

			const stages=[
				  cryptopressInit,
				  cryptopressInstallDependencies,
				  cryptopressStructuringProject,
				  cryptopressConfigingProject,
				  cryptopressWriteingBasicApp
			]	
			
			stages.forEach( (stage,_index,_array)=>{
				  if(!stage()){
					throw new Error("");	
				  }
			} )


	  }
	  catch (err){
			console.error(`[-] Error : ${Error}`)
			if(promptContinueOrAbort()){
				  main()
			}
			else{
				  process.exit()
			}
	  }

}

