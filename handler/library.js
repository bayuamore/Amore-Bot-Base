require("./module");

JSON_DATA = {
   access: JSON.parse(fs.readFileSync("./database/grups.json").toString()),
   db_error: JSON.parse(fs.readFileSync("./database/error.json")),
   db_respon_list: JSON.parse(fs.readFileSync("./database/list-message.json")),
   grups: JSON.parse(fs.readFileSync("./database/grups.json")),
   member: JSON.parse(fs.readFileSync("./database/user.json")),
   premium: JSON.parse(fs.readFileSync("./database/premium.json").toString()),
   pterodactyl: JSON.parse(
      fs.readFileSync("./database/pterodactyl.json").toString()
   ),
   server: JSON.parse(fs.readFileSync("./database/server.json")),
   seller: JSON.parse(fs.readFileSync("./database/seller.json").toString()),
   sewa: JSON.parse(fs.readFileSync("./database/sewa.json")),
   contacts: JSON.parse(fs.readFileSync("./database/contacts.json")),
   imgnye: JSON.parse(fs.readFileSync("./media/database/image.json")),
   sticnye: JSON.parse(fs.readFileSync("./media/database/sticker.json")),
   vidnye: JSON.parse(fs.readFileSync("./media/database/video.json")),
   vnnye: JSON.parse(fs.readFileSync("./media/database/vn.json")),
};

exports.access = JSON_DATA.access;
exports.db_error = JSON_DATA.db_error;
exports.db_respon_list = JSON_DATA.db_respon_list;
exports.grups = JSON_DATA.grups;
exports.member = JSON_DATA.member;
exports.premium = JSON_DATA.premium;
exports.pterodactyl = JSON_DATA.pterodactyl;
exports.server = JSON_DATA.server;
exports.seller = JSON_DATA.seller;
exports.sewa = JSON_DATA.sewa;
exports.contacts = JSON_DATA.contacts;
exports.imgnye = JSON_DATA.imgnye;
exports.sticnye = JSON_DATA.sticnye;
exports.vidnye = JSON_DATA.vidnye;
exports.vnnye = JSON_DATA.vnnye;
