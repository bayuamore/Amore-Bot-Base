require("./handler/global");
const NodeCache = require("node-cache");
const msgRetryCounterCache = new NodeCache()
const { parsePhoneNumber } = require("libphonenumber-js");
//━━━━━━━━━━━━━━━[ BAYU AMORE LIBRARY ]━━━━━━━━━━━━━━━━━//
const { color, bgcolor } = require("./lib/color");
const logging = require("./lib/logging");
const { open } = require("./lib/connections");
const { toAudio, toPTT, toVideo } = require("./lib/converter");
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, writeExif } = require("./lib/exif");
const { smsg, getBuffer, fetchJson, TelegraPh, getSizeMedia, reSize, start, success, await, sleep, updateNameToDb } = require("./lib/simple");
//━━━━━━━━━━━━━━━[ CONST PAIRING CODE ]━━━━━━━━━━━━━━━━━//
const usePairingCode = true
const botNumber = global.nomorbot;

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

const store = makeInMemoryStore({
logger: pino().child({
level: "silent",
stream: "store"
})
});
//━━━━━━━━━━━━━━━[ CONST GLOBAL DATABASE ]━━━━━━━━━━━━━━━━━//
var low
try {
low = require("lowdb")
} catch (e) {
low = require("./lib/lowdb")
}

const { Low, JSONFile } = low
const mongoDB = require("./lib/mongoDB")

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ? new mongoDB(opts['db']) : new JSONFile(`database/database.json`))
global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
if (global.db.data !== null) return
global.db.READ = true
await global.db.read()
global.db.READ = false
global.db.data = {
users: {},
group: {},
chats: {},
database: {},
game: {},
settings: {},
donate: {},
others: {},
sticker: {},
anonymous: {},
...(global.db.data || {})
}
global.db.chain = _.chain(global.db.data)
}

loadDatabase()

if (global.db) setInterval(async () => {
if (global.db.data) await global.db.write()
}, 30 * 1000)
//━━━━━━━━━━━━━━━[ START PAIRING CODE ]━━━━━━━━━━━━━━━━━//
async function startBayuAmore() {
const { state, saveCreds } = await useMultiFileAuthState(global.sessionName)
const bayuamore = BayuAmoreConnect({
logger: pino({ level: "silent" }),
printQRInTerminal: !usePairingCode,
auth: state,
browser: ['Chrome (Linux)', '', '']
});
if(usePairingCode && !bayuamore.authState.creds.registered) {
const phoneNumber = await question('Masukan Nomer Yang Aktif Awali Dengan 62:\n');
const code = await bayuamore.requestPairingCode(phoneNumber.trim())
console.log(`Pairing code: ${code}`)
}

store.bind(bayuamore.ev)
//━━━━━━━━━━━━━━━[ BAYU AMORE MESSAGE UPSERT ]━━━━━━━━━━━━━━━━━//
bayuamore.ev.on("messages.upsert", async (chatUpdate) => {
try {
mek = chatUpdate.messages[0]
if (!mek.message) return
if (mek.key.remoteJid === "status@broadcast") {
if (!db.data.settings[botNumber].autosw) return
let mt = getContentType(mek.message)
await bayuamore.readMessages([mek.key])
console.log(/protocolMessage/i.test(mt) ? `Stories Deleted : ${mek.pushName} @${mek.key.participant.split("@")[0]}` : `Stories Viewed : ${mek.pushName} @${mek.key.participant.split("@")[0]}`)
}
if (!mek.message) return
mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message
if (mek.key.id.startsWith("BAE5") && mek.key.id.length === 16) return
m = smsg(bayuamore, mek, store)
require("./bayuamore")(bayuamore, m, chatUpdate, store)
} catch (err) { console.log(err) }
})
//━━━━━━━━━━━━━━━[ BAYU AMORE PARTICIPANTS UPDATE ]━━━━━━━━━━━━━━━━━//
/*bayuamore.ev.on('group-participants.update', async (anu) => {
console.log(anu)
try {
let metadata = await bayuamore.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
// Get Profile Picture
try {
ppuser = await bayuamore.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://tinyurl.com/yx93l6da'
}
// Get Profile Group
try {
ppgroup = await bayuamore.profilePictureUrl(anu.id, 'image')
} catch {
ppgroup = 'https://tinyurl.com/yx93l6da'
}
memb = metadata.participants.length
bayuamoreWlcm = await getBuffer(ppuser)
bayuamoreLft = await getBuffer(ppuser)
if (anu.action == 'add') {
const bayuamorebuffer = await getBuffer(ppuser)
let bayuamoreName = num
bayuamorebody = `Thank you @${bayuamoreName.split("@")[0]} for joining this Group, please read the Description First!`
bayuamore.sendMessage(anu.id, { text: bayuamorebody, contextInfo: { mentionedJid:[num], externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, title: namabot, body: `Group Notifications`, previewType: `PHOTO`, containsAutoReply: true, mediaType: 1, thumbnail: bayuamoreWlcm, mediaUrl: myig, sourceUrl: myig }}})
} else if (anu.action == 'remove') {
const bayuamorebuffer = await getBuffer(ppuser)
let bayuamoreName = num
bayuamorebody = `@${bayuamoreName.split("@")[0]} Left from this Group, Sayonara & please dont back!`
bayuamore.sendMessage(anu.id, { text: bayuamorebody, contextInfo: { mentionedJid:[num], externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, title: namabot, body: `Group Notifications`, previewType: `PHOTO`, containsAutoReply: true, mediaType: 1, thumbnail: bayuamoreLft, mediaUrl: myig, sourceUrl: myig }}})
} else if (anu.action == 'promote') {
const bayuamorebuffer = await getBuffer(ppuser)
let bayuamoreName = num
bayuamorebody = `𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘀 🎉 @${bayuamoreName.split("@")[0]}, you have been Promoted to Admin 🥳`
bayuamore.sendMessage(anu.id, { text: bayuamorebody, contextInfo: { mentionedJid:[num], externalAdReply: { showAdAttribution: true, containsAutoReply: true, title: namabot, body: `Group Notifications`, previewType: `PHOTO`, thumbnail: bayuamoreWlcm, sourceUrl: mygc }}})
} else if (anu.action == 'demote') {
const bayuamorebuffer = await getBuffer(ppuser)
let bayuamoreName = num
bayuamorebody = `𝗢𝗼𝗽𝘀 ‼️ @${bayuamoreName.split("@")[0]}, you have been Demoted from Admin 😄`
bayuamore.sendMessage(anu.id, { text: bayuamorebody, contextInfo: { mentionedJid:[num], externalAdReply: { showAdAttribution: true, containsAutoReply: true, title: namabot, body: `Group Notifications`, previewType: `PHOTO`, thumbnail: bayuamoreLft, sourceUrl: mygc }}})
}
}
} catch (err) {
console.log(err)
}
})*/

bayuamore.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
}
else return jid
}

if (bayuamore.user && bayuamore.user.id) bayuamore.user.jid = bayuamore.decodeJid(bayuamore.user.id)

bayuamore.chats = {}
bayuamore.contacts = {}
options = {}
//━━━━━━━━━━━━━━━[ CONST CONNECTION ]━━━━━━━━━━━━━━━━━//
bayuamore.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === "connecting") {
logging("info", "Connection", "Connecting");
} else if (update.connection === "open" || update.receivedPendingNotifications === "true") {
open(bayuamore);
bayuamore.sendMessage(`${nomorowner}@s.whatsapp.net`, { text: `*Terhubung dengan ${bayuamore.user.name} menggunakan WaSocket...*`, contextInfo: { externalAdReply: { showAdAttribution: true, renderLargerThumbnail: true, mediaType: 1, title: namabot, body: `WhatsApp Bot Assistant`, previewType: `PHOTO`, containsAutoReply: true, thumbnail: thumb, mediaUrl: myig, sourceUrl: myig }}})
} else if (connection === "close") {
let reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); bayuamore.logout(); }
else if (reason === DisconnectReason.connectionClosed) { console.log(`Connection closed, reconnecting...`); startBayuAmore(); }
else if (reason === DisconnectReason.connectionLost) { console.log(`Connection Lost from Server, reconnecting...`); startBayuAmore(); }
else if (reason === DisconnectReason.connectionReplaced) { console.log(`Connection Replaced, Another New Session Opened, reconnecting...`); startBayuAmore(); }
else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); bayuamore.logout(); }
else if (reason === DisconnectReason.restartRequired) { console.log(`Restart Required, Restarting...`); startBayuAmore(); }
else if (reason === DisconnectReason.timedOut) { console.log(`Connection TimedOut, Reconnecting...`); startBayuAmore(); }
else if (reason === DisconnectReason.Multidevicemismatch) { console.log(`Multi device mismatch, please scan again.`); bayuamore.logout(); }
else bayuamore.end(`Unknown DisconnectReason: ${reason}|${connection}`)
}
})
//━━━━━━━━━━━━━━━[ CONST EV ON ]━━━━━━━━━━━━━━━━━//
bayuamore.ev.on('creds.update', saveCreds)
bayuamore.ev.on('contacts.upsert', updateNameToDb)
bayuamore.ev.on('groups.update', updateNameToDb)

bayuamore.serializeM = (m) => smsg(bayuamore, m, store)

bayuamore.ev.on('contacts.update', update => {
for (let contact of update) {
let id = bayuamore.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

bayuamore.chatRead = async (jid, participant, messageID) => {
return await bayuamore.sendReadReceipt(jid, participant, [messageID])
}

bayuamore.clockString = (ms) => {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h + ' Jam ', m + ' Menit ', s + ' Detik'].map(v => v.toString().padStart(2, 0)).join(' ')
}

bayuamore.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await bayuamore.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
return waMessage
}

bayuamore.delay = (ms) => {
return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

bayuamore.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

bayuamore.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

bayuamore.filter = (text) => {
let mati = ["q", "w", "r", "t", "y", "p", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"]
if (/[aiueo][aiueo]([qwrtypsdfghjklzxcvbnm])?$/i.test(text)) return text.substring(text.length - 1)
else {
let res = Array.from(text).filter(v => mati.includes(v))
let resu = res[res.length - 1]
for (let huruf of mati) {
if (text.endsWith(huruf)) {
resu = res[res.length - 2]
}
}
let misah = text.split(resu)
return resu + misah[misah.length - 1]
}
}

bayuamore.format = (...args) => {
return util.format(...args)
}

bayuamore.getBusinessProfile = async (jid) => {
const results = await bayuamore.query({
tag: 'iq',
attrs: {
to: 's.whatsapp.net',
xmlns: 'w:biz',
type: 'get'
},
content: [{
tag: 'business_profile',
attrs: { v: '244' },
content: [{
tag: 'profile',
attrs: { jid }
}]
}]
})
const profiles = getBinaryNodeChild(getBinaryNodeChild(results, 'business_profile'), 'profile')
if (!profiles) return {} // if not bussines
const address = getBinaryNodeChild(profiles, 'address')
const description = getBinaryNodeChild(profiles, 'description')
const website = getBinaryNodeChild(profiles, 'website')
const email = getBinaryNodeChild(profiles, 'email')
const category = getBinaryNodeChild(getBinaryNodeChild(profiles, 'categories'), 'category')
return {
jid: profiles.attrs?.jid,
address: address?.content.toString(),
description: description?.content.toString(),
website: website?.content.toString(),
email: email?.content.toString(),
category: category?.content.toString(),
}
}

bayuamore.getFile = async (PATH, returnAsFilename) => {
let res, filename
const data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,` [1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
const type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'
}
if (data && returnAsFilename && !filename)(filename = path.join(__dirname, './src/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
return {
res,
filename,
...type,
data,
deleteFile() {
return filename && fs.promises.unlink(filename)
}
}
}

bayuamore.getName = (jid, withoutContact = false) => {
id = bayuamore.decodeJid(jid)
withoutContact = bayuamore.withoutContact || withoutContact
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = bayuamore.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === bayuamore.decodeJid(bayuamore.user.id) ?
bayuamore.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

bayuamore.insertAllGroup = async() => {
const groups = await bayuamore.groupFetchAllParticipating().catch(_ => null) || {}
for (const group in groups) bayuamore.chats[group] = { ...(bayuamore.chats[group] || {}), id: group, subject: groups[group].subject, isChats: true, metadata: groups[group] }
return bayuamore.chats
}

bayuamore.inspectLink = async (code) => {
const extractGroupInviteMetadata = (content) => {
const group = getBinaryNodeChild(content, "group");
const descChild = getBinaryNodeChild(group, "description");
let desc, descId;
if (descChild) {
desc = getBinaryNodeChild(descChild, "body").content.toString();
descId = descChild.attrs.id;
}
const groupId = group.attrs.id.includes("@") ? group.attrs.id : group.attrs.id + "@g.us";
const metadata = {
id: groupId,
subject: group.attrs.subject || "Tidak ada",
creator: group.attrs.creator || "Tidak terdeteksi",
creation: group.attrs.creation || "Tidak terdeteksi",
desc,
descId,
};
return metadata;
}
let results = await bayuamore.query({
tag: "iq",
attrs: {
type: "get",
xmlns: "w:g2",
to: "@g.us",
},
content: [{ tag: "invite", attrs: { code } }],
});
return extractGroupInviteMetadata(results);
}

bayuamore.join = (arr) => {
let construct = []
for (let i = 0; i < arr.length; i++) {
construct = construct.concat(arr[i])
}
return construct
}

bayuamore.loadMessage = (messageID) => {
return Object.entries(bayuamore.chats)
.filter(([_, { messages }]) => typeof messages === 'object')
.find(([_, { messages }]) => Object.entries(messages)
.find(([k, v]) => (k === messageID || v.key?.id === messageID)))
?.[1].messages?.[messageID]
}

bayuamore.logger = {
...bayuamore.logger,
info(...args) { console.log(chalk.bold.rgb(57, 183, 16)(`INFO [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.cyan(...args)) },
error(...args) { console.log(chalk.bold.rgb(247, 38, 33)(`ERROR [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.rgb(255, 38, 0)(...args)) },
warn(...args) { console.log(chalk.bold.rgb(239, 225, 3)(`WARNING [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.keyword('orange')(...args)) }
}

bayuamore.msToDate = (ms) => {
let days = Math.floor(ms / (24 * 60 * 60 * 1000))
let daysms = ms % (24 * 60 * 60 * 1000)
let hours = Math.floor((daysms) / (60 * 60 * 1000))
let hoursms = ms % (60 * 60 * 1000)
let minutes = Math.floor((hoursms) / (60 * 1000))
let minutesms = ms % (60 * 1000)
let sec = Math.floor((minutesms) / (1000))
return days + " Hari " + hours + " Jam " + minutes + " Menit"
}

bayuamore.msToHour = (ms) => {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
return [h + ' Jam '].map(v => v.toString().padStart(2, 0)).join(' ')
}

bayuamore.msToMinute = (ms) => {
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
return [m + ' Menit '].map(v => v.toString().padStart(2, 0)).join(' ')
}

bayuamore.msToSecond = (ms) => {
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [s + ' Detik'].map(v => v.toString().padStart(2, 0)).join(' ')
}

bayuamore.msToTime = (ms) => {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h + ' Jam ', m + ' Menit ', s + ' Detik'].map(v => v.toString().padStart(2, 0)).join(' ')
}

bayuamore.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

bayuamore.pickRandom = (list) => {
return list[Math.floor(list.length * Math.random())]
}

bayuamore.reply = async (jid, text, quoted, options = {}) => bayuamore.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })

bayuamore.saveName = async (id, name = '') => {
if (!id) return
id = bayuamore.decodeJid(id)
let isGroup = id.endsWith('@g.us')
if (id in bayuamore.contacts && bayuamore.contacts[id][isGroup ? 'subject' : 'name'] && id in bayuamore.chats) return
let metadata = {}
if (isGroup) metadata = await bayuamore.groupMetadata(id)
let chat = { ...(bayuamore.contacts[id] || {}), id, ...(isGroup ? { subject: metadata.subject, desc: metadata.desc } : { name }) }
bayuamore.contacts[id] = chat
bayuamore.chats[id] = chat
}

bayuamore.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await bayuamore.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
}

bayuamore.sendContact = async (jid, kon, quoted = '', opts = {}) => {
let list = []
for (let i of kon) {
list.push({ displayName: await bayuamore.getName(i + '@s.whatsapp.net'), vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await bayuamore.getName(i + '@s.whatsapp.net')}\nFN:${await bayuamore.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` })
}
bayuamore.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
}

bayuamore.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
let type = await bayuamore.getFile(path, true)
let { res, data: file, filename: pathFile } = type
if (res && res.status !== 200 || file.length <= 65536) {
try {
throw {
json: JSON.parse(file.toString())
}
}
catch (e) {
if (e.json) throw e.json
}
}
let opt = {
filename
}
if (quoted) opt.quoted = quoted
if (!type) options.asDocument = true
let mtype = '',
mimetype = type.mime,
convert
if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'
else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'
else if (/video/.test(type.mime)) mtype = 'video'
else if (/audio/.test(type.mime))(
convert = await (ptt ? toPTT : toAudio)(file, type.ext),
file = convert.data,
pathFile = convert.filename,
mtype = 'audio',
mimetype = 'audio/ogg; codecs=opus'
)
else mtype = 'document'
if (options.asDocument) mtype = 'document'
delete options.asSticker
delete options.asLocation
delete options.asVideo
delete options.asDocument
delete options.asImage
let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype }
let m
try {
m = await bayuamore.sendMessage(jid, message, { ...opt, ...options })
} catch (e) {
//console.error(e)
m = null
} finally {
if (!m) m = await bayuamore.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options })
file = null
return m
}
}

bayuamore.sendGroupV4Invite = async(jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', caption = 'Invitation to join my WhatsApp group', options = {}) => {
let msg = proto.Message.fromObject({
groupInviteMessage: proto.GroupInviteMessage.fromObject({
inviteCode,
inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
groupJid: jid,
groupName: groupName ? groupName : this.getName(jid),
caption
})
})
let message = await this.prepareMessageFromContent(participant, msg, options)
await this.relayWAMessage(message)
return message
}

bayuamore.sendGroupV4Invite = async(jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', jpegThumbnail, caption = 'Invitation to join my WhatsApp group', options = {}) => {
let msg = WAProto.Message.fromObject({
groupInviteMessage: WAProto.GroupInviteMessage.fromObject({
inviteCode,
inviteExpiration: inviteExpiration ? parseInt(inviteExpiration) : + new Date(new Date + (3 * 86400000)),
groupJid: jid,
groupName: groupName ? groupName : (await bayuamore.groupMetadata(jid)).subject,
jpegThumbnail: jpegThumbnail ? (await getBuffer(jpegThumbnail)).buffer : '',
caption
})
})
const m = generateWAMessageFromContent(participant, msg, options)
return await bayuamore.relayMessage(participant, m.message, { messageId: m.key.id })
}

bayuamore.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await bayuamore.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

bayuamore.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await bayuamore.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

bayuamore.sendMedia = async (jid, path, filename, quoted = '', options = {}) => {
let { ext, mime, data } = await bayuamore.getFile(path)
messageType = mime.split("/")[0]
pase = messageType.replace('application', 'document') || messageType
return await bayuamore.sendMessage(jid, { [`${pase}`]: data, mimetype: mime, fileName: filename + ext ? filename + ext : getRandom(ext), ...options }, { quoted })
}

bayuamore.sendMediaAsSticker = async (jid, path, quoted, options = {}) => {
let { ext, mime, data } = await bayuamore.getFile(path)
let media = {}
let buffer
media.data = data
media.mimetype = mime
if (options && (options.packname || options.author)) {
buffer = await writeExif(media, options)
} else {
buffer = /image/.test(mime) ? await imageToWebp(data) : /video/.test(mime) ? await videoToWebp(data) : ""
}
await bayuamore.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

bayuamore.sendMessageV2 = async (chatId, message, options = {}) => {
let generate = await generateWAMessage(chatId, message, options)
let type2 = getContentType(generate.message)
if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo
if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo
return await bayuamore.relayMessage(chatId, generate.message, { messageId: generate.key.id })
}

bayuamore.sendPoll = async (jid, title = '', but = []) => {
let pollCreation = generateWAMessageFromContent(jid,
proto.Message.fromObject({
pollCreationMessage: {
name: title,
options: but,
selectableOptionsCount: but.length
}}),
{ userJid: jid })
return bayuamore.relayMessage(jid, pollCreation.message, { messageId: pollCreation.key.id })
}

bayuamore.sendText = (jid, text, quoted = '', options) => bayuamore.sendMessage(jid, { text: text, ...options }, { quoted, ...options })

bayuamore.sendTextWithMentions = async (jid, text, quoted, options = {}) => bayuamore.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })

bayuamore.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await bayuamore.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
}

bayuamore.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await bayuamore.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

bayuamore.setStatus = (status) => {
bayuamore.query({ tag: "iq", attrs: { to: "@s.whatsapp.net", type: "set", xmlns: "status" }, content: [{ tag: "status", attrs: {}, content: Buffer.from(status, "utf-8") }] })
return status
}

bayuamore.waitEvent = (eventName, is = () => true, maxTries = 25) => {
return new Promise((resolve, reject) => {
let tries = 0
let on = (...args) => {
if (++tries > maxTries) reject('Max tries reached')
else if (is()) {
bayuamore.ev.off(eventName, on)
resolve(...args)
}
}
bayuamore.ev.on(eventName, on)
})
}

bayuamore.processMessageStubType = async(m) => {
if (!m.messageStubType) return
const chat = bayuamore.decodeJid(m.key.remoteJid || m.message?.senderKeyDistributionMessage?.groupId || '')
if (!chat || chat === 'status@broadcast') return
const emitGroupUpdate = (update) => {
ev.emit('groups.update', [{ id: chat, ...update }])
}
switch (m.messageStubType) {
case WAMessageStubType.REVOKE:
case WAMessageStubType.GROUP_CHANGE_INVITE_LINK:
emitGroupUpdate({ revoke: m.messageStubParameters[0] })
break
case WAMessageStubType.GROUP_CHANGE_ICON:
emitGroupUpdate({ icon: m.messageStubParameters[0] })
break
default: {
console.log({
messageStubType: m.messageStubType,
messageStubParameters: m.messageStubParameters,
type: WAMessageStubType[m.messageStubType]
})
break
}
}
const isGroup = chat.endsWith('@g.us')
if (!isGroup) return
let chats = bayuamore.chats[chat]
if (!chats) chats = bayuamore.chats[chat] = { id: chat }
chats.isChats = true
const metadata = await bayuamore.groupMetadata(chat).catch(_ => null)
if (!metadata) return
chats.subject = metadata.subject
chats.metadata = metadata
}

bayuamore.pushMessage = async(m) => {
if (!m) return
if (!Array.isArray(m)) m = [m]
for (const message of m) {
try {
if (!message) continue
if (message.messageStubType && message.messageStubType != WAMessageStubType.CIPHERTEXT) bayuamore.processMessageStubType(message).catch(console.error)
const _mtype = Object.keys(message.message || {})
const mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(_mtype[0]) && _mtype[0]) ||
(_mtype.length >= 3 && _mtype[1] !== 'messageContextInfo' && _mtype[1]) ||
_mtype[_mtype.length - 1]
const chat = bayuamore.decodeJid(message.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
if (message.message?.[mtype]?.contextInfo?.quotedMessage) {
let context = message.message[mtype].contextInfo
let participant = bayuamore.decodeJid(context.participant)
const remoteJid = bayuamore.decodeJid(context.remoteJid || participant)
let quoted = message.message[mtype].contextInfo.quotedMessage
if ((remoteJid && remoteJid !== 'status@broadcast') && quoted) {
let qMtype = Object.keys(quoted)[0]
if (qMtype == 'conversation') {
quoted.extendedTextMessage = { text: quoted[qMtype] }
delete quoted.conversation
qMtype = 'extendedTextMessage'
}
if (!quoted[qMtype].contextInfo) quoted[qMtype].contextInfo = {}
quoted[qMtype].contextInfo.mentionedJid = context.mentionedJid || quoted[qMtype].contextInfo.mentionedJid || []
const isGroup = remoteJid.endsWith('g.us')
if (isGroup && !participant) participant = remoteJid
const qM = {
key: {
remoteJid,
fromMe: areJidsSameUser(bayuamore.user.jid, remoteJid),
id: context.stanzaId,
participant,
},
message: JSON.parse(JSON.stringify(quoted)),
...(isGroup ? { participant } : {})
}
let qChats = bayuamore.chats[participant]
if (!qChats) qChats = bayuamore.chats[participant] = { id: participant, isChats: !isGroup }
if (!qChats.messages) qChats.messages = {}
if (!qChats.messages[context.stanzaId] && !qM.key.fromMe) qChats.messages[context.stanzaId] = qM
let qChatsMessages
if ((qChatsMessages = Object.entries(qChats.messages)).length > 40) qChats.messages = Object.fromEntries(qChatsMessages.slice(30, qChatsMessages.length)) // maybe avoid memory leak
}
}
if (!chat || chat === 'status@broadcast') continue
const isGroup = chat.endsWith('@g.us')
let chats = bayuamore.chats[chat]
if (!chats) {
if (isGroup) await bayuamore.insertAllGroup().catch(console.error)
chats = bayuamore.chats[chat] = { id: chat, isChats: true, ...(bayuamore.chats[chat] || {}) }
}
let metadata, sender
if (isGroup) {
if (!chats.subject || !chats.metadata) {
metadata = await bayuamore.groupMetadata(chat).catch(_ => ({})) || {}
if (!chats.subject) chats.subject = metadata.subject || ''
if (!chats.metadata) chats.metadata = metadata
}
sender = bayuamore.decodeJid(message.key?.fromMe && bayuamore.user.id || message.participant || message.key?.participant || chat || '')
if (sender !== chat) {
let chats = bayuamore.chats[sender]
if (!chats) chats = bayuamore.chats[sender] = { id: sender }
if (!chats.name) chats.name = message.pushName || chats.name || ''
}
} else if (!chats.name) chats.name = message.pushName || chats.name || ''
if (['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype)) continue
chats.isChats = true
if (!chats.messages) chats.messages = {}
const fromMe = message.key.fromMe || areJidsSameUser(sender || chat, bayuamore.user.id)
if (!['protocolMessage'].includes(mtype) && !fromMe && message.messageStubType != WAMessageStubType.CIPHERTEXT && message.message) {
delete message.message.messageContextInfo
delete message.message.senderKeyDistributionMessage
chats.messages[message.key.id] = JSON.parse(JSON.stringify(message, null, 2))
let chatsMessages
if ((chatsMessages = Object.entries(chats.messages)).length > 40) chats.messages = Object.fromEntries(chatsMessages.slice(30, chatsMessages.length))
}
} catch (e) {
console.error(e)
}
}
}

function updateNameToDb(contacts) {
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

Object.defineProperty(bayuamore, 'name', {
value: { ...(options.chats || {}) },
configurable: true,
})

if (bayuamore.user?.id) bayuamore.user.jid = bayuamore.decodeJid(bayuamore.user.id)

return bayuamore
}

startBayuAmore()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})