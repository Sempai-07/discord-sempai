const EmbedParser = (msg) => {
  const embeds = [];
  let newEmbed = msg.split("{newEmbed:").slice(1);
  for (let parserEmbed of newEmbed) {
    parserEmbed = parserEmbed.slice(0, parserEmbed.length - 1);
    const embed = {};
    const checkContent = (content) => parserEmbed.includes(`{${content}:`);
    
    if (checkContent("author")) {
      const author = parserEmbed.split("{author:")[1].split("}")[0].split(":");
      embed.author = {
        name: author.shift()?.trim() || "",
        iconURL: author.join(":")?.trim() || "",
      }
    };
    
    if (checkContent("thumbnail")) {
      embed.thumbnail = parserEmbed.split("{thumbnail:")[1].split("}")[0].trim();
    }
    
    if (checkContent("authorURL")) {
      if (!embed.author) return console.log(new TypeError("{author:} was not used"));
      embed.author.url = parserEmbed.split("{authorURL:")[1].split("}")[0].trim();
    }
    
    if (checkContent("url")) {
      if (!embed.title) return console.log(new TypeError("{title:} was not used"));
      embed.url = parserEmbed.split("{url:")[1].split("}")[0].trim();
    }
    
    if (checkContent("title")) {
      const title = parserEmbed.split("{title:")[1].split("}")[0].split(":");
      embed.title = title.shift()?.trim() || ""
    }
    
    if (checkContent("description")) {
      const description = parserEmbed.split("{description:")[1].split("}");
      embed.description = description.shift()?.trim() || ""
    }
    
    if (checkContent("color")) {
      const color = parserEmbed.split("{color:")[1].split("}")[0].split(":");
      embed.color = color.shift()?.trim() || ""
    }
    
    if (checkContent("footer")) {
      const footer = parserEmbed.split("{footer:")[1].split("}")[0].split(":");
      embed.footer = {
        text: footer.shift()?.trim() || "",
        iconURL: footer.join(":")?.trim() || ""
      };
    }
    
    if(parserEmbed.includes("{timestamp")) {
      let t = parserEmbed.split("{timestamp")[1].split("}")[0].replace(":", "").trim();
      if (t === "" || t === "ms") {
        t = Date.now();
      }
      embed.timestamp = new Date(t);
    }
    
    if (checkContent("{image")) {
      embed.image = parserEmbed.split("{image:")[1].split("}")[0].trim()
    }
    
    if (checkContent("field")) {
        const fields = parserEmbed.match(/\{field:(.*?)\}/g) || [];
        embed.fields = fields.map(field => {
            const [name = "\u200B", value = "\u200B", inline = "false"] = field.substring(7, field.length - 1).split(":").map(s => s.trim());
            return {
                name,
                value,
                inline: inline === "true"
            };
        });
    }

    
    embeds.push(embed);
  }
  return embeds[0]
};

module.exports = {
  EmbedParser: EmbedParser
}

// © 2022 @Sempai Development