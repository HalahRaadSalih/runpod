export type RunPodImage = {
    image: string;
    seed: string;
  }


export type RunPodGeneratedImages = {
    images: RunPodImage[];
    prompt: string;
}  
export interface RunPodImageProps {
  images?: RunPodGeneratedImages[];
  loading?: boolean;
}