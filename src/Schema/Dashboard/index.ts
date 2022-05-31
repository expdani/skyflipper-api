import { DashboardType } from "../../TypeDefs/Dashboard";
import { getDashboard } from "./functions";

export const GET_DASHBOARD = {
  type: DashboardType,
  // args: {
  //   // server_id: { type: GraphQLString },
  // },
  async resolve(parent: any, args: any) {
    return getDashboard();
  },
};
