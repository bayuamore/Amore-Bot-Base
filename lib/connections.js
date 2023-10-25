const logging = require("./logging");
const parsePhoneNumber = require("libphonenumber-js");

const options = async (number) => {
   /*
    * {*} Prerelease {*}
    */
   try {
      const phoneNumber = await parsePhoneNumber(`+${number}`);
      if (!phoneNumber?.isValid()) {
         logging("error", "Failed to Register Number", `${number} Invalid\n`);
         process.exit();
      }
   } catch (err) {
      logging("error", "Connection", "Amore Bot Maintance");
   }
};

const open = async (bayuamore) => {
   try {
      bayuamore.sendMessage("6285722632523@s.whatsapp.net", {
         text: `*Terhubung dengan ${bayuamore.user.name} menggunakan WaSocket...*`,
         contextInfo: {
            externalAdReply: {
               showAdAttribution: true,
               renderLargerThumbnail: true,
               mediaType: 1,
               title: namabot,
               body: wm,
               previewType: `PHOTO`,
               containsAutoReply: true,
               thumbnail: thumb,
               mediaUrl: myig,
               sourceUrl: myig,
            },
         },
      });
      logging("success", "Connected to", bayuamore.user.name);
   } catch (err) {}
};

module.exports = { options, open };
