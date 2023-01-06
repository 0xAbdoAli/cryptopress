import {join} from "path"
import {writeFileSync,existsSync} from "fs"
import {execSync} from "child_process"

import { rootProjectDir } from "./cryptopress"

function createAppMap():Map<string,string>{ 
	  let appMap=new Map<string,string>()
	  const sourcePath=join(rootProjectDir,"src")
	  appMap.set("app", join(sourcePath,"app.ts"))
	  appMap.set("mainController", join(sourcePath,"controllers","index.ts") )
	  appMap.set("mainRouter", join(sourcePath,"routes","index.ts"))
	  appMap.set("mainTest", join(sourcePath,"tests","app.spec.ts") ) 
	  return appMap
}


function writeFileIfNotExists(filename:string,data:string):void{
	  if(!existsSync(filename)) writeFileSync(filename,data,{encoding:"utf-8"});
}


function writeMainApp():string{
	  
	  return `import express , {Application} from 'express'
import {config} from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import router from './routes'

config()

const app: Application = express()

// Useing BodyParser

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Secure Http Headers With By Setting Some  Verious Values And Xss Filter

app.use(helmet())

//Logging Http Requests in Dev Mode 

if(process.env.NODE_ENV=='dev'){

	  app.use(morgan('dev'))

}

// Useing Routes And Api

app.use(router)

// starting Server

const PORT: string | number = process.env.PORT || 3000

app.listen(PORT, () => {
	  console.log(\`[+] Server Listening Now at Port : \${PORT} \`)
})

export default app`

}

function writeMainRouter():string{
	  
	  return `import express, { Router } from 'express'
import { welcomeMessage, notFound } from '../controllers/'
import {join} from 'path'

//Declareing Static Directory for Serving Static Files 

const staticDir:string=join(__dirname,'..','..','public')

//Creatring Router instance

const router: Router = express.Router()

// Useing Static Directory for Serving Static Files 

router.use('/static',express.static(staticDir))

// Welcome Message With / EndPoint

router.get('/', welcomeMessage)

// Response With Not Found for any invalid path

router.all('/*', notFound)

export default router`

}

function writeMainController():string{
	  return `import {Request,Response} from "express"

const welcomeMessage = (_req: Request, res: Response): void => {
	  res.status(200).json({Server:'0xCrypt00o Server is Working !',PowerdBy:"Eslam Mohammed"})
}

const notFound = (req: Request, res: Response): void => {
	  res.status(404).json({Error:'[-] Error 404 Not Found '})
}

export { notFound, welcomeMessage }`

}

function writeBasicAppTest():string{
	  
	  return `import supertest from 'supertest'
import app from '../app'

// create a request object with instance app

const request = supertest(app)

//describe Testing Endpoints

describe('Testing endpoint Responses', () => {
  //Testing / Endpoint

  it('test / EndPoint', async () => {
    const response = await request.get('/')
    expect(response.status).toEqual(200)
  })

  //Testing /anything Endpoint

  it('test /NotFound  EndPoint', async () => {
    const response = await request.get('/anything')
    expect(response.status).toEqual(404)
  })
})

  //Testing Api

describe('Testing  Api / ', () => {
  it('test / ', async () => {
    const response = await request.get('/')
    expect(response.body.Server).toEqual('0xCrypt00o Server is Working !')
    expect(response.status).toEqual(200)
  })
})`


}

function finalCheckAppContent(appMap:Map<string,string>):boolean{
	  appMap.forEach((file,_key,_map)=>{if(!existsSync(file)) throw new Error(`[-] Error While Writeing file : ${file}`); })
	  return true

}

function formatingAndLintingApp():void{
	  execSync(`npm run format --prefix ${rootProjectDir} && npm run lint --prefix ${rootProjectDir}`)
}

function cryptopressWriteingBasicApp():boolean{
	  
	  try{
			
			console.log('[+] Stage (5) : Writeing Final Application ')
			
			if( !existsSync(join(rootProjectDir,"package.json")) ) throw new Error("Error package.json Not Found");
			
			const appMap=createAppMap()

			writeFileIfNotExists(appMap.get("app") as string, writeMainApp())
			writeFileIfNotExists(appMap.get("mainRouter") as string, writeMainRouter() )
			writeFileIfNotExists(appMap.get("mainController") as string,writeMainController() )
			writeFileIfNotExists(appMap.get("mainTest") as string, writeBasicAppTest())
			
			formatingAndLintingApp()
			
			return finalCheckAppContent(appMap)
	  }
	  
	  catch(err:unknown){
			console.error(`[-] Error While Writeing App Content : ${err}`)
			return false
	  }

}


export {cryptopressWriteingBasicApp}
