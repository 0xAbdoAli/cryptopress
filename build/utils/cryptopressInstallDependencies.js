"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptopressInstallDependencies = void 0;
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var path_1 = require("path");
function cryptopressInstallDependencies() {
    try {
        if (!(0, fs_1.existsSync)((0, path_1.join)(process.cwd(), "package.json")))
            throw new Error("Error package.json Not Found");
        var installMainDependciesCommand = "npm install express helmet jasmine  jasmine-spec-reporter  supertest dotenv --save";
        var installDevDependciesCommand = "npm install typescript nodemon  ts-node rimraf eslint prettier  morgan  @types/express  @types/morgan  @types/jasmine @types/supertest @typescript-eslint/eslint-plugin @typescript-eslint/parser   eslint-config-prettier  eslint-plugin-prettier  --save-dev ";
        (0, child_process_1.execSync)(installMainDependciesCommand);
        (0, child_process_1.execSync)(installDevDependciesCommand);
        return true;
    }
    catch (err) {
        console.error(" [-] Error While Installing Dependcies : ".concat(err));
        return false;
    }
}
exports.cryptopressInstallDependencies = cryptopressInstallDependencies;
