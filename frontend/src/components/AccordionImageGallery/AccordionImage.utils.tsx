import { RunPodImageForGallery } from "../ImageGallery/ImageGallery.types";
import { RunPodImage } from "./GeneratedImages.types";

export const convertRunPodGeneratedImagesToGalleryImages= (images: RunPodImage[]): RunPodImageForGallery[] => {
    return images.map((image) => ({
            src: image.image,
            width: image.width ,
            height: image.height,
            title: image.prompt
        })
);
}