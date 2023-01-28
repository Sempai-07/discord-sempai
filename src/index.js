// Default Classec
exports.Bot = require("./structures/Bot.js");
exports.Database = require("./structures/Database.js");
exports.MessageEmbed = require("./structures/MessageEmbed.js");
exports.ActionComponent = require("./structures/ActionComponent.js");
exports.ModalText = require("./structures/ModalText.js");
exports.Modal = require("./structures/Modal.js");
exports.MessageAttachment = require("./structures/MessageAttachment.js");
exports.Parser = require("./util/Parser.js");
exports.Util = require("./util/Util.js");

// Voice Function/Classec
exports.joinVoice = require('./voice/joinVoice.js');
exports.leaveVoice = require('./voice/leaveVoice.js');

// Function
exports.encryption = require("./function/encryption.js");
exports.decoding = require("./function/decoding.js");