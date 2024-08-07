const Discord = require("discord.js");

const serverId = tempVars("serverid");

async function DeleteAll(msg) {
  try {
    await interaction.reply({
      content: "Cleaning process initiated.",
      ephemeral: true,
    });

    const server = await client.guilds.fetch(serverId);

    const handleChannelDeletion = async (channel) => {
      try {
        await channel.delete();
      } catch (error) {
        const errorMessages = {
          50013: "Insufficient permission to delete channels.",
          50030: "Rate limit exceeded. Please wait and try again.",
        };

        const errorMessage =
          errorMessages[error.code] ||
          "An error occurred while deleting channels.";
        console.error(error);
        await interaction.reply({
          content: errorMessage,
          ephemeral: true,
        });
      }
    };

    const channelsToDelete = server.channels.cache.filter(
      (channel) => channel.deletable
    );
    const channelDeletionPromises = channelsToDelete.map(handleChannelDeletion);

    await Promise.all(channelDeletionPromises);

    Actions.callNextAction(cache);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "An error occurred during the cleaning process.",
      ephemeral: true,
    });
  }
}

DeleteAll(msg);
