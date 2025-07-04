export interface Car {
  id: number;
  attributes: {
    name: string;
    slug: string;
    pricePerDay: number;
    deposit: number;
    engineType: string;
    seats: number;
    doors: number;
    airConditioning: boolean;
    bluetooth: boolean;
    kilometersPerDay: number;
    salikTollFee: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;

    images: {
      data: MediaItem[];
    };

    brand: {
      data: RelationItem | null;
    };

    car_category: {
      data: RelationItem | null;
    };

    car_subcategory: {
      data: RelationItem | null;
    };
  };
}

export interface MediaItem {
  id: number;
  attributes: {
    name: string;
    url: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: any;
    mime: string;
    size: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface RelationItem {
  id: number;
  attributes: {
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
  };
}

