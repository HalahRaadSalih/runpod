export const IMAGE_LIST_ITEM_PX = 234;

export type RunPodImage = {
    image: string;
    seed: string;
    width?: number;
    height?: number;
    prompt?: string;
  }


export type RunPodGeneratedImages = {
    id?: number;
    images: RunPodImage[];
    prompt: string;
    width?: number;
    height?: number;
}  
export interface RunPodImageProps {
  images?: RunPodGeneratedImages[];
  loading?: boolean;
}

export interface GeneratedImageProps {
  item: RunPodGeneratedImages
}