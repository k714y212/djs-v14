module.exports = async(interaction)=>{
  const { Colors } = require("discord.js");
  const { admin } = require("../../../config.json");
  if(!interaction.isChatInputCommand()) return;
  if(interaction.commandName === "debug"){
    const type = interaction.options.getString("type");
    const id = interaction.options.getString("id");
    const channel = interaction.options.getChannel("channel");
    const json = interaction.options.getString("json");

    if(interaction.user.id !== admin) return await interaction.reply({
      embeds:[{
        color: Colors.Red,
        author:{
          name: "権限がありません",
          icon_url: "https://cdn.taka.cf/images/system/error.png"
        },
        description: "このコマンドは関係者以外実行できません"
      }],
      ephemeral: true
    });

    if(type === "content"){
      try{
        if(channel){
          const msg = await channel.messages.fetch({"message":id});
          await interaction.reply({
            embeds:[{
              color: Colors.Green,
              author:{
                name: "取得しました",
                icon_url: "https://cdn.taka.cf/images/system/success.png"
              },
              description: `\`\`\`json\n${JSON.stringify(msg,null,"  ")}\`\`\``
            }]
          });
        }else{
          const msg = await interaction.channel.messages.fetch({"message":id});
          await interaction.reply({
            embeds:[{
              color: Colors.Green,
              author:{
                name: "取得しました",
                icon_url: "https://cdn.taka.cf/images/system/success.png"
              },
              description: `\`\`\`json\n${JSON.stringify(msg,null,"  ")}\`\`\``
            }]
          });
        }
      }catch(error){
        await interaction.reply({
          embeds:[{
            color: Colors.Red,
            author:{
              name: "取得できませんでした",
              icon_url: "https://cdn.taka.cf/images/system/error.png"
            },
            description: "メッセージが存在しません",
            fields:[
              {
                name: "エラーコード",
                value: `\`\`\`${error}\`\`\``
              }
            ]
          }],
          ephemeral: true
        });
      }
    }else if(type === "send"){
      try{
        await interaction.reply(JSON.parse(json));
      }catch(error){
        await interaction.reply({
          embeds:[{
            color: Colors.Red,
            author:{
              name: "送信できませんでした",
              icon_url: "https://cdn.taka.cf/images/system/error.png"
            },
            description: "メッセージオブジェクトが無効です",
            fields:[
              {
                name: "エラーコード",
                value: `\`\`\`${error}\`\`\``
              }
            ]
          }],
          ephemeral: true
        });
      }
    }else if(type === "edit"){
      try{
        if(channel){
          const msg = await channel.messages.fetch({"message":id});
          await msg.edit(JSON.parse(json));
          await interaction.reply({
            embeds:[{
              color: Colors.Green,
              author:{
                name: "編集しました",
                icon_url: "https://cdn.taka.cf/images/system/success.png"
              }
            }]
          });
        }else{
          const msg = await interaction.channel.messages.fetch({"message":id});
          await msg.edit(JSON.parse(json));
          await interaction.reply({
            embeds:[{
              color: Colors.Green,
              author:{
                name: "編集しました",
                icon_url: "https://cdn.taka.cf/images/system/success.png"
              }
            }]
          });
        }
      }catch(error){
        await interaction.reply({
          embeds:[{
            color: Colors.Red,
            author:{
              name: "編集できませんでした",
              icon_url: "https://cdn.taka.cf/images/system/error.png"
            },
            description: "メッセージオブジェクトまたは、メッセージが取得できません",
            fields:[
              {
                name: "エラーコード",
                value: `\`\`\`${error}\`\`\``
              }
            ]
          }],
          ephemeral: true
        });
      }
    }else if(type === "delete"){
      try{
        if(channel){
          const msg = await channel.messages.fetch({"message":id});
          await msg.delete();
          await interaction.reply({
            embeds:[{
              color: Colors.Green,
              author:{
                name: "削除しました",
                icon_url: "https://cdn.taka.cf/images/system/success.png"
              }
            }]
          });
        }else{
          const msg = await interaction.channel.messages.fetch({"message":id});
          await msg.delete();
          await interaction.reply({
            embeds:[{
              color: Colors.Green,
              author:{
                name: "削除しました",
                icon_url: "https://cdn.taka.cf/images/system/success.png"
              }
            }]
          });
        }
      }catch(error){
        await interaction.reply({
          embeds:[{
            color: Colors.Red,
            author:{
              name: "取得できませんでした",
              icon_url: "https://cdn.taka.cf/images/system/error.png"
            },
            description: "メッセージが存在しません",
            fields:[
              {
                name: "エラーコード",
                value: `\`\`\`${error}\`\`\``
              }
            ]
          }],
          ephemeral: true
        });
      }
    } 
  }
}