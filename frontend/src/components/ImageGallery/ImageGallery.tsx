import { CircularProgress, Grid } from "@mui/material";
import { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Captions  from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import { ImageGalleryProps } from "./ImageGallery.types";

export const ImageGallery = (props: ImageGalleryProps) => {
    const { images, loading } = props;
    const [index, setIndex] = useState(-1);

    return(
        <>
            {loading &&
            <Grid item xs={12}
                    sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 4
                }}
                    >
                <CircularProgress />
            </Grid>}
            <PhotoAlbum photos={images} layout="rows" onClick={({index}) => setIndex(index)}/>
            <Lightbox
                slides={images}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                plugins={[Captions]}
            />
        </>
    );
};