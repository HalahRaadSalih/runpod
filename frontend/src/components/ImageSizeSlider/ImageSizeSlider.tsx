import { FormControl, FormLabel, Grid, Slider, Typography } from "@mui/material";
import { DEFAULT_IMAGE_SIZE, MAX_SIZE, MIN_SIZE } from "./ImageSizeSlider.constants";

const marks = [
    {
      value: 128,
      label: '128px',
    },
    {
      value: 256,
      label: '256px',
    },
    {
      value: 384,
      label: '384px',
    },
    {
      value: 448,
      label: '448px',
    },
    {
        value: DEFAULT_IMAGE_SIZE,
        label: '512px',
    },
    {
        value: 640,
        label: '640px',
    },
    {
        value: 768,
        label: '768px',
    }
  ];

const valuetext = (value: number) => {
    return `${value}px`;
}

interface ImageSizeSliderProps {
    label: string;
    name: string;

}

export const ImageSizeSlider = (props: ImageSizeSliderProps) => {
    const { label, name } = props;
    return(
            <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel>{label}</FormLabel>
                <Slider
                    name={name}
                    aria-label="Image Size"
                    defaultValue={DEFAULT_IMAGE_SIZE}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    marks={marks}
                    step={null}
                    min={MIN_SIZE}
                    max={MAX_SIZE}
                    sx={{
                      '& .MuiSlider-markLabel': {
                        fontSize: 12,
                        fontWeight: 'normal',
                      },
                    }}
                />
                </FormControl>
            </Grid>
    );
};