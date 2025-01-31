module.exports = async(client)=>{
  require("dotenv").config();
  const { REST, Routes } = require("discord.js");
  const config = require("../../../config.json");
  const commands = require("../../../file/commandlist")

  const rest = new REST({version:"10"})
    .setToken(process.env.BOT_TOKEN);
            
  await rest.put(Routes.applicationCommands(client.application.id),{ 
    body: Object.values(commands).map(command=>command.data)
  });

  await client.channels.cache.get(config.log).send("スラッシュコマンドをリロードしました");
}