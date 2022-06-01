import type { NextApiRequest, NextApiResponse } from "next";
import { createClient, PostgrestError } from "@supabase/supabase-js";
import { NFT } from "utils/types";

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { tokenId } = req.query;

  if (!tokenId) return res.status(400).json({ message: "Bad Request" });

  const {
    data: nfts,
    error: nftError,
  }: { data: NFT[] | null; error: PostgrestError | null } = await supabaseClient
    .from("nft")
    .select("*");

  if (nftError || !nfts?.length)
    return res.status(404).json({ message: "token non-existant" });

  const nft = nfts?.find(
    (nft: NFT) => nft.final_token >= +tokenId && nft.initial_token <= +tokenId
  );

  if (!nft) return res.status(404).json({ message: "token non-existant" });

  res.json({
    name: nft.title,
    description: nft.description,
    image: nft.image,
    attributes: nft.attributes,
  });
};
