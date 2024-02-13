import { RunPodImage } from "../../components/GeneratedImages";

export interface ImageGenerationBody {
    input: {
        prompt: string;
        negative_prompt: string;
        width: number;
        height: number;
        num_outputs: number;
    }
}

export interface ImageGenerationResponse {
    data: {
        images: RunPodImage[];
    }
}

export type ValidationError = {
    error: boolean;
    message?: string;
}


