import { Sessions } from "../../Entities/Sessions";
import crypto from "crypto";
import * as config from "../../../config.json";
import uuid from "node-uuid";
import { env } from "../../../environment";
import fetch from "cross-fetch";

export async function initiateSession(
  user_id: string,
  discord_token: string,
  discord_type: string
) {
  const access_token = crypto
    .createHash("sha256")
    .update(uuid.v1())
    .update(crypto.randomBytes(256))
    .digest("hex");

  await Sessions.insert({
    access_token,
    user_id,
    discord_token,
    discord_type,
  });

  console.log(
    Sessions.findOne({
      access_token,
    })
  );

  return await Sessions.findOne({
    access_token,
  });
}

export async function fetchToken(code: string) {
  const body = new URLSearchParams({
    client_id: config.oauth.clientId,
    code: code as string,
    client_secret: env.CLIENT_SECRET,
    grant_type: "authorization_code",
    redirect_uri: config.oauth.callbackURL,
    scope: config.oauth.scopes.join(" "),
  });

  const oauth = await fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return oauth;
}
