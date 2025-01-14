module.exports = async(interaction)=>{
  const { ButtonBuilder, ActionRowBuilder, ButtonStyle, Colors } = require("discord.js");
  const permission = require("../../lib/permission");
  if(!interaction.isContextMenuCommand()) return;
  if(interaction.commandName === "権限を表示"){
    const member = interaction.options.getMember("user");

    if(!member) return await interaction.reply({
      embeds:[{
        color: Colors.Red,
        author:{
          name: "メンバーを取得できませんでした",
          icon_url: "https://cdn.taka.cf/images/system/error.png"
        },
        description: "指定したメンバーはサーバーに存在していません"
      }],
      ephemeral: true
    });

    try{
      await interaction.reply({
        embeds:[{
          color: Colors.Green,
          author:{
            name: `${member.user.tag}の権限`,
            url: `https://discord.com/users/${member.user.id}`,
            icon_url: "https://cdn.taka.cf/images/system/success.png"
          },
          description: `\`${permission(member.permissions.toArray()).join("`,`")}\``,
          footer:{
            text: "TakasumiBOT"
          },
          timestamp: new Date()
        }]
      });
    }catch(error){
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
      });
    }
  }
}