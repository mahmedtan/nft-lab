export interface Theme {
  variants: {
    hero: Variant.PRIMARY;
    about: Variant;
    team: Variant;
    faq: Variant;
    roadmap: Variant;
    collection: Variant.PRIMARY;
  };

  links: {
    twitter: string;
    discord: string;
    facebook: string;
    instagram: string;
  };
}

export enum Variant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface HashObject {
  type?: string;
  access_token?: string;
}

export enum PROCESS_STATE {
  IDLE,
  IN_PROGRESS,
  ERROR,
  SUCCESS,
}

export interface Data {
  collection: Collection;

  nfts: NFT[];
}

export interface Collection {
  created_at: Date;
  title: string;
  creator: string;
  description: string;
  initial_token: number;
  id: string;
  image: string;
  user_email: string;
}
export interface NFT {
  created_at: Date;
  title: string;
  creator: string;
  description: string;
  id: string;
  collection_id: string;
  image: string;
  initial_token: number;
  final_token: number;

  attributes: {
    display_type?: string;
    value: any;
    trait_type: string;
    max_value: number;
  }[];
}

export interface TransactionLog {
  id: string;
  nftId: string;
  tokenId: number;
  status: TransactionStatus;
  created_at: number;
}

export type DisplayType =
  | "date"
  | "boost_percentage"
  | "number"
  | "boost_number"
  | "default";

export interface WalletResponse {
  status: StatusWallet;
  address?: string;
  message: string;
}

export type StatusWallet = "success" | "failure" | "info";

export enum TransactionStatus {
  pending = "pending",
  success = "success",
}
