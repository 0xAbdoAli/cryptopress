"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptopressConfigingProject = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var cryptopressStructuringProject_1 = require("./cryptopressStructuringProject");
var cryptopress_1 = require("./cryptopress");
function writeFileIfNotExists(filename, data) {
    if (!(0, fs_1.existsSync)(filename))
        (0, fs_1.writeFileSync)(filename, data, { encoding: "utf8" });
}
function createTypeScriptConfig() {
    return "{\n    \"compilerOptions\": {\n      \"target\": \"es5\",\n      \"module\": \"commonjs\",\n      \"lib\": [\"ES6\"],\n      \"outDir\": \"./build\",\n      \"rootDir\": \"./src\",\n      \"strict\": true,\n      \"noImplicitAny\": true,\n      \"esModuleInterop\": true,\n      \"skipLibCheck\": true,\n      \"forceConsistentCasingInFileNames\": true\n    },\n    \"include\": [\"./src\"],\n    \"exclude\": [\"node_modules\", \"spec\", \"build\"]\n}";
}
function createPrettierConfig() {
    return "{\n  \"semi\": false,\n  \"singleQuote\": true,\n  \"printWidth\": 100,\n  \"bracketSpacing\": true,\n  \"tabWidth\": 2,\n  \"trailingComma\": \"none\"\n}";
}
function createPrettierEslintIgnoreConfig() {
    return "node_modules\nbuild";
}
function createEslineConfig() {
    return "module.exports = {\n  env: {\n    es2021: true,\n    node: true,\n    jest: true\n  },\n  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],\n  parser: '@typescript-eslint/parser',\n  parserOptions: {\n    ecmaVersion: 13,\n    sourceType: 'module'\n  },\n  plugins: ['@typescript-eslint', 'prettier'],\n  rules: {\n    semi: ['error', 'never'],\n    'no-use-before-define': ['error', { functions: true, classes: true }],\n    'prettier/prettier': 2, // Means error\n    'no-console': 0, // Means warning\n    'no-var': 'error',\n    'prefer-const': 'error'\n  }\n}";
}
function createJasmineConfig() {
    return "{\n  \"spec_dir\": \"build/tests\",\n  \"spec_files\": [\"**/*.spec.js\"],\n  \"helpers\": [\"helpers/**/*.js\"],\n  \"stopSpecOnExpectationFailure\": false,\n  \"random\": false\n}";
}
function createJasmineReporterConfig() {
    return "import { DisplayProcessor, SpecReporter, StacktraceOption } from 'jasmine-spec-reporter'\nimport SuiteInfo = jasmine.SuiteInfo\n\nclass CustomProcessor extends DisplayProcessor {\n  public displayJasmineStarted(info: SuiteInfo, log: string): string {\n    return `${log}`\n  }\n}\n\njasmine.getEnv().clearReporters()\njasmine.getEnv().addReporter(\n  new SpecReporter({\n    suite: {\n      displayNumber: true\n    },\n    spec: {\n      displayStacktrace: StacktraceOption.NONE\n    },\n    customProcessors: [CustomProcessor]\n  })\n)";
}
function createDotenvConfig() {
    return "PORT=3000";
}
function finalConfigsCheck(projectMap) {
    try {
        projectMap.forEach(function (dir, _key, _map) { if (!(0, fs_1.existsSync)(dir))
            return false; });
        return true;
    }
    catch (err) {
        throw new Error("[-] Final Check Error : ".concat(err));
    }
}
function cryptopressConfigingProject() {
    try {
        console.log('[+] Stage (4) : Configing Project  ');
        if (!(0, fs_1.existsSync)((0, path_1.join)(cryptopress_1.rootProjectDir, "package.json")))
            throw new Error("Error package.json Not Found");
        var projectMap = (0, cryptopressStructuringProject_1.createProjectMap)();
        writeFileIfNotExists(projectMap.get("typescriptConfig"), createTypeScriptConfig());
        writeFileIfNotExists(projectMap.get("prettierConfig"), createPrettierConfig());
        writeFileIfNotExists(projectMap.get("prettierIgnoreConfig"), createPrettierEslintIgnoreConfig());
        writeFileIfNotExists(projectMap.get("eslintConfig"), createEslineConfig());
        writeFileIfNotExists(projectMap.get("eslintIgnoreConfig"), createPrettierEslintIgnoreConfig());
        writeFileIfNotExists(projectMap.get("jasmineConfig"), createJasmineConfig());
        writeFileIfNotExists(projectMap.get("jasmineReporterConfig"), createJasmineReporterConfig());
        writeFileIfNotExists(projectMap.get("dotenvConfig"), createDotenvConfig());
        return finalConfigsCheck(projectMap);
    }
    catch (err) {
        console.error("[-] Error While Configing Project : ".concat(err));
        return false;
    }
}
exports.cryptopressConfigingProject = cryptopressConfigingProject;
