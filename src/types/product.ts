export interface BestSellerProduct {
  handle: string;
  title: string;
  price: number;
  compareAtPrice: number;
  imageUrl: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface TrustItem {
  title: string;
  description: string;
  video: string | null;
}

export interface ProductData {
  handle: string;
  title: string;
  color: string;
  discount: number;
  features: string[];
  compareAtPrice: number;
  priceOnePair: number;
  priceTwoPairs: number;
  compareAtTwoPairs: number;
  twoPairUnitPrice: number;
  images: string[];
  videos: string[];
  bestSellers: BestSellerProduct[];
  faqs: FAQ[];
  trust: TrustItem[];
  instagram: {
    posts: number;
    followers: string;
    following: number;
    bio: string;
  };
  whatsappUrl: string;
  catalogUrl: string;
}
