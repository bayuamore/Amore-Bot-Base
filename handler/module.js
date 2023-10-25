const {
   default: BayuAmoreConnect,
   makeWALegacySocket,
   BufferJSON,
   Browsers,
   initInMemoryKeyStore,
   extractMessageContent,
   makeInMemoryStore,
   proto,
   DisconnectReason,
   useMultiFileAuthState,
   AnyMessageContent,
   fetchLatestBaileysVersion,
   prepareWAMessageMedia,
   downloadContentFromMessage,
   getBinaryNodeChild,
   jidDecode,
   areJidsSameUser,
   generateWAMessage,
   generateForwardMessageContent,
   generateWAMessageContent,
   generateWAMessageFromContent,
   WAMessageStubType,
   getContentType,
   relayMessage,
   WA_DEFAULT_EPHEMERAL,
   generateMessageID,
   getAggregateVotesInPollMessage,
   delay,
   PHONENUMBER_MCC,
} = require("@whiskeysockets/baileys");
global.BayuAmoreConnect = BayuAmoreConnect;
global.makeWALegacySocket = makeWALegacySocket;
global.BufferJSON = BufferJSON;
global.Browsers = Browsers;
global.initInMemoryKeyStore = initInMemoryKeyStore;
global.extractMessageContent = extractMessageContent;
global.makeInMemoryStore = makeInMemoryStore;
global.proto = proto;
global.DisconnectReason = DisconnectReason;
global.useMultiFileAuthState = useMultiFileAuthState;
global.AnyMessageContent = AnyMessageContent;
global.fetchLatestBaileysVersion = fetchLatestBaileysVersion;
global.prepareWAMessageMedia = prepareWAMessageMedia;
global.downloadContentFromMessage = downloadContentFromMessage;
global.getBinaryNodeChild = getBinaryNodeChild;
global.jidDecode = jidDecode;
global.areJidsSameUser = areJidsSameUser;
global.generateWAMessage = generateWAMessage;
global.generateForwardMessageContent = generateForwardMessageContent;
global.generateWAMessageContent = generateWAMessageContent;
global.generateWAMessageFromContent = generateWAMessageFromContent;
global.WAMessageStubType = WAMessageStubType;
global.getContentType = getContentType;
global.relayMessage = relayMessage;
global.WA_DEFAULT_EPHEMERAL = WA_DEFAULT_EPHEMERAL;
global.generateMessageID = generateMessageID;
global.getAggregateVotesInPollMessage = getAggregateVotesInPollMessage;
global.delay = delay;
global.PHONENUMBER_MCC = PHONENUMBER_MCC;
global._ = require("lodash");
global.axios = require("axios");
global.bochil = require("@bochilteam/scraper");
global.Boom = require("@hapi/boom").Boom;
global.can = require("knights-canvas");
global.chalk = require("chalk");
global.cheerio = require("cheerio");
global.colors = require("colors");
global.cp = require("child_process");
global.crypto = require("crypto");
global.exec = require("child_process").exec;
global.spawn = require("child_process").spawn;
global.execSync = require("child_process").execSync;
global.fakeUa = require("fake-useragent");
global.fetch = require("node-fetch");
global.ffmpeg = require("fluent-ffmpeg");
global.fg = require("api-dylux");
global.FileType = require("file-type");
global.figlet = require("figlet");
global.FormData = require("form-data");
global.formBuffer = require("file-type").fromBuffer;
global.fdl = require("caliph-api");
global.fs = require("fs");
global.fsx = require("fs-extra");
global.hxz = require("hxz-api");
global.jsobfus = require("javascript-obfuscator");
global.Jimp = require("jimp");
global.moment = require("moment-timezone");
global.MultiStream = require("multistream");
global.ms = require("parse-ms");
global.nodecron = require("node-cron");
global.nou = require("node-os-utils");
global.os = require("os");
global.objectquery = require("object-query-string");
global.path = require("path");
global.performance = require("perf_hooks").performance;
global.PhoneNumber = require("awesome-phonenumber");
global.pino = require("pino");
global.promisify = require("util").promisify;
global.qrcode = require("qrcode-terminal");
global.readline = require("readline");
global.request = require("request");
global.rimraf = require("rimraf");
global.si = require("systeminformation");
global.similarity = require("similarity");
global.threshold = 0.72;
global.sha1 = require("sha1");
global.sizeFormatter = require("human-readable").sizeFormatter;
global.format = sizeFormatter({
   std: "JEDEC",
   decimalPlaces: 2,
   keepTrailingZeroes: false,
   render: (literal, symbol) => `${literal} ${symbol}B`,
});
global.speed = require("performance-now");
global.spin = require("spinnies");
global.toMS = require("ms");
global.util = require("util");
global.translate = require("@vitalets/google-translate-api");
global.vm = require("node:vm");
global.webp = require("node-webpmux");
global.yargs = require("yargs/yargs");
global.yts = require("yt-search");
global.ytdl = require("ytdl-core");
global.primbon = require("scrape-primbon");
