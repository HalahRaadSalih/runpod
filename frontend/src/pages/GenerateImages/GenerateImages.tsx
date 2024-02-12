import { AppBar, Box, Button, Grid, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { GeneratedImages } from '../../components/GeneratedImages';
import { TextareaPrompt } from '../../components/TextareaPrompt';
import { ImageNumberSizeSlider, ImageSizeSlider } from '../../components/ImageSizeSlider';
import { useState } from 'react';
import { RunPodImage } from '../../components/GeneratedImages/GeneratedImages.types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface ImageGenerationBody {
    input: {
        prompt: string;
        negative_prompt: string;
        width: number;
        height: number;
        num_outputs: number;
    }
}

interface ImageGenerationResponse {
    images: RunPodImage[];

}
export const GenerateImages = () => {
    const [images, setImages] = useState<RunPodImage[]>([]);

    const mutation = useMutation({
        mutationFn: (requestData: ImageGenerationBody) => {
          return axios.post('http://localhost:3001', requestData)
        },
        onSuccess: (data: ImageGenerationResponse) => {
          setImages([...images, ...data.data.images]);
        },
        onError: (error) => {
          console.error('Error:', error);
        }
      })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const body: ImageGenerationBody = {
            input: {
                width: Number(formData.get('width')),
                height: Number(formData.get('height')),
                prompt: formData.get('prompt') as string,
                negative_prompt: formData.get('negative_prompt') as string,
                num_outputs: Number(formData.get('num_outputs')),
            }
            
        };
        mutation.mutate(body);

    };
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
                    <Grid container spacing={3}>
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
                        {mutation.isPending && <div>Loading</div>}
                        {mutation.isSuccess &&
                        <Grid item xs={12}>
                            <GeneratedImages images={images} />
                        </Grid>
                        }
                    </Grid>
                </Box>
            </Stack>
        </Box>
    );
};