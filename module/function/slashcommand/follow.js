module.exports = async(interaction)=>{
  const { ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionFlagsBits, Colors } = require("discord.js");
  if(!interaction.isChatInputCommand()) return;
  if(interaction.commandName === "follow"){
    const type = interaction.options.getString("type");

    if(!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) return await interaction.reply({
      embeds:[{
        color: Colors.Red,
        author:{
          name: "権限がありません",
          icon_url: "https://cdn.taka.cf/images/system/error.png"
        },
        description: "このコマンドを実行するには以下の権限を持っている必要があります",
        fields:[
          {
            name: "必要な権限",
            value: "```チャンネルの管理```"
          }
        ]
      }],
      ephemeral: true
    });
 
    if(!interaction.guild.members.me.permissionsIn(interaction.channel).has(PermissionFlagsBits.ManageChannels)) return await interaction.reply({
      embeds:[{
        color: Colors.Red,
        author:{
          name: "BOTに権限がありません",
          icon_url: "https://cdn.taka.cf/images/system/error.png"
        },
        description: "この機能はBOTに以下の権限が必要です",
        fields:[
          {
            name: "必要な権限",
            value: "```チャンネルの管理```"
          }
        ]
      }],
      ephemeral: true
    });

    if(type === "announce"){
      await interaction.client.channels.cache.get("1049155527214628954").addFollower(interaction.channel)
        .then(async()=>{
          await interaction.reply({
            embeds:[{
              color: Colors.Green,
              author:{
                name: "フォローチャンネルを追加しました",
                icon_url: "https://cdn.taka.cf/images/system/success.png"
              },
              description: "このチャンネルでBOTのお知らせを受け取ることができます"
            }]
          });
        })
        .catch(async(error)=>{
          await interaction.reply({
            embeds:[{
              color: Colors.Red,
              author:{
                name: "フォローチャンネルを追加できませんでした",
                icon_url: "https://cdn.taka.cf/images/system/error.png"
              },
              fields:[
                {
                  name: "エラーコード",
                  value: `\`\`\`${error}\`\`\``
                }
              ]
            }],
            components:[
              new ActionRowBuilder()
                .addComponents( 
                  new ButtonBuilder()
                    .setLabel("サポートサーバー")
                    .setURL("https://discord.gg/NEesRdGQwD")
                    .setStyle(ButtonStyle.Link))
            ],
            ephemeral: true
          });
        });
    }else{
      await interaction.client.channels.cache.get("1106533820498452500").addFollower(interaction.channel)
        .then(async()=>{
          await interaction.reply({
            embeds:[{
              color: Colors.Green,
              author:{
                name: "フォローチャンネルを追加しました",
                icon_url: "https://cdn.taka.cf/images/system/success.png"
              },
              description: "このチャンネルでBOTの変更ログを受け取ることができます"
            }]
          });
        })
        .catch(async(error)=>{
          await interaction.reply({
            embeds:[{
              color: Colors.Red,
              author:{
                name: "フォローチャンネルを追加できませんでした",
                icon_url: "https://cdn.taka.cf/images/system/error.png"
              },
              fields:[
                {
                  name: "エラーコード",
                  value: `\`\`\`${error}\`\`\``
                }
              ]
            }],
            components:[
              new ActionRowBuilder()
                .addComponents( 
                  new ButtonBuilder()
                    .setLabel("サポートサーバー")
                    .setURL("https://discord.gg/NEesRdGQwD")
                    .setStyle(ButtonStyle.Link))
            ],
            ephemeral: true
          });
        });
    }
  }
}