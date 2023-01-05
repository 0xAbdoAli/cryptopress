"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptopressStructuringProject = exports.createProjectMap = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var currentWorkingDir = process.cwd();
function createProjectMap() {
    var projectMap = new Map();
    projectMap.set("typescriptConfig", (0, path_1.join)(currentWorkingDir, "tsconfig.json"));
    projectMap.set("jasmineConfig", (0, path_1.join)(currentWorkingDir, "spec", "support", "jasmine.json"));
    projectMap.set("jasmineReporterConfig", (0, path_1.join)(currentWorkingDir, "src", "tests", "helpers", "repoter.ts"));
    projectMap.set("prettierConfig", (0, path_1.join)(currentWorkingDir, ".prettierrc"));
    projectMap.set("prettierIgnoreConfig", (0, path_1.join)(currentWorkingDir, ".prettierignore"));
    projectMap.set("eslintConfig", (0, path_1.join)(currentWorkingDir, ".eslintrc.js"));
    projectMap.set("eslintIgnoreConfig", (0, path_1.join)(currentWorkingDir, ".eslintignore"));
    projectMap.set("dotenvConfig", (0, path_1.join)(currentWorkingDir, ".env"));
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
        var dirsToMake = [
            (0, path_1.join)(currentWorkingDir, "public"),
            (0, path_1.join)(currentWorkingDir, "public", "static"),
            (0, path_1.join)(currentWorkingDir, "public", "scripts"),
            (0, path_1.join)(currentWorkingDir, "public", "stylecheets"),
            (0, path_1.join)(currentWorkingDir, "spec"),
            (0, path_1.join)(currentWorkingDir, "spec", "support"),
            (0, path_1.join)(currentWorkingDir, "src"),
            (0, path_1.join)(currentWorkingDir, "src", "controllers"),
            (0, path_1.join)(currentWorkingDir, "src", "routes"),
            (0, path_1.join)(currentWorkingDir, "src", "middlewares"),
            (0, path_1.join)(currentWorkingDir, "src", "utils"),
            (0, path_1.join)(currentWorkingDir, "src", "models"),
            (0, path_1.join)(currentWorkingDir, "src", "tests"),
            (0, path_1.join)(currentWorkingDir, "src", "tests", "helpers"),
            (0, path_1.join)(currentWorkingDir, "src", "views")
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
