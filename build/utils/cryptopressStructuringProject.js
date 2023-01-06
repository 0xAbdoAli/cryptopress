"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptopressStructuringProject = exports.createProjectMap = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var cryptopress_1 = require("./cryptopress");
function createProjectMap() {
    var projectMap = new Map();
    projectMap.set("typescriptConfig", (0, path_1.join)(cryptopress_1.rootProjectDir, "tsconfig.json"));
    projectMap.set("jasmineConfig", (0, path_1.join)(cryptopress_1.rootProjectDir, "spec", "support", "jasmine.json"));
    projectMap.set("jasmineReporterConfig", (0, path_1.join)(cryptopress_1.rootProjectDir, "src", "tests", "helpers", "repoter.ts"));
    projectMap.set("prettierConfig", (0, path_1.join)(cryptopress_1.rootProjectDir, ".prettierrc"));
    projectMap.set("prettierIgnoreConfig", (0, path_1.join)(cryptopress_1.rootProjectDir, ".prettierignore"));
    projectMap.set("eslintConfig", (0, path_1.join)(cryptopress_1.rootProjectDir, ".eslintrc.js"));
    projectMap.set("eslintIgnoreConfig", (0, path_1.join)(cryptopress_1.rootProjectDir, ".eslintignore"));
    projectMap.set("dotenvConfig", (0, path_1.join)(cryptopress_1.rootProjectDir, ".env"));
    return projectMap;
}
exports.createProjectMap = createProjectMap;
function finalDirsCheck(dirsToMake) {
    dirsToMake.forEach(function (dir, _index, _array) { if (!(0, fs_1.existsSync)(dir))
        return false; });
    return true;
}
function cryptopressStructuringProject() {
    try {
        console.log('[+] Stage (3) : Structuring Project And Files ');
        if (!(0, fs_1.existsSync)((0, path_1.join)(cryptopress_1.rootProjectDir, "package.json")))
            throw new Error("Error package.json Not Found");
        var dirsToMake = [
            (0, path_1.join)(cryptopress_1.rootProjectDir, "public"),
            (0, path_1.join)(cryptopress_1.rootProjectDir, "public", "static"),
            (0, path_1.join)(cryptopress_1.rootProjectDir, "public", "scripts"),
            (0, path_1.join)(cryptopress_1.rootProjectDir, "public", "stylecheets"),
            (0, path_1.join)(cryptopress_1.rootProjectDir, "spec"),
            (0, path_1.join)(cryptopress_1.rootProjectDir, "spec", "support"),
            (0, path_1.join)(cryptopress_1.rootProjectDir, "src"),
            (0, path_1.join)(cryptopress_1.rootProjectDir, "src", "controllers"),
            (0, path_1.join)(cryptopress_1.rootProjectDir, "src", "routes"),
            (0, path_1.join)(cryptopress_1.rootProjectDir, "src", "middlewares"),
            (0, path_1.join)(cryptopress_1.rootProjectDir, "src", "utils"),
            (0, path_1.join)(cryptopress_1.rootProjectDir, "src", "models"),
            (0, path_1.join)(cryptopress_1.rootProjectDir, "src", "tests"),
            (0, path_1.join)(cryptopress_1.rootProjectDir, "src", "tests", "helpers"),
            (0, path_1.join)(cryptopress_1.rootProjectDir, "src", "views")
        ];
        dirsToMake.forEach(function (dir, _index, _array) { if (!(0, fs_1.existsSync)(dir))
            (0, fs_1.mkdirSync)(dir); });
        return finalDirsCheck(dirsToMake);
    }
    catch (err) {
        console.error("[-] Error While Structuring The Project : ".concat(err));
        return false;
    }
}
exports.cryptopressStructuringProject = cryptopressStructuringProject;
