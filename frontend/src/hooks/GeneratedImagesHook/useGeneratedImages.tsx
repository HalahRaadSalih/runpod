import { useMutation } from "@tanstack/react-query";
import { useLiveQuery } from "dexie-react-hooks";
import { ImageGenerationBody, ImageGenerationResponse } from "../../pages/GenerateImages/GeneratedImages.types";
import { db } from "../../models/db";
import { convertResponseToGeneratedImages } from "../../pages/GenerateImages/GeneratedImages.utils";
import axios from "axios";
import { RunPodGeneratedImages } from "../../components/GeneratedImages";

interface UseGeneratedImagesProps {
    prompt: string;
    dimentions: {width: number, height: number};
    onError: (error: Error) => void;
    onSucces: (data: RunPodGeneratedImages) => void;
}
export const useGeneratedImages = (props: UseGeneratedImagesProps) => {
    const { prompt, dimentions, onError, onSucces } = props;
    const generatedImages = useLiveQuery(() => db.generatedImages.reverse().sortBy('id'));
    const { mutate: fetchGeneratedImages, isPending} = useMutation({
        mutationFn: (requestData: ImageGenerationBody) => {
          return axios.post('http://localhost:3001', requestData)
        },
        onSuccess: (data: ImageGenerationResponse) => {
            const newImages = convertResponseToGeneratedImages(data.data.images, prompt, dimentions.width, dimentions.height);
            try {
                db.generatedImages.add(newImages);
                onSucces(newImages)
            }
            catch (error) {
                console.error('Error:', error);
            }
        },
        onError
      });
    
    return { generatedImages, isPending, fetchGeneratedImages, onError };
};