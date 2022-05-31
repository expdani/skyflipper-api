import { createQueryBuilder, MoreThan } from "typeorm";
import { KarmaPosts } from "../../Entities/KarmaPosts";
import { Sessions } from "../../Entities/Sessions";

export async function getDashboard() {
  return {
    highlights: {
      sessions: await getSessionsHighlight(),
      total_votes: await getReactionsHighlight(),
      total_messages: await getMessagesHighlight(),
    },
    statistics: {
      total_votes: await getUpvotesAndDownvotesStatistics(),
    },
  };
}

export async function getUpvotesAndDownvotesStatistics() {
  const downvotesCount = await KarmaPosts.count({
    vote: "downvote",
  });
  const upvotesCount = await KarmaPosts.count({
    vote: "upvote",
  });

  return {
    upvotes: upvotesCount,
    downvotes: downvotesCount,
  };
}

export async function getSessionsHighlight() {
  const lastWeek = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  const totalCount = await Sessions.count();
  const weekCount = await Sessions.count({
    created_at: MoreThan(lastWeek),
  });

  return {
    total: totalCount,
    week: weekCount,
  };
}

export async function getReactionsHighlight() {
  const lastWeek = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  const totalCount = await KarmaPosts.count();
  const weekCount = await KarmaPosts.count({
    created_at: MoreThan(lastWeek),
  });

  return {
    total: totalCount,
    week: weekCount,
  };
}

export async function getMessagesHighlight() {
  const lastWeek = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const totalCount = await createQueryBuilder("karma_posts")
    .select("COUNT(DISTINCT(message_id)) as count")
    .getRawOne();

  const weekCount = await createQueryBuilder("karma_posts")
    .select("COUNT(DISTINCT(message_id)) as count")
    .where("created_at > :lastWeek", { lastWeek })
    .getRawOne();

  return {
    total: parseInt(totalCount.count),
    week: parseInt(weekCount.count),
  };
}
