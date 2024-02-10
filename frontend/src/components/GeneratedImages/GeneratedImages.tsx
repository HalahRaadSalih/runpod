import { ImageList, ImageListItem } from "@mui/material";
import { RunPodImage, RunPodImageProps } from "./GeneratedImages.types";

export const GeneratedImages = (props :RunPodImageProps) => {
    // todo: add loading state
    // todo: add error state
    // todo: add empty state
    // todo: use a different image library
    // todo when hoevring over image, show a larger version + show prompt text
    const { images } = props;
    if (!images || images.length === 0) {
        return null;
    } 
    return (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {images.map((item: RunPodImage) => (
                <ImageListItem key={item.image}>
                    <img
                    srcSet={`${item.image}`}
                    src={`${item.image}`}
                    alt={item.seed}
                    loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
    };