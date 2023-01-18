// Default Classec
exports.Bot = require("./structures/Bot.js");
exports.Database = require("./structures/Database.js");
exports.MessageEmbed = require("./structures/MessageEmbed.js");
exports.ActionComponent = require("./structures/ActionComponent.js");
exports.ModalText = require("./structures/ModalText.js");
exports.Modal = require("./structures/Modal.js");
exports.MessageAttachment = require("./structures/MessageAttachment.js");
exports.Link = require("./structures/Link.js");
exports.Invites = require("./structures/Invite.js");
exports.Roles = require("./structures/Role.js");

// Voice function / classes
exports.joinVoice = require('./voice/joinVoice.js');
exports.leaveVoice = require('./voice/leaveVoice.js');
exports.memberVoice = require('./voice/memberVoice.js');

// Function
exports.encryption = require("./function/encryption.js");
exports.decoding = require("./function/decoding.js");

// Prototype
exports = require("./prototype/Message.js");
exports = require("./prototype/Guild.js");
exports = require("./prototype/Member.js");
