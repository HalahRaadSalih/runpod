export type RunPodImage = {
    image: string;
    seed: string;
  }


export type RunPodGeneratedImages = {
    id?: number;
    images: RunPodImage[];
    prompt: string;
}  
export interface RunPodImageProps {
  images?: RunPodGeneratedImages[];
  loading?: boolean;
}