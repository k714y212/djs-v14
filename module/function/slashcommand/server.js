module.exports = async(interaction)=>{
  const { ButtonBuilder, ActionRowBuilder, ButtonStyle, ChannelType, Colors } = require("discord.js");
  const boost = require("../../lib/boost");
  if(!interaction.isChatInputCommand()) return;
  if(interaction.commandName === "server"){

    await interaction.deferReply();
    try{
      const members = await interaction.guild.members.fetch();

      const online = members.filter(member=>member.presence?.status === "online").toJSON();
      const dnd = members.filter(member=>member.presence?.status === "dnd").toJSON();
      const idle = members.filter(member=>member.presence?.status === "idle").toJSON();
      const offline = members.filter(member=>member.presence?.status === "offline").toJSON();
      const none = members.filter(member=>!(member.presence?.status)).toJSON();

      const web = members.filter(member=>member.presence?.clientStatus?.web).toJSON();
      const mobile = members.filter(member=>member.presence?.clientStatus?.mobile).toJSON();
      const desktop = members.filter(member=>member.presence?.clientStatus?.desktop).toJSON();

      await interaction.editReply({
        embeds:[{
          color: Colors.Green,
          author:{
            name: `${interaction.guild.name}の情報`,
            icon_url: "https://cdn.taka.cf/images/system/success.png"
          },
          thumbnail:{
            url: interaction.guild.iconURL()
          },
          fields:[
            {
              name: "ID",
              value: interaction.guild.id
            },
            {
              name: "所有者",
              value: `<@${interaction.guild.ownerId}>`
            },
            {
              name: "人数",
              value: `${interaction.guild.memberCount}人(ユーザー:${(await interaction.guild.members.fetch()).filter(m=>!m.user.bot).size}人 BOT:${(await interaction.guild.members.fetch()).filter(m=>m.user.bot).size}人)`
            },
            {
              name: "作成日時",
              value: `${new Date(interaction.guild.createdTimestamp).toLocaleString()}\n(${Math.round((Date.now() - interaction.guild.createdAt) / 86400000)}日前)`
            },
            {
              name: "アクティビティ",
              value: `🟢: ${online.length}人 ⛔: ${dnd.length}人 🌙: ${idle.length}人 ⚫: ${offline.length+none.length}人\n🌐: ${web.length}人 📱: ${mobile.length}人 🖥️: ${desktop.length}人`
            },
            {
              name: "統計情報",
              value: `チャンネル:${interaction.guild.channels.cache.size}個(💬:${interaction.guild.channels.cache.filter(ch=>ch.type===ChannelType.GuildText).size} 🔊:${interaction.guild.channels.cache.filter(ch=>ch.type===ChannelType.GuildVoice).size} 📁:${interaction.guild.channels.cache.filter(ch=>ch.type===ChannelType.GuildCategory).size})\nロール:${(await interaction.guild.roles.fetch()).size}個\n絵文字:${(await interaction.guild.emojis.fetch()).size}個\nステッカー:${(await interaction.guild.stickers.fetch()).size}個\nNitro:${interaction.guild.premiumSubscriptionCount}ブースト(${boost(interaction.guild.premiumSubscriptionCount)}レベル)`
            }
          ],
          footer:{
            text: "TakasumiBOT"
          },
          timestamp: new Date()
        }]
      })
    }catch(error){
      await interaction.editReply({
        embeds:[{
          color: Colors.Red,
          author:{
            name: "取得できませんでした",
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
    }
  }
}