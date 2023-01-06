import {writeFileSync,existsSync} from "fs"
import {join} from "path"
import { createProjectMap } from "./cryptopressStructuringProject";
import { rootProjectDir } from "./cryptopress";
function writeFileIfNotExists(filename:string,data:string):void{
	  if(!existsSync(filename)) writeFileSync(filename,data,{encoding:"utf8"});
}


function createTypeScriptConfig():string{
	  return `{
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "lib": ["ES6"],
      "outDir": "./build",
      "rootDir": "./src",
      "strict": true,
      "noImplicitAny": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true
    },
    "include": ["./src"],
    "exclude": ["node_modules", "spec", "build"]
}`

}

function createPrettierConfig():string{
	  return `{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "bracketSpacing": true,
  "tabWidth": 2,
  "trailingComma": "none"
}`

}

function createPrettierEslintIgnoreConfig():string{
	  return `node_modules
build`

}


function createEslineConfig():string{
	  return `module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    semi: ['error', 'never'],
    'no-use-before-define': ['error', { functions: true, classes: true }],
    'prettier/prettier': 2, // Means error
    'no-console': 0, // Means warning
    'no-var': 'error',
    'prefer-const': 'error'
  }
}`

}


function createJasmineConfig():string{
	  return `{
  "spec_dir": "build/tests",
  "spec_files": ["**/*.spec.js"],
  "helpers": ["helpers/**/*.js"],
  "stopSpecOnExpectationFailure": false,
  "random": false
}`

}

function createJasmineReporterConfig():string{
	  return `import { DisplayProcessor, SpecReporter, StacktraceOption } from 'jasmine-spec-reporter'
import SuiteInfo = jasmine.SuiteInfo

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return \`\${log}\`
  }
}

jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(
  new SpecReporter({
    suite: {
      displayNumber: true
    },
    spec: {
      displayStacktrace: StacktraceOption.NONE
    },
    customProcessors: [CustomProcessor]
  })
)`

}

function createDotenvConfig():string{
	  return `PORT=3000`
}



function finalConfigsCheck(projectMap:Map<string,string>):boolean{
	  try{
			projectMap.forEach((dir,_key,_map)=>{if(!existsSync(dir)) return false;})
			return true
	  }
	  catch(err:unknown){
			throw new Error(`[-] Final Check Error : ${err}`)
	  }
}

function cryptopressConfigingProject():boolean{
	  try{
			console.log('[+] Stage (4) : Configing Project  ')

			if( !existsSync(join(rootProjectDir,"package.json")) ) throw new Error("Error package.json Not Found");

			const projectMap=createProjectMap()

			writeFileIfNotExists(projectMap.get("typescriptConfig") as string, createTypeScriptConfig())
			writeFileIfNotExists(projectMap.get("prettierConfig") as string, createPrettierConfig())
			writeFileIfNotExists(projectMap.get("prettierIgnoreConfig") as string, createPrettierEslintIgnoreConfig())
			writeFileIfNotExists(projectMap.get("eslintConfig") as string, createEslineConfig())
			writeFileIfNotExists(projectMap.get("eslintIgnoreConfig") as string, createPrettierEslintIgnoreConfig())
			writeFileIfNotExists(projectMap.get("jasmineConfig") as string, createJasmineConfig())
			writeFileIfNotExists(projectMap.get("jasmineReporterConfig") as string, createJasmineReporterConfig())
			writeFileIfNotExists(projectMap.get("dotenvConfig") as string, createDotenvConfig())


			return finalConfigsCheck(projectMap);
	  }
	  catch(err:unknown){
			console.error(`[-] Error While Configing Project : ${err}`)
			return false
	  }
}

export {cryptopressConfigingProject}
