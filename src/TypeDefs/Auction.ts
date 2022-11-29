import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
} from "graphql";
import GraphQLJSON from "graphql-type-json";

export const AuctionType = new GraphQLObjectType({
  name: "Auction",
  fields: () => ({
    uuid: { type: GraphQLNonNull(GraphQLString) },
    auctioneer: { type: GraphQLNonNull(GraphQLString) },
    profile_id: { type: GraphQLNonNull(GraphQLString) },
    start: { type: GraphQLNonNull(GraphQLString) },
    end: { type: GraphQLNonNull(GraphQLString) },
    item_name: { type: GraphQLNonNull(GraphQLString) },
    stripped_item_name: { type: GraphQLString },
    category: { type: GraphQLNonNull(GraphQLString) },
    tier: { type: GraphQLNonNull(GraphQLString) },
    starting_bid: { type: GraphQLNonNull(GraphQLInt) },
    claimed: { type: GraphQLNonNull(GraphQLBoolean) },
    highest_bid_amount: { type: GraphQLNonNull(GraphQLInt) },
    bin: { type: GraphQLNonNull(GraphQLBoolean) },
    updated_at: { type: GraphQLString },
    lowest_bin: { type: GraphQLInt },
    estimated_profit: { type: GraphQLInt },
    scanned_auctions: { type: GraphQLInt },
    stars: { type: GraphQLString },
    level: { type: GraphQLString },
    created_at: { type: GraphQLString },
  }),
});

export const AuctionBulkInputType = new GraphQLObjectType({
  name: "Auction",
  fields: () => ({
    auctions: { type: GraphQLNonNull(GraphQLJSON) },
  }),
});
