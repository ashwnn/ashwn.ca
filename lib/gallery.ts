import pb from "@/lib/pocketbase";

export type GalleryImageConfig = {
  id: string;
  src: string;
  alt: string;
  thumbnail: string;
  caption?: string;
  category?: string;
  takenAt?: string;
  tags?: string[];
  location?: {
    displayText: string;
    city: string | null;
    sublocation: string | null;
    country: string | null;
  };
};

export type PocketbaseGalleryRecord = {
  id: string;
  image: string;
  caption?: string;
  category?: string;
  takenAt?: string;
  tags?: string[];
  location?: string;
};

export async function getInterestImages(
  interest: string
): Promise<GalleryImageConfig[] | null> {
  try {
    const records = await pb
      .collection("gallery")
      .getFullList<PocketbaseGalleryRecord>({
        filter: pb.filter("category = {:interest}", { interest }),
        sort: "-takenAt",
      });

    return records.map((record) => {
      const imageUrl = record.image;
      return {
        id: record.id,
        src: imageUrl,
        alt: record.location || `${interest} image`,
        thumbnail: imageUrl,
        caption: record.caption,
        category: record.category,
        takenAt: record.takenAt,
        tags: record.tags,
        location: record.location
          ? {
              displayText: record.location,
              city: null,
              sublocation: null,
              country: null,
            }
          : undefined,
      };
    });
  } catch (error) {
    console.error(`Error fetching images for ${interest} from Pocketbase:`, error);
    return null;
  }
}
