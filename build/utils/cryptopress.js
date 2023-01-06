"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.rootProjectDir = void 0;
var cryptopressInit_1 = require("./cryptopressInit");
var cryptopressInstallDependencies_1 = require("./cryptopressInstallDependencies");
var cryptopressStructuringProject_1 = require("./cryptopressStructuringProject");
var cryptopressConfigingProject_1 = require("./cryptopressConfigingProject");
var cryptopressWriteingBasicApp_1 = require("./cryptopressWriteingBasicApp");
var readline_1 = require("readline");
var fs_1 = require("fs");
function banner() {
    console.log("\n\n \u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2557   \u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\n\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u255A\u2588\u2588\u2557 \u2588\u2588\u2554\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u255A\u2550\u2550\u2588\u2588\u2554\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\n\u2588\u2588\u2551     \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D \u255A\u2588\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D   \u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551 \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\n\u2588\u2588\u2551     \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557  \u255A\u2588\u2588\u2554\u255D  \u2588\u2588\u2554\u2550\u2550\u2550\u255D    \u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551 \u2588\u2588\u2554\u2550\u2550\u2550\u255D \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u255D  \u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551\u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551\n\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2551  \u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551        \u2588\u2588\u2551   \u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2551     \u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\n \u255A\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u255D  \u255A\u2550\u255D   \u255A\u2550\u255D   \u255A\u2550\u255D        \u255A\u2550\u255D    \u255A\u2550\u2550\u2550\u2550\u2550\u255D  \u255A\u2550\u255D     \u255A\u2550\u255D  \u255A\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D                                                                                                                                                                                                                                                                              \n\t\t\t Create Express App Integreated with Typescript , Prettier , Eslint , Jasmine  in few Seconds !\n \n[+] Created By 0xCrypt00o \"Eslam Mohammed\"\n\n\t\t\tgit repo: https://github.com/Crypt00o/cryptopress.git\n\t\t\tnpm package : https://npmjs.com/package/cryptopress.git\n\n ");
}
function usage() {
    console.log("\n\n[+] Usage :\n\n\t  cryptopress\t\t\t\t\t\t\"to init project in current directory\"\n\t  cryptopress\t/path/to/project\t\"to init project in spefic dir\"\n\t  cryptopress\t--help\t\t\t\t\"to dispaly this help\"\n\t  \t\t\t\t \n\n[+] Created By 0xCrypt00o \"Eslam Mohammed\"\n\n\t\t\tgit repo: https://github.com/Crypt00o/cryptopress.git\n\t\t\tnpm package : https://npmjs.com/package/cryptopress.git\n\n");
}
function getRootProjectDir() {
    try {
        banner();
        if (process.argv.length > 3) {
            console.error();
            usage();
            process.exit();
        }
        else if (process.argv.length == 3) {
            if (process.argv[2].toLowerCase() == "-h" || process.argv[2].toLowerCase() == "--help") {
                usage();
                process.exit();
            }
            else {
                process.cwd = function () { return process.argv[2]; };
                if (!(0, fs_1.existsSync)(process.argv[2]))
                    (0, fs_1.mkdirSync)(process.argv[2]);
                return process.argv[2];
            }
        }
        else
            return process.cwd();
    }
    catch (err) {
        throw new Error("[-] Error While Checking Root Project Dir : ".concat(err));
    }
}
function promptContinueOrAbort() {
    console.log("Do You Want to Retry Createing Project From Last Step Error ?");
    var io = (0, readline_1.createInterface)(process.stdin, process.stdout);
    var answer = false;
    io.question("Y/N", function (option) {
        if (option.toLowerCase() == "yes" || option.toLowerCase() == "y") {
            console.log("[+] Retry Again");
            answer = true;
        }
        else {
            console.log('[-] Aborting ');
            answer = false;
        }
        io.close();
    });
    return answer;
}
exports.rootProjectDir = getRootProjectDir();
function main() {
    try {
        var stages = [
            cryptopressInit_1.cryptopressInit,
            cryptopressInstallDependencies_1.cryptopressInstallDependencies,
            cryptopressStructuringProject_1.cryptopressStructuringProject,
            cryptopressConfigingProject_1.cryptopressConfigingProject,
            cryptopressWriteingBasicApp_1.cryptopressWriteingBasicApp
        ];
        stages.forEach(function (stage, _index, _array) {
            if (!stage()) {
                throw new Error("");
            }
        });
    }
    catch (err) {
        console.error("[-] Error : ".concat(Error));
        if (promptContinueOrAbort()) {
            main();
        }
        else {
            process.exit();
        }
    }
}
exports.main = main;
