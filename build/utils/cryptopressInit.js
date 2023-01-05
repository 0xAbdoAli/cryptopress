"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptopressInit = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
function createPackageDotJson() {
    return "\n{\n  \"name\": \"".concat((0, path_1.parse)(process.cwd()).name, "\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"main\": \"./build/app.js\",\n  \"scripts\": {\n    \"dev\": \"nodemon ./src/app.ts\",\n    \"start\": \"npx rimraf build && npx tsc && node ./build/app.js\",\n    \"clean\": \"npx rimraf build\",\n    \"build\": \"npx rimraf build && npx tsc\",\n    \"test\": \"npx rimraf build && npx tsc && jasmine\",\n    \"format\": \"npx prettier --write 'src/**/*.{ts,js}' \",\n    \"lint\": \"npx eslint . --ext .ts\"\n  },\n  \"keywords\": [],\n  \"license\": \"ISC\"\n}\n");
}
function cryptopressInit() {
    try {
        if ((0, fs_1.existsSync)((0, path_1.join)(process.cwd(), "package.json")))
            return true; // package.json already exists  
        else {
            (0, fs_1.writeFileSync)("package.json", createPackageDotJson(), {
                encoding: "utf-8"
            });
            if ((0, fs_1.existsSync)((0, path_1.join)(process.cwd(), "package.json")))
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
