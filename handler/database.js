module.exports = async (bayuamore, m) => {
   try {
      //━━━━━━━━━━━━━━━[ CONST ]━━━━━━━━━━━━━━━━━//
      let botNumber = bayuamore.decodeJid(bayuamore.user.id);
      let groupMetadata = m.isGroup
         ? await bayuamore.groupMetadata(m.chat).catch((e) => {})
         : "";
      let groupName = m.isGroup ? groupMetadata.subject : "";
      let isNumber = (x) => typeof x === "number" && !isNaN(x);
      //━━━━━━━━━━━━━━━[ CONST DATABASE ]━━━━━━━━━━━━━━━━━//
      //let chat = global.db.data.chats[m.chat]
      let user = global.db.data.users[m.sender];
      if (typeof user !== "object") global.db.data.users[m.sender] = {};
      if (user) {
         if (!("name" in user)) user.name = m.pushName;
         if (!("autolevelup" in user)) user.autolevelup = true;
         if (!isNumber(user.darah)) user.darah = 100;
         if (!isNumber(user.exp)) user.exp = 0;
         if (!isNumber(user.level)) user.level = 0;
         if (!isNumber(user.limit)) user.limit = 25;
         if (!isNumber(user.money)) user.money = 0;
         if (!isNumber(user.potion)) user.potion = 1;
         if (!isNumber(user.role)) user.role = "Beginner";
         if (!isNumber(user.tiketcoin)) user.tiketcoin = 0;
         if (!isNumber(user.kardus)) user.kardus = 1;
         if (!isNumber(user.umpan)) user.umpan = 1;
         if (!isNumber(user.besi)) user.besi = 5;
         if (!isNumber(user.emerald)) user.emerald = 1;
         if (!isNumber(user.emas)) user.emas = 1;
         if (!isNumber(user.anggur)) user.anggur = 0;
         if (!isNumber(user.apel)) user.apel = 0;
         if (!isNumber(user.jeruk)) user.jeruk = 0;
         if (!isNumber(user.mangga)) user.mangga = 0;
         if (!isNumber(user.pisang)) user.pisang = 0;
         if (!isNumber(user.bibitanggur)) user.bibitanggur = 0;
         if (!isNumber(user.bibitapel)) user.bibitapel = 0;
         if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0;
         if (!isNumber(user.bibitmangga)) user.bibitmangga = 0;
         if (!isNumber(user.bibitpisang)) user.bibitpisang = 0;
         if (!isNumber(user.ayam)) user.ayam = 0;
         if (!isNumber(user.domba)) user.domba = 0;
         if (!isNumber(user.gajah)) user.gajah = 0;
         if (!isNumber(user.ikan)) user.ikan = 0;
         if (!isNumber(user.kelinci)) user.kelinci = 0;
         if (!isNumber(user.sapi)) user.sapi = 0;
         if (!isNumber(user.lastberkebon)) user.lastberkebon = 0;
         if (!isNumber(user.lastclaim)) user.lastclaim = 0;
         if (!isNumber(user.lastmulung)) user.lastmulung = 0;
         if (!("delete" in user))
            user.delete = {
               type: "",
               text: "",
               url: "",
            };
      } else
         global.db.data.users[m.sender] = {
            name: m.pushName,
            autolevelup: true,
            darah: 100,
            exp: 0,
            level: 0,
            limit: 25,
            money: 0,
            potion: 1,
            role: "Beginner",
            tiketcoin: 0,
            kardus: 1,
            umpan: 1,
            besi: 5,
            emerald: 1,
            emas: 1,
            anggur: 0,
            apel: 0,
            jeruk: 0,
            mangga: 0,
            pisang: 0,
            bibitanggur: 0,
            bibitapel: 0,
            bibitjeruk: 0,
            bibitmangga: 0,
            bibitpisang: 0,
            ayam: 0,
            domba: 0,
            gajah: 0,
            ikan: 0,
            kelinci: 0,
            sapi: 0,
            lastberkebon: 0,
            lastclaim: 0,
            lastmulung: 0,
            delete: {
               type: "",
               text: "",
               url: "",
            },
         };

      let setting = global.db.data.settings[botNumber];
      if (typeof setting !== "object") global.db.data.settings[botNumber] = {};
      if (setting) {
         if (!isNumber(setting.status)) setting.status = 0;
         if (!("antiviewonce" in setting)) setting.antiviewonce = true;
         if (!("autobio" in setting)) setting.autobio = true;
         if (!("autoread" in setting)) setting.autoread = true;
         if (!("autosw" in setting)) setting.autosw = true;
         if (!("public" in setting)) setting.public = true;
         if (!("auto" in setting)) setting.auto = "unavailable";
         if (!("replytype" in setting)) setting.replytype = "mess3";
         if (!("setmenu" in setting)) setting.setmenu = "menu1";
      } else
         global.db.data.settings[botNumber] = {
            status: 0,
            antiviewonce: true,
            autobio: true,
            autoread: true,
            autosw: true,
            public: true,
            auto: "unavailable",
            replytype: "mess3",
            setmenu: "menu1",
         };
   } catch (err) {
      console.error(err);
   }
};
