import { CircularProgress, Grid } from "@mui/material";
import PhotoAlbum, { Photo } from "react-photo-album";

export interface RunPodImageForGallery extends Photo {
    width: number;
    height: number;
    prompt: string;
}

export interface ImageGalleryProps {
    images: RunPodImageForGallery[];
    loading: boolean;
}

export const ImageGallery = (props: ImageGalleryProps) => {
    const { images, loading } = props;
    if(loading){
        return(
        <Grid item xs={12} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <CircularProgress />
        </Grid>);
    }

    return(
        <PhotoAlbum photos={images} layout="rows" targetRowHeight={150}/>
    );
};