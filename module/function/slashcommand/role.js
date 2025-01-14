module.exports = async(interaction)=>{
  const permission = require("../../lib/permission");
  const { ButtonBuilder, ActionRowBuilder, ButtonStyle, Colors } = require("discord.js");
  if(!interaction.isChatInputCommand()) return;
  if(interaction.commandName === "role"){
    const role = interaction.options.getRole("name");

    await interaction.reply({
      embeds:[{
        color: Colors.Green,
        author:{
          name: `${role.name}の情報`,
          icon_url: "https://cdn.taka.cf/images/system/success.png"
        },
        fields:[
          {
            name: "ID",
            value: role.id,
            inline: true
          },
          {
            name: "メンション",
            value: role.mentionable ? "可能" : "不可能",
            inline: true
          },
          {
            name: "表示形式",
            value: role.hoist ? "別々" : "混合",
            inline: true
          },
          {
            name: "色",
            value: role.hexColor,
            inline: true
          },
          {
            name: "作成日時",
            value: `${new Date(role.createdTimestamp).toLocaleString()}\n(${Math.round((Date.now() - role.createdAt) / 86400000)}日前)`,
            inline: true
          },
          {
            name: "メンバー数",
            value: `${role.members.size}人`,
            inline: true
          },
          {
            name: "権限",
            value: `\`${permission(role.permissions.toArray()).join("`,`")}\``
          }
        ],
        footer:{
          text: "TakasumiBOT"
        },
        timestamp: new Date()
      }]
    }).catch(async(error)=>{
      await interaction.reply({
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
      })
    });
  }
}