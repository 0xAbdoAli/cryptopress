"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptopressInit = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var cryptopress_1 = require("./cryptopress");
function createPackageDotJson() {
    return "\n{\n  \"name\": \"".concat((0, path_1.parse)(cryptopress_1.rootProjectDir).name, "\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"main\": \"./build/app.js\",\n  \"scripts\": {\n    \"dev\": \"nodemon ./src/app.ts\",\n    \"start\": \"npx rimraf build && npx tsc && node ./build/app.js\",\n    \"clean\": \"npx rimraf build\",\n    \"build\": \"npx rimraf build && npx tsc\",\n    \"test\": \"npx rimraf build && npx tsc && jasmine\",\n    \"format\": \"npx prettier --write 'src/**/*.{ts,js}' \",\n    \"lint\": \"npx eslint . --ext .ts\"\n  },\n  \"keywords\": [],\n  \"license\": \"ISC\"\n}\n");
}
function cryptopressInit() {
    try {
        console.log('[+] Stage (1) : Initing Project and Configing package.json ');
        var packageJsonPath = (0, path_1.join)(cryptopress_1.rootProjectDir, "package.json");
        if ((0, fs_1.existsSync)(packageJsonPath))
            return true; // package.json already exists  
        else {
            (0, fs_1.writeFileSync)(packageJsonPath, createPackageDotJson(), {
                encoding: "utf-8"
            });
            if ((0, fs_1.existsSync)(packageJsonPath))
                return true; //package.json created
            else
                return cryptopressInit(); // re try create package.json 
        }
    }
    catch (err) {
        console.error("[-] Error While Createing package.json File ".concat(err));
        return false;
    }
}
exports.cryptopressInit = cryptopressInit;
