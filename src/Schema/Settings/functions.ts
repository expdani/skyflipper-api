import { GlobalSettings } from "../../Entities/GlobalSettings";
import { Settings } from "../../Entities/Settings";

type SettingsForm = {
  karma_enabled?: boolean;
  karma_reactions?: boolean;
  random_message_events_enabled?: boolean;
};

export async function initiateServerSettings(
  server_id: string,
  form?: SettingsForm
) {
  await Settings.insert({
    server_id,
    ...form,
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

export async function updateServerSettings(
  server_id: string,
  form: SettingsForm
) {
  const serverSettings = await Settings.findOne({
    server_id,
  });

  if (serverSettings) {
    await Settings.update({ server_id }, form);
    return await Settings.findOne({
      server_id,
    });
  } else return initiateServerSettings(server_id, form);
}

export async function getBotSettings() {
  const settings = await GlobalSettings.findOne({
    name: "bot",
  });

  return settings;
}
