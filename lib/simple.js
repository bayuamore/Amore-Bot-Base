require("../handler/module")
const { sizeFormatter } = require("human-readable");
/*const { proto, delay, getContentType } = global.baileys;
const {
default:
_makeWaSocket,
makeWALegacySocket,
downloadContentFromMessage,
jidDecode,
areJidsSameUser,
generateForwardMessageContent,
generateWAMessageFromContent,
WAMessageStubType
} = global.baileys;
const axios = require("axios");
const chalk = require("chalk");
const Crypto = require("crypto");
const { defaultMaxListeners } = require("stream");
const FormData = require("form-data");
const fs = require("fs");
const Jimp = require("jimp");
const moment = require("moment-timezone");
const spin = require("spinnies");
const util = require("util");*/

function nullish(args) {
return !(args !== null && args !== undefined)
}

exports.updateNameToDb = (contacts) => {
if (!contacts) return
for (let contact of contacts) {
let id = bayuamore.decodeJid(contact.id)
if (!id) continue
let chats = bayuamore.contacts[id]
if (!chats) chats = { id }
let chat = {
...chats,
...({
...contact, id, ...(id.endsWith('@g.us') ?
{ subject: contact.subject || chats.subject || '' } :
{ name: contact.notify || chats.name || chats.notify || '' })
} || {})
}
bayuamore.contacts[id] = chat
}
}

const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)

exports.unixTimestampSeconds = unixTimestampSeconds

exports.generateMessageTag = (epoch) => {
let tag = (0, exports.unixTimestampSeconds)().toString();
if (epoch)
tag += '.--' + epoch;
return tag;
}

exports.processTime = (timestamp, now) => {
return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

exports.getBuffer = async (url, options) => {
try {
options ? options : {}
const res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (err) {
return err
}
}

exports.reSize = (buffer, ukur1, ukur2) => {
return new Promise(async(resolve, reject) => {
var baper = await Jimp.read(buffer);
var ab = await baper.resize(ukur1, ukur2).getBufferAsync(Jimp.MIME_JPEG)
resolve(ab)
})
}

exports.getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`
}

exports.sleep = async (ms) => {
return new Promise(resolve => setTimeout(resolve, ms));
}

const spinner = { 
"interval": 500,
"frames": [
"🅘",
"🅡",
"🅕",
"🅐",
"🅝",
"🅑",
"🅐", 
"🅢",
"🅔"
]}

let globalSpinner;

const getGlobalSpinner = (disableSpins = false) => {
if(!globalSpinner) globalSpinner = new spin({ color: "blue", succeedColor: "green", spinner, disableSpins});
return globalSpinner;
}

spins = getGlobalSpinner(false)

exports.start = (id, text) => {
spins.add(id, { text: text })
}

exports.info = (id, text) => {
spins.update(id, { text: text })
}

exports.success = (id, text) => {
spins.succeed(id, { text: text })
}

exports.close = (id, text) => {
spins.fail(id, { text: text })
}

/*exports.hitungmundur = async(bulan, tanggal) => {
let from = new Date(`${bulan} ${tanggal}, 2023 00:00:00`).getTime();
let now = Date.now();
let distance = from - now;
let days = Math.floor(distance / (1000 * 60 * 60 * 24));
let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
let seconds = Math.floor((distance % (1000 * 60)) / 1000);
return days + "Hari " + hours + "Jam " + minutes + "Menit " + seconds + "Detik"
}*/

exports.bytesToSize = (bytes, decimals = 2) => {
if (bytes === 0) return '0 Bytes';
const k = 1024;
const dm = decimals < 0 ? 0 : decimals;
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const i = Math.floor(Math.log(bytes) / Math.log(k));
return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

exports.checkBandwidth = async() => {
let ind = 0;
let out = 0;
for (let i of await require("node-os-utils").netstat.stats()) {
ind += parseInt(i.inputBytes);
out += parseInt(i.outputBytes);
}
return {
download: exports.bytesToSize(ind),
upload: exports.bytesToSize(out),
};
}

exports.runtime = function(seconds) {
seconds = Number(seconds);
var d = Math.floor(seconds / (3600 * 24));
var h = Math.floor(seconds % (3600 * 24) / 3600);
var m = Math.floor(seconds % 3600 / 60);
var s = Math.floor(seconds % 60);
var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.fetchJson = async (url, options) => {
try {
options ? options : {}
const res = await axios({
method: 'GET',
url: url,
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
},
...options
})
return res.data
} catch (err) {
return err
}
}

exports.getGroupAdmins = async(participants) => {
let admins = []
for (let i of participants) {
i.admin === "superadmin" ? admins.push(i.id) :  i.admin === "admin" ? admins.push(i.id) : ''
}
return admins || []
}

exports.updateDatabase = (jenis, after) => {
const server = JSON.parse(fs.readFileSync("./database/server.json"))
const grups = JSON.parse(fs.readFileSync("./database/grups.json"))
if (jenis == "url") {
server[0].url = after
fs.writeFileSync("./database/server.json", JSON.stringify(server))
return "success"
} else if (jenis == "username") {
server[0].username = after
fs.writeFileSync("./database/server.json", JSON.stringify(server))
return "success"
} else if (jenis == "password") {
server[0].password = after
fs.writeFileSync("./database/server.json", JSON.stringify(server))
return "success"
} else if (jenis == "ip") {
server[0].ip = after
fs.writeFileSync("./database/server.json", JSON.stringify(server))
return "success"
} else if (jenis == "domain") {
server[0].domain = after
fs.writeFileSync("./database/server.json", JSON.stringify(server))
return "success"
} else if (jenis == "grup") {
grups.push(after)
fs.writeFileSync("./database/grups.json", JSON.stringify(grups))
return "success"
} else {
return "failed"
}
}

exports.msToDate = async(mse) =>{
temp = mse
days = Math.floor(mse / (24 * 60 * 60 * 1000));
daysms = mse % (24 * 60 * 60 * 1000);
hours = Math.floor((daysms) / (60 * 60 * 1000));
hoursms = mse % (60 * 60 * 1000);
minutes = Math.floor((hoursms) / (60 * 1000));
minutesms = mse % (60 * 1000);
sec = Math.floor((minutesms) / (1000));
return days + " Days " + hours + " Hours " + minutes + " Minutes";
}

exports.isUrl = async (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

exports.getTime = (format, date) => {
if (date) {
return moment(date).locale('id').format(format)
} else {
return moment.tz('Asia/Jakarta').locale('id').format(format)
}
}

exports.formatDate = (n, locale = 'id') => {
let d = new Date(n)
return d.toLocaleDateString(locale, {
weekday: 'long',
day: 'numeric',
month: 'long',
year: 'numeric',
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
}

exports.tanggal = (numer) => {
myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum’at','Sabtu'];
var tgl = new Date(numer);
var day = tgl.getDate()
bulan = tgl.getMonth()
var thisDay = tgl.getDay(),
thisDay = myDays[thisDay];
var yy = tgl.getYear()
var year = (yy < 1000) ? yy + 1900 : yy;
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
return`${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}

exports.formatp = sizeFormatter({
std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
decimalPlaces: 2,
keepTrailingZeroes: false,
render: (literal, symbol) => `${literal} ${symbol}B`,
})

exports.generateProfilePicture = async (buffer) => {
const jimp = await Jimp.read(buffer)
const min = jimp.getWidth()
const max = jimp.getHeight()
const cropped = jimp.crop(0, 0, min, max)
return {
img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
}
}

exports.getSizeMedia = (path) => {
return new Promise((resolve, reject) => {
if (/http/.test(path)) {
axios.get(path)
.then((res) => {
let length = parseInt(res.headers['content-length'])
let size = exports.bytesToSize(length, 3)
if(!isNaN(length)) resolve(size)
})
} else if (Buffer.isBuffer(path)) {
let length = Buffer.byteLength(path)
let size = exports.bytesToSize(length, 3)
if(!isNaN(length)) resolve(size)
} else {
reject("error gatau apah")
}
})
}

exports.reSize = (buffer, ukur1, ukur2) => {
return new Promise(async(resolve, reject) => {
var baper = await Jimp.read(buffer);
var ab = await baper.resize(ukur1, ukur2).getBufferAsync(Jimp.MIME_JPEG)
resolve(ab)
})
}

exports.getCase = (cases) => {
let data = fs.readFileSync("./bayuamore.js")
try {
return "case "+`"${cases}"`+data.toString().split("case \""+cases+"\"")[1].split("break")[0]+"break"
} catch {
return "Case tidak ditemukan!"
}
}

/*
 * Serialize Message
 * @param {WAConnection} conn 
 * @param {Object} m 
 * @param {store} store 
 */
 
exports.smsg = (conn, m, store) => {
if (!m) return m
/*
 *
 * @type {import('@adiwajshing/baileys').proto.WebMessageInfo}
 */
let M = proto.WebMessageInfo
m = M.fromObject(m)
if (m.key) {
m.id = m.key.id
m.isBaileys = m.id && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || false
m.chat = conn.decodeJid(m.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
m.isGroup = m.chat.endsWith('@g.us')
m.sender = conn.decodeJid(m.key.fromMe && conn.user.id || m.participant || m.key.participant || m.chat || '')
m.fromMe = m.key.fromMe || areJidsSameUser(m.sender, conn.user.id)
}
if (m.message) {
let mtype = Object.keys(m.message)
m.mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype[0]) && mtype[0]) || // Sometimes message in the front
(mtype.length >= 3 && mtype[1] !== 'messageContextInfo' && mtype[1]) || // Sometimes message in midle if mtype length is greater than or equal to 3!
mtype[mtype.length - 1] // common case
m.msg = m.message[m.mtype]
if (m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) m.chat = (m.key.remoteJid !== 'status@broadcast' && m.key.remoteJid) || m.sender
if (m.mtype == 'protocolMessage' && m.msg.key) {
if (m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
if (!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
m.msg.key.fromMe = conn.decodeJid(m.msg.key.participant) === conn.decodeJid(conn.user.id)
if (!m.msg.key.fromMe && m.msg.key.remoteJid === conn.decodeJid(conn.user.id)) m.msg.key.remoteJid = m.sender
}
m.text = m.msg.text || m.msg.caption || m.msg.contentText || m.msg || ''
if (typeof m.text !== 'string') {
if ([
'protocolMessage',
'messageContextInfo',
'stickerMessage',
'audioMessage',
'senderKeyDistributionMessage'
].includes(m.mtype)) m.text = ''
else m.text = m.text.selectedDisplayText || m.text.hydratedTemplate?.hydratedContentText || m.text
}
m.mentionedJid = m.msg?.contextInfo?.mentionedJid?.length && m.msg.contextInfo.mentionedJid || []
let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage ? m.msg.contextInfo.quotedMessage : null
if (m.quoted) {
let type = Object.keys(m.quoted)[0]
m.quoted = m.quoted[type]
if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
m.quoted.mtype = type
m.quoted.id = m.msg.contextInfo.stanzaId
m.quoted.chat = conn.decodeJid(m.msg.contextInfo.remoteJid || m.chat || m.sender)
m.quoted.isBaileys = m.quoted.id && m.quoted.id.length === 16 || false
m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant)
m.quoted.fromMe = m.quoted.sender === conn.user.jid
m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.contentText || ''
m.quoted.name = conn.getName(m.quoted.sender)
m.quoted.mentionedJid = m.quoted.contextInfo?.mentionedJid?.length && m.quoted.contextInfo.mentionedJid || []
let vM = m.quoted.fakeObj = M.fromObject({
key: {
fromMe: m.quoted.fromMe,
remoteJid: m.quoted.chat,
id: m.quoted.id
},
message: quoted,
...(m.isGroup ? { participant: m.quoted.sender } : {})
})
m.getQuotedObj = m.getQuotedMessage = async () => {
if (!m.quoted.id) return null
let q = M.fromObject(await conn.loadMessage(m.quoted.id) || vM)
return smsg(conn, q)
}
if (m.quoted.url || m.quoted.directPath) m.quoted.download = (saveToFile = false) => conn.downloadMediaMessage(m.quoted, m.quoted.mtype.replace(/message/i, ''), saveToFile)
/*
 *
 * Reply to quoted message
 * @param {String|Object} text
 * @param {String|false} chatId
 * @param {Object} options
 */
m.quoted.reply = (text, chatId, options) => conn.reply(chatId ? chatId : m.chat, text, vM, options)
/*
 *
 * Copy quoted message
 */
m.quoted.copy = () => smsg(conn, M.fromObject(M.toObject(vM)))
/*
 *
 * Forward quoted message
 * @param {String} jid
 *  @param {Boolean} forceForward
 */
m.quoted.forward = (jid, forceForward = false) => conn.forwardMessage(jid, vM, forceForward)
/*
 *
 * Exact Forward quoted message
 * @param {String} jid
 * @param {Boolean|Number} forceForward
 * @param {Object} options
 */
m.quoted.copyNForward = (jid, forceForward = true, options = {}) => conn.copyNForward(jid, vM, forceForward, options)
/*
 *
 * Modify quoted Message
 * @param {String} jid
 * @param {String} text
 * @param {String} sender
 * @param {Object} options
 */
m.quoted.cMod = (jid, text = '', sender = m.quoted.sender, options = {}) => conn.cMod(jid, vM, text, sender, options)
/*
 *
 * Delete quoted message
 */
m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key })
}
}
m.name = !nullish(m.pushName) && m.pushName || conn.getName(m.sender)
if (m.msg && m.msg.url) m.download = (saveToFile = false) => conn.downloadMediaMessage(m.msg, m.mtype.replace(/message/i, ''), saveToFile)
/*
 *
 * Reply to this message
 * @param {String|Object} text
 * @param {String|false} chatId
 * @param {Object} options
 */
m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? conn.sendMedia(chatId, text, 'file', '', m, { ...options }) : conn.sendText(chatId, text, m, { ...options })
/*
 *
 * Copy this message
 */
m.copy = () => smsg(conn, M.fromObject(M.toObject(m)))
/*
 *
 * Forward this message
 * @param {String} jid
 * @param {Boolean} forceForward
 */
m.forward = (jid = m.chat, forceForward = false) => conn.copyNForward(jid, m, forceForward)
/*
 *
 * Exact Forward this message
 * @param {String} jid
 * @param {Boolean} forceForward
 * @param {Object} options
 */
m.copyNForward = (jid = m.chat, forceForward = true, options = {}) => conn.copyNForward(jid, m, forceForward, options)
/*
 *
 * Modify this Message
 * @param {String} jid 
 * @param {String} text 
 * @param {String} sender 
 * @param {Object} options 
 */
m.cMod = (jid, text = '', sender = m.sender, options = {}) => conn.cMod(jid, m, text, sender, options)
/*
 *
 * Delete this message
 */
m.delete = () => conn.sendMessage(m.chat, { delete: m.key })

try {
if (m.msg && m.mtype == 'protocolMessage' && m.msg.key) conn.ev.emit('message.delete', m.msg.key)
} catch (e) {
console.error(e)
}
return m
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})