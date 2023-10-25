require("./menu");
require("./module");
require("./settings");

let file = require.resolve(__filename);
fs.watchFile(file, () => {
   fs.unwatchFile(file);
   console.log(chalk.redBright(`Update ${__filename}`));
   delete require.cache[file];
   require(file);
});
