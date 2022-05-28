import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
} from "graphql";
import GraphQLJSON from "graphql-type-json";

export const DashboardType = new GraphQLObjectType({
  name: "Dashboard",
  fields: () => ({
    highlights: { type: HighlightsType },
    statistics: { type: StatisticsType },
  }),
});

export const HighlightsType = new GraphQLObjectType({
  name: "Highlights",
  fields: () => ({
    sessions: {
      type: new GraphQLObjectType({
        name: "HighlightSessions",
        fields: () => ({
          week: { type: GraphQLInt },
          last_week: { type: GraphQLInt },
        }),
      }),
    },
    total_votes_weekly: {
      type: new GraphQLObjectType({
        name: "HighlightTotalVotesWeekly",
        fields: () => ({
          week: { type: GraphQLInt },
          last_week: { type: GraphQLInt },
        }),
      }),
    },
    total_votes: {
      type: new GraphQLObjectType({
        name: "HighlightTotalVotes",
        fields: () => ({
          total: { type: GraphQLInt },
        }),
      }),
    },
  }),
});

export const StatisticsType = new GraphQLObjectType({
  name: "Statistics",
  fields: () => ({
    total_votes: {
      type: new GraphQLObjectType({
        name: "StatisticsTotalVotes",
        fields: () => ({
          upvotes: { type: GraphQLInt },
          downvotes: { type: GraphQLInt },
        }),
      }),
    },
  }),
});
