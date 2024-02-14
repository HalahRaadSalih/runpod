import { CircularProgress, Grid, Typography } from "@mui/material";
import { RunPodGeneratedImages, RunPodImageProps } from "./types";
import { AccordionImage } from "./AccordionImage";

export const AccordionImageGallery = (props :RunPodImageProps) => {
    const { images, loading } = props;
    if (!images) {
        return <Typography variant="body1">There are no generated images</Typography>;
    }
    return (
        <>
            {loading &&
            <Grid item xs={12}
                    sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',}}>
                <CircularProgress />
            </Grid>}
            <Grid item xs={12}>
            {
                images.map((item: RunPodGeneratedImages, index) => (<AccordionImage key={index} item={item} />))
            }
        </Grid>
        </>
    );
};