import { Slider, Typography } from "@mui/material";

const DEFAULT_NUM_OUTPUT= 1;
const MIN_NUM_OUTPUT = 1;
const MAX_NUM_OUTPUT = 9;

export const ImageNumberSizeSlider = () => {
    return (
        <>
            <Typography gutterBottom>Number of generated images</Typography>
            <Slider
                name="num_outputs"
                aria-label="Number of generated images"
                defaultValue={DEFAULT_NUM_OUTPUT}
                valueLabelDisplay="auto"
                step={1}
                min={MIN_NUM_OUTPUT}
                max={MAX_NUM_OUTPUT} />
        </>
    );

};
