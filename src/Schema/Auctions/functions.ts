import { Auctions } from "../../Entities/Auctions";
import { Bins } from "../../Entities/Bins";

export async function getBins(amount?: number) {
  const bins = await Bins.find({
    order: {
      created_at: "DESC",
    },
    take: amount || 20,
  });

  return bins;
}

export async function getAuctions(amount?: number) {
  const auctions = await Auctions.find({
    order: {
      created_at: "DESC",
    },
    take: amount || 20,
  });

  return auctions;
}

export function bulkAddBins(auctions: any) {
  auctions.forEach((a: any) => {
    if (a.bin && !a.claimed) Bins.save(a);
  });
}
