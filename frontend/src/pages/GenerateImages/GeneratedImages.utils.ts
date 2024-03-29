import { RunPodGeneratedImages, RunPodImage } from "../../components/AccordionImageGallery";
import { RunPodImageForGallery } from "../../components/ImageGallery";
import { DEFAULT_IMAGE_SIZE, IMAGE_SIZE_VALUES } from "../../components/ImageSizeSlider";
import { ImageGenerationBody, ValidationError } from "./GeneratedImages.types";


const NUM_OUTPUTS_RANGE = Array.from({length: 9}, (_, i) => i + 1)
export const convertResponseToGeneratedImages = (images: RunPodImage[], prompt: string, width: number, height: number): RunPodGeneratedImages => {
    const newImages= images.map((image) => {
        return {
            ...image,
            src: image.image,
            width: width,
            height: height,
            title: prompt,
        }
    });
    return {
        images: newImages,
        prompt: prompt
    }
};


export const validateImageGenerationBody = (body: ImageGenerationBody): ValidationError => { 
    if(!IMAGE_SIZE_VALUES.includes(body.input.width)){
        return {
            error: true,
            message: 'Invalid width'
        };
    }
    if(!IMAGE_SIZE_VALUES.includes(body.input.height)){
        return {
            error: true,
            message: 'Invalid height'
        };
    }
    if(!NUM_OUTPUTS_RANGE.includes(body.input.num_outputs)){
        return {
            error: true,
            message: 'Invalid number of outputs'
        };
    }

    return {
        error: false,
    }
};

export const convertRunPodGeneratedImagesToGalleryImages= (images: RunPodGeneratedImages[]): RunPodImageForGallery[] => {
    const convertedImages: RunPodImageForGallery[] = [];
    images.flatMap((imageSet) => {
        imageSet.images.forEach((image) => {
            convertedImages.push( {
                src: image.image,
                width: imageSet.width || DEFAULT_IMAGE_SIZE,
                height: imageSet.height || DEFAULT_IMAGE_SIZE,
                title: imageSet.prompt
            })
        });
    });

    return convertedImages;
};