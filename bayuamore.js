//━━━━━━━━━━━━━━━[ CONST DATABASE ]━━━━━━━━━━━━━━━━━//
global.db.data = JSON.parse(fs.readFileSync("./database/database.json"));
if (global.db.data) global.db.data = {
chats: {},
database: {},
donate: {},
game: {},
group: {},
others: {},
settings: {},
sticker: {},
users: {},
...(global.db.data || {})
}

let asahotak = db.data.game.asahotak = []
let caklontong = db.data.game.caklontong = []
let kuismath = db.data.game.math = []
let siapakahaku = db.data.game.siapakahaku = []
let susunkata = db.data.game.susunkata = []
let tebakgambar = db.data.game.tebakgambar = []
let tebakkata = db.data.game.tebakkata = []
let tebaklagu = db.data.game.tebaklagu = []
let tebaklirik = db.data.game.tebaklirik = []
let tebaktebakan = db.data.game.tebaktebakan = []
let tekateki = db.data.game.tekateki = []

const { access, db_error, db_respon_list, grups, member, premium, pterodactyl, server, seller, sewa, contacts, imgnye, sticnye, vidnye, vnnye } = require("./handler/library");

const _sewa = require("./lib/sewa");
const { color, bgcolor, mycolor } = require("./lib/color");
const levelling = require("./lib/levelling");
const { teksbanned, tekscmd, bagai, cek1, wa, apa, teksspam, hob, dare, ilhamberkata, ngebucin, katahai, katamalem, katasiang, katasore, katalopyou, tekssalah, badud, ohayo, bapak, anime, bisa, kapan, trut, salam, oawalah, message, regex, allemojinya, thanks, menu, bad, dosa, faktaunik, pantun, truthdare } = require("./lib/message");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require("./lib/respon-list");
const { smsg, fetchJson, getBuffer, getGroupAdmins, updateDatabase, msToDate, isUrl, checkBandwidth, runtime, sleep, getRandom, tanggal, getTime, getCase, formatp } = require("./lib/simple");
const { uptotelegra } = require("./lib/upload");
const { floNime, TelegraPh, UploadFileUgu, webp2mp4File } = require("./lib/uploader");

const remini = require("./scrape/remini");
const scp = require("./scrape/scraper");
const Tiktokdl = require("./scrape/tiktok");
//━━━━━━━━━━━━━━━[ CONST FUNCTION ]━━━━━━━━━━━━━━━━━//
module.exports = bayuamore = async (bayuamore, m, chatUpdate, store) => {
const qtod = m.quoted? true : false
require("./handler/database")(bayuamore, m)
try {
const body = m.mtype === "conversation" ? m.message.conversation : m.mtype == "imageMessage" ? m.message.imageMessage.caption : m.mtype == "videoMessage" ? m.message.videoMessage.caption : m.mtype == "extendedTextMessage" ? m.message.extendedTextMessage.text : m.mtype == "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId : m.mtype == "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId : m.mtype == "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId : m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
const budy = typeof m.text == "string" ? m.text : ""
const prefix = /^[°#+,.?=''():√%!¢£¥€π¤ΠΦ_&`™️©️®️Δ^βα¦|/\\©️^]/.test(body) ? body.match(/^[°#+,.?=''():√%¢£¥€π¤ΠΦ_&!`™️©️®️Δ^βα¦|/\\©️^]/gi) : "."
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const full_args = body.replace(command, "").slice(1).trim()
const content = JSON.stringify(m.message)
const { type, quotedMsg, mentioned, now, fromMe } = m
const pushname = m.pushName || "No Name"
const tag = m.sender.split("@")[0]
const botNumber = await bayuamore.decodeJid(bayuamore.user.id)
const isCreator = [botNumber, ...global.owner].map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)
const itsMe = m.sender == botNumber ? true : false
const text = q = args.join(" ")
const date = moment().tz("Asia/Jakarta").format("dddd, ll")
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)
const listblock = await bayuamore.fetchBlocklist()
const from = m.key.remoteJid
const numberQuery = text.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net"
const mentionByTag = m.mtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = m.mtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
const Input = mentionByTag[0] ? mentionByTag[0] : mentionByReply ? mentionByReply : q ? numberQuery : false
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const _uptime = process.uptime() * 1000
const uptime = clockString(_uptime)
//━━━━━━━━━━━━━━━[ CONST GROUPS ]━━━━━━━━━━━━━━━━━//
const groupMetadata = m.isGroup ? await bayuamore.groupMetadata(m.chat).catch(e => {}) : ""
const groupName = m.isGroup ? groupMetadata.subject : ""
const participants = m.isGroup ? await groupMetadata.participants : ""
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(x => x.id) : ""
const groupOwner = m.isGroup ? groupMetadata.owner : ""
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isBotGroupAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const sender = m.key.fromMe ? (bayuamore.user.id.split(":")[0] + "@s.whatsapp.net" || bayuamore.user.id) : (m.key.participant || m.key.remoteJid)
const senderNumber = sender.split('@')[0]
//━━━━━━━━━━━━━━━[ CONST OTHER ]━━━━━━━━━━━━━━━━━//
const isAccess = m.isGroup ? access.includes(m.chat) : false
const isContacts = contacts.includes(sender)
const isPrem = [botNumber, ...premium].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)
const isSeller = [botNumber, ...seller].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)
const isSewa = _sewa.checkSewaGroup(m.chat, sewa)
const isValidgrup = (id,array)=>{for(var i=0;i<array.length;i++){if(array[i]==id){return!0}}
return!1}
0
//━━━━━━━━━━━━━━━[ CONST FUNCTION ]━━━━━━━━━━━━━━━━━//
try {
ppuser = await bayuamore.profilePictureUrl(m.sender, "image")
} catch (err) {
ppuser = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60"
}
ppnyauser = await getBuffer(ppuser)

if (m.isGroup) {
_sewa.expiredCheck(bayuamore, sewa)
}

if (m.isGroup && isAlreadyResponList(m.chat, body, db_respon_list)) {
var get_data_respon = getDataResponList(m.chat, body, db_respon_list)
if (get_data_respon.isImage === false) {
bayuamore.sendMessage(m.chat, { text: sendResponList(m.chat, body, db_respon_list) }, { quoted: m })
} else {
bayuamore.sendMessage(m.chat, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, { quoted: m })
}
}

const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}

const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}

const parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}

async function checkBandwidth() {
let ind = 0
let out = 0
for (let i of await require("node-os-utils").netstat.stats()) {
ind += parseInt(i.inputBytes)
out += parseInt(i.outputBytes)
}
return {
download: format(ind),
upload: format(out),
}
}

async function loading() {
var amoremod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳..."
]
let { key } = await bayuamore.sendMessage(from, { text: "ʟᴏᴀᴅɪɴɢ..." })
for (let i = 0; i < amoremod.length; i++) {
await bayuamore.sendMessage(from, { text: amoremod[i], edit: key })
}
}

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds
return hours + " jam " + minutes + " menit " + seconds + " detik"
}

function toRupiah(angka) {
var saldo = ""
var angkarev = angka.toString().split("").reverse().join("")
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + "."
return ("" + saldo.split("", saldo.length - 1).reverse().join(""))
}

function ucapan() {
const hour_now = moment.tz('Asia/Jakarta').format('HH')
var ucapanWaktu = 'Pagi'
if (hour_now >= '03' && hour_now <= '10') {
ucapanWaktu = 'Pagi'
} else if (hour_now >= '10' && hour_now <= '15') {
ucapanWaktu = 'Siang'
} else if (hour_now >= '15' && hour_now <= '17') {
ucapanWaktu = 'Sore'
} else if (hour_now >= '17' && hour_now <= '18') {
ucapanWaktu = 'Petang'
} else if (hour_now >= '18' && hour_now <= '23') {
ucapanWaktu = 'Malam'
} else {
ucapanWaktu = 'Selamat Malam'
}	
return ucapanWaktu
}

let cron = require("node-cron");
bayuamore.backup = true;
if (bayuamore.backup) {
cron.schedule('00 01 * * *', () => {
let d = new Date
var hariini = d.toLocaleDateString("id", {
day: "numeric",
month: "long",
year: "numeric"
})

bayuamore.sendMessage(develover, {
document: fs.readFileSync("./database/user.json"),
mimetype: "application/json",
fileName: `user.json`,
caption: `Database : ${hariini}` })
}, {
schedule: true,
timezone: "Asia/Jakarta"
})
}

bayuamore.reseterror = true;
if (bayuamore.reseterror) {
setInterval(async () => {
db_error.splice("[]")
fs.writeFileSync("./database/error.json", JSON.stringify(db_error))
}, 60 * 60 * 1000)
}

const cek = (satu, dua) => {
let bayu = false
Object.keys(member).forEach((i) => {
if (member[i].id == dua) {bayu = i}})
if (bayu !== false) {
if (satu == "id") { return member[bayu].id }
if (satu == "saldo") { return member[bayu].saldo }
if (satu == "transaksi") { return member[bayu].transaksi }
if (satu == "idproduk") { return member[bayu].idproduk }
if (satu == "idtujuan") { return member[bayu].idtujuan }
if (satu == "nama") { return member[bayu].nama }
if (satu == "harga") { return member[bayu].harga }
}
if (bayu == false) { return null }
};

let sett = (satu, dua, tiga) => {
Object.keys(member).forEach((i) => {
if (member[i].id == dua) {
if (satu == "+saldo") { member[i].saldo += tiga
fs.writeFileSync('./database/user.json', JSON.stringify(member))}
if (satu == "-saldo") { member[i].saldo -= tiga
fs.writeFileSync('./database/user.json', JSON.stringify(member))}
if (satu == "transaksi") { member[i].transaksi = tiga
fs.writeFileSync('./database/user.json', JSON.stringify(member))}
if (satu == "idproduk") { member[i].idproduk = tiga
fs.writeFileSync('./database/user.json', JSON.stringify(member))}
if (satu == "idtujuan") { member[i].idtujuan = tiga
fs.writeFileSync('./database/user.json', JSON.stringify(member))}
if (satu == "nama") { member[i].nama = tiga
fs.writeFileSync('./database/user.json', JSON.stringify(member))}
if (satu == "+harga") { member[i].harga += tiga
fs.writeFileSync('./database/user.json', JSON.stringify(member))}
if (satu == "harga") { member[i].harga = tiga
fs.writeFileSync('./database/user.json', JSON.stringify(member))}
}})
}

const saldo = toRupiah(`${cek("saldo", m.sender)}`)
//━━━━━━━━━━━━━━━[ CONST DATABASE ]━━━━━━━━━━━━━━━━━//
const addUserPanel = (command, id, email, username, password, website, time, whatsapp) => {
var obj_add = {
command: command,
id: id,
email: email,
username: username,
password: password,
website: website,
time: time,
whatsapp: whatsapp,
}
pterodactyl.push(obj_add)
fs.writeFileSync("./database/pterodactyl.json", JSON.stringify(pterodactyl, null, 3))
}

const sendvn = (teks) => {
bayuamore.sendMessage(m.chat, { audio: teks, mimetype: "audio/mp4", ptt: true }, { quoted: m })
}
for (let Amores of vnnye) {
if (budy === Amores) {
if (!isPrem) return;
let buffer = fs.readFileSync(`./media/vn/${Amores}.mp3`)
sendvn(buffer)
}
}

for (let Amores of sticnye) {
if (budy === Amores) {
if (!isPrem) return;
let stickerbuffy = fs.readFileSync(`./media/sticker/${Amores}.webp`)
bayuamore.sendMessage(m.chat, { sticker: stickerbuffy }, { quoted: m })
}
}

for (let Amores of imgnye) {
if (budy === Amores) {
if (!isPrem) return;
let imagebuffy = fs.readFileSync(`./media/image/${Amores}.jpg`)
bayuamore.sendMessage(m.chat, { image: imagebuffy }, { quoted: m })
}
}

for (let Amores of vidnye) {
if (budy === Amores) {
if (!isPrem) return;
let videobuffy = fs.readFileSync(`./media/video/${Amores}.mp4`)
bayuamore.sendMessage(m.chat, { video: videobuffy }, { quoted: m })
}
}
//━━━━━━━━━━━━━━━[ CONST FEATURE ]━━━━━━━━━━━━━━━━━//
const playMp3 = async (text) => {
try {
let search = await yts(text)
let res = search
let mp3File = getRandom(".mp3")
console.log(color("Download Audio With ytdl-core"))
ytdl(res.all[0].url, { filter: "audioonly" }).pipe(fs.createWriteStream(mp3File)).on("finish", async () => {
bayuamore.sendMessage(m.chat, { audio: fs.readFileSync(mp3File), mimetype: "audio/mpeg" }, { quoted: m })
fs.unlinkSync(mp3File)
})
} catch (err) { m.reply(err) }
}

const downloadMp3 = async (Link) => {
try {
let mp3File = getRandom(".mp3")
let anu = await ytdl.getInfo(Link)
console.log(color("Download Audio With ytdl-core"))
ytdl(Link, { filter: "audioonly" }).pipe(fs.createWriteStream(mp3File)).on("finish", async () => {
bayuamore.sendMessage(m.chat, { document: fs.readFileSync(mp3File), mimetype: "audio/mpeg", fileName: `${anu.player_response.videoDetails.title}.mp3` }, { quoted: m })
fs.unlinkSync(mp3File)
})
} catch (err) { m.reply(err) }
}

const downloadMp4 = async (Link) => {
try {
let mp4File = getRandom(".mp4")
let anu = await ytdl.getInfo(Link)
console.log(color("Download Video With ytdl-core"))
let nana = ytdl(Link).pipe(fs.createWriteStream(mp4File)).on("finish", async () => {
bayuamore.sendMessage(m.chat, { document: fs.readFileSync(mp4File), mimetype: "video/mp4", fileName: `${anu.player_response.videoDetails.title}.mp4` }, { quoted: m })
fs.unlinkSync(mp4File)
})
} catch (err) { m.reply(err) }
}

async function apkDl(url) {
let res = await fetch('https://apk.support/gapi/index.php', {
method: 'post',
body: new URLSearchParams(Object.entries({ x: 'downapk', t: 1, google_id: url, device_id: '', language: 'en-US', dpi: 480, gl: 'SUQ=', model: '', hl: 'en', de_av: '', aav: '', android_ver: 5.1, tbi: 'arm64-v8a', country: 0, gc: undefined }))
})
let $ = cheerio.load(await res.text())
let fileName = $('div.browser > div.dvContents > ul > li > a').text().trim().split(' ')[0]
let download = $('div.browser > div.dvContents > ul > li > a').attr('href')
if (!download) throw 'Can\'t download the apk!'
let mimetype = (await fetch(download, { method: 'head' })).headers.get('content-type')
return { fileName, mimetype, download }
}

async function chord(query) {
return new Promise(async(resolve, reject) => {
const head = {"User-Agent":"Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
"Cookie":"__gads=ID=4513c7600f23e1b2-22b06ccbebcc00d1:T=1635371139:RT=1635371139:S=ALNI_MYShBeii6AFkeysWDKiD3RyJ1106Q; _ga=GA1.2.409783375.1635371138; _gid=GA1.2.1157186793.1635371140; _fbp=fb.1.1635371147163.1785445876"};
let { data } = await axios.get("http://app.chordindonesia.com/?json=get_search_results&exclude=date,modified,attachments,comment_count,comment_status,thumbnail,thumbnail_images,author,excerpt,content,categories,tags,comments,custom_fields&search="+query, {headers: head});
axios.get("http://app.chordindonesia.com/?json=get_post&id="+data.posts[0].id, {
headers: head
}).then(anu => {
let $ = cheerio.load(anu.data.post.content);
resolve({
title: $("img").attr("alt"),
chord: $("pre").text().trim()
});
}).catch(reject);
});
}

async function jarak(dari, ke) {
var html = (await axios(`https://www.google.com/search?q=${encodeURIComponent('jarak ' + dari + ' ke ' + ke)}&hl=id`)).data
var $ = cheerio.load(html), obj = {}
var img = html.split("var s=\'")?.[1]?.split("\'")?.[0]
obj.img = /^data:.*?\/.*?;base64,/i.test(img) ? Buffer.from(img.split`,` [1], 'base64') : ''
obj.desc = $('div.BNeawe.deIvCb.AP7Wnd').text()?.trim()
return obj
}

async function ssweb(url, device = 'desktop'){
return new Promise((resolve, reject) => {
const base = 'https://www.screenshotmachine.com'
const param = {
url: url,
device: device,
cacheLimit: 0
}
axios({url: base + '/capture.php',
method: 'POST',
data: new URLSearchParams(Object.entries(param)),
headers: {
'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
}).then((data) => {
const cookies = data.headers['set-cookie']
if (data.data.status == 'success') {
axios.get(base + '/' + data.data.link, {
headers: {
'cookie': cookies.join('')
},
responseType: 'arraybuffer'
}).then(({ data }) => {
result = {
status: 200,
result: data
}
resolve(result)
})
} else {
reject({ status: 404, statuses: `Link Error`, message: data.data })
}
}).catch(reject)
})
}

async function wikipedia(querry) {
try {
const link = await axios.get(`https://id.wikipedia.org/wiki/${querry}`)
const $ = cheerio.load(link.data)
let judul = $('#firstHeading').text().trim()
let thumb = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//k.top4top.io/p_2121ug8or0.png`
let isi = []
$('#mw-content-text > div.mw-parser-output').each(function (rayy, Ra) {
let penjelasan = $(Ra).find('p').text().trim()
isi.push(penjelasan)
})
for (let i of isi) {
const data = {
status: link.status,
result: {
judul: judul,
thumb: 'https:' + thumb,
isi: i
}
}
return data
}
} catch (err) {
var notFond = {
status: link.status,
Pesan: eror
}
return notFond
}
}
//━━━━━━━━━━━━━━━[ CONST REPLY ]━━━━━━━━━━━━━━━━━//
const sendprivate = async (text, id) => {
bayuamore.sendMessage(id, { text: text }, { quoted: m })
}

const setReply = async (teks) => {
if (db.data.settings[botNumber].replytype == "web1") {
bayuamore.sendMessage(m.chat, { contextInfo: { mentionedJid: teks ? [...teks.matchAll(/@(\d{0,16})/g)].map((v) => v[1] + "@s.whatsapp.net") : [], externalAdReply: { showAdAttribution: true, title: namabot, body: wm, previewType: "PHOTO", thumbnail: thumb, sourceUrl: myig }}, text: teks }, { quoted: m })
} else if (db.data.settings[botNumber].replytype == "web2") {
bayuamore.sendMessage(m.chat, { contextInfo: { mentionedJid: teks ? [...teks.matchAll(/@(\d{0,16})/g)].map((v) => v[1] + "@s.whatsapp.net") : [], forwardingScore: 9999, isForwarded: true, showAdAttribution: true, externalAdReply: { title: namabot, body: wm, previewType: "PHOTO", thumbnail: thumb, sourceUrl: myig }}, text: teks }, { quoted: m })
} else if (db.data.settings[botNumber].replytype == "web3") {
bayuamore.sendMessage(m.chat, { contextInfo: { mentionedJid: teks ? [...teks.matchAll(/@(\d{0,16})/g)].map((v) => v[1] + "@s.whatsapp.net") : [], forwardingScore: 10, isForwarded: true, externalAdReply: { showAdAttribution: true, title: namabot, body: wm, previewType: "PHOTO", thumbnail: thumb, sourceUrl: myig }}, text: teks }, { quoted: m })
} else if (db.data.settings[botNumber].replytype == "mess1") {
bayuamore.sendMessage(m.chat, { contextInfo: { mentionedJid: teks ? [...teks.matchAll(/@(\d{0,16})/g)].map((v) => v[1] + "@s.whatsapp.net") : [], externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, title: namabot, body: wm, previewType: "PHOTO", containsAutoReply: true, mediaType: 1, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}, text: teks }, { quoted: m })
} else if (db.data.settings[botNumber].replytype == "mess2") {
bayuamore.sendMessage(m.chat, { contextInfo: { mentionedJid: teks ? [...teks.matchAll(/@(\d{0,16})/g)].map((v) => v[1] + "@s.whatsapp.net") : [], externalAdReply: { showAdAttribution: true, renderLargerThumbnail: false, title: namabot, body: wm, previewType: "PHOTO", containsAutoReply: true, mediaType: 1, thumbnail: ppnyauser, mediaUrl: mygc, sourceUrl: mygc }}, text: teks }, { quoted: m })
} else if (db.data.settings[botNumber].replytype == "mess3") {
bayuamore.sendMessage(m.chat, { text: teks, mentions: teks ? [...teks.matchAll(/@(\d{0,16})/g)].map((v) => v[1] + "@s.whatsapp.net") : [] }, { quoted: m });
}
}
//━━━━━━━━━━━━━━━[ CONST UTILITY ]━━━━━━━━━━━━━━━━━//
if (db.data.settings[botNumber].autobio) {
let setting = global.db.data.settings[botNumber]
if (new Date() * 1 - setting.status > 1000) {
await bayuamore.setStatus(`${bayuamore.user.name} | Command: .menu | Mode: ${bayuamore.public ? "Public" : "Self"} | Runtime: ${uptime} | User: ${Object.keys(global.db.data.users).length}`)
setting.status = new Date() * 1
}
}

if (db.data.settings[botNumber].auto == "recording") {
await bayuamore.sendPresenceUpdate("recording", m.chat)
} else if (db.data.settings[botNumber].auto == "typing") {
await bayuamore.sendPresenceUpdate("composing", m.chat)
} else if (db.data.settings[botNumber].auto == "available") {
await bayuamore.sendPresenceUpdate("available", m.chat)
} else if (db.data.settings[botNumber].auto == "unavailable") {
await bayuamore.sendPresenceUpdate("unavailable", m.chat)
}

/*if (db.data.chats[m.chat].mute && !isCreator) {
return
}*/

if (!db.data.settings[botNumber].public) {
if (!m.key.fromMe && !isCreator && !isPrem) return;
}

if (m.message) {
if (db.data.settings[botNumber].autoread) {
bayuamore.readMessages([m.key])
}
}

if (m.message) {
let argsLog = budy.length > 100 ? `${q.substring(0, 100)}...` : budy
let me = m.sender
if (isCmd && !m.isGroup) {
//console.log(chalk.black(chalk.yellow(`[PRIVATE]: ${time} : ${date}`)), chalk.cyan("\n✉️ : "), color(argsLog, "turquoise"), chalk.magenta("\n👤 : "), chalk.green(pushname), chalk.red(`\n🪪 : ${me.split("@")[0]}@s.whatsapp.net\n`));
} else if (m.isGroup) {
//console.log(chalk.black(chalk.yellow(`[GROUP]: ${time} : ${date}`)), chalk.cyan("\n✉️ : "), color(argsLog, "turquoise"), chalk.red("\n👤 : "), chalk.yellow(pushname), chalk.green(`\n🪪 : ${me.split("@")[0]}@s.whatsapp.net`), chalk.blue("\n👥 : "), chalk.magenta(groupName + "\n"));
}
}

if (db.data.settings[botNumber].antiviewonce) {
if (m.mtype == "viewOnceMessageV2") {
try {
let msg = m.message.viewOnceMessageV2.message
let type = Object.keys(msg)[0];
let media = await downloadContentFromMessage(msg[type], type == "imageMessage" ? "image" : "video")
let buffer = Buffer.from([])
for await (const chunk of media) {
buffer = Buffer.concat([buffer, chunk])
}
if (/video/.test(type)) {
await bayuamore.sendMessage(develover, { video: buffer, caption: msg[type].caption }, { quoted: m })
} else if (/image/.test(type)) {
await bayuamore.sendMessage(develover, { image: buffer, caption: msg[type].caption }, { quoted: m })
}
} catch (e) { console.log(e) }
}
}

if (db.data.users[m.sender].autolevelup) {
let user = global.db.data.users[m.sender]
if (!user.autolevelup) return !0
let before = user.level * 1
while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++
if (user.level <= 2) {
user.role = 'Newbie ㋡'
} else if (user.level <= 4) {
user.role = 'Beginner Grade 1 ⚊¹'
} else if (user.level <= 6) {
user.role = 'Beginner Grade 2 ⚊²'
} else if (user.level <= 8) {
user.role = 'Beginner Grade 3 ⚊³'
} else if (user.level <= 10) {
user.role = 'Beginner Grade 4 ⚊⁴'
} else if (user.level <= 12) {
user.role = 'Private Grade 1 ⚌¹'
} else if (user.level <= 14) {
user.role = 'Private Grade 2 ⚌²'
} else if (user.level <= 16) {
user.role = 'Private Grade 3 ⚌³'
} else if (user.level <= 18) {
user.role = 'Private Grade 4 ⚌⁴'
} else if (user.level <= 20) {
user.role = 'Private Grade 5 ⚌⁵'
} else if (user.level <= 22) {
user.role = 'Corporal Grade 1 ☰¹'
} else if (user.level <= 24) {
user.role = 'Corporal Grade 2 ☰²'
} else if (user.level <= 26) {
user.role = 'Corporal Grade 3 ☰³'
} else if (user.level <= 28) {
user.role = 'Corporal Grade 4 ☰⁴'
} else if (user.level <= 30) {
user.role = 'Corporal Grade 5 ☰⁵'
} else if (user.level <= 32) {
user.role = 'Sergeant Grade 1 ≣¹'
} else if (user.level <= 34) {
user.role = 'Sergeant Grade 2 ≣²'
} else if (user.level <= 36) {
user.role = 'Sergeant Grade 3 ≣³'
} else if (user.level <= 38) {
user.role = 'Sergeant Grade 4 ≣⁴'
} else if (user.level <= 40) {
user.role = 'Sergeant Grade 5 ≣⁵'
} else if (user.level <= 42) {
user.role = 'Staff Grade 1 ﹀¹'
} else if (user.level <= 44) {
user.role = 'Staff Grade 2 ﹀²'
} else if (user.level <= 46) {
user.role = 'Staff Grade 3 ﹀³'
} else if (user.level <= 48) {
user.role = 'Staff Grade 4 ﹀⁴'
} else if (user.level <= 50) {
user.role = 'Staff Grade 5 ﹀⁵'
} else if (user.level <= 52) {
user.role = 'Sergeant Grade 1 ︾¹'
} else if (user.level <= 54) {
user.role = 'Sergeant Grade 2 ︾²'
} else if (user.level <= 56) {
user.role = 'Sergeant Grade 3 ︾³'
} else if (user.level <= 58) {
user.role = 'Sergeant Grade 4 ︾⁴'
} else if (user.level <= 60) {
user.role = 'Sergeant Grade 5 ︾⁵'
} else if (user.level <= 62) {
user.role = '2nd Lt. Grade 1 ♢¹ '
} else if (user.level <= 64) {
user.role = '2nd Lt. Grade 2 ♢²'
} else if (user.level <= 66) {
user.role = '2nd Lt. Grade 3 ♢³'
} else if (user.level <= 68) {
user.role = '2nd Lt. Grade 4 ♢⁴'
} else if (user.level <= 70) {
user.role = '2nd Lt. Grade 5 ♢⁵'
} else if (user.level <= 72) {
user.role = '1st Lt. Grade 1 ♢♢¹'
} else if (user.level <= 74) {
user.role = '1st Lt. Grade 2 ♢♢²'
} else if (user.level <= 76) {
user.role = '1st Lt. Grade 3 ♢♢³'
} else if (user.level <= 78) {
user.role = '1st Lt. Grade 4 ♢♢⁴'
} else if (user.level <= 80) {
user.role = '1st Lt. Grade 5 ♢♢⁵'
} else if (user.level <= 82) {
user.role = 'Major Grade 1 ✷¹'
} else if (user.level <= 84) {
user.role = 'Major Grade 2 ✷²'
} else if (user.level <= 86) {
user.role = 'Major Grade 3 ✷³'
} else if (user.level <= 88) {
user.role = 'Major Grade 4 ✷⁴'
} else if (user.level <= 90) {
user.role = 'Major Grade 5 ✷⁵'
} else if (user.level <= 92) {
user.role = 'Colonel Grade 1 ✷✷¹'
} else if (user.level <= 94) {
user.role = 'Colonel Grade 2 ✷✷²'
} else if (user.level <= 96) {
user.role = 'Colonel Grade 3 ✷✷³'
} else if (user.level <= 98) {
user.role = 'Colonel Grade 4 ✷✷⁴'
} else if (user.level <= 100) {
user.role = 'Colonel Grade 5 ✷✷⁵'
} else if (user.level <= 102) {
user.role = 'Brigadier Early ✰'
} else if (user.level <= 104) {
user.role = 'Brigadier Silver ✩'
} else if (user.level <= 106) {
user.role = 'Brigadier gold ✯'
} else if (user.level <= 108) {
user.role = 'Brigadier Platinum ✬'
} else if (user.level <= 110) {
user.role = 'Brigadier Diamond ✪'
} else if (user.level <= 112) {
user.role = 'Major General Early ✰'
} else if (user.level <= 114) {
user.role = 'Major General Silver ✩'
} else if (user.level <= 116) {
user.role = 'Major General gold ✯'
} else if (user.level <= 118) {
user.role = 'Major General Platinum ✬'
} else if (user.level <= 120) {
user.role = 'Major General Diamond ✪'
} else if (user.level <= 122) {
user.role = 'Lt. General Early ✰'
} else if (user.level <= 124) {
user.role = 'Lt. General Silver ✩'
} else if (user.level <= 126) {
user.role = 'Lt. General gold ✯'
} else if (user.level <= 128) {
user.role = 'Lt. General Platinum ✬'
} else if (user.level <= 130) {
user.role = 'Lt. General Diamond ✪'
} else if (user.level <= 132) {
user.role = 'General Early ✰'
} else if (user.level <= 134) {
user.role = 'General Silver ✩'
} else if (user.level <= 136) {
user.role = 'General gold ✯'
} else if (user.level <= 138) {
user.role = 'General Platinum ✬'
} else if (user.level <= 140) {
user.role = 'General Diamond ✪'
} else if (user.level <= 142) {
user.role = 'Commander Early ★'
} else if (user.level <= 144) {
user.role = 'Commander Intermediate ⍣'
} else if (user.level <= 146) {
user.role = 'Commander Elite ≛'
} else if (user.level <= 148) {
user.role = 'The Commander Hero ⍟'
} else if (user.level <= 152) {
user.role = 'Legends 忍'
} else if (user.level <= 154) {
user.role = 'Legends 忍'
} else if (user.level <= 156) {
user.role = 'Legends 忍'
} else if (user.level <= 158) {
user.role = 'Legends 忍'
} else if (user.level <= 160) {
user.role = 'Legends 忍'
} else if (user.level <= 162) {
user.role = 'Legends 忍'
} else if (user.level <= 164) {
user.role = 'Legends 忍'
} else if (user.level <= 166) {
user.role = 'Legends 忍'
} else if (user.level <= 168) {
user.role = 'Legends 忍'
} else if (user.level <= 170) {
user.role = 'Legends 忍'
} else if (user.level <= 172) {
user.role = 'Legends 忍'
} else if (user.level <= 174) {
user.role = 'Legends 忍'
} else if (user.level <= 176) {
user.role = 'Legends 忍'
} else if (user.level <= 178) {
user.role = 'Legends 忍'
} else if (user.level <= 180) {
user.role = 'Legends 忍'
} else if (user.level <= 182) {
user.role = 'Legends 忍'
} else if (user.level <= 184) {
user.role = 'Legends 忍'
} else if (user.level <= 186) {
user.role = 'Legends 忍'
} else if (user.level <= 188) {
user.role = 'Legends 忍'
} else if (user.level <= 190) {
user.role = 'Legends 忍'
} else if (user.level <= 192) {
user.role = 'Legends 忍'
} else if (user.level <= 194) {
user.role = 'Legends 忍'
} else if (user.level <= 196) {
user.role = 'Legends 忍'
} else if (user.level <= 198) {
user.role = 'Legends 忍'
} else if (user.level <= 200) {
user.role = 'Legends 忍'
} else if (user.level <= 210) {
user.role = 'Legends 忍'
} else if (user.level <= 220) {
user.role = 'Legends 忍'
} else if (user.level <= 230) {
user.role = 'Legends 忍'
} else if (user.level <= 240) {
user.role = 'Legends 忍'
} else if (user.level <= 250) {
user.role = 'Legends 忍'
} else if (user.level <= 260) {
user.role = 'Legends 忍'
} else if (user.level <= 270) {
user.role = 'Legends 忍'
} else if (user.level <= 280) {
user.role = 'Legends 忍'
} else if (user.level <= 290) {
user.role = 'Legends 忍'
} else if (user.level <= 300) {
user.role = 'Legends 忍'
} else if (user.level <= 310) {
user.role = 'Legends 忍'
} else if (user.level <= 320) {
user.role = 'Legends 忍'
} else if (user.level <= 330) {
user.role = 'Legends 忍'
} else if (user.level <= 340) {
user.role = 'Legends 忍'
} else if (user.level <= 350) {
user.role = 'Legends 忍'
} else if (user.level <= 360) {
user.role = 'Legends 忍'
} else if (user.level <= 370) {
user.role = 'Legends 忍'
} else if (user.level <= 380) {
user.role = 'Legends 忍'
} else if (user.level <= 390) {
user.role = 'Legends 忍'
} else if (user.level <= 400) {
user.role = 'Legends 忍'
} else if (user.level <= 410) {
user.role = 'Legends 忍'
} else if (user.level <= 420) {
user.role = 'Legends 忍'
} else if (user.level <= 430) {
user.role = 'Legends 忍'
} else if (user.level <= 440) {
user.role = 'Legends 忍'
} else if (user.level <= 450) {
user.role = 'Legends 忍'
} else if (user.level <= 460) {
user.role = 'Legends 忍'
} else if (user.level <= 470) {
user.role = 'Legends 忍'
} else if (user.level <= 480) {
user.role = 'Legends 忍'
} else if (user.level <= 490) {
user.role = 'Legends 忍'
} else if (user.level <= 500) {
user.role = 'Legends 忍'
} else if (user.level <= 600) {
user.role = 'Legends 忍'
} else if (user.level <= 700) {
user.role = 'Legends 忍'
} else if (user.level <= 800) {
user.role = 'Legends 忍'
} else if (user.level <= 900) {
user.role = 'Legends 忍'
} else if (user.level <= 1000) {
user.role = 'Legends 忍'
} else if (user.level <= 2000) {
user.role = 'Legends 忍'
} else if (user.level <= 3000) {
user.role = 'Legends 忍'
} else if (user.level <= 4000) {
user.role = 'Legends 忍'
} else if (user.level <= 5000) {
user.role = 'Legends 忍'
} else if (user.level <= 6000) {
user.role = 'Legends 忍'
} else if (user.level <= 7000) {
user.role = 'Legends 忍'
} else if (user.level <= 8000) {
user.role = 'Legends 忍'
} else if (user.level <= 9000) {
user.role = 'Legends 忍'
} else if (user.level <= 10000) {
user.role = 'Legends 忍'
}
let role = user.role
if (before !== user.level) {
let chating = `*Congratulations, you have leveled up!*

Level Up : *${before}* -> *${user.level}*

Type *.profile* to check`.trim()
try {
let image, data, pp
try {
pp = await bayuamore.profilePictureUrl(m.sender, "image")
} catch {
pp = "https://i.ibb.co/m53WF9N/avatar-contact.png"
}
image = await new can.Up().setAvatar(pp).toAttachment()
data = image.toBuffer()
await bayuamore.sendMessage(m.chat, { image: data, caption: chating }, { quoted: m })
} catch {
setReply(chating)
}
}
}
//━━━━━━━━━━━━━━━[ ASAH OTAK ]━━━━━━━━━━━━━━━━━//
let benar = `*Benar 🥳*\n_Selamat ya!_`
let salah = `*Salah ❌*\n_Ayo coba lagi!_`

if (asahotak[m.chat] && !isCmd && m.quoted) {
if (m.quoted.id == asahotak[m.chat][0].key.id) {
let json = JSON.parse(JSON.stringify(asahotak[m.chat][1]))
let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
if (isSurrender) {
clearTimeout(asahotak[m.chat][3])
delete asahotak[m.chat]
return bayuamore.reply(m.chat, `*Kamu Menyerah!*\n\nJawabannya adalah ${json.jawaban}`, m)
} else if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
global.db.data.users[m.sender].exp += 1000
global.db.data.users[m.sender].tiketcoin += 1
setReply(`*Jawaban Benar!*\n\n+1000 Xp\n+1 Tiketcoin`)
clearTimeout(asahotak[m.chat][3])
delete asahotak[m.chat]
} else {
if (--asahotak[m.chat][2] == 0) {
clearTimeout(asahotak[m.chat][3])
delete asahotak[m.chat]
setReply(`*Kesempatan Habis!*\n\nJawabannya adalah ${json.jawaban}`)
} else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
setReply(`*Jawabanmu sedikit lagi benar!*\n\nMasih ada ${asahotak[m.chat][2]} kesempatan`)
else setReply(`*Jawaban Salah!*\n\nMasih ada ${asahotak[m.chat][2]} kesempatan`)
}
}
}
//━━━━━━━━━━━━━━━[ CAK LONTONG ]━━━━━━━━━━━━━━━━━//
if (caklontong[m.chat] && !isCmd && m.quoted) {
if (m.quoted.id == caklontong[m.chat][0].key.id) {
let json = JSON.parse(JSON.stringify(caklontong[m.chat][1]))
let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
if (isSurrender) {
clearTimeout(caklontong[m.chat][3])
delete caklontong[m.chat]
return bayuamore.reply(m.chat, `*Kamu Menyerah!*\n\nJawabannya adalah ${json.jawaban}\n\nAlasannya adalah ${json.deskripsi}`, m)
} else if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
global.db.data.users[m.sender].exp += 1000
global.db.data.users[m.sender].tiketcoin += 1
setReply(`*Jawaban Benar!*\n\n+1000 Xp\n+1 Tiketcoin`)
clearTimeout(caklontong[m.chat][3])
delete caklontong[m.chat]
} else {
if (--caklontong[m.chat][2] == 0) {
clearTimeout(caklontong[m.chat][3])
delete caklontong[m.chat]
setReply(`*Kesempatan Habis!*\n\nJawabannya adalah ${json.jawaban}`)
} else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
setReply(`*Jawabanmu sedikit lagi benar!*\n\nMasih ada ${caklontong[m.chat][2]} kesempatan`)
else setReply(`*Jawaban Salah!*\n\nMasih ada ${caklontong[m.chat][2]} kesempatan`)
}
}
}
//━━━━━━━━━━━━━━━[ KUIS MATH ]━━━━━━━━━━━━━━━━━//
if (kuismath[m.chat] && !isCmd && m.quoted) {
if (m.quoted.id == kuismath[m.chat][0].key.id) {
let json = JSON.parse(JSON.stringify(kuismath[m.chat][1]))
let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
if (isSurrender) {
clearTimeout(kuismath[m.chat][3])
delete kuismath[m.chat]
return bayuamore.reply(m.chat, `*Kamu Menyerah!*\n\nJawabannya adalah ${json.jawaban}`, m)
} else if (m.text == json.jawaban) {
global.db.data.users[m.sender].exp += json.hadiah
global.db.data.users[m.sender].tiketcoin += 1
clearTimeout(kuismath[m.chat][3])
delete kuismath[m.chat]
setReply(`*Jawaban Benar!*\n\n+${json.hadiah} Xp\n+1 Tiketcoin`)
} else {
if (--kuismath[m.chat][2] == 0) {
clearTimeout(kuismath[m.chat][3])
delete kuismath[m.chat]
setReply(`*Kesempatan Habis!*\n\nJawabannya adalah ${json.jawaban}`)
} else setReply(`*Jawaban Salah!*\n\nMasih ada ${kuismath[m.chat][2]} kesempatan`)
}
}
}
//━━━━━━━━━━━━━━━[ SIAPAKAH AKU ]━━━━━━━━━━━━━━━━━//
if (siapakahaku[m.chat] && !isCmd && m.quoted) {
if (m.quoted.id == siapakahaku[m.chat][0].key.id) {
let json = JSON.parse(JSON.stringify(siapakahaku[m.chat][1]))
let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
if (isSurrender) {
clearTimeout(siapakahaku[m.chat][3])
delete siapakahaku[m.chat]
return bayuamore.reply(m.chat, `*Kamu Menyerah!*\n\nJawabannya adalah ${json.jawaban}`, m)
} else if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
global.db.data.users[m.sender].exp += 1000
global.db.data.users[m.sender].tiketcoin += 1
setReply(`*Jawaban Benar!*\n\n+1000 Xp\n+1 Tiketcoin`)
clearTimeout(siapakahaku[m.chat][3])
delete siapakahaku[m.chat]
} else {
if (--siapakahaku[m.chat][2] == 0) {
clearTimeout(siapakahaku[m.chat][3])
delete siapakahaku[m.chat]
setReply(`*Kesempatan Habis!*\n\nJawabannya adalah ${json.jawaban}`)
} else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
setReply(`*Jawabanmu sedikit lagi benar!*\n\nMasih ada ${siapakahaku[m.chat][2]} kesempatan`)
else setReply(`*Jawaban Salah!*\n\nMasih ada ${siapakahaku[m.chat][2]} kesempatan`)
}
}
}
//━━━━━━━━━━━━━━━[ SUSUN KATA ]━━━━━━━━━━━━━━━━━//
if (susunkata[m.chat] && !isCmd && m.quoted) {
if (m.quoted.id == susunkata[m.chat][0].key.id) {
let json = JSON.parse(JSON.stringify(susunkata[m.chat][1]))
let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
if (isSurrender) {
clearTimeout(susunkata[m.chat][3])
delete susunkata[m.chat]
return bayuamore.reply(m.chat, `*Kamu Menyerah!*\n\nJawabannya adalah ${json.jawaban}`, m)
} else if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
global.db.data.users[m.sender].exp += 1000
global.db.data.users[m.sender].tiketcoin += 1
setReply(`*Jawaban Benar!*\n\n+1000 Xp\n+1 Tiketcoin`)
clearTimeout(susunkata[m.chat][3])
delete susunkata[m.chat]
} else {
if (--susunkata[m.chat][2] == 0) {
clearTimeout(susunkata[m.chat][3])
delete susunkata[m.chat]
setReply(`*Kesempatan Habis!*\n\nJawabannya adalah ${json.jawaban}`)
} else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
setReply(`*Jawabanmu sedikit lagi benar!*\n\nMasih ada ${susunkata[m.chat][2]} kesempatan`)
else setReply(`*Jawaban Salah!*\n\nMasih ada ${susunkata[m.chat][2]} kesempatan`)
}
}
}
//━━━━━━━━━━━━━━━[ TEBAK KATA ]━━━━━━━━━━━━━━━━━//
if (tebakkata[m.chat] && !isCmd && m.quoted) {
if (m.quoted.id == tebakkata[m.chat][0].key.id) {
let json = JSON.parse(JSON.stringify(tebakkata[m.chat][1]))
let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
if (isSurrender) {
clearTimeout(tebakkata[m.chat][3])
delete tebakkata[m.chat]
return bayuamore.reply(m.chat, `*Kamu Menyerah!*\n\nJawabannya adalah ${json.jawaban}`, m)
} else if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
global.db.data.users[m.sender].exp += 1000
global.db.data.users[m.sender].tiketcoin += 1
setReply(`*Jawaban Benar!*\n\n+1000 Xp\n+1 Tiketcoin`)
clearTimeout(tebakkata[m.chat][3])
delete tebakkata[m.chat]
} else {
if (--tebakkata[m.chat][2] == 0) {
clearTimeout(tebakkata[m.chat][3])
delete tebakkata[m.chat]
setReply(`*Kesempatan Habis!*\n\nJawabannya adalah ${json.jawaban}`)
} else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
setReply(`*Jawabanmu sedikit lagi benar!*\n\nMasih ada ${tebakkata[m.chat][2]} kesempatan`)
else setReply(`*Jawaban Salah!*\n\nMasih ada ${tebakkata[m.chat][2]} kesempatan`)
}
}
}
//━━━━━━━━━━━━━━━[ TEBAK LAGU ]━━━━━━━━━━━━━━━━━//
if (tebaklagu[m.chat] && !isCmd && m.quoted) {
if (m.quoted.id == tebaklagu[m.chat][0].key.id) {
let json = JSON.parse(JSON.stringify(tebaklagu[m.chat][1]))
let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
if (isSurrender) {
clearTimeout(tebaklagu[m.chat][3])
delete tebaklagu[m.chat]
return bayuamore.reply(m.chat, `*Kamu Menyerah!*\n\nJawabannya adalah ${json.judul}`, m)
} else if (m.text.toLowerCase() == json.judul.toLowerCase().trim()) {
global.db.data.users[m.sender].exp += tebaklagu[m.chat][2]
global.db.data.users[m.sender].tiketcoin += 1
setReply(`*Jawaban Benar!*\n\n+${tebaklagu[m.chat][2]} Xp\n+1 Tiketcoin`)
clearTimeout(tebaklagu[m.chat][3])
delete tebaklagu[m.chat]
} else if (similarity(m.text.toLowerCase(), json.judul.toLowerCase().trim()) >= threshold)
setReply(`*_Jawabanmu sedikit lagi benar!_*`)
else setReply(salah)
}
}

/*⫹⫺ ╳╶╼╶╶╶╶┈ ⎝ TEBAK LIRIK ⎞ ┈╴╴╴╴╾╴╳ ⫹⫺*/
if (tebaklirik[m.chat] && !isCmd && m.quoted) {
if (m.quoted.id == tebaklirik[m.chat][0].key.id) {
let json = JSON.parse(JSON.stringify(tebaklirik[m.chat][1]))
answer = json.jawaban.toLowerCase().trim()
let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
if (isSurrender) {
clearTimeout(tebaklirik[m.chat][3])
delete tebaklirik[m.chat]
return bayuamore.reply(m.chat, `*Kamu menyerah!*\n\nJawabannya adalah ${answer}`, m)
} else if (m.text.toLowerCase() == answer) {
setReply(benar)
clearTimeout(tebaklirik[m.chat][3])
delete tebaklirik[m.chat]
} else if (similarity(m.text.toLowerCase(), answer) >= threshold)
setReply(`*_Jawabanmu sedikit lagi benar!_*`)
else setReply(salah)
}
}
/*⫹⫺ ╳╶╼╶╶╶╶┈ ⎝ TEBAK GAMBAR ⎞ ┈╴╴╴╴╾╴╳ ⫹⫺*/
if (tebakgambar[m.chat] && !isCmd && m.quoted) {
if (m.quoted.id == tebakgambar[m.chat][0].key.id) {
let json = JSON.parse(JSON.stringify(tebakgambar[m.chat][1]))
answer = json.jawaban.toLowerCase().trim()
let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
if (isSurrender) {
clearTimeout(tebakgambar[m.chat][3])
delete tebakgambar[m.chat]
return bayuamore.reply(m.chat, `*Kamu menyerah!*\n\nJawabannya adalah ${answer}`, m)
} else if (m.text.toLowerCase() == answer) {
setReply(benar)
clearTimeout(tebakgambar[m.chat][3])
delete tebakgambar[m.chat]
} else if (similarity(m.text.toLowerCase(), answer) >= threshold)
setReply(`*_Jawabanmu sedikit lagi benar!_*`)
else setReply(salah)
}
}
/*⫹⫺ ╳╶╼╶╶╶╶┈ ⎝ TEBAK TEBAKAN ⎞ ┈╴╴╴╴╾╴╳ ⫹⫺*/
if (tebaktebakan[m.chat] && !isCmd && m.quoted) {
if (m.quoted.id == tebaktebakan[m.chat][0].key.id) {
let json = JSON.parse(JSON.stringify(tebaktebakan[m.chat][1]))
answer = json.jawaban.toLowerCase().trim()
let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
if (isSurrender) {
clearTimeout(tebaktebakan[m.chat][3])
delete tebaktebakan[m.chat]
return bayuamore.reply(m.chat, `*Kamu menyerah!*\n\nJawabannya adalah ${answer}`, m)
} else if (m.text.toLowerCase() == answer) {
setReply(benar)
clearTimeout(tebaktebakan[m.chat][3])
delete tebaktebakan[m.chat]
} else if (similarity(m.text.toLowerCase(), answer) >= threshold)
setReply(`*_Jawabanmu sedikit lagi benar!_*`)
else setReply(salah)
}
}
/*⫹⫺ ╳╶╼╶╶╶╶┈ ⎝ TEKA TEKI ⎞ ┈╴╴╴╴╾╴╳ ⫹⫺*/
if (tekateki[m.chat] && !isCmd && m.quoted) {
if (m.quoted.id == tekateki[m.chat][0].key.id) {
let json = JSON.parse(JSON.stringify(tekateki[m.chat][1]))
answer = json.jawaban.toLowerCase().trim()
let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
if (isSurrender) {
clearTimeout(tekateki[m.chat][3])
delete tekateki[m.chat]
return bayuamore.reply(m.chat, `*Kamu menyerah!*\n\nJawabannya adalah ${answer}`, m)
} else if (m.text.toLowerCase() == answer) {
setReply(benar)
clearTimeout(tekateki[m.chat][3])
delete tekateki[m.chat]
} else if (similarity(m.text.toLowerCase(), answer) >= threshold)
setReply(`*_Jawabanmu sedikit lagi benar!_*`)
else setReply(salah)
}
}
/*⫹⫺ ╳╶╼╶╶╶╶┈ ⎝ SWITCH COMMAND ⎞ ┈╴╴╴╴╾╴╳ ⫹⫺*/
switch (command) {
//━━━━━━━━━━━━━━━[ BAYU AMORE BOT ]━━━━━━━━━━━━━━━━━//
case "addakses": {
if (!isCreator) return
if (!m.isGroup) return setReply(mess.group)
if (access.includes(m.chat) == true) return setReply(`${groupMetadata.subject} sudah di ${command}`)
access.push(m.chat)
fs.writeFileSync("./database/grups.json", JSON.stringify(access));
setReply(`Sukses ${command} ${groupMetadata.subject}`)
}
break
case "delakses": {
if (!isCreator) return
if (!m.isGroup) return setReply(mess.group)
if (access.includes(m.chat) == false) return setReply(`${groupMetadata.subject} sudah di ${command}`)
var ini = access.indexOf(m.chat)
access.splice(ini, 1)
fs.writeFileSync("./database/grups.json", JSON.stringify(access));
setReply(`Sukses ${command} ${groupMetadata.subject}`)
}
break
case "addseller": {
if (!isCreator) return
if (!args[0]) return setReply(`Masukkan nomor Sellernya!\n\nExample: ${prefix+command} ${nomorowner}`)
noseller = q.split("|")[0].replace(/[^0-9]/g, "")
if (seller.includes(noseller)) return setReply(`${noseller} sudah di ${command}`)
let ceknye = await bayuamore.onWhatsApp(noseller + `@s.whatsapp.net`)
if (ceknye.length == 0) return setReply(`Masukkan nomor yang terdaftar di WhatsApp!`)
seller.push(noseller)
fs.writeFileSync("./database/seller.json", JSON.stringify(seller));
setReply(`Sukses ${command} ${noseller}`)
}
break
case "delseller": {
if (!isCreator) return
if (!args[0]) return setReply(`Masukkan nomor Sellernya!\n\nExample: ${prefix+command} ${nomorowner}`)
noseller = q.split("|")[0].replace(/[^0-9]/g, "")
if (!seller.includes(noseller)) return setReply(`${noseller} sudah di ${command}`)
unp = seller.indexOf(noseller)
seller.splice(unp, 1)
fs.writeFileSync("./database/seller.json", JSON.stringify(seller));
setReply(`Sukses ${command} ${noseller}`)
}
break
case "addprem": {
if (!isCreator) return
if (!args[0]) return setReply(`Masukkan Nomornya!\n\nExample: ${prefix+command} ${nomorowner}`)
noprem = text.split("|")[0].replace(/[^0-9]/g, "")
if (premium.includes(noprem)) return setReply(`${noprem} sudah di ${command}`)
let ceknye = await bayuamore.onWhatsApp(noprem + `@s.whatsapp.net`)
if (ceknye.length == 0) return setReply(`Masukkan nomor yang terdaftar di WhatsApp!`)
premium.push(noprem)
fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
setReply(`Sukses ${command} ${noprem}`)
}
break
case "delprem": {
if (!isCreator) return
if (!args[0]) return setReply(`Masukkan Nomornya!\n\nExample: ${prefix+command} ${nomorowner}`)
noprem = text.split("|")[0].replace(/[^0-9]/g, "")
if (!premium.includes(noprem)) return setReply(`${noprem} sudah di ${command}`)
unp = premium.indexOf(noprem)
premium.splice(unp, 1)
fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
setReply(`Sukses ${command} ${noprem}`)
}
break
//━━━━━━━━━━━━━━━[DOMAIN]━━━━━━━━━━━━━━━━━//
case "daftar": {
if (cek("id", m.sender) !== null) return setReply(`*${pushname} sudah terdaftar di Database ${namabot}*`)
member.push({ id: m.sender, saldo: 0, transaksi: false, nama: "", idproduk: "", idtujuan: "", harga: 0 })
fs.writeFileSync("./database/user.json", JSON.stringify(member))
let bayu = `*Congratulations @${m.sender.split("@")[0]}, your account has been registered in the ${namabot}.*`
await bayuamore.sendMessage(from, { text: bayu, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, mediaType: 1, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, thumbnail: ppnyauser, mediaUrl: `https://instagram.com/bayuamore`, sourceUrl: `https://instagram.com/bayuamore` }}})
}
break
case "botinfo": {
if (cek("id", m.sender) == null) return setReply(mess.user)
let { antiviewonce, autobio, autoread, autosw, public, auto, replytype, setmenu } = global.db.data.settings[botNumber]
var baileys = `${require("@whiskeysockets/baileys/package.json").name.split`/`[0]} ${require("@whiskeysockets/baileys/package.json").version}`
let { name, version, author, description, main, type, scripts } = require("./package.json");
//const chats = Object.keys(await conn.chats)
const groups = Object.keys(bayuamore.groupFetchAllParticipating())
//const block = await bayuamore.fetchBlocklist()

let timestamp = speed();
let latensi = speed() - timestamp;
neww = performance.now();
oldd = performance.now();

let tag = `@${m.sender.replace(/@.+/, '')}`
let sts = `*── 「 ${namabot.toUpperCase()} 」 ──*

*BOT INFO :*
• Author : ${author}
• Author Gf : Humairah Syifa ❤️
• Bot Name : ${name}
• Bot Version : ${version}
• Baileys : ${baileys}
• Description : ${description}
• Main : ${scripts.start}
• Package :
• Type : ${type}

*DATABASE INFO :*
• Error : ${db_error.length} Error
• Register : ${member.length} Registered
• User : ${Object.keys(db.data.users).length} Users

*SETTING INFO :*
• Anti Viewonce : ${antiviewonce ? "Aktif" : "Nonaktif"}
• Auto Bio : ${autobio ? "Aktif" : "Nonaktif"}
• Auto Presence : ${auto}
• Auto Read : ${autoread ? "Aktif" : "Nonaktif"}
• Auto Sw : ${autosw ? "Aktif" : "Nonaktif"}
• Mode : ${public ? "Public" : "Self"}
• Reply : ${replytype}
• Setmenu : ${setmenu}

*STATUS INFO :*
• Memory : ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
• Platform : ${os.platform()}
• Prefix : ${prefix}
• Runtime : ${uptime}
• Speed : ${latensi.toFixed(4)} Ms
`
bayuamore.sendMessage(m.chat, {
text: sts,
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
mediaUrl: myig, sourceUrl: myig }}})
}
break
case "menu": {
if (cek("id", m.sender) == null) return setReply(mess.user)
//variabel custom
var { download, upload } = await checkBandwidth();
var baileys = `${require("@whiskeysockets/baileys/package.json").name.split`/`[0]} ${require("@whiskeysockets/baileys/package.json").version}`;
var menump3 = fs.readFileSync("./media/audio/menu.mp3");
var xp = levelling.xpRange(db.data.users[m.sender].level, global.multiplier);

let d = new Date(new Date + 3600000);
let locale = "id";
let clock = d.toLocaleTimeString(locale, { hour: "numeric", minute: "numeric", second: "numeric" });
let date = d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
let dateIslamic = Intl.DateTimeFormat(locale + "-TN-u-ca-islamic", { day: "numeric", month: "long", year: "numeric" }).format(d);
let week = d.toLocaleDateString(locale, { weekday: "long" });
let weton = [ "Pahing", "Pon", "Wage", "Kliwon", "Legi" ][Math.floor(d / 84600000) % 5];

let timestamp = speed();
let latensi = speed() - timestamp;
neww = performance.now();
oldd = performance.now();

let amore = `${ucapan()} ${pushname}

*BOT*
Author : ${namaowner}
Botname : ${namabot}
Baileys : ${baileys}
Database : ${member.length} from ${Object.keys(db.data.users).length} User
Memory : ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
Mode : ${bayuamore.public ? "Public" : "Self"}
Platform : ${os.platform()}
Prefix : [ ${prefix} ]
Runtime : ${uptime}
Speed : ${latensi.toFixed(4)} Ms

*STATISTIC*
Download : ${download}
Upload : ${upload}

*TODAY*
Clock : ${time}
Day : ${week} ${weton}
Date Masehi : ${date}
Date Islamic : ${dateIslamic}

*USER*
Name : ${pushname}
Number : ${m.sender.split("@")[0]}
Balance : ${db.data.users[m.sender].money}
Premium :
Level : ${db.data.users[m.sender].level}
Limit : ${db.data.users[m.sender].limit}
Role : ${db.data.users[m.sender].role}
Xp : ${xp.min} / ${xp.max}
Xp Total : ${xp.xp}

${readmore} ${allmenu}
`;
if (db.data.settings[botNumber].setmenu == "menu1") {
bayuamore.sendMessage(m.chat, { text: amore, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, mediaType: 1, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
await bayuamore.sendMessage(m.chat, { audio: menump3, mimetype:'audio/mpeg', ptt:true }, { quoted: m })
} else if (db.data.settings[botNumber].setmenu == "menu2") {
bayuamore.sendMessage(m.chat, { text: amore, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, mediaType: 1, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, thumbnail: thumb, sourceUrl: mygc }}})
await bayuamore.sendMessage(m.chat, { audio: menump3, mimetype:'audio/mpeg', ptt:true }, { quoted: m })
} else if (db.data.settings[botNumber].setmenu == "menu3") {
bayuamore.sendMessage(m.chat, { text: amore, contextInfo: {
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: true,
mediaType: 1,
title: namabot,
body: wm,
previewType: `PHOTO`,
containsAutoReply: true,
thumbnail: thumb,
sourceUrl: mygc }}})
await bayuamore.sendMessage(m.chat, { audio: menump3, mimetype:'audio/mpeg', ptt:true }, { quoted: m })
}
}
break
//━━━━━━━━━━━━━━━[ AI ]━━━━━━━━━━━━━━━━━//
case "aihd": case "hd": {
if (cek("id", m.sender) == null) return setReply(mess.user)
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ""
if (!mime) return setReply(`Kirim atau Balas Image dengan Caption ${command}`)
if (!/image\/(jpe?g|png)/.test(mime)) return setReply(`Mime ${mime} tidak didukung!`)
let img = await q.download?.()
try {
const This = await remini(img, "enhance")
await bayuamore.sendFile(m.chat, This, "media.jpg", "", m)
} catch (er) { setReply(mess.error.api) }
}
break
case "aiblur": case "blur": {
if (cek("id", m.sender) == null) return setReply(mess.user)
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ""
if (!mime) return setReply(`Kirim atau Balas Image dengan Caption ${command}`)
if (!/image\/(jpe?g|png)/.test(mime)) return setReply(`Mime ${mime} tidak didukung!`)
let image = await q.download?.()
let level = text || '3',
img = await Jimp.read(image)
img.blur(isNaN(level) ? 3 : parseInt(level))
img.getBuffer('image/jpeg', (err, buffer) => {
if (err) return setReply(mess.error.api)
bayuamore.sendFile(m.chat, buffer, "media.jpg", "", m)
})
}
break
//━━━━━━━━━━━━━━━[ BROADCAST ]━━━━━━━━━━━━━━━━━//
case "bc": case "broadcast": {
if (!isCreator) return setReply(mess.owner)
if (!m.isGroup) return setReply(mess.group)
if (!text) return setReply(`*Example: ${prefix+command} teks*`)
const groupMetadata = m.isGroup? await bayuamore.groupMetadata(from).catch(e => {}) : ""
const groupOwner = m.isGroup? groupMetadata.owner : ""
const participantts = m.isGroup? await groupMetadata.participants : ""
const halsss = await participantts.filter(v => v.id.endsWith('.net')).map(v => v.id)
setReply(`*[${namabot}] Sedang Broadcast ke ${halsss.length} Member Group*`)
global.tekspushkonv1 = text
for (let men of halsss) {
if (isContacts) return
contacts.push(men)
fs.writeFileSync('./database/contacts.json', JSON.stringify(contacts))
if (/image/.test(mime)) {
media = await bayuamore.downloadAndSaveMediaMessage(quoted)
mem = await uptotelegra(media)
await bayuamore.sendMessage(men, { image: { url: mem }, caption: global.tekspushkonv1 })
await sleep(4000)
} else {
await bayuamore.sendMessage(men, { text: global.tekspushkonv1 })
await sleep(4000)
}
}
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n");
return vcard; }).join("");
fs.writeFileSync("./database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
setReply(util.format(err))
} finally {
bayuamore.sendMessage(`${develover}`, { document: fs.readFileSync("./database/contacts.vcf"), fileName: "contacts.vcf", mimetype: "text/vcard", contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, mediaType: 1, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
contacts.splice(0, contacts.length)
fs.writeFileSync("./database/contacts.json", JSON.stringify(contacts))
}
setReply(`*[${namabot}] Sukses Broadcast ke ${halsss.length} Member Group*`)
}
break
case "bcgc": case "broadcastgroup": {
if (!isCreator) return setReply(mess.owner)
if (m.isGroup) return setReply(mess.private)
if (!text) return setReply(`*Example: ${prefix+command} teks|4000*`)
let getGroups = await bayuamore.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
setReply(`*[${namabot}] Sedang Broadcast ke ${anu.length} Group*`)
for (let xnxx of anu) {
let metadataaa = await bayuamore.groupMetadata(xnxx)
let participannn = await metadataaa.participants
if (/image/.test(mime)) {
media = await bayuamore.downloadAndSaveMediaMessage(quoted)
mem = await uptotelegra(media)
await bayuamore.sendMessage(xnxx, { image: { url: mem }, caption: text.split('|')[0], mentions: participannn.map(a => a.id) })
await sleep(text.split('|')[1])
} else {
await bayuamore.sendMessage(xnxx, { text: text.split('|')[0], mentions: participannn.map(a => a.id) })
await sleep(text.split('|')[1])
}
}
setReply(`*[${namabot}] Sukses Broadcast ke ${anu.length} Group*`)
}
break
case "bcid": case "broadcastid": {
if (!isCreator) return setReply(mess.owner)
if (m.isGroup) return setReply(mess.private)
if (!text) return setReply(`*Example: ${prefix+command} idgroup|teks*`)
const groupMetadataa = !m.isGroup? await bayuamore.groupMetadata(`${text.split("|")[0]}`).catch(e => {}) : ""
const participants = !m.isGroup? await groupMetadataa.participants : ""
const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
setReply(`*[${namabot}] Sedang Broadcast ke ${halls.length} Member Group*`)
global.tekspushkon = text.split("|")[1]
for (let mem of halls) {
if (isContacts) return
contacts.push(mem)
fs.writeFileSync('./database/contacts.json', JSON.stringify(contacts))
if (/image/.test(mime)) {
media = await bayuamore.downloadAndSaveMediaMessage(quoted)
memk = await uptotelegra(media)
await bayuamore.sendMessage(mem, { image: { url: memk }, caption: global.tekspushkon })
await sleep(4000)
} else {
await bayuamore.sendMessage(mem, { text: global.tekspushkon })
await sleep(4000)
}
}
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n");
return vcard; }).join("");
fs.writeFileSync("./database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
setReply(util.format(err))
} finally {
await bayuamore.sendMessage(`${develover}`, { document: fs.readFileSync("./database/contacts.vcf"), fileName: "contacts.vcf", mimetype: "text/vcard", contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, mediaType: 1, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
contacts.splice(0, contacts.length)
fs.writeFileSync("./database/contacts.json", JSON.stringify(contacts))
}
setReply(`*[${namabot}] Sukses Broadcast ke ${halls.length} Member Group*`)
}
break
case "bcusr": case "broadcastuser": {
if (!isCreator) return setReply(mess.owner)
if (m.isGroup) return setReply(mess.private)
if (!q) return setReply(`*Example: ${prefix+command} teks*`)
let db_orang = JSON.parse(fs.readFileSync("./database/user.json"))
setReply(`*[${namabot}] Sedang Broadcast ke ${db_orang.length} User*`)
let data_teks = `${q}`
for (let i of db_orang) {
if (/image/.test(mime)) {
media = await bayuamore.downloadAndSaveMediaMessage(quoted)
mem = await uptotelegra(media)
await bayuamore.sendMessage(i.id, { image: { url: mem }, caption: data_teks })
await sleep(4000)
} else {
await bayuamore.sendMessage(i.id, { text: data_teks })
await sleep(4000)
}
}
setReply(`*[${namabot}] Sukses Broadcast ke ${db_orang.length} User*`)
}
break
case "cekgc": case "cekgroup": {
if (!isCreator) return setReply(mess.owner)
if (!args[0]) return setReply(`*Example: ${prefix+command} ${mygc}*`)
let linkRegex = args.join(" ")
let coded = linkRegex.split("https://chat.whatsapp.com/")[1]
if (!coded) return setReply(mess.error.lv)
bayuamore.query({
tag: "iq",
attrs: {
type: "get",
xmlns: "w:g2",
to: "@g.us"
},
content: [{ tag: "invite", attrs: { code: coded } }]
}).then(async(res) => {
tekse = `*CEK GROUPS*
_Name Group: ${res.content[0].attrs.subject ? res.content[0].attrs.subject : "undefined" }_
_ID Group: ${res.content[0].attrs.id ? res.content[0].attrs.id + '@g.us' : "undefined"  }_`
})
}
break
case "idgc": case "idgroup": {
if (!isCreator) return setReply(mess.owner)
let getGroups = await bayuamore.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
let teks = `⬣ *LIST GROUP ANDA*\n\nTotal Group : ${anu.length} GROUP\n\n`
for (let x of anu) {
let metadata2 = await bayuamore.groupMetadata(x)
teks += `❏ *INFO GROUP*\n│⭔ *NAMA :* ${metadata2.subject}\n│⭔ *ID :* ${metadata2.id}\n│⭔ *MEMBER :* ${metadata2.participants.length}\n╰────|\n\n`
}
setReply(teks + `Untuk Penggunaan Silahkan Ketik Command ${prefix}pushkontak id|teks\n\nSebelum Menggunakan Silahkan Salin Dulu Id Group Nya Di Atas`)
}
break
case "sv": case "save": {
var name
if (text) name = text
else name = bayuamore.getName(m.sender)
var number = m.sender.split('@')[0]
let vcard = `BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
END:VCARD`
await bayuamore.sendMessage(m.chat, { contacts: { displayName: name, contacts: [{ vcard }] }}, { quoted: m })
}
break
case "svgc": case "savegroup": {
if (!isCreator) return setReply(mess.owner)
if (!m.isGroup) return setReply(mess.group)
const groupMetadata = m.isGroup? await bayuamore.groupMetadata(from).catch(e => {}) : ""
const groupOwner = m.isGroup? groupMetadata.owner : ""
const participantts = m.isGroup? await groupMetadata.participants : ""
const halsss = await participantts.filter(v => v.id.endsWith('.net')).map(v => v.id)
for (let men of halsss) {
if (isContacts) return
contacts.push(men)
fs.writeFileSync('./database/contacts.json', JSON.stringify(contacts))
}
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n");
return vcard; }).join("");
fs.writeFileSync("./database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
setReply(util.format(err))
} finally {
await bayuamore.sendMessage(`${develover}`, { document: fs.readFileSync("./database/contacts.vcf"), fileName: "contacts.vcf", mimetype: "text/vcard", contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, mediaType: 1, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
contacts.splice(0, contacts.length)
fs.writeFileSync("./database/contacts.json", JSON.stringify(contacts))
}
setReply(`*[${namabot}] Sukses menyimpan ${halsss.length} Contact Member Group dan File Contact sudah di kirim melalui Private Chat*`)
}
break
case "svgcid": case "savegroupid": {
if (!isCreator) return setReply(mess.owner)
if (m.isGroup) return setReply(mess.private)
if (!text) return setReply(`*Example: ${prefix+command} idgroup*`)
const groupMetadataa = !m.isGroup? await bayuamore.groupMetadata(`${text}`).catch(e => {}) : ""
const participants = !m.isGroup? await groupMetadataa.participants : ""
const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
for (let mem of halls) {
if (isContacts) return
contacts.push(mem)
fs.writeFileSync('./database/contacts.json', JSON.stringify(contacts))
}
try {
const uniqueContacts = [...new Set(contacts)];
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:WA ${contact.split("@")[0]}`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n");
return vcard; }).join("");
fs.writeFileSync("./database/contacts.vcf", vcardContent, "utf8");
} catch (err) {
setReply(util.format(err))
} finally {
await bayuamore.sendMessage(`${develover}`, { document: fs.readFileSync("./database/contacts.vcf"), fileName: "contacts.vcf", mimetype: "text/vcard", contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, mediaType: 1, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
contacts.splice(0, contacts.length)
fs.writeFileSync("./database/contacts.json", JSON.stringify(contacts))
}
setReply(`*[${namabot}] Sukses menyimpan ${halls.length} Contact Member Group*`)
}
break
//━━━━━━━━━━━━━━━[ DATABASE ]━━━━━━━━━━━━━━━━━//
case "addimg": {
if (!isCreator) return;
if (args.length < 1) return setReply(`Masukkan nama Imagenya!\n\nExample: ${prefix+command} image1`)
if (imgnye.includes(q)) return setReply(`Nama ${q} sudah digunakan! Silahkan coba nama lain.`)
let delb = await bayuamore.downloadAndSaveMediaMessage(quoted)
imgnye.push(q)
await fsx.copy(delb, `./media/image/${q}.jpg`)
fs.writeFileSync("./media/database/image.json", JSON.stringify(imgnye))
fs.unlinkSync(delb)
setReply(`Sukses menambahkan ${q} ke ${prefix}listimg`)
}
break
case "delimg": {
if (!isCreator) return;
if (args.length < 1) return setReply(`Masukkan nama Imagenya!\n\nExample: ${prefix+command} image1`)
if (!imgnye.includes(q)) return setReply(`Nama ${q} tidak ada didalam ${prefix}listimg! Silahkan coba nama lain.`)
let wanu = imgnye.indexOf(q)
imgnye.splice(wanu, 1)
fs.writeFileSync("./media/database/image.json", JSON.stringify(imgnye))
fs.unlinkSync(`./media/image/${q}.jpg`)
setReply(`Sukses menghapus ${q} dari ${prefix}listimg`)
}
break
case "listimg": {
if (!isPrem) return setReply(mess.premium)
let teksooo = `*── 「 LIST IMAGE 」 ──*\n\n`
for (let x of imgnye) {
teksooo += `• ${x}\n`
}
teksooo += `\n*Total Image : ${imgnye.length}*`
setReply(teksooo)
}
break
case "addvn": {
if (!isCreator) return;
if (args.length < 1) return setReply(`Masukkan nama Vnnya!\n\nExample: ${prefix+command} vn1`)
if (vnnye.includes(q)) return setReply(`Nama ${q} sudah digunakan! Silahkan coba nama lain.`)
let delb = await bayuamore.downloadAndSaveMediaMessage(quoted)
vnnye.push(q)
await fsx.copy(delb, `./media/vn/${q}.mp3`)
fs.writeFileSync("./media/database/vn.json", JSON.stringify(vnnye))
fs.unlinkSync(delb)
setReply(`Sukses menambahkan ${q} ke ${prefix}listvn`)
}
break
case "delvn": {
if (!isCreator) return;
if (args.length < 1) return setReply(`Masukkan nama Vnnya!\n\nExample: ${prefix+command} vn1`)
if (!vnnye.includes(q)) return setReply(`Nama ${q} tidak ada didalam ${prefix}listvn! Silahkan coba nama lain.`)
let wanu = vnnye.indexOf(q)
vnnye.splice(wanu, 1)
fs.writeFileSync("./media/database/vn.json", JSON.stringify(vnnye))
fs.unlinkSync(`./media/vn/${q}.mp3`)
setReply(`Sukses menghapus ${q} dari ${prefix}listvn`)
}
break
case "listvn": {
if (!isPrem) return setReply(mess.premium)
let teksooo = `*── 「 LIST VN 」 ──*\n\n`
for (let x of vnnye) {
teksooo += `• ${x}\n`
}
teksooo += `\n*Total Vn : ${vnnye.length}*`
setReply(teksooo)
}
break
//━━━━━━━━━━━━━━━[ DOWNLOADER ]━━━━━━━━━━━━━━━━━//
case "apkdl": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} https://play.google.com/store/apps/details?id=com.linecorp.LGGRTHN (linknya ambil dari playstore)*`)
let res = await apkDl(args[0])
bayuamore.sendMessage(m.chat, { document: { url: res.download }, mimetype: res.mimetype, fileName: res.fileName }, { quoted: m })
}
break
case "fbdl": case "facebookdl": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!args[0]) return setReply(`*Example: ${prefix+command} https://www.facebook.com/reel/478437244198357*`)
try {
let anu = await fg.fbdl(args[0])
bayuamore.sendFile(m.chat, anu.videoUrl, "facebook.mp4", ``, m)
} catch (e) {
setReply(mess.error.api)
}
}
break
case "igdl": case "instagramdl": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!args[0]) return setReply(`*Example: ${prefix+command} https://www.instagram.com/p/CPP2SVSpJqj/?igshid=MzRlODBiNWFlZA==*`)
try {
let results = await bochil.instagramdl(args[0])
.catch(async _ => await bochil.instagramdlv2(args[0]))
.catch(async _ => await bochil.instagramdlv3(args[0]))
.catch(async _ => await bochil.instagramdlv4(args[0]))
for (let { url } of results) {
bayuamore.sendFile(m.chat, url, "", ``, m)
}
} catch (e) {
setReply(mess.error.api)
}
}
break
case "igsdl": case "instagramstorydl": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!args[0]) return setReply(`*Example: ${prefix+command} bayuamore*`)
try {
let anu = await bochil.instagramStory(args[0])
.catch(async _ => await bochil.instagramStoryv2(args[0]))
for (let { url } of anu.results) {
bayuamore.sendFile(m.chat, url, "", ``, m)
}
} catch (e) {
setReply(mess.error.api)
}
}
break
case "mfdl": case "mediafiredl": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!args[0]) return setReply(`*Example: ${prefix+command} https://www.mediafire.com/file/941xczxhn27qbby/GBWA_V12.25FF-By.SamMods-.apk/file*`)
try {
let res = await bochil.mediafiredl(args[0])
bayuamore.sendMessage(m.chat, { document: { url: res.url }, mimetype: `${res.filetype}`, fileName: `${res.filename}.${res.ext.toLowerCase()}`, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, mediaType: 1, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
} catch (e) {
setReply(mess.error.api)
}
}
break
case "ttdl": case "tiktokdl": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!args[0]) return setReply(`Masukkan linknya!\n\nExample: ${prefix+command} https://vt.tiktok.com/ZSwWCk5o/`);
if (!args[0].match(/tiktok/gi)) return setReply(`Terjadi kesalahan! Periksa tautan dan coba lagi!`);
try {
let Scrap = await Tiktokdl(args[0]);
let S = Scrap.result;
bayuamore.sendFile(m.chat, S.download.nowm, "tiktok.mp4", "", m);
} catch (e) { setReply(mess.error.api) }
}
break
case "ttmp3": case "tiktokmp3": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!args[0]) return setReply(`Masukkan linknya!\n\nExample: ${prefix+command} https://vt.tiktok.com/ZSwWCk5o/`);
if (!args[0].match(/tiktok/gi)) return setReply(`Terjadi kesalahan! Periksa tautan dan coba lagi!`);
try {
let Scrap = await Tiktokdl(args[0]);
let S = Scrap.result;
bayuamore.sendMessage(m.chat, { audio: { url: S.download.music }, mimetype: "audio/mp4", contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, mediaType: 1, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}}, { quoted: m })
} catch (e) { setReply(mess.error.api) }
}
break
case "xviddl": case "xvideosdl": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} https://www.xvideos.com/video2508885/juliareavesproductions_-_blow_job_2_-_scene_4_-_video_1_cute_cums_anus_natural-tits_naked*`)
try {
let anu = await fg.xvideosdl(text)
bayuamore.sendFile(m.chat, anu.result.url, "xvideos.mp4", ``, m)
} catch (e) {
setReply(mess.error.api)
}
}
break
case "xxxdl": case "xnxxdl": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} https://www.xnxx.com/video-12zf03eb/perfect_pussy_gets_licked_by_skilled_tongue_-_hard_orgasm_with_contractions_for_amateur_shaved_teen_-_mrpussylicking*`)
try {
let res = await scp.xnxxdl(text)
let h = res.result
bayuamore.sendMessage(m.chat, { video: { url: h.files.high }}, { quoted: m })
} catch (e) {
bayuamore.sendMessage(m.chat, { video: { url: h.files.low }}, { quoted: m })
}
}
break
case "play": case "ytplay": case "youtubeplay": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} cita citata meriang*`)
playMp3(text)
}
break
case "yta": case "ytmp3": case "youtubemp3": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} https://youtube.com/watch?v=lpeuIu-ZYJY*`)
downloadMp3(text)
}
break
case "ytv": case "ytmp4": case "youtubemp4": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} https://youtube.com/watch?v=lpeuIu-ZYJY*`)
downloadMp4(text)
}
break
case "ytshorts": case "youtubeshortsdl": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} https://youtube.com/shorts/2hJWcUxaGOU?feature=share*`)
try {
var vid = `https://yt.btch.bz/download?URL=${text}&videoName=video`
bayuamore.sendMessage(m.chat, { video: { url: vid }, mimetype: 'video/mp4' }, { quoted: m })
} catch (e) {
setReply(`*Video not found*`)
}
}
break
/*⫹⫺ ╳╶╼╶╶╶╶┈ ⎝ GAME ⎞ ┈╴╴╴╴╾╴╳ ⫹⫺*/
case "dadu": {
if (cek("id", m.sender) == null) return setReply(mess.user)
const da = [ "https://tinyurl.com/gdd01", "https://tinyurl.com/gdd02", "https://tinyurl.com/gdd003", "https://tinyurl.com/gdd004", "https://tinyurl.com/gdd05", "https://tinyurl.com/gdd006" ];
bayuamore.sendFile(m.chat, pickRandom(da), "dado.webp", "", m)
}
break
case "slot": {
if (cek("id", m.sender) == null) return setReply(mess.user)
try {
let _spin1 = pickRandom(['1', '2', '3', '4', '5']) 
let _spin2 = pickRandom(['1', '2', '3', '4', '5'])
let _spin3 = pickRandom(['1', '2', '3', '4', '5'])
let _spin4 = pickRandom(['1', '2', '3', '4', '5'])
let _spin5 = pickRandom(['1', '2', '3', '4', '5'])
let _spin6 = pickRandom(['1', '2', '3', '4', '5'])
let _spin7 = pickRandom(['1', '2', '3', '4', '5'])
let _spin8 = pickRandom(['1', '2', '3', '4', '5'])
let _spin9 = pickRandom(['1', '2', '3', '4', '5'])
let spin1 = (_spin1 * 1)
let spin2 = (_spin2 * 1)
let spin3 = (_spin3 * 1)
let spin4 = (_spin4 * 1)
let spin5 = (_spin5 * 1)
let spin6 = (_spin6 * 1)
let spin7 = (_spin7 * 1)
let spin8 = (_spin8 * 1)
let spin9 = (_spin9 * 1)
let spins1 = (spin1 == 1 ? '🍊' : spin1 == 2 ? '🍇' : spin1 == 3 ? '🍉' : spin1 == 4 ? '🍌' : spin1 == 5 ? '🍍' : '')
let spins2 = (spin2 == 1 ? '🍊' : spin2 == 2 ? '🍇' : spin2 == 3 ? '🍉' : spin2 == 4 ? '🍌' : spin2 == 5 ? '🍍' : '')
let spins3 = (spin3 == 1 ? '🍊' : spin3 == 2 ? '🍇' : spin3 == 3 ? '🍉' : spin3 == 4 ? '🍌' : spin3 == 5 ? '🍍' : '')
let spins4 = (spin4 == 1 ? '🍊' : spin4 == 2 ? '🍇' : spin4 == 3 ? '🍉' : spin4 == 4 ? '🍌' : spin4 == 5 ? '🍍' : '')
let spins5 = (spin5 == 1 ? '🍊' : spin5 == 2 ? '🍇' : spin5 == 3 ? '🍉' : spin5 == 4 ? '🍌' : spin5 == 5 ? '🍍' : '')
let spins6 = (spin6 == 1 ? '🍊' : spin6 == 2 ? '🍇' : spin6 == 3 ? '🍉' : spin6 == 4 ? '🍌' : spin6 == 5 ? '🍍' : '')
let spins7 = (spin7 == 1 ? '🍊' : spin7 == 2 ? '🍇' : spin7 == 3 ? '🍉' : spin7 == 4 ? '🍌' : spin7 == 5 ? '🍍' : '')
let spins8 = (spin8 == 1 ? '🍊' : spin8 == 2 ? '🍇' : spin8 == 3 ? '🍉' : spin8 == 4 ? '🍌' : spin8 == 5 ? '🍍' : '')
let spins9 = (spin9 == 1 ? '🍊' : spin9 == 2 ? '🍇' : spin9 == 3 ? '🍉' : spin9 == 4 ? '🍌' : spin9 == 5 ? '🍍' : '' )
let WinOrLose
if (spin1 == 1 && spin2 == 1 && spin3 == 1 && spin4 == 1 && spin5 == 1 && spin6 == 1 && spin7 == 1 && spin8 == 1 && spin9 == 1 || spin1 == 2 && spin2 == 2 && spin3 == 2 && spin4 == 2 && spin5 == 2 && spin6 == 2 && spin7 == 2 && spin8 == 2 && spin9 == 2 || spin1 == 3 && spin2 == 3 && spin3 == 3 && spin4 == 3 && spin5 == 3 && spin6 == 3 && spin7 == 3 && spin8 == 3 && spin9 == 3 || spin1 == 4 && spin2 == 4 && spin3 == 4 && spin4 == 4 && spin5 == 4 && spin6 == 4 && spin7 == 4 && spin8 == 4 && spin9 == 4 || spin1 == 5 && spin2 == 5 && spin3 == 5 && spin4 == 5 && spin5 == 5 && spin6 == 5 && spin7 == 5 && spin8 == 5 && spin9 == 5) {
WinOrLose = "Kamu menang lagi dan mendapatkan Mega Jackpot!"
} else if (spin4 == 1 && spin5 == 1 && spin6 == 1 || spin4 == 2 && spin5 == 2 && spin6 == 2 || spin4 == 3 && spin5 == 3 && spin6 == 3 || spin4 == 4 && spin5 == 4 && spin6 == 4 || spin4 == 5 && spin5 == 5 && spin6 == 5) {
WinOrLose = "Kamu menang dan mendapatkan Jackpot!"  
} else if (spin1 == 1 && spin2 == 1 && spin3 == 1 || spin1 == 2 && spin2 == 2 && spin3 == 2 || spin1 == 3 && spin2 == 4 && spin3 == 3 || spin1 == 4 && spin2 == 4 && spin3 == 4 || spin1 == 5 && spin2 == 5 && spin3 == 5 || spin1 == 6 && spin2 == 6 && spin3 == 6 || spin1 == 7 && spin2 == 7 && spin3 == 7 || spin1 == 8 && spin2 == 8 && spin3 == 8 || spin1 == 9 && spin2 == 9 && spin3 == 9) { 
WinOrLose = "Kamu menang dalam Pertandingan ini!"
} else {
WinOrLose = "Kamu kalah dalam Pertandingan ini!"
}
bayuamore.reply(m.chat, `*── 「 SLOT 」 ──*

${spins1} ${spins2} ${spins3}
${spins4} ${spins5} ${spins6}
${spins7} ${spins8} ${spins9}

_*${WinOrLose}*_`.trim(), m)
} catch (e) {
setReply(mess.error.api)
}
}
break
case "suit": {
if (cek("id", m.sender) == null) return setReply(mess.user)
let salah = `Example: ${prefix+command} gunting\n\n*Pilihan yang tersedia :*\nBatu, Gunting, Kertas`
if (!text) return setReply(salah)
var astro = Math.random()
if (astro < 0.34) {
astro = "batu"
} else if (astro > 0.34 && astro < 0.67) {
astro = "gunting"
} else {
astro = "kertas"
}
if (text == astro) {
setReply(`*── 「 SUIT 」 ──*\n\n*Seri!*\n\n🤖 ${namabot} : ${astro}\n👤 ${pushname} : ${text}`)
} else if (text == "batu") {
if (astro == "gunting") {
setReply(`*── 「 SUIT 」 ──*\n\n*Kamu menang!*\n\n🤖 ${namabot} : ${astro}\n👤 ${pushname} : ${text}`)
} else {
setReply(`*── 「 SUIT 」 ──*\n\n*Kamu kalah!*\n\n🤖 ${namabot} : ${astro}\n👤 ${pushname} : ${text}`)
}
} else if (text == "gunting") {
if (astro == "kertas") {
setReply(`*── 「 SUIT 」 ──*\n\n*Kamu menang!*\n\n🤖 ${namabot} : ${astro}\n👤 ${pushname} : ${text}`)
} else {
setReply(`*── 「 SUIT 」 ──*\n\n*Kamu kalah!*\n\n🤖 ${namabot} : ${astro}\n👤 ${pushname} : ${text}`)
}
} else if (text == "kertas") {
if (astro == "batu") {
setReply(`*── 「 SUIT 」 ──*\n\n*Kamu menang!*\n\n🤖 ${namabot} : ${astro}\n👤 ${pushname} : ${text}`)
} else {
setReply(`*── 「 SUIT 」 ──*\n\n*Kamu kalah!*\n\n🤖 ${namabot} : ${astro}\n👤 ${pushname} : ${text}`)
}
} else {
return setReply(salah)
}
}
break
case "tod": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (args[0] == "dare") {
let img = "https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg"
let der = await bochil.dare()
bayuamore.sendFile(m.chat, img, "dare.png", `*── 「 DARE 」 ──*\n\n${der}`, m)
} else if (args[0] == "truth") {
let img = "https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg"
let tru = await bochil.truth()
bayuamore.sendFile(m.chat, img, "trut.png", `*── 「 TRUTH 」 ──*\n\n${tru}`, m)
} else {
setReply(`*Example: ${prefix+command} dare/truth*`)
}
}
break
case "asahotak": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (asahotak[m.chat]) return bayuamore.sendMessage(m.chat, { text: "Soal ini belum selesai" }, { quoted: asahotak[m.chat][0] })
var anu = await bochil.asahotak()
console.log("Jawaban : " + anu.jawaban)
asahotak[m.chat] = [
await bayuamore.reply(m.chat, `*── 「 ASAH OTAK 」 ──*

• Soal : ${anu.soal}
• Reward : +1000 Xp
• Timeout : ${(180000 / 1000).toFixed(2)} Detik

*Balas pesan ini untuk Menjawab atau Menyerah!*`, m),
anu, 4,
setTimeout(() => {
if (asahotak[m.chat]) {
setReply(`*Waktu habis!*\n\nJawabannya adalah *${anu.jawaban}*`)
delete asahotak[m.chat]
}
}, 180000)
]
}
break
case "caklontong": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (caklontong[m.chat]) return bayuamore.sendMessage(m.chat, { text: "Soal ini belum selesai" }, { quoted: caklontong[m.chat][0] })
var anu = await bochil.caklontong()
console.log("Jawaban : " + anu.jawaban)
caklontong[m.chat] = [
await bayuamore.reply(m.chat, `*── 「 CAK LONTONG 」 ──*

• Soal : ${anu.soal}
• Reward : +1000 Xp
• Timeout : ${(180000 / 1000).toFixed(2)} Detik

*Balas pesan ini untuk Menjawab atau Menyerah!*`, m),
anu, 4,
setTimeout(() => {
if (caklontong[m.chat]) {
setReply(`*Waktu habis!*\n\nJawabannya adalah *${anu.jawaban}*\n\nAlasannya adalah *${anu.deskripsi}*`)
delete caklontong[m.chat]
}
}, 180000)
]
}
break
case "kuismath": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (kuismath[m.chat]) return bayuamore.sendMessage(m.chat, { text: "Soal ini belum selesai" }, { quoted: kuismath[m.chat][0] })
let { genMath, modes } = require("./lib/math");
if (!text) return bayuamore.reply(m.chat, `*Example: ${prefix+command} noob*\n\nMode : ${Object.keys(modes).join(" | ")}`.trim(), m)
let src = await genMath(text.toLowerCase())
console.log("Jawaban : " + src.jawaban)
kuismath[m.chat] = [
await bayuamore.reply(m.chat, `*── 「 KUIS MATH 」 ──*

• Soal : Berapa hasil dari ${src.soal} ?
• Mode : ${src.mode}
• Reward : +${src.hadiah} Xp
• Timeout : ${(src.waktu / 1000).toFixed(2)} Detik

*Balas pesan ini untuk Menjawab atau Menyerah!*`, m),
src, 4,
setTimeout(() => {
if (kuismath[m.chat]) {
setReply(`*Waktu habis!*\n\nJawabannya adalah *${src.jawaban}*`)
delete kuismath[m.chat]
}
}, src.waktu)
]
}
break
case "siapakahaku": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (siapakahaku[m.chat]) return bayuamore.sendMessage(m.chat, { text: "Soal ini belum selesai" }, { quoted: siapakahaku[m.chat][0] })
var anu = await bochil.siapakahaku()
console.log("Jawaban : " + anu.jawaban)
siapakahaku[m.chat] = [
await bayuamore.reply(m.chat, `*── 「 SIAPAKAH AKU 」 ──*

• Soal : ${anu.soal}
• Reward : +1000 Xp
• Timeout : ${(180000 / 1000).toFixed(2)} Detik

*Balas pesan ini untuk Menjawab atau Menyerah!*`, m),
anu, 4,
setTimeout(() => {
if (siapakahaku[m.chat]) {
setReply(`*Waktu habis!*\n\nJawabannya adalah *${anu.jawaban}*`)
delete siapakahaku[m.chat]
}
}, 180000)
]
}
break
case "susunkata": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (susunkata[m.chat]) return bayuamore.sendMessage(m.chat, { text: "Soal ini belum selesai" }, { quoted: susunkata[m.chat][0] })
var anu = await bochil.susunkata()
console.log("Jawaban : " + anu.jawaban)
susunkata[m.chat] = [
await bayuamore.reply(m.chat, `*── 「 SUSUN KATA 」 ──*

• Soal : ${anu.soal}
• Tipe : ${anu.tipe}
• Reward : +1000 Xp
• Timeout : ${(180000 / 1000).toFixed(2)} Detik

*Balas pesan ini untuk Menjawab atau Menyerah!*`, m),
anu, 4,
setTimeout(() => {
if (susunkata[m.chat]) {
setReply(`*Waktu habis!*\n\nJawabannya adalah *${anu.jawaban}*`)
delete susunkata[m.chat]
}
}, 180000)
]
}
break
case "tebakgambar": {
if (tebakgambar[m.chat]) return bayuamore.sendMessage(m.chat, { text: "Soal ini belum selesai" }, { quoted: tebakgambar[m.chat][0] })
var anu = await bochil.tebakgambar()
console.log("Jawaban : " + anu.jawaban)
tebakgambar[m.chat] = [
await bayuamore.sendMessage(m.chat, { image: { url: anu.img }, caption: `*── 「 TEBAK GAMBAR 」 ──*\n\n🎁 Gift :\n📖 Question : ${anu.deskripsi}\n⏳ Timeout : ${(180000 / 1000).toFixed(2)} Detik\n\n📌 *Rules :*\n• *Reply dan ketik jawaban untuk menjawab.*\n• *Reply dan ketik nyerah untuk menyerah.*`}, { quoted: m }), anu, 4999,
setTimeout(() => {
if (tebakgambar[m.chat]) {
setReply(`*Waktu habis!*\n\nJawabannya adalah *${anu.jawaban}*`)
delete tebakgambar[m.chat]
}
}, 180000)
]
}
break
case "tebakkata": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (tebakkata[m.chat]) return bayuamore.sendMessage(m.chat, { text: "Soal ini belum selesai" }, { quoted: tebakkata[m.chat][0] })
var anu = await bochil.tebakkata()
console.log("Jawaban : " + anu.jawaban)
tebakkata[m.chat] = [
await bayuamore.reply(m.chat, `*── 「 TEBAK KATA 」 ──*

• Soal : ${anu.soal}
• Reward : +1000 Xp
• Timeout : ${(180000 / 1000).toFixed(2)} Detik

*Balas pesan ini untuk Menjawab atau Menyerah!*`, m),
anu, 4,
setTimeout(() => {
if (tebakkata[m.chat]) {
setReply(`*Waktu habis!*\n\nJawabannya adalah *${anu.jawaban}*`)
delete tebakkata[m.chat]
}
}, 180000)
]
}
break
case "tebaklagu": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (tebaklagu[m.chat]) return bayuamore.sendMessage(m.chat, { text: "Soal ini belum selesai" }, { quoted: tebaklagu[m.chat][0] })
let poin = 1000
let src = await fetchJson("https://raw.githubusercontent.com/Aiinne/scrape/main/tebaklagu.json")
let json = src[Math.floor(Math.random() * src.length)]
let msg = await bayuamore.sendMessage(m.chat, { audio: { url: json.lagu }, mimetype: "audio/mpeg" }, { quoted: m })
console.log("Jawaban : " + json.judul)
tebaklagu[m.chat] = [
await bayuamore.reply(m.chat, `*── 「 TEBAK LAGU 」 ──*

• Artis : ${json.artis}
• Judul : _____
• Reward : +${poin} Xp
• Tiketcoin : +1 Tiketcoin
• Timeout : ${(180000 / 1000).toFixed(2)} Detik

*Balas pesan ini untuk Menjawab atau Menyerah!*`, msg), json, poin,
setTimeout(() => {
if (tebaklagu[m.chat]) {
setReply(`*Waktu habis!*\n\nJawabannya adalah *${json.judul}*`)
delete tebaklagu[m.chat]
}
}, 180000)
]
}
break
case "tebaklirik": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (tebaklirik[m.chat]) return bayuamore.sendMessage(m.chat, { text: "Soal ini belum selesai" }, { quoted: tebaklirik[m.chat][0] })
var anu = await bochil.tebaklirik()
console.log("Jawaban : " + anu.jawaban)
tebaklirik[m.chat] = [
await bayuamore.reply(m.chat, `*── 「 TEBAK LIRIK 」 ──*\n\n🎁 Gift :\n📖 Question : ${anu.soal}\n⏳ Timeout : ${(180000 / 1000).toFixed(2)} Detik\n\n📌 *Rules :*\n• *Reply dan ketik jawaban untuk menjawab.*\n• *Reply dan ketik nyerah untuk menyerah.*`, m), anu, 4999,
setTimeout(() => {
if (tebaklirik[m.chat]) {
setReply(`*Waktu habis!*\n\nJawabannya adalah *${anu.jawaban}*`)
delete tebaklirik[m.chat]
}
}, 180000)
]
}
break
case "tebaktebakan": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (tebaktebakan[m.chat]) return bayuamore.sendMessage(m.chat, { text: "Soal ini belum selesai" }, { quoted: tebaktebakan[m.chat][0] })
var anu = await bochil.tebaktebakan()
console.log("Jawaban : " + anu.jawaban)
tebaktebakan[m.chat] = [
await bayuamore.reply(m.chat, `*── 「 TEBAK TEBAKAN 」 ──*\n\n🎁 Gift :\n📖 Question : ${anu.soal}\n⏳ Timeout : ${(180000 / 1000).toFixed(2)} Detik\n\n📌 *Rules :*\n• *Reply dan ketik jawaban untuk menjawab.*\n• *Reply dan ketik nyerah untuk menyerah.*`, m), anu, 4999,
setTimeout(() => {
if (tebaktebakan[m.chat]) {
setReply(`*Waktu habis!*\n\nJawabannya adalah *${anu.jawaban}*`)
delete tebaktebakan[m.chat]
}
}, 180000)
]
}
break
case "tekateki": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (tekateki[m.chat]) return bayuamore.sendMessage(m.chat, { text: "Soal ini belum selesai" }, { quoted: tekateki[m.chat][0] })
var anu = await bochil.tekateki()
console.log("Jawaban : " + anu.jawaban)
tekateki[m.chat] = [
await bayuamore.reply(m.chat, `*── 「 TEKA TEKI 」 ──*\n\n🎁 Gift :\n📖 Question : ${anu.soal}\n⏳ Timeout : ${(180000 / 1000).toFixed(2)} Detik\n\n📌 *Rules :*\n• *Reply dan ketik jawaban untuk menjawab.*\n• *Reply dan ketik nyerah untuk menyerah.*`, m), anu, 4999,
setTimeout(() => {
if (tekateki[m.chat]) {
setReply(`*Waktu habis!*\n\nJawabannya adalah *${anu.jawaban}*`)
delete tekateki[m.chat]
}
}, 180000)
]
}
break
//━━━━━━━━━━━━━━━[ GROUP ]━━━━━━━━━━━━━━━━━//
case "add": {
if (!m.isGroup) return setReply(mess.group)
if (!isBotAdmins) return setReply(mess.botAdmin)
if (!isAdmins && !isCreator) return setReply(mess.admin)
let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
await bayuamore.groupParticipantsUpdate(m.chat, [users], "add")
.then((res) => setReply(`*Success add member*`))
.catch((err) => setReply(`*There is an error, maybe the number is private*`))
}
break
case "kick": {
if (!m.isGroup) return setReply(mess.group)
if (!isBotAdmins) return setReply(mess.botAdmin)
if (!isAdmins && !isCreator) return setReply(mess.admin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
await bayuamore.groupParticipantsUpdate(m.chat, [users], "remove")
.then((res) => setReply(`*Success kick member*`))
.catch((err) => setReply(`*There is an error*`))
}
break
case "group": case "grup": case "gc": {
if (!m.isGroup) return setReply(mess.group)
if (!isBotAdmins) return setReply(mess.botAdmin)
if (!isAdmins && !isCreator) return setReply(mess.admin)
if (args[0] === "close") {
await bayuamore.groupSettingUpdate(from, "announcement")
.then((res) => setReply(`*Success closed the group*`))
.catch((err) => setReply(`*There is an error*`))
} else if (args[0] === "open") {
await bayuamore.groupSettingUpdate(from, "not_announcement")
.then((res) => setReply(`*Success opening of the group*`))
.catch((err) => setReply(`*There is an error*`))
} else {
setReply(`*Example: ${prefix+command} open/close*`)
}
}
break
case "editinfo": {
if (!m.isGroup) return setReply(mess.group)
if (!isBotAdmins) return setReply(mess.botAdmin)
if (!isAdmins && !isCreator) return setReply(mess.admin)
if (args[0] === "open") {
await bayuamore.groupSettingUpdate(from, "unlocked")
.then((res) => setReply(`*Success opened edit group info*`))
.catch((err) => setReply(`*There is an error*`))
} else if (args[0] === "close") {
await bayuamore.groupSettingUpdate(from, "locked")
.then((res) => setReply(`*Success closed group info edit*`))
.catch((err) => setReply(`*There is an error*`))
} else {
setReply(`*Example: ${prefix+command} open/close*`)
}
}
break
case "h": case "hidetag": {
if (!m.isGroup) return setReply(mess.group)
if (!isBotAdmins) return setReply(mess.botAdmin)
if (!isAdmins && !isCreator) return setReply(mess.admin)
me = m.sender
let teks = `*── 「 HIDE TAG 」 ──*

• From : @${me.split('@')[0]}
• Message : ${ q ? q : "" }
`
bayuamore.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) }, { quoted: m })
}
break
case "lgc": case "linkgc": case "linkgroup": {
if (!m.isGroup) return setReply(mess.group)
if (!isBotAdmins) return setReply(mess.botAdmin)
if (!isAdmins && !isCreator) return setReply(mess.admin)
let response = await bayuamore.groupInviteCode(m.chat)
bayuamore.sendText(m.chat, `*── 「 LINK GROUP 」 ──*

• Name Group : ${groupMetadata.subject}
• Link Group : https://chat.whatsapp.com/${response}`, m, { detectLink: true })
}
break
case "promote": {
if (!m.isGroup) return setReply(mess.group)
if (!isBotAdmins) return setReply(mess.botAdmin)
if (!isAdmins && !isCreator) return setReply(mess.admin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
await bayuamore.groupParticipantsUpdate(m.chat, [users], "promote")
.then((res) => setReply(`*Success promote member*`))
.catch((err) => setReply(`*There is an error*`))
}
break
case "demote": {
if (!m.isGroup) return setReply(mess.group)
if (!isBotAdmins) return setReply(mess.botAdmin)
if (!isAdmins && !isCreator) return setReply(mess.admin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
await bayuamore.groupParticipantsUpdate(m.chat, [users], "demote")
.then((res) => setReply(`*Success demote member*`))
.catch((err) => setReply(`*There is an error*`))
}
break
case "kickall": {
if (!m.isGroup) return setReply(mess.group)
if (!isBotAdmins) return setReply(mess.botAdmin)
if (!isAdmins && !isCreator) return setReply(mess.admin)
let data = participants.map((x) => x.id)
for (let x of data) {
if (x !== botNumber && x !== groupMetadata.owner && x !== owner[0] + "@s.whatsapp.net") {
bayuamore.groupParticipantsUpdate(m.chat, [x], "remove")
await sleep(3000)
}
}
}
break
case "ta": case "tagall": {
if (!m.isGroup) return setReply(mess.group)
if (!isBotAdmins) return setReply(mess.botAdmin)
if (!isAdmins && !isCreator) return setReply(mess.admin)
me = m.sender
let teks = `*── 「 TAG ALL 」 ──*

• From : @${me.split('@')[0]}
• Message : ${ q ? q : "" }
• Participant :\n`
for (let mem of participants) {
teks += `@${mem.id.split('@')[0]}\n`
}
bayuamore.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
}
break
case "totag": {
if (!m.isGroup) return setReply(mess.group)
if (!isBotAdmins) return setReply(mess.botAdmin)
if (!isAdmins && !isCreator) return setReply(mess.admin)
if (!m.quoted) return setReply(`*Reply to messages with captions ${command}*`)
bayuamore.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map((a) => a.id) })
}
break
//━━━━━━━━━━━━━━━[ INTERNET ]━━━━━━━━━━━━━━━━━//
case "chord": { 
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} Last child bernafas tanpamu*`)
let anu = await chord(text)
let teks = `*── 「 CHORD SEARCH 」 ──*

${anu.chord}
`
bayuamore.sendMessage(m.chat, { text: teks, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, mediaType: 1, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
}
break
case "distance": { 
if (cek("id", m.sender) == null) return setReply(mess.user)
var [dari, ke] = text.split`,`
if (!(dari && ke)) return setReply(`*Example: ${prefix+command} Cirebon,Jakarta*`)
var data = await jarak(dari, ke)
let teks = `*── 「 DISTANCE SEARCH 」 ──*

${data.desc}`
if (data.img) return bayuamore.sendMessage(m.chat, { caption: teks, image: data.img }, { quoted: m })
else setReply(data.desc)
}
break
case "fetch": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!/^https?:\/\//.test(text)) return setReply(`*Example: ${prefix+command} https://telegra.ph/file/8e5d3038af48f34142283.jpg*`)
let _url = new URL(text)
let url = global.api(_url.origin, _url.pathname, Object.fromEntries(_url.searchParams.entries()), 'APIKEY')
let res = await fetch(url)
if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
return setReply(`Content-Length: ${res.headers.get('content-length')}`)
}
if (!/text|json/.test(res.headers.get('content-type'))) return bayuamore.sendFile(m.chat, url, 'file', text, m)
let txt = await res.buffer()
try {
txt = format(JSON.parse(txt + ''))
} catch (e) {
txt = txt + ''
} finally {
setReply(txt.slice(0, 65536) + '')
}
}
break
case "gempa": {
if (cek("id", m.sender) == null) return setReply(mess.user)
const link = 'https://data.bmkg.go.id/DataMKG/TEWS/'
try {
let res = await fetch(link+'autogempa.json')
let anu = await res.json()
anu = anu.Infogempa.gempa
let txt = `*── 「 GEMPA NEWS 」 ──*\n\n${anu.Wilayah}\n\n`
txt += `Potensi : ${anu.Potensi}\n`
txt += `Tanggal : ${anu.Tanggal}\n`
txt += `Waktu : ${anu.Jam}\n\n`
txt += `Magnitude : ${anu.Magnitude}\n`
txt += `Kedalaman : ${anu.Kedalaman}\n`
txt += `Koordinat : ${anu.Coordinates}${anu.Dirasakan.length > 3 ? `\nDirasakan : ${anu.Dirasakan}` : ''}`
await bayuamore.sendMessage(m.chat, { image: { url: link+anu.Shakemap }, caption: txt }, { quoted: m })
} catch (e) {
setReply(mess.error.api)
}
}
break
case "google": {
if (cek("id", m.sender) == null) return setReply(mess.user)
const { googleIt } = require("@bochilteam/scraper")
let full = /f$/i.test(command)
let text = args.join` `
if (!text) return setReply(`*Example: ${prefix+command} Apa itu Bot ?*`)
let url = "https://google.com/search?q=" + encodeURIComponent(text)
let search = await googleIt(text)
let msg = search.articles.map(({ title, url, description }) => {
return `*${title}*\n_${url}_\n_${description}_`
}).join("\n\n")
try {
let phone = await ssweb(url, "phone")
bayuamore.sendFile(m.chat, phone.result, "screenshot.png", url + '\n\n' + msg, m)
} catch (e) {
setReply(msg)
}
}
break
case "gimage": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} Minecraft*`)
let results = await bochil.googleImage(text) || []
let image = pickRandom(results) || {}
bayuamore.sendFile(m.chat, image, "gimage.jpg", ``, m)
}
break
case "lyric": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} Cita citata meriang*`)
try {
let anu = await fg.lyrics(text)
let teks = `*── 「 LYRICS SEARCH 」 ──*

👤 Artist : ${anu.artist}
📄 Title : ${anu.title}

${anu.lyrics}`
bayuamore.sendMessage(m.chat, { text: teks, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, mediaType: 1, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
} catch {
setReply(`*${command} ${text} tidak ditemukan*`)
}
}
break
case "pin": case "pinterest": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} Luo yi Mobile Legend*`)
let res = await scp.pinterest(text)
bayuamore.sendFile(m.chat, res.url, "pinterest.jpg", ``, m)
}
break
case "wattpad": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} My Ghost*`)
try {
let anu = await scp.wattpad(text)
let ini_txt = `*── 「 WATTPAD SEARCH 」 ──*\n\n`
for (var x of anu) {
ini_txt += `📝 Judul : ${x.judul}\n`
ini_txt += `📖 Bab : ${x.bab}\n`
ini_txt += `📚 Deskripsi : ${x.description}\n`
ini_txt += `📄 Dibaca : ${x.dibaca}\n`
ini_txt += `📊 Divote : ${x.divote}\n`
ini_txt += `🔗 Url : ${x.url}\n`
ini_txt += `🕐 Waktu : ${x.waktu}\n`
ini_txt += `--------------------------------------\n`
}
bayuamore.sendMessage(m.chat, { text: ini_txt, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, mediaType: 1, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
} catch (err) {
setReply(mess.error.api)
}
}
break
case "wikipedia": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} Bot*`)
wikipedia(`${text}`).then(res => {
bayuamore.sendMessage(m.chat, { text: `*── 「 WIKIPEDIA SEARCH 」 ──*\n\n🔍 Search : ${res.result.judul}\n\n${res.result.isi}\n`, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, mediaType: 1, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
}).catch(() => { setReply("Not found") })
}
break
case "xnxx": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} girl lesby*`)
try {
let res = await scp.xnxxsearch(text)
let get_result = res.result
let ini_txt = `*── 「 XNXX SEARCH 」 ──*\n\n`
for (var x of get_result) {
ini_txt += `📖 Judul : ${x.title}\n`
ini_txt += `📄 Info : ${x.info}\n`
ini_txt += `🔗 Url : ${x.link}\n\n`
}
bayuamore.sendMessage(m.chat, { text: ini_txt, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, mediaType: 1, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
} catch (err) {
setReply(mess.error.api)
}
}
break
case "xvideos": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} blow job*`)
try {
let res = await fg.xvideosSearch(text)
let ini_txt = `*── 「 XVIDEOS SEARCH 」 ──*\n\n`
for (var x of res) {
ini_txt += `📖 Judul : ${x.title}\n`
ini_txt += `🕐 Durasi : ${x.duration}\n`
ini_txt += `🔗 Url : ${x.url}\n\n`
}
bayuamore.sendMessage(m.chat, { text: ini_txt, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, mediaType: 1, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
} catch (err) {
setReply(mess.error.api)
}
}
break
case "yt": case "youtube": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} cita citata meriang*`)
let reso = await yts(text)
let aramat = reso.all
var tbuff = await getBuffer(aramat[0].image)
let teks = aramat.map((v) => {
switch (v.type) {
case "video":
return `${v.title}
◦ Duration : ${v.timestamp}
◦ Upload : ${v.ago}
◦ URL Video : ${v.url}
◦ Views : ${v.views}`.trim()
case "channel":
return `${v.name}
◦ Subscriber : ${v.subCountLabel} (${v.subCount})
◦ Total Video : ${v.videoCount}
◦ URL Video : ${v.url}`.trim()
}
}).filter((v) => v).join("\n\n")
bayuamore.sendMessage(m.chat, { image: tbuff, caption: `*── 「 YOUTUBE SEARCH 」 ──*\n\n` + teks }, { quoted: m }).catch((err) => {
setReply(`*Search not found*`)
})
}
break
case "ppcp": case "ppcouple": {
if (cek("id", m.sender) == null) return setReply(mess.user)
let data = await (await fetch('https://raw.githubusercontent.com/KazukoGans/database/main/anime/ppcouple.json')).json()
let cita = data[Math.floor(Math.random() * data.length)]
let cowi = await(await fetch(cita.cowo)).buffer()
await bayuamore.sendFile(m.chat, cowi, '', '♂️', m)
let ciwi = await(await fetch(cita.cewe)).buffer()
await bayuamore.sendFile(m.chat, ciwi, '', '♀️', m)
}
break
case "wattpadstalk": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} ${namaowner}*`)
try {
let anu = await scp.wattpaduser(text)
let teks = `*── 「 WATTPAD STALKER 」 ──*

👤 Username : ${anu.username}
👥 Followers : ${anu.followers}
📌 Joined : ${anu.joined}
📄 Biodata : ${anu.about}
📚 Reading List : ${anu.reading_list}
🔖 Works : ${anu.works}
`
bayuamore.sendMessage(m.chat, { text: teks, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, mediaType: 1, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
} catch {
setReply(`*${command} ${text} tidak ditemukan*`)
}
}
break
//━━━━━━━━━━━━━━━[ RPG GAME ]━━━━━━━━━━━━━━━━━//
case "inventori": {
if (cek("id", m.sender) == null) return setReply(mess.user)
let teks = `*── 「 INVENTORI 」 ──*

*PROFILE*
• Name : ${pushname}
• Darah : ${db.data.users[m.sender].darah}
• Limit : ${db.data.users[m.sender].limit}
• Potion : ${db.data.users[m.sender].potion}
• Tiket Coin : ${db.data.users[m.sender].tiketcoin}

*BIBIT*
• Bibit Anggur : ${db.data.users[m.sender].bibitanggur}
• Bibit Apel : ${db.data.users[m.sender].bibitapel}
• Bibit Jeruk : ${db.data.users[m.sender].bibitjeruk}
• Bibit Mangga : ${db.data.users[m.sender].bibitmangga}
• Bibit Pisang : ${db.data.users[m.sender].bibitpisang}

*HASIL BERKEBUN*
• Anggur : ${db.data.users[m.sender].anggur}
• Apel : ${db.data.users[m.sender].apel}
• Jeruk : ${db.data.users[m.sender].jeruk}
• Mangga : ${db.data.users[m.sender].mangga}
• Pisang : ${db.data.users[m.sender].pisang}

*HASIL BURUAN*
• Ayam : ${db.data.users[m.sender].ayam}
• Domba : ${db.data.users[m.sender].domba}
• Gajah : ${db.data.users[m.sender].gajah}
• Ikan : ${db.data.users[m.sender].ikan}
• Kelinci : ${db.data.users[m.sender].kelinci}
• Sapi : ${db.data.users[m.sender].sapi}

*HASIL MINING*
• Besi : ${db.data.users[m.sender].besi}
• Emas : ${db.data.users[m.sender].emas}
• Emerald : ${db.data.users[m.sender].emerald}
`
setReply(teks)
}
break
case "berkebun": {
if (cek("id", m.sender) == null) return setReply(mess.user)
const timeout = 1800000
let angguru = global.db.data.users[m.sender].bibitanggur
let apelu = global.db.data.users[m.sender].bibitapel
let jeruku = global.db.data.users[m.sender].bibitjeruk
let manggau = global.db.data.users[m.sender].bibitmangga
let pisangu = global.db.data.users[m.sender].bibitpisang
let time = global.db.data.users[m.sender].lastberkebon + 1800000
if (apelu == 0 || angguru == 0 || manggau == 0 || pisangu == 0 || jeruku == 0) return setReply(`*Pastikan kamu memiliki semua bibit*\n*Seperti Bibit Apel, Bibit Anggur, Bibit Jeruk, Bibit Mangga, Bibit Pisang*\n\n*Ketik :*\n${prefix}shop buy bibitmangga 500\n\n*List Bibit :*\nbibitanggur\nbibitapel\nbibitjeruk\nbibitmangga\nbibitpisang`)
if (new Date - global.db.data.users[m.sender].lastberkebon < 1800000) return setReply(`*Kamu sudah berkebun!*\nSilahkan tunggu hasil panenmu dalam _${msToTime(time - new Date())}_`)
if (global.db.data.users[m.sender].bibitanggur > 499) {
if (global.db.data.users[m.sender].bibitapel > 499) {
if (global.db.data.users[m.sender].bibitjeruk > 499) {
if (global.db.data.users[m.sender].bibitmangga > 499) {
if (global.db.data.users[m.sender].bibitpisang > 499) {
let apelpoin = `${Math.floor(Math.random() * 500)}`.trim()
let anggurpoin = `${Math.floor(Math.random() * 500)}`.trim()
let jerukpoin = `${Math.floor(Math.random() * 500)}`.trim()
let manggapoin = `${Math.floor(Math.random() * 500)}`.trim()
let pisangpoin = `${Math.floor(Math.random() * 500)}`.trim()
global.db.data.users[m.sender].anggur += anggurpoin * 1
global.db.data.users[m.sender].apel += apelpoin * 1
global.db.data.users[m.sender].jeruk += jerukpoin * 1
global.db.data.users[m.sender].mangga += manggapoin * 1
global.db.data.users[m.sender].pisang += pisangpoin * 1
global.db.data.users[m.sender].tiketcoin += 1
global.db.data.users[m.sender].bibitanggur -= 500
global.db.data.users[m.sender].bibitapel -= 500
global.db.data.users[m.sender].bibitjeruk -= 500
global.db.data.users[m.sender].bibitmangga -= 500
global.db.data.users[m.sender].bibitpisang -= 500
global.db.data.users[m.sender].lastberkebon = new Date * 1
setReply(`Selamat kamu mendapatkan :\n\n+${apelpoin} Apel\n+${anggurpoin} Anggur\n+${jerukpoin} Jeruk\n+${manggapoin} Mangga\n+${pisangpoin} Pisang\n+1 Tiketcoin`)
setTimeout(() => {
bayuamore.reply(m.chat, `*Waktunya berkebun lagi kak 😄*`, m)
}, timeout)
} else setReply(`Pastikan bibit anggur kamu *500* untuk bisa berkebun`)
} else setReply(`Pastikan bibit apel kamu *500* untuk bisa berkebun`)
} else setReply(`Pastikan bibit jeruk kamu *500* untuk bisa berkebun`)
} else setReply(`Pastikan bibit mangga kamu *500* untuk bisa berkebun`)
} else setReply(`Pastikan bibit pisang kamu *500* untuk bisa berkebun`)
}
break
case "bonus": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (new Date - global.db.data.users[m.sender].lastclaim > 86400000) {
bayuamore.reply(m.chat, `Selamat kamu mendapatkan :\n\n• Uang : 50000`, m)
global.db.data.users[m.sender].money += 50000
global.db.data.users[m.sender].lastclaim = new Date * 1
} else bayuamore.reply(m.chat, `Bilang apa hayo ?`, m)
}
break
case "merampok": {
if (cek("id", m.sender) == null) return setReply(mess.user)
const timeout = 1800000
let time = global.db.data.users[m.sender].lastmulung + 604800000
if (new Date - global.db.data.users[m.sender].lastmulung< 604800000) return setReply(`*Kamu sudah merampok!*\n\nTunggu selama ${msToTime(time - new Date())} lagi`)
let botolnye = `${Math.floor(Math.random() * 30000)}`.trim()
let kalengnye = `${Math.floor(Math.random() * 999)}`.trim()
let kardusnye = `${Math.floor(Math.random() * 1000)}`.trim()
global.db.data.users[m.sender].money += botolnye * 1
global.db.data.users[m.sender].exp += kalengnye * 1
global.db.data.users[m.sender].kardus += kardusnye * 1
global.db.data.users[m.sender].lastmulung = new Date * 1
setReply(`*Selamat kamu mendapatkan :*\n\n• Exp : ${kalengnye}\n• Kardus : ${kardusnye}\n• Uang : ${botolnye}`)
setTimeout(() => {
bayuamore.reply(m.chat, `*Waktunya merampok lagi kak 😄*`, m)
}, timeout)
}
break
//━━━━━━━━━━━━━━━[ STORE ]━━━━━━━━━━━━━━━━━//
case "addlist": {
if (!m.isGroup) return setReply(mess.group)
if (!isAdmins && !isCreator) return setReply(mess.admin)
var args1 = q.split("|")[0]
var args2 = q.split("|")[1]
if (!q.includes("|")) return setReply(`*Example: ${prefix+command} key|response*`)
if (isAlreadyResponList(m.chat, args1, db_respon_list)) return setReply(`*Key List ${args1} sudah terdaftar di Group ini.*`)
if (/image/.test(mime)) {
let media = await bayuamore.downloadAndSaveMediaMessage(quoted)
const fd = new FormData()
fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
addResponList(m.chat, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
setReply(`*Sukses add list ${args1}*`)
if (fs.existsSync(media)) fs.unlinkSync(media)
})
} else {
addResponList(m.chat, args1, args2, false, '-', db_respon_list)
setReply(`*Sukses add list ${args1}*`)
}
}
break
case "dellist": {
if (!m.isGroup) return setReply(mess.group)
if (!isAdmins && !isCreator) return setReply(mess.admin)
if (db_respon_list.length === 0) return setReply(`*Belum ada list di Database*`)
if (!text) return setReply(`*Example: ${prefix+command} MOBILE LEGEND*`)
if (!isAlreadyResponList(m.chat, q, db_respon_list)) return setReply(`*List ${q} tidak ada di Database*`)
delResponList(m.chat, q, db_respon_list)
setReply(`*Sukses delete list ${q}*`)
}
break
case "list": {
if (!m.isGroup) return setReply(mess.group)
if (cek("id", m.sender) == null) return setReply(mess.user)
if (db_respon_list.length === 0) return setReply(`*Belum ada list message di Group ini*`)
if (!isAlreadyResponListGroup(m.chat, db_respon_list)) return setReply(`*Belum ada list message yang terdaftar di Group ini*`)
let no = 0
let teks = `*── 「 LIST STORE 」 ──*\n\n*👥 Group : ${groupName}*\n*📅 Tanggal : ${date}*\n*🕐 Waktu : ${time}*\n\n*_Untuk melihat list, silahkan ketik sesuai key list dibawah_*\n\n`
for (let x of db_respon_list) {
if (x.id === m.chat) {
teks += `*${no+=1}. ${x.key}*\n`
}
}
setReply(teks)
}
break
case "updatelist": {
if (!m.isGroup) return setReply(mess.group)
if (!isAdmins && !isCreator) return setReply(mess.admin)
var args1 = q.split("|")[0]
var args2 = q.split("|")[1]
if (!q.includes("|")) return setReply(`*Example: ${prefix+command} key|response*`)
if (!isAlreadyResponListGroup(m.chat, db_respon_list)) return setReply(`*Key List ${args1} belum terdaftar di Group ini.*`)
if (/image/.test(mime)) {
let media = await bayuamore.downloadAndSaveMediaMessage(quoted)
const fd = new FormData()
fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
fetch('https://telegra.ph/upload', {
method: 'POST',
body: fd
}).then(res => res.json())
.then((json) => {
updateResponList(m.chat, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
setReply(`*Sukses update list ${args1}*`)
if (fs.existsSync(media)) fs.unlinkSync(media)
})
} else {
updateResponList(m.chat, args1, args2, false, '-', db_respon_list)
setReply(`*Sukses update list ${args1}*`)
}
}
break
case "done": {
if (!isCreator && !isAdmins) return
if (!m.quoted) return setReply("*Reply pesanannya!*")
let tekk = m.quoted ? quoted.text : quoted.text.split(args[0])[1]
let numb = m.quoted.sender.split("@")[0]
let sukses = `*── 「 TRANSAKSI SUKSES 」 ──*\n\n\`\`\`👤 Buyer    : @${numb}\n📝 Pesanan  : ${tekk}\n📆 Tanggal  : ${date}\n🕐 Waktu    : ${time}\n⏳ Status   : Sukses\`\`\`\n\n*Catatan :*\n*Terimakasih sudah order di ${namaowner} kak. ditunggu orderan selanjutnya yah 😗*`
bayuamore.sendMessage(`${numb}@s.whatsapp.net`, { text: sukses }, { quoted: m })
if (m.isGroup) {
bayuamore.sendMessage(m.chat, { text: sukses }, { quoted: m })
}
}
break
case "proses": {
if (!isCreator && !isAdmins) return
if (!m.quoted) return setReply("*Reply pesanannya!*")
let tek = m.quoted ? quoted.text : quoted.text.split(args[0])[1]
let num = m.quoted.sender.split("@")[0]
let proses = `*── 「 STATUS TRANSAKSI 」 ──*\n\n\`\`\`👤 Buyer    : @${num}\n📝 Pesanan  : ${tek}\n📆 Tanggal  : ${date}\n🕐 Waktu    : ${time}\n⏳ Status   : Proses\`\`\`\n\n*Catatan :*\n*Transaksi sedang diproses. Silahkan menunggu informasi berikutnya.*`
m.quoted.copyNForward(develover, true)
bayuamore.sendMessage(`${num}@s.whatsapp.net`, { text: proses }, { quoted: m })
if (m.isGroup) {
bayuamore.sendMessage(m.chat, { text: proses }, { quoted: m })
}
}
break
case "payment": {
if (cek("id", m.sender) == null) return setReply(mess.user)
let amore = `*── 「 PAYMENT 」 ──*

Silahkan Scan Qris dan transfer sesuai harga.

*BANK*
• BCA             : ${bca}
• MANDIRI   : ${mandiri}
• SEABANK : ${seabank}

*E-WALLET*
• DANA     : ${dana}
• GOPAY   : ${gopay}
• OVO        : ${ovo}
• SPAY       : ${shopepay}

*ALL PAYMENT*
• ATAS NAMA : Bayu Koswara

*Syarat dan Ketentuan :*
1. QR Scan berlaku 3 menit, setelah 3 menit pesan ini akan dihapus.
2. Setelah transfer harap kirim screenshot bukti transfer dengan caption *${prefix}bukti* untuk menghindari drama transaksi.
`
let pay = await bayuamore.sendMessage(m.chat, { image: qris, caption: amore }, { quoted: m })
setTimeout(() => {
bayuamore.sendMessage(m.chat, { delete: pay.key })}, 180000)
}
break
case "addsewa": case "sewa": {
if (cek("saldo", m.sender) < 15000) return setReply(`*Saldo kamu kurang dari Rp 15.000. Silahkan ketik ${prefix}deposit untuk mengisi saldo.*`)
if (text < 2) return setReply(`*Example : ${prefix+command} ${mygc} 30d*`)
if (!isUrl(args[0])) return setReply(mess.error.Iv)
var url = args[0]
url = url.split("https://chat.whatsapp.com/")[1]
if (!text) return setReply(`*Example : ${prefix+command} ${mygc} 30d*`)
var data = await bayuamore.groupAcceptInvite(url)
if (_sewa.checkSewaGroup(data, sewa)) return setReply("*Bot sudah di Sewa oleh Group tersebut*")
_sewa.addSewaGroup(data, args[1], sewa)
let ceksewa = ms(_sewa.getSewaExpired(m.chat, sewa) - Date.now())
let sewanya = `*── 「 SUKSES SEWA BOT 」 ──*\n\n⏰ Expired : ${ceksewa.days} Hari ${ceksewa.hours} Jam ${ceksewa.minutes} Menit`
setReply(sewanya)
sett("-saldo", m.sender, 15000)
}
break
case "delsewa": {
if (!isCreator) return
if (!m.isGroup) return
if (!isSewa) return
sewa.splice(_sewa.getSewaPosition(args[0] ? args[0] : m.chat, sewa), 1)
fs.writeFileSync("./database/sewa.json", JSON.stringify(sewa, null, 2))
setReply("*Sukses delete Sewa Bot*")
}
break
case "ceksewa": {
if (!m.isGroup) return
if (!isSewa) return
let ceksewa = ms(_sewa.getSewaExpired(m.chat, sewa) - Date.now())
let sewanya = `*── 「 CEK SEWA BOT 」 ──*\n\n⏰ Expired : ${ceksewa.days} Hari ${ceksewa.hours} Jam ${ceksewa.minutes} Menit`
setReply(sewanya)
}
break
case "listsewa": {
let teks = `*LIST SEWA GROUP*\n\n`
let data_array = []
for (let x of sewa) {
teks += `❏  ${await getGcName(x.id)}\n┠─ ID : ${x.id}\n`
if (x.expired === "PERMANENT") {
let ceksewa = "PERMANENT"
teks += `┠─ Expired : PERMANENT\n\n`
} else {
let ceksewa = ms(x.expired - Date.now())
teks += `┠─ Expired : ${ceksewa.days} Days\n╰────| Status : Active\n\n`
}
}
bayuamore.sendMessage(m.chat, { text: teks + `Total Sewa Group : ${sewa.length} Group` }, { quoted: m })
}
break
//━━━━━━━━━━━━━━━[ TOOLS ]━━━━━━━━━━━━━━━━━//
case "case": {
if (cek("id", m.sender) == null) return setReply(mess.user)
fs.readFile("./bayuamore.js", "utf8", (err, data) => {
if (err) throw err
let regex = /case\s"(\w+)"/g
let match,
caseNames = []
while ((match = regex.exec(data)) !== null) {
caseNames.push(match[1])
}
let output = "• " + caseNames.join("\n• ")
setReply(output + `\n\nTotal case : ${caseNames.length}`)
})
}
break
case "emojimix": {
if (cek("id", m.sender) == null) return setReply(mess.user)
let [emoji1, emoji2] = text.split`+`
if (!emoji1) return setReply(`*Example: ${prefix+command} 😅 + 🤔*`)
if (!emoji2) return setReply(`*Example: ${prefix+command} 😅 + 🤔*`)
let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
for (let res of anu.results) {
let encmedia = await bayuamore.sendImageAsSticker(m.chat, res.url, m, { packname: pushname, author: author, categories: res.tags })
await fs.unlinkSync(encmedia)
}
}
break
case "emojimix2": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} 😅*`)
let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(text)}`)
for (let res of anu.results) {
let encmedia = await bayuamore.sendImageAsSticker(m.chat, res.url, m, { packname: pushname, author: author, categories: res.tags })
await fs.unlinkSync(encmedia);
}
}
break
case "getname": {
if (Input) {
try {
var name = db.data.users[Input].name
} catch {
var name = await bayuamore.getName(Input)
}
setReply(name)
} else {
setReply(m.pushName)
}
}
break
case "getpp": {
if (Input) {
try {
var ppWong = await bayuamore.profilePictureUrl(Input, "image")
} catch {
var ppWong = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60"
}
bayuamore.sendMessage(m.chat, { image: { url: ppWong }}, { quoted : m })
} else {
try {
var ppWong = await bayuamore.profilePictureUrl(m.sender, "image")
} catch {
var ppWong = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60"
}
bayuamore.sendMessage(m.chat, { image: { url: ppWong }}, { quoted: m })
}
}
break
case "tinyurl": case "shortlink": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} https://instagram.com/bayuamore*`)
let anu = await axios.get(`https://tinyurl.com/api-create.php?url=${text}`)
bayuamore.sendMessage(m.chat, { text: anu.data, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, mediaType: 1, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}}, { quoted: m })
}
break
case "sshp": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} ${myig}*`)
let phone = await ssweb(text, "phone")
bayuamore.sendFile(m.chat, phone.result, "", ``, m, false)
}
break
case "sspc": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} ${myig}*`)
let desktop = await ssweb(text, "desktop")
bayuamore.sendFile(m.chat, desktop.result, "", ``, m, false)
}
break
case "sstablet": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example: ${prefix+command} ${myig}*`)
let tablet = await ssweb(text, "tablet")
bayuamore.sendFile(m.chat, tablet.result, "", ``, m, false)
}
break
case "s": case "sticker": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!quoted) return setReply(`*Reply Image/Video with caption ${prefix+command}*`)
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await bayuamore.sendImageAsSticker(m.chat, media, m, { packname: pushname, author: global.author })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return setReply(`*Videos maximum 10 second*`)
let media = await quoted.download()
let encmedia = await bayuamore.sendVideoAsSticker(m.chat, media, m, { packname: pushname, author: global.author })
await fs.unlinkSync(encmedia)
} else {
return setReply(`*Send Image/Video with caption ${prefix+command}*`)
}
}
break
case "smeme": case "stickermeme": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!/image/.test(mime)) return setReply(`*Reply/Send Image with caption ${prefix+command} text1|text2*`)
if (!text) return setReply(`*Reply/Send Image with caption ${prefix+command} text1|text2*`)
let atas = text.split("|")[0] ? text.split("|")[0] : "-"
let bawah = text.split("|")[1] ? text.split("|")[1] : "-"
let { TelegraPh } = require("./lib/uploader")
try {
let mee = await bayuamore.downloadAndSaveMediaMessage(quoted)
let mem = await TelegraPh(mee)
let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${mem}`
let awikwok = await bayuamore.sendImageAsSticker(m.chat, smeme, m, { packname: pushname, author: author })
await fs.unlinkSync(awikwok)
// db.data.users[m.sender].limit -= 1
} catch (e) {
setReply(mess.error.error)
}
}
break
case "sqc": case "stickerqc": {
if (cek("id", m.sender) == null) return setReply(mess.user)
const { quote } = require("./scrape/quote")
if (!q) return setReply(`*Example: ${prefix+command} ${namabot}*`)
let ppnyauser = await bayuamore.profilePictureUrl(m.sender, "image").catch((_) => "https://telegra.ph/file/6880771a42bad09dd6087.jpg")
const rest = await quote(q, pushname, ppnyauser)
bayuamore.sendImageAsSticker(m.chat, rest.result, m, { packname: pushname, author: author })
}
break
case "sqcimg": case "stickerqcimg": {
if (cek("id", m.sender) == null) return setReply(mess.user)
const { quote } = require("./scrape/quote.js")
if (!q) return setReply(`*Example: ${prefix+command} ${namabot}*`)
let ppnyauser = await bayuamore.profilePictureUrl(m.sender, "image").catch((_) => "https://telegra.ph/file/6880771a42bad09dd6087.jpg")
const rest = await quote(q, pushname, ppnyauser)
bayuamore.sendMessage(m.chat, { image: rest.result }, { quoted: m })
}
break
case "swm": case "stickerwm": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!quoted) return setReply(`*Reply Image/Video with caption ${prefix+command} teks1|teks2*`)
let [teks1, teks2] = text.split`|`
if (!teks1) return setReply(`*Reply Image/Video with caption ${prefix+command} teks1|teks2*`)
if (!teks2) return setReply(`*Reply Image/Video with caption ${prefix+command} teks1|teks2*`)
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await bayuamore.sendImageAsSticker(m.chat, media, m, { packname: teks1, author: teks2 })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return setReply(`*Videos maximum 10 second*`)
let media = await quoted.download()
let encmedia = await bayuamore.sendVideoAsSticker(m.chat, media, m, { packname: teks1, author: teks2 })
await fs.unlinkSync(encmedia)
} else {
return setReply(`*Send Image/Video with caption ${prefix+command} teks1|teks2*`)
}
}
break
case "toaud": case "toaudio": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!/video/.test(mime) && !/audio/.test(mime)) return setReply(`*Send and Reply Audio/Video with caption ${prefix+command}*`)
if (!quoted) return setReply(`*Send and Reply Audio/Video with caption ${prefix+command}*`)
let media = await quoted.download()
let { toAudio } = require("./lib/converter")
let audio = await toAudio(media, "mp4")
bayuamore.sendMessage(m.chat, { audio: audio, mimetype: "audio/mpeg", contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, mediaType: 1, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}}, { quoted: m })
}
break
case "togif": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!quoted) return setReply(`*Reply Sticker with caption ${prefix+command}*`)
if (!/webp/.test(mime)) return setReply(`*Reply Sticker with caption ${prefix+command}*`)
try {
let { webp2mp4File } = require("./lib/uploader")
let media = await bayuamore.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
bayuamore.sendMessage(m.chat, { video: { url: webpToMp4.result }, gifPlayback: true }, { quoted: m })
await fs.unlinkSync(media)
// db.data.users[m.sender].limit -= 1
} catch (e) {
setReply(mess.error.error)
}
}
break
case "toimg": case "toimage": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!/webp/.test(mime)) return setReply(`*Reply Sticker with caption ${prefix+command}*`)
let media = await bayuamore.downloadAndSaveMediaMessage(quoted)
let ran = await getRandom(".png")
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return setReply(mess.error.error)
let buffer = fs.readFileSync(ran)
bayuamore.sendMessage(m.chat, { image: buffer }, { quoted: m })
fs.unlinkSync(ran)
})
}
break
case "mp3": case "tomp3": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (/document/.test(mime)) return setReply(`*Send and Reply Audio/Video with caption ${prefix+command}*`)
if (!/video/.test(mime) && !/audio/.test(mime)) return setReply(`*Send and Reply Audio/Video with caption ${prefix+command}*`)
if (!quoted) return setReply(`*Send and Reply Audio/Video with caption ${prefix+command}*`)
let media = await quoted.download()
let { toAudio } = require("./lib/converter")
let audio = await toAudio(media, "mp4")
bayuamore.sendMessage(m.chat, { document: audio, mimetype: "audio/mpeg", fileName: `${pushname} Convert by ${namabot}.mp3`, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, mediaType: 1, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}}, { quoted: m })
}
break
case "tourl": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!quoted) return setReply(`*Send/Reply Media with caption ${prefix+command}*`)
let { TelegraPh } = require("./lib/uploader")
if (/image/.test(mime)) {
let media = await bayuamore.downloadAndSaveMediaMessage(quoted)
let anu = await TelegraPh(media)
let encmedia = await bayuamore.sendMessage(m.chat, { text: anu, contextInfo: { externalAdReply: { showAdAttribution: true, title: namabot, body: wm, previewType: `PHOTO`, thumbnail: thumb, sourceUrl: myig }}}, { quoted: m })
} else if (/video/.test(mime)) {
let y = await quoted.download()
let anu1 = await TelegraPh(y)
let link = await bayuamore.sendMessage(m.chat, { text: anu1, contextInfo: { externalAdReply: { showAdAttribution: true, title: namabot, body: wm, previewType: `PHOTO`, thumbnail: thumb, sourceUrl: myig }}}, { quoted: m })
} else {
setReply(mess.error.error)
}
}
break
case "tomp4": case "tovid": case "tovideo": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!quoted) return setReply(`*Send/Reply Video with caption ${prefix+command}*`)
if (!/webp/.test(mime)) return setReply(`*Reply Sticker with caption ${prefix+command}*`)
let { webp2mp4File } = require("./lib/uploader")
let media = await bayuamore.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
bayuamore.sendMessage(m.chat, { video: { url: webpToMp4.result }}, { quoted: m })
await fs.unlinkSync(media)
}
break
case "toptt": case "tovn": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!/video/.test(mime) && !/audio/.test(mime)) return setReply(`*Reply Audio/Video with caption ${prefix+command}*`)
if (!quoted) return setReply(`*Reply Audio/Video with caption ${prefix+command}*`)
let media = await quoted.download()
let { toPTT } = require("./lib/converter")
let audio = await toPTT(media, "mp4")
bayuamore.sendMessage(m.chat, { audio: audio, mimetype: "audio/mpeg", ptt: true, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, mediaType: 1, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}}, { quoted: m })
}
break
case "tts": case "gtts": case "say": {
if (cek("id", m.sender) == null) return setReply(mess.user)
let sp = "•"
if (!text.includes(" ")) return setReply(`*Example : ${prefix+command} kodebahasa text*\n\n${sp} af: Afrikaans,
${sp} sq: Albanian
${sp} ar: Arabic
${sp} hy: Armenian
${sp} ca: Catalan
${sp} zh: Chinese
${sp} zh-cn: Chinese (Mandarin/China)
${sp} zh-tw: Chinese (Mandarin/Taiwan)
${sp} zh-yue: Chinese (Cantonese)
${sp} hr: Croatian
${sp} cs: Czech
${sp} da: Danish
${sp} nl: Dutch
${sp} en: English
${sp} en-au: English (Australia)
${sp} en-uk: English (United Kingdom)
${sp} en-us: English (United States)
${sp} eo: Esperanto
${sp} fi: Finnish
${sp} fr: French
${sp} de: German
${sp} el: Greek
${sp} ht: Haitian Creole
${sp} hi: Hindi
${sp} hu: Hungarian
${sp} is: Icelandic
${sp} id: Indonesian
${sp} it: Italian
${sp} ja: Japanese
${sp} ko: Korean
${sp} la: Latin
${sp} lv: Latvian
${sp} mk: Macedonian
${sp} no: Norwegian
${sp} pl: Polish
${sp} pt: Portuguese
${sp} pt-br: Portuguese (Brazil)
${sp} ro: Romanian
${sp} ru: Russian
${sp} sr: Serbian
${sp} sk: Slovak
${sp} es: Spanish
${sp} es-es: Spanish (Spain)
${sp} es-us: Spanish (United States)
${sp} sw: Swahili
${sp} sv: Swedish
${sp} ta: Tamil
${sp} th: Thai
${sp} tr: Turkish
${sp} vi: Vietnamese
${sp} cy: Welsh`)
let kode = body.split(" ")[1]
let teks = body
.toLowerCase()
.replace(command + " ", "")
.replace(kode + " ", "")
let gtts = require("./scrape/gtts")(`${kode}`, teks)
let ranm = getRandom(".mp3")
let rano = getRandom(".ogg")
teks.length > 2000 ? setReply("Teks nya terlalu panjang") : gtts.save(ranm, teks, function () {
exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
fs.unlinkSync(ranm)
let buff = fs.readFileSync(rano)
if (err) return setReply(mess.error.api)
bayuamore.sendMessage(m.chat, { audio: buff, mimetype: "audio/mp4", ptt: true, contextInfo: { externalAdReply: { showAdAttribution: true, title: namabot, body: wm, previewType: `PHOTO`, thumbnail: thumb, sourceUrl: myig }}}, { quoted: m })
fs.unlinkSync(rano)
})
})
}
break
case "translate": {
if (cek("id", m.sender) == null) return setReply(mess.user)
const { translate } = require("@vitalets/google-translate-api")
let lang, text;
if (args.length >= 2) {
(lang = args[0]), (text = args.slice(1).join(" "))
} else if (m.quoted && m.quoted.text) {
(lang = args[0]), (text = m.quoted.text)
} else
return setReply(`*Example : ${prefix+command} id Selamat pagi*`)
let res = await translate(text, { to: lang, autoCorrect: true }).catch((_) => null)
if (!res) return setReply(`*Error : The language "${lang}" is not supported*`)
let gtts = require("./scrape/gtts")(`${lang}`, `${res.text}`)
let ranm = getRandom(".mp3")
let rano = getRandom(".ogg")
res.text.length > 10000 ? setReply("Teks nya terlalu panjang") : gtts.save(ranm, res.text, function () {
exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
fs.unlinkSync(ranm)
let buff = fs.readFileSync(rano)
if (err) return setReply(mess.error.api)
bayuamore.sendMessage(m.chat, { audio: buff, mimetype: "audio/mp4", ptt: true, contextInfo: { externalAdReply: { showAdAttribution: true, title: namabot, body: wm, previewType: `PHOTO`, thumbnail: thumb, sourceUrl: myig }}}, { quoted: m })
fs.unlinkSync(rano)
})
})
}
break
case "toonce": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!quoted) return setReply(`*Reply Gambar/Video yang ingin dijadikan 1 kali lihat.*`)
if (/image/.test(mime)) {
anuan = await bayuamore.downloadAndSaveMediaMessage(quoted)
bayuamore.sendMessage(m.chat, { image: { url: anuan }, viewOnce : true }, { quoted: m })
} else if (/video/.test(mime)) {
anuanuan = await bayuamore.downloadAndSaveMediaMessage(quoted)
bayuamore.sendMessage(m.chat, { video: { url: anuanuan }, viewOnce : true }, { quoted: m })
}
}
break
case "ttp": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!text) return setReply(`*Example : ${prefix+command} ${namaowner}*`)
let anu = await fg.ttp(text)
.then(res => bayuamore.sendImageAsSticker(m.chat, res.result, m, { packname: global.packname, author: global.author }))
.catch(console.error)
}
break
case "viewonce": {
if (cek("id", m.sender) == null) return setReply(mess.user)
if (!m.quoted) return setReply(`*Reply Gambar/Video yang ingin dilihat.*`)
if (m.quoted.mtype !== "viewOnceMessageV2") return setReply(`*Itu bukan pesan View-once.*`)
let msg = m.quoted.message
let type = Object.keys(msg)[0]
let media = await downloadContentFromMessage(msg[type], type == "imageMessage" ? "image" : "video")
let buffer = Buffer.from([])
for await (const chunk of media) {
buffer = Buffer.concat([buffer, chunk])
}
if (/video/.test(type)) {
return bayuamore.sendFile(m.chat, buffer, "media.mp4", msg[type].caption || "", m)
} else if (/image/.test(type)) {
return bayuamore.sendFile(m.chat, buffer, "media.jpg", msg[type].caption || "", m)
}
}
break
//━━━━━━━━━━━━━━━[ CASE SETTING ]━━━━━━━━━━━━━━━━━//
case "auto": {
if (!isCreator) return
if (args[0] == "recording") {
if (db.data.settings[botNumber].auto == "recording") return setReply(`*Mode ${command} ${args[0]} sudah aktif*`)
db.data.settings[botNumber].auto = "recording"
setReply(`*Sukses mengaktifkan mode ${command} ${args[0]}*`)
} else if (args[0] == "typing") {
if (db.data.settings[botNumber].auto == "typing") return setReply(`*Mode ${command} ${args[0]} sudah aktif*`)
db.data.settings[botNumber].auto = "typing"
setReply(`*Sukses mengaktifkan mode ${command} ${args[0]}*`)
} else if (args[0] == "available") {
if (db.data.settings[botNumber].auto == "available") return setReply(`*Mode ${command} ${args[0]} sudah aktif*`)
db.data.settings[botNumber].auto = "available"
setReply(`*Sukses mengaktifkan mode ${command} ${args[0]}*`)
} else if (args[0] == "unavailable") {
if (db.data.settings[botNumber].auto == "unavailable") return setReply(`*Mode ${command} ${args[0]} sudah aktif*`)
db.data.settings[botNumber].auto = "unavailable"
setReply(`*Sukses mengaktifkan mode ${command} ${args[0]}*`)
} else {
setReply(`*Example: ${prefix+command} available/recording/typing/unavailable*`)
}
}
break
case "autoread": {
if (!isCreator) return
if (args[0] == "on") {
if (db.data.settings[botNumber].autoread == true) return setReply(`*Mode ${command} sudah aktif*`)
db.data.settings[botNumber].autoread = true
setReply(`*Sukses mengaktifkan mode ${command}*`)
} else if (args[0] == "off") {
if (db.data.settings[botNumber].autoread == false) return setReply(`*Mode ${command} sudah dinonaktifkan*`)
db.data.settings[botNumber].autoread = false
setReply(`*Sukses menonaktifkan mode ${command}*`)
} else {
setReply(`*Example: ${prefix+command} on/off*`)
}
}
break
case "autosw": {
if (!isCreator) return
if (args[0] == "on") {
if (db.data.settings[botNumber].autosw == true) return setReply(`*Mode ${command} sudah aktif*`)
db.data.settings[botNumber].autosw = true
setReply(`*Sukses mengaktifkan mode ${command}*`)
} else if (args[0] == "off") {
if (db.data.settings[botNumber].autosw == false) return setReply(`*Mode ${command} sudah dinonaktifkan*`)
db.data.settings[botNumber].autosw = false
setReply(`*Sukses menonaktifkan mode ${command}*`)
} else {
setReply(`*Example: ${prefix+command} on/off*`)
}
}
break
case "block": {
if (!isCreator) return
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
if (listblock.includes(users)) return setReply(`*@${users.split("@")[0]} has been blocked*`)
await bayuamore.updateBlockStatus(users, "block").then((res) => setReply(`*Success blocking @${users.split("@")[0]}*`)).catch((err) => setReply(`*There is an error*`))
}
break
case "unblock": {
if (!isCreator) return
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
if (!listblock.includes(users)) return setReply(`*@${users.split("@")[0]} has been unblocked*`)
await bayuamore.updateBlockStatus(users, "unblock").then((res) => setReply(`*Success unblocking @${users.split("@")[0]}*`)).catch((err) => setReply(`*There is an error*`))
}
break
case "listblock": {
if (!isCreator) return
let teks = `*── 「 LIST BLOCK 」 ──*\n\n`
for (let x of listblock) {
teks += `◦ @${x.split("@")[0]}\n`
}
teks += `\n*Total Block : ${listblock.length} Users*`
setReply(teks)
}
break
case "boost": {
if (!isCreator) return
let start = `*Boosting the ${namabot}...*`
let boost = `${pickRandom(['[▒▒▒▒▒▒▒▒▒▒]'])}`
let boost2 = `${pickRandom(['[█▒▒▒▒▒▒▒▒▒]'])}`
let boost3 = `${pickRandom(['[██▒▒▒▒▒▒▒▒]'])}`
let boost4 = `${pickRandom(['[██████▒▒▒▒▒▒▒]'])}`
let boost5 = `${pickRandom(['[██████████▒▒▒]'])}`
let boost6 = `${pickRandom(['[████████████▒]'])}`
let boost7 = `${pickRandom(['[████████████]'])}`
await m.reply(start)
await m.reply(boost)
await m.reply(boost2)
await m.reply(boost3)
await m.reply(boost4)
await m.reply(boost5)
await m.reply(boost6)
await m.reply(boost7)
let old = performance.now()
let neww = performance.now()
let speed = `${neww - old}`
let finish = `*Sukses boost ${namabot}*\n\n*_Speed : ${speed} Second_*`
bayuamore.reply(m.chat, finish, m)
}
break
case "clearsrc": {
if (!isCreator) return
let files = fs.readdirSync("./src")
let data = files.splice("@BayuAmore", files.length - 1)
if (data.length == 0) return m.reply(`*${data.length} junk file detected*`)
m.reply(`*Deleted ${data.length} junk file*`)
for (let x of data) {
fs.unlinkSync("./src/" + x)
}
setTimeout(() => {
m.reply(`*Sukses delete ${data.length} junk file*`)
}, 3000)
}
break
case "get": {
if (!isCreator) return
if (!args[0]) return setReply(`*Example: ${prefix+command} https://s3.getstickerpack.com/storage/uploads/sticker-pack/blahaj-n-dino/sticker_1.png*`)
fetch(args[0])
.then((res) => res.text())
.then((bu) => {
setReply(bu)
})
}
break
case "getcase": {
if (!isCreator) return
if (!args[0]) return setReply(`*Example: ${prefix+command} menu*`)
setReply(getCase(args[0]))
}
break
case "getdb": {
if (!isCreator) return
setTimeout(() => {
let db = fs.readFileSync("./database/database.json")
bayuamore.sendMessage(m.chat, { document: db, mimetype: "application/json", fileName: "database.json", contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, mediaType: 1, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
}, 2000)
setReply(`*Sedang mengirim file...*`)
}
break
case "getfile": {
if (!isCreator) return
if (!text.includes("./")) return setReply(`*Example: ${prefix+command} ./package.json*`)
setTimeout(() => {
const file = fs.readFileSync(`${text}`)
bayuamore.sendMessage(m.chat, { document: file, mimetype: "application/bin", fileName: `${path.basename(text)}`, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, mediaType: 1, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
}, 2000)
setReply(`*Sedang mengirim file...*`)
}
break
case "getfolder": {
if (!isCreator) return
if (!text.includes("./")) return setReply(`*Example: ${prefix+command} ./src*`)
if (text.split("/")[1] == "node_modules" && !text.split("/")[1]) {
setReply(`*File melebihi batas yg ditentukan...*`)
} else {
setTimeout(() => {
fs.unlinkSync(`${text}.zip`)
}, 5000)
setTimeout(() => {
const file = fs.readFileSync(`${text}.zip`)
bayuamore.sendMessage(m.chat, { document: file, mimetype: "application/bin", fileName: `${path.basename(`${text}.zip`)}`, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, mediaType: 1, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
}, 3000)
setTimeout(() => {
setReply(`*Sedang mengirim file...*`)
}, 2000)
setTimeout(() => {
let qur = `zip -r ${text}.zip ${text}`
exec(qur, (err, stdout) => {})
}, 1000)
}
}
break
case "getpackage": {
if (!isCreator) return
const lala = JSON.parse(fs.readFileSync("./package.json"))
let nono = Object.entries(lala.dependencies)
let num = 1
let teks = `*Package.json*\n\n`
if (nono && nono.length > 0) {
for (let i of nono) {
teks += `${num++}. ${i[0]}: ${i[1]}\n`
}
setReply(teks)
} else {
setReply(`*No modules available...*`)
}
}
break
case "getscript": {
if (!isCreator) return
if (m.isGroup) return setReply(mess.private)
setReply(`*Sedang mengirim file...*`)
await sleep(2000)
const { execSync } = require("child_process")
const ls = (await execSync("ls")).toString().split("\n").filter(
(pe) =>
pe != "node_modules" &&
pe != "session" &&
pe != "package-lock.json" &&
pe != "yarn.lock" &&
pe != ""
);
const exec = await execSync(`zip -r bayuamorebot.zip ${ls.join(" ")}`)
bayuamore.sendMessage(m.chat, { document: await fs.readFileSync("./bayuamorebot.zip"), mimetype: "application/zip", fileName: "bayuamorebot.zip", contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, mediaType: 1, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
await execSync(`rm -rf bayuamorebot.zip`)
}
break
case "getsesi": {
if (!isCreator) return
setTimeout(() => {
let sesi = fs.readFileSync("./sessions/creds.json")
bayuamore.sendMessage(m.chat, { document: sesi, mimetype: "application/json", fileName: "creds.json", contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, mediaType: 1, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
}, 2000)
setReply(`*Sedang mengirim file...*`)
}
break
case "ip": {
if (!isCreator) return;
var http = require("http");
http.get({
'host': 'api.ipify.org',
'port': 80,
'path': '/'
}, function(resp) {
resp.on('data', function(ip) {
setReply("*── 「 IP PUBLIC 」 ──*\n\nIP Address : " + ip)
})
})
}
break
case "joingroup": case "joingc": {
if (!isCreator) return
if (!text) return setReply(`*Example: ${prefix+command} ${mygc}*`)
if (!isUrl(args[0]) && !args[0].includes("whatsapp.com")) return setReply(mess.error.lv)
let result = args[0].split("https://chat.whatsapp.com/")[1]
await bayuamore.groupAcceptInvite(result).then((res) => setReply(`*Success joined the group*`)).catch((err) => setReply(`*There is an error*`))
}
break
case "leavegroup": case "leavegc": {
if (!isCreator) return
if (!m.isGroup) {
if (!text) return setReply(`*Example: ${prefix+command} 120363026583642269@g.us*`)
if (!args[0].includes("@g.us")) return setReply(`*Example: ${prefix+command} 120363026583642269@g.us*`)
bayuamore.reply(args[0], `*${namabot} will leave the group*`, m)
await sleep(3000)
await bayuamore.groupLeave(args[0]).then((res) => setReply(`*Success left the group*`)).catch((err) => setReply(`*There is an error*`))
} else {
bayuamore.reply(from, `*${namabot} will leave the group*`, m)
await sleep(3000)
await bayuamore.groupLeave(m.chat)
}
}
break
case "owner": {
bayuamore.sendContact(m.chat, global.owner, m)
}
break
case "public": {
if (!isCreator) return
if (args[0] == "on") {
if (db.data.settings[botNumber].public == true) return setReply(`*Mode ${command} sudah aktif*`)
db.data.settings[botNumber].public = true
setReply(`*Sukses mengaktifkan mode ${command}*`)
} else if (args[0] == "off") {
if (db.data.settings[botNumber].public == false) return setReply(`*Mode ${command} sudah dinonaktifkan*`)
db.data.settings[botNumber].public = false
setReply(`*Sukses menonaktifkan mode ${command}*`)
} else {
setReply(`*Example: ${prefix+command} on/off*`)
}
}
break
case "restart": {
if (!isCreator) return
setReply(`*Restarting ${namabot}*`)
await sleep(3000)
process.send("reset")
}
break
case "setppbot": {
if (!isCreator) return
if (!quoted) return setReply(`*Reply/Send Image with caption ${prefix+command}*`)
if (!/image/.test(mime)) return setReply(`*Reply/Send Image with caption ${prefix+command}*`)
if (/webp/.test(mime)) return setReply(`*Reply/Send Image with caption ${prefix+command}*`)
var media = await bayuamore.downloadAndSaveMediaMessage(quoted)
try {
if (args[0] == "/full") {
const { generateProfilePicture } = require("./lib/simple")
var { img } = await generateProfilePicture(media)
await bayuamore.query({ tag: 'iq',  attrs: { to: botNumber, type:'set', xmlns: 'w:profile:picture' }, content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }]})
} else { await bayuamore.updateProfilePicture(botNumber, { url: media }) }
setReply(`*Success changed the bot profile photo*`)
} catch { setReply(`*Failed to change bot profile photo*`) }
}
break
case "setmenu": {
if (!isCreator) return
if (args[0] == "menu1") {
if (db.data.settings[botNumber].setmenu == "menu1") return setReply(`*Mode ${args[0]} sudah aktif*`)
db.data.settings[botNumber].setmenu = "menu1"
setReply(`*Sukses mengaktifkan mode ${args[0]}*`)
} else if (args[0] == "menu2") {
if (db.data.settings[botNumber].setmenu == "menu2") return setReply(`*Mode ${args[0]} sudah aktif*`)
db.data.settings[botNumber].setmenu = "menu2"
setReply(`*Sukses mengaktifkan mode ${args[0]}*`)
} else if (args[0] == "menu3") {
if (db.data.settings[botNumber].setmenu == "menu3") return setReply(`*Mode ${args[0]} sudah aktif*`)
db.data.settings[botNumber].setmenu = "menu3"
setReply(`*Sukses mengaktifkan mode ${args[0]}*`)
} else {
setReply(`*Example: ${prefix+command} menu1*

*Options:*
• Menu1
• Menu2
• Menu3`)
}
}
break
case "setreply": {
if (!isCreator) return
if (args[0] == "web1") {
if (db.data.settings[botNumber].replytype == "web1") return setReply(`*[${namabot}] ${command} ${args[0]} sudah aktif*`)
db.data.settings[botNumber].replytype = "web1"
setReply(`*[${namabot}] Sukses mengganti ${command} ke ${args[0]}*`)
} else if (args[0] == "web2") {
if (db.data.settings[botNumber].replytype == "web2") return setReply(`*[${namabot}] ${command} ${args[0]} sudah aktif*`)
db.data.settings[botNumber].replytype = "web2"
setReply(`*[${namabot}] Sukses mengganti ${command} ke ${args[0]}*`)
} else if (args[0] == "web3") {
if (db.data.settings[botNumber].replytype == "web3") return setReply(`*[${namabot}] ${command} ${args[0]} sudah aktif*`)
db.data.settings[botNumber].replytype = "web3"
setReply(`*[${namabot}] Sukses mengganti ${command} ke ${args[0]}*`)
} else if (args[0] == "mess1") {
if (db.data.settings[botNumber].replytype == "mess1") return setReply(`*[${namabot}] ${command} ${args[0]} sudah aktif*`)
db.data.settings[botNumber].replytype = "mess1"
setReply(`*[${namabot}] Sukses mengganti ${command} ke ${args[0]}*`)
} else if (args[0] == "mess2") {
if (db.data.settings[botNumber].replytype == "mess2") return setReply(`*[${namabot}] ${command} ${args[0]} sudah aktif*`)
db.data.settings[botNumber].replytype = "mess2"
setReply(`*[${namabot}] Sukses mengganti ${command} ke ${args[0]}*`)
} else if (args[0] == "mess3") {
if (db.data.settings[botNumber].replytype == "mess3") return setReply(`*[${namabot}] ${command} ${args[0]} sudah aktif*`)
db.data.settings[botNumber].replytype = "mess3"
setReply(`*[${namabot}] Sukses mengganti ${command} ke ${args[0]}*`)
} else {
setReply(`*Penggunaan: ${prefix+command} web1*

Option:
web1
web2
web3
mess1
mess2
mess3`)
}
}
break
case "shutdown": {
if (!isCreator) return setReply(mess.owner)
setReply(`*Currently shutting down the ${namabot}*`)
await sleep(3000)
process.exit()
}
break
/*⫹⫺ ╳╶╼╶╶╶╶┈ ⎝ DEFAULT COMMAND ⎞ ┈╴╴╴╴╾╴╳ ⫹⫺*/
default:
if ((m.mtype === "groupInviteMessage" || budy.startsWith("https://chat") || budy.startsWith("Buka tautan ini")) && !m.isBaileys && !m.isGroup) {
bayuamore.sendMessage(m.chat, { text: `*Mau invite ${namabot} ke Group kamu ? Silahkan ketik #Join*`, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, mediaType: 1, title: namabot, body: wm, previewType: `PHOTO`, containsAutoReply: true, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}}, { quoted: m })
}
if (budy.startsWith("=>")) {
if (!isCreator) return
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)
}
return m.reply(bang)
}
try {
m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
setReply(String(e))
}
}
if (budy.startsWith(">")) {
if (!isCreator) return
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== "string")
evaled = require("util").inspect(evaled)
await m.reply(evaled)
} catch (err) {
await m.reply(String(err))
}
}
if (budy.startsWith("$")) {
if (!isCreator) return
exec(budy.slice(2), (err, stdout) => {
if (err) return m.reply(err)
if (stdout) return m.reply(stdout)
})
}
}} catch (err) {
console.log(color("[ERROR]", "red"), err)
const isGroup = m.key.remoteJid.endsWith("@g.us")
const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const moment = require("moment-timezone");
const jam = moment.tz("asia/jakarta").format("HH:mm:ss");
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let kon_erorr = { "tanggal": tanggal, "jam": jam, "error": err, "user": sender }
db_error.push(kon_erorr)
fs.writeFileSync("./database/error.json", JSON.stringify(db_error))
}}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})