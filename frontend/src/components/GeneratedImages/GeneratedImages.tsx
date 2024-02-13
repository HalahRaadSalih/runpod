import { CircularProgress, Typography } from "@mui/material";
import { RunPodGeneratedImages, RunPodImageProps } from "./GeneratedImages.types";
import { GeneratedImage } from "./GeneratedImage";

export const GeneratedImages = (props :RunPodImageProps) => {
    const { images, loading } = props;
    if (loading) {
        return <CircularProgress />;
    }

    if (!images) {
        return <Typography variant="body1">There are no generated images</Typography>;
    }
    return (
        <>
        {
            images.map((item: RunPodGeneratedImages, index) => (
                <GeneratedImage key={index} images={item.images} prompt={item.prompt} />
            ))
        }
        </>
    );
    };