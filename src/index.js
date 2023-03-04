// Classec
exports.Bot = require("./structures/Bot.js");
exports.Database = require("./structures/Database.js");
exports.MessageEmbed = require("./structures/MessageEmbed.js");
exports.ActionComponent = require("./structures/ActionComponent.js");
exports.MessageAttachment = require("./structures/MessageAttachment.js");
exports.Parser = require("./structures/Parser.js");
exports.Music = require("./structures/Music.js");
exports.Cache = require("./structures/Cache.js");

// Util classic
// Guild
exports.GuildEmoji = require("./structures/Guild/GuildEmoji.js")
exports.GuildManager = require("./structures/Guild/GuildManager.js")
exports.MessageReaction = require("./structures/Guild/MessageReaction.js")
exports.GuildRole = require("./structures/Guild/GuildRole.js")
exports.GuildWebhook = require("./structures/Guild/GuildWebhook.js")
exports.GuildInvite = require("./structures/Guild/GuildInvite.js")
exports.PermissionChecker = require("./structures/Guild/PermissionChecker.js")
exports.GuildVoice = require("./structures/Guild/GuildVoice.js")
exports.MessageCollection = require("./structures/Guild/MessageCollection.js")
exports.MessageReplyOption = require("./structures/Guild/MessageReplyOption.js");

// Util
exports.Paginator = require("./structures/Util/Paginator.js")
exports.Randomizer = require("./structures/Util/Randomizer.js")
exports.TextFormatter = require("./structures/Util/TextFormatter.js")
exports.Verification = require("./structures/Util/Verification.js")
exports.FileManager = require("./structures/Util/FileManager.js")
exports.ErrorHandler = require("./structures/Util/ErrorHandler.js")
exports.AsyncHandler = require("./structures/Util/AsyncHandler.js")
exports.PromiseUtils = require("./structures/Util/PromiseUtils.js")

// Interaction 
exports.SlashCommandManager = require("./structures/Interaction/SlashCommandManager.js");
exports.SlashCommandOption = require("./structures/Interaction/SlashCommandOption.js");
exports.InteractionReplyOption = require("./structures/Interaction/InteractionReplyOption.js");
exports.ContextMenuManager = require("./structures/Interaction/ContextMenuManager.js");

// Util classes
exports.Client = require("./djs/classec.js").Client;
exports.Collection = require("./djs/classec.js").Collection;
exports.Channel = require("./djs/classec.js").Channel;
exports.DMChannel = require("./djs/classec.js").DMChannel;
exports.GroupDMChannel = require("./djs/classec.js").GroupDMChannel;
exports.Guild = require("./djs/classec.js").Guild;
exports.GuildChannel = require("./djs/classec.js").GuildChannel;
exports.GuildMember = require("./djs/classec.js").GuildMember;
exports.Message = require("./djs/classec.js").Message;
exports.MessageReaction = require("./djs/classec.js").MessageReaction;
exports.PermissionOverwrites = require("./djs/classec.js").PermissionOverwrites;
exports.Presence = require("./djs/classec.js").Presence;
exports.Role = require("./djs/classec.js").Role;
exports.Snowflake = require("./djs/classec.js").Snowflake;
exports.TextChannel = require("./djs/classec.js").TextChannel;
exports.User = require("./djs/classec.js").User;
exports.VoiceChannel = require("./djs/classec.js").VoiceChannel;
exports.Webhook = require("./djs/classec.js").Webhook;
exports.Client = require("./djs/classec.js").Client;

// Util djs
exports.ApplicationCommandType = require("./djs/util.js").ApplicationCommandType;
exports.PermissionsBitField = require("./djs/util.js").PermissionsBitField;
exports.ActivityType = require("./djs/util.js").ActivityType;
exports.ComponentType = require("./djs/util.js").ComponentType;
exports.Events = require("./djs/util.js").Events;
exports.GatewayIntentBits = require("./djs/util.js").GatewayIntentBits;
exports.PermissionFlagsBits = require("./djs/util.js").PermissionFlagsBits;
exports.TextInputStyle = require("./djs/util.js").TextInputStyle;
exports.ButtonStyle = require("./djs/util.js").ButtonStyle;
exports.ChannelType = require("./djs/util.js").ChannelType;
exports.Partials = require("./djs/util.js").Partials;
exports.RESTJSONErrorCodes = require("./djs/util.js").RESTJSONErrorCodes;
exports.AuditLogEvent = require("./djs/util.js").AuditLogEvent;
exports.DataResolver = require("./djs/util.js").DataResolver;
exports.MessageActivityType = require("./djs/util.js").MessageActivityType;
exports.CommandInteraction = require("./djs/util.js").CommandInteraction;
exports.MessagePayload = require("./djs/util.js").MessagePayload;