module.exports = async(interaction)=>{
  const { ButtonBuilder, ActionRowBuilder, ButtonStyle, Colors } = require("discord.js");
  if(!interaction.isChatInputCommand()) return;
  if(interaction.commandName === "rolecount"){

    await interaction.deferReply();
    try{
      const roles = (await interaction.guild.roles.fetch())
        .sort((r1,r2)=>r2.position - r1.position)
        .filter(role=>!role.managed)
        .filter(role=>role.name !== "@everyone");

      await interaction.editReply({
        embeds:[{
          color: Colors.Green,
          author:{
            name: "ロールの人数・割合一覧",
            icon_url: "https://cdn.taka.cf/images/system/success.png"
          },
          description: `${roles.map(role=>`<@&${role.id}>: ${role.members.size}人 - ${(role.members.size/interaction.guild.memberCount*100).toFixed(2)}%`).join("\n")}`
        }]
      });
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