require("./module");

global.allmenu = `━━━━━━━━━━━━━━━━━

*━━━━「 AI 」━━━━*
➙ .aiblur
➙ .aihd

*━━━━「 BROADCAST 」━━━━*
➙ .broadcast
➙ .broadcastgroup
➙ .broadcastid
➙ .broadcastuser
➙ .cekgroup
➙ .idgroup
➙ .save
➙ .savegroup
➙ .savegroupid

*━━━━「 DOMAIN 」━━━━*
➙ .domain1
➙ .domain2
➙ .domain3
➙ .domain4
➙ .domain5
➙ .domain6
➙ .domain7
➙ .domain8
➙ .domain9
➙ .domain10

*━━━━「 DOWNLOAD 」━━━━*
➙ .play
➙ .facebookdl
➙ .instagramdl
➙ .instagramstorydl
➙ .mediafiredl
➙ .tiktokdl
➙ .tiktokmp3
➙ .xnxxdl
➙ .xvideosdl
➙ .youtubemp3
➙ .youtubemp4
➙ .youtubeshortsdl

*━━━━「 GAMES 」━━━━*
➙ .dadu
➙ .slot
➙ .suit
➙ .tod
➙ .asahotak
➙ .caklontong
➙ .kuismath
➙ .siapakahaku
➙ .susunkata
➙ .tebakgambar
➙ .tebakkata
➙ .tebaklagu
➙ .tebaklirik
➙ .tebaktebakan
➙ .tekateki

*━━━━「 GROUP 」━━━━*
➙ .add
➙ .demote
➙ .editinfo
➙ .group
➙ .hidetag
➙ .join
➙ .kick
➙ .kickall
➙ .leave
➙ .linkgroup
➙ .promote
➙ .tagall
➙ .totag

*━━━━「 INTERNET 」━━━━*
➙ .chord
➙ .distance
➙ .fetch
➙ .gempa
➙ .google
➙ .gimage
➙ .lyric
➙ .pinterest
➙ .xnxx
➙ .xvideos
➙ .wattpad
➙ .wikipedia
➙ .youtube

*━━━━「 PANEL 」━━━━*
➙ .paneladm
➙ .panellog
➙ .panelunli
➙ .panel1
➙ .panel2
➙ .panel3
➙ .panel4
➙ .panel5
➙ .panel6
➙ .panel7
➙ .panel8
➙ .panel9
➙ .panel10

*━━━━「 STORE 」━━━━*
➙ .addlist
➙ .dellist
➙ .list
➙ .updatelist
➙ .addsaldo
➙ .minsaldo
➙ .ceksaldo
➙ .deposit
➙ .transaksi
➙ .payment
➙ .done
➙ .proses

*━━━━「 TOOL 」━━━━*
➙ .case
➙ .emojimix
➙ .emojimix2
➙ .getname
➙ .getpp
➙ .fetch
➙ .shortlink
➙ .sshp
➙ .sspc
➙ .sstablet
➙ .sticker
➙ .stickermeme
➙ .stickerqc
➙ .stickerqcimg
➙ .stickerwm
➙ .toaudio
➙ .togif
➙ .toimage
➙ .tomp3
➙ .tomp4
➙ .toonce
➙ .tourl
➙ .tovideo
➙ .tovn
➙ .translate
➙ .ttp
➙ .tts
➙ .viewonce

*━━━━「 SETTING 」━━━━*
➙ .auto
➙ .autoread
➙ .autosw
➙ .block
➙ .boost
➙ .clearsrc
➙ .get
➙ .getcase
➙ .getdb
➙ .getfile
➙ .getfolder
➙ .getpackage
➙ .getscript
➙ .getsesi
➙ .joingroup
➙ .leavegroup
➙ .listblock
➙ .public
➙ .restart
➙ .setmenu
➙ .setppbot
➙ .setreply
➙ .shutdown
➙ .unblock`;

let file = require.resolve(__filename);
fs.watchFile(file, () => {
   fs.unwatchFile(file);
   console.log(chalk.redBright(`Update ${__filename}`));
   delete require.cache[file];
   require(file);
});
