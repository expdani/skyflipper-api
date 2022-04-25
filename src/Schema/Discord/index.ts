import { GraphQLNonNull, GraphQLString } from "graphql";
import { SessionType } from "../../TypeDefs/Session";
import fetch from "cross-fetch";
import { fetchToken, initiateSession } from "./functions";
import { MessageType } from "../../TypeDefs/Messages";

enum DISCORD_ERROR {
  INVALID_REQUEST = "invalid_request",
}

export const DISCORD_API_LOGIN = {
  type: SessionType || MessageType,
  args: {
    code: { type: GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any) {
    const { code } = args;

    try {
      const oauth = await fetchToken(code);

      const oauthData = await oauth.json();

      if (oauthData.error) return [{ error: "true", message: oauthData.error }];
      else {
        const result = await fetch("https://discord.com/api/users/@me", {
          headers: {
            authorization: `${oauthData.token_type} ${oauthData.access_token}`,
          },
        });

        const data = await result.json();

        if (data)
          return initiateSession(
            data.id,
            oauthData.access_token,
            oauthData.token_type
          );
        else return { error: "true", message: "Unknown error." };
      }
    } catch (err) {
      console.log(err);
    }
  },
};
