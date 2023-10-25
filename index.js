console.log("Starting . . .");
require("dotenv").config(), require("rootpath")(), require("./server");
const { spawn: spawn } = require("child_process"),
   path = require("path"),
   colors = require("@colors/colors/safe");
const { say } = require("cfonts");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "1";
process.on("uncaughtException", console.error);

function start() {
   let args = [path.join(__dirname, "main.js"), ...process.argv.slice(2)];
   say([process.argv[0], ...args].join(" "), {
      font: "console",
      align: "center",
      colors: ["cyan"],
   });
   let p = spawn(process.argv[0], args, {
      stdio: ["inherit", "inherit", "inherit", "ipc"],
   })
      .on("message", (data) => {
         if (data == "reset") {
            console.log("Restarting...");
            p.kill();
            delete p;
         }
      })
      .on("exit", (code) => {
         console.error("Exited with code:", code);
         if (code == 1) start();
         if (code == null) start();
      });
}

say("Bayu Amore Bot", {
   font: "chrome",
   align: "center",
   colors: ["#00FFD9"],
   background: "transparent",
   letterSpacing: 1,
   lineHeight: 1,
   space: true,
   maxLength: "0",
   gradient: false,
   independentGradient: false,
   transitionGradient: false,
   env: "node",
});

say("Bayu Amore Assistant", {
   font: "console",
   align: "center",
   colors: ["cyan"],
});

start();
