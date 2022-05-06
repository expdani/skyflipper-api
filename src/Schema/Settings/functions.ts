import { GlobalSettings } from "../../Entities/GlobalSettings";
import { Settings } from "../../Entities/Settings";

export async function initiateServerSettings(server_id: string) {
  await Settings.insert({
    server_id,
  });

  return await Settings.findOne({
    server_id,
  });
}

export async function getServerSettings(server_id: string) {
  const settings = await Settings.findOne({
    server_id,
  });

  if (settings) return settings;
  else return initiateServerSettings(server_id);
}

export async function updateServerSettings(server_id: string) {
  const serverSettings = await Settings.findOne({
    server_id,
  });

  if (serverSettings) {
    await Settings.update({ server_id }, { server_id });
    return await Settings.findOne({
      server_id,
    });
  } else return initiateServerSettings(server_id);
}

export async function getBotSettings() {
  const settings = await GlobalSettings.findOne({
    name: "bot",
  });

  return settings;
}
