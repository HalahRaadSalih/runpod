import { Slider, Typography } from "@mui/material";

const DEFAULT_SIZE = 512;
const MIN_SIZE = 128;
const MAX_SIZE = 768;

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
        value: DEFAULT_SIZE,
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
    // todo: fix slider labels size
    const { label, name } = props;
    return(
            <>
                <Typography gutterBottom>
                    {label}
                </Typography>
                <Slider
                    name={name}
                    aria-label="Image Size"
                    defaultValue={DEFAULT_SIZE}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    marks={marks}
                    step={null}
                    min={MIN_SIZE}
                    max={MAX_SIZE}
                />
            </>
    );
};