import { Database } from "./Structures/Database.js"
import { CommandInteraction, Interaction, Message } from "discord.js"
import { Bot } from "./Structures/Bot"

export interface BotOptions {
    token: string,
    prefix: string,
    intents: number | object
}

export interface BotStatusOptions {
    status: "online" | "idle" | "dnd" | "invisible"
}

export interface CommandOptions {
    name: string,
    aliases?: string[],
    code(
        client: Bot,
        message: Message,
        args: string[]
    ): void | Promise<void>
}

export interface SlashCommandOptions {
    name: string,
    description: string,
    options?: object[],
    async code(
        interaction: CommandInteraction,
        client: Bot
    ): void | Promise<void>
}

export interface ModalOptions {
    id: string | number,
    title: string
}

export interface ModalTextOptions {
    id: string | number,
    label: string,
    max?: number,
    min?: number,
    required?: boolean
}

export interface ButtonOptions {
    id: string,
    label: string,
    style: number,
    disabled?: boolean
}

export interface SelectMenuOptions {
    id: string,
    placeholder: string,
    options: object
}

export interface MessageEmbedOptions {
    title?: string,
    description?: string,
    color?: number,
    url?: string,
    thumbnail?: string,
    author?: {
        name: string,
        iconURL: string,
        url?: string
    },
    image?: string,
    footer?: {
        text: string,
        iconURL?: string
    },
    timestamp?: boolean,
    fields?: object
}