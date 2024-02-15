import { FormControl, FormLabel, Grid, Slider, Typography } from "@mui/material";

const DEFAULT_NUM_OUTPUT= 1;
const MIN_NUM_OUTPUT = 1;
const MAX_NUM_OUTPUT = 9;

export const ImageNumberSizeSlider = () => {
    return (
        <Grid item xs={12}>
            <FormControl fullWidth>
                <FormLabel>Number of generated images</FormLabel>
                <Slider
                    name="num_outputs"
                    aria-label="Number of generated images"
                    defaultValue={DEFAULT_NUM_OUTPUT}
                    valueLabelDisplay="on"
                    getAriaValueText={(value) => `${value}`}
                    marks
                    step={1}
                    min={MIN_NUM_OUTPUT}
                    max={MAX_NUM_OUTPUT} />
            </FormControl>
        </Grid>
    );

};
