import { Photo } from "react-photo-album";

export interface RunPodImageForGallery extends Photo {
    width: number;
    height: number;
    title: string;
}

export interface ImageGalleryProps {
    images: RunPodImageForGallery[];
    loading: boolean;
}