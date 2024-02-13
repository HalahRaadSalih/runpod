import { AppBar, Box, Button, FormControlLabel, FormGroup, Grid, IconButton, Stack, Switch, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { TextareaPrompt } from '../../components/TextareaPrompt';
import { ImageNumberSizeSlider, ImageSizeSlider } from '../../components/ImageSizeSlider';
import { useEffect, useState } from 'react';
import { RunPodGeneratedImages } from '../../components/GeneratedImages/GeneratedImages.types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { db } from '../../models/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { ImageGenerationBody, ImageGenerationResponse } from './GeneratedImages.types';
import { convertResponseToGeneratedImages, convertRunPodGeneratedImagesToGalleryImages, validateImageGenerationBody } from './GeneratedImages.utils';
import { enqueueSnackbar } from 'notistack';
import { DEFAULT_IMAGE_SIZE } from '../../components/ImageSizeSlider/ImageSizeSlider';
import { GeneratedImages } from '../../components/GeneratedImages';
import { ImageGallery } from '../../components/ImageGallery';


export const GenerateImages = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [images, setImages] = useState<RunPodGeneratedImages[]>([]);
    const [dimentions, setDimentions] = useState({width: DEFAULT_IMAGE_SIZE, height: DEFAULT_IMAGE_SIZE});
    const [groupByPrompt, setGroupByPrompt] = useState<boolean>(true);
    const generatedImages = useLiveQuery(() => db.generatedImages.reverse().sortBy('id'));
    const mutation = useMutation({
        mutationFn: (requestData: ImageGenerationBody) => {
          return axios.post('http://localhost:3001', requestData)
        },
        onSuccess: (data: ImageGenerationResponse) => {
            const newImages = convertResponseToGeneratedImages(data.data.images, prompt, dimentions.width, dimentions.height);
            images.unshift(newImages)
            setImages(images);
            try {
                db.generatedImages.add(newImages);
            }
            catch (error) {
                console.error('Error:', error);
            }
        },
        onError: (error) => {
            enqueueSnackbar(error.message, { variant: 'error', persist: false, autoHideDuration: 1000});
        }
      });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const promptValue = formData.get('prompt') as string;
        const width = Number(formData.get('width'));
        const height = Number(formData.get('height'));
        setPrompt(promptValue);
        setDimentions({width, height});
        const body: ImageGenerationBody = {
            input: {
                width: width,
                height: height,
                prompt: promptValue,
                negative_prompt: formData.get('negative_prompt') as string,
                num_outputs: Number(formData.get('num_outputs')),
            }
        };
        const {error, message } = validateImageGenerationBody(body);
        if(!error){
            mutation.mutate(body);
        }
        else {
            enqueueSnackbar(message, { variant: 'error', persist: false, autoHideDuration: 1000});
        }
    };

    useEffect(() => {
        if (generatedImages) {
            setImages(generatedImages);
        }
    }, [generatedImages]);

    return (
        <Box sx={{ 
            display: 'flex', 
            flexFlow: 1, 
            minHeight: '100vh',
            flexDirection: 'column',
            height: '100%',
            width: '100vw', }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Runpond Image Generator
                    </Typography>
                </Toolbar>
            </AppBar>
            <Stack
                gap={2}
                flex="1 1 100%"
                padding={2}
                >
                <Box component={'form'} onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item md={7}>
                            <TextareaPrompt name='prompt' placeholder='Please enter your prompt here' required/>
                            <TextareaPrompt name='negative_prompt' placeholder='Please enter your negative prompt here(optional)' />
                        </Grid>
                        <Grid item md={4}>
                            <Box sx={{ width: '450px'}}>
                            <ImageSizeSlider label='Width' name='width'/>
                            <ImageSizeSlider label='Height' name='height'/>
                            <ImageNumberSizeSlider />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sx={{ justifyContent: 'flex-end'}}>
                            <Button type="submit" variant='contained'>Generate Images</Button>             
                        </Grid>
                    </Grid>
                </Box>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch defaultChecked />}
                            label="Group Images By Prompt"
                            onChange={() => setGroupByPrompt(!groupByPrompt)}
                            />
                    </FormGroup>
                    </Grid>
                </Grid >
                { groupByPrompt &&
                    <Box>
                        <Grid container spacing={4}>
                            <GeneratedImages images={images} loading={mutation.isPending}/>
                        </Grid>
                    </Box>
                }
                { !groupByPrompt &&
                    <Box>
                        <ImageGallery images={convertRunPodGeneratedImagesToGalleryImages(images)} loading={mutation.isPending}/>
                    </Box>
                }
            </Stack>
        </Box>
    );
};