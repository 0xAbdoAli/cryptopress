"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptopressWriteingBasicApp = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var cryptopress_1 = require("./cryptopress");
function createAppMap() {
    var appMap = new Map();
    var sourcePath = (0, path_1.join)(cryptopress_1.rootProjectDir, "src");
    appMap.set("app", (0, path_1.join)(sourcePath, "app.ts"));
    appMap.set("mainController", (0, path_1.join)(sourcePath, "controllers", "index.ts"));
    appMap.set("mainRouter", (0, path_1.join)(sourcePath, "routes", "index.ts"));
    appMap.set("mainTest", (0, path_1.join)(sourcePath, "tests", "app.spec.ts"));
    return appMap;
}
function writeFileIfNotExists(filename, data) {
    if (!(0, fs_1.existsSync)(filename))
        (0, fs_1.writeFileSync)(filename, data, { encoding: "utf-8" });
}
function writeMainApp() {
    return "import express , {Application} from 'express'\nimport {config} from 'dotenv'\nimport morgan from 'morgan'\nimport helmet from 'helmet'\nimport bodyParser from 'body-parser'\nimport router from './routes'\n\nconfig()\n\nconst app: Application = express()\n\n// Useing BodyParser\n\napp.use(bodyParser.urlencoded({ extended: false }))\napp.use(bodyParser.json())\n\n\n//Secure Http Headers With By Setting Some  Verious Values And Xss Filter\n\napp.use(helmet())\n\n//Logging Http Requests in Dev Mode \n\nif(process.env.NODE_ENV=='dev'){\n\n\t  app.use(morgan('dev'))\n\n}\n\n// Useing Routes And Api\n\napp.use(router)\n\n// starting Server\n\nconst PORT: string | number = process.env.PORT || 3000\n\napp.listen(PORT, () => {\n\t  console.log(`[+] Server Listening Now at Port : ${PORT} `)\n})\n\nexport default app";
}
function writeMainRouter() {
    return "import express, { Router } from 'express'\nimport { welcomeMessage, notFound } from '../controllers/'\nimport {join} from 'path'\n\n//Declareing Static Directory for Serving Static Files \n\nconst staticDir:string=join(__dirname,'..','..','public')\n\n//Creatring Router instance\n\nconst router: Router = express.Router()\n\n// Useing Static Directory for Serving Static Files \n\nrouter.use('/static',express.static(staticDir))\n\n// Welcome Message With / EndPoint\n\nrouter.get('/', welcomeMessage)\n\n// Response With Not Found for any invalid path\n\nrouter.all('/*', notFound)\n\nexport default router";
}
function writeMainController() {
    return "import {Request,Response} from \"express\"\n\nconst welcomeMessage = (_req: Request, res: Response): void => {\n\t  res.status(200).json({Server:'0xCrypt00o Server is Working !',PowerdBy:\"Eslam Mohammed\"})\n}\n\nconst notFound = (req: Request, res: Response): void => {\n\t  res.status(404).json({Error:'[-] Error 404 Not Found '})\n}\n\nexport { notFound, welcomeMessage }";
}
function writeBasicAppTest() {
    return "import supertest from 'supertest'\nimport app from '../app'\n\n// create a request object with instance app\n\nconst request = supertest(app)\n\n//describe Testing Endpoints\n\ndescribe('Testing endpoint Responses', () => {\n  //Testing / Endpoint\n\n  it('test / EndPoint', async () => {\n    const response = await request.get('/')\n    expect(response.status).toEqual(200)\n  })\n\n  //Testing /anything Endpoint\n\n  it('test /NotFound  EndPoint', async () => {\n    const response = await request.get('/anything')\n    expect(response.status).toEqual(404)\n  })\n})\n\n  //Testing Api\n\ndescribe('Testing  Api / ', () => {\n  it('test / ', async () => {\n    const response = await request.get('/')\n    expect(response.body.Server).toEqual('0xCrypt00o Server is Working !')\n    expect(response.status).toEqual(200)\n  })\n})";
}
function finalCheckAppContent(appMap) {
    appMap.forEach(function (file, _key, _map) { if (!(0, fs_1.existsSync)(file))
        throw new Error("[-] Error While Writeing file : ".concat(file)); });
    return true;
}
function formatingAndLintingApp() {
    (0, child_process_1.execSync)("npm run format --prefix ".concat(cryptopress_1.rootProjectDir, " && npm run lint --prefix ").concat(cryptopress_1.rootProjectDir));
}
function cryptopressWriteingBasicApp() {
    try {
        console.log('[+] Stage (5) : Writeing Final Application ');
        if (!(0, fs_1.existsSync)((0, path_1.join)(cryptopress_1.rootProjectDir, "package.json")))
            throw new Error("Error package.json Not Found");
        var appMap = createAppMap();
        writeFileIfNotExists(appMap.get("app"), writeMainApp());
        writeFileIfNotExists(appMap.get("mainRouter"), writeMainRouter());
        writeFileIfNotExists(appMap.get("mainController"), writeMainController());
        writeFileIfNotExists(appMap.get("mainTest"), writeBasicAppTest());
        formatingAndLintingApp();
        return finalCheckAppContent(appMap);
    }
    catch (err) {
        console.error("[-] Error While Writeing App Content : ".concat(err));
        return false;
    }
}
exports.cryptopressWriteingBasicApp = cryptopressWriteingBasicApp;
