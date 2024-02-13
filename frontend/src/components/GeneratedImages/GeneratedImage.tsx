import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    ImageListItem,
    Stack,
    Typography
} from '@mui/material';
import { RunPodImage } from './GeneratedImages.types';
import { useState } from 'react';
import { ImageModal } from './ImageModal';

const IMAGE_LIST_ITEM_PX = 234;

interface GeneratedImageProps {
    images: RunPodImage[];
    prompt: string;
}

export const GeneratedImage = (props: GeneratedImageProps): JSX.Element => {
    const { images, prompt } = props;
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<RunPodImage | undefined>(undefined);
    return (
        <>
            {open && <ImageModal image={selectedImage} open={open} onClose={() => setOpen(false)} prompt={prompt}/>}
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Stack direction="row" gap={2}>
                        <Stack direction="row" alignItems="center" gap={0.5}>
                            <TextSnippetIcon />
                            <Typography variant="body1">{prompt}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={0.5}>
                            <InsertPhotoOutlinedIcon />
                            <Typography variant="body1">
                                {images.length} {images.length === 1 ? 'images' : 'images'}
                            </Typography>
                        </Stack>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {images.length ? (
                        images.map((item) => (
                            <ImageListItem
                                key={item.image}
                                onClick={() => {
                                    setOpen(true);
                                    setSelectedImage(item)}}
                                sx={{
                                    width: IMAGE_LIST_ITEM_PX,
                                    height: IMAGE_LIST_ITEM_PX,
                                    objectFit: 'cover',
                                    aspectRatio: '1/1'
                                }}
                            >
                                <img src={item.image} alt={item.seed} loading="lazy" />
                            </ImageListItem>
                        ))
                    ) : (
                        <Typography variant="body1">No available Images</Typography>
                    )}
                </AccordionDetails>
            </Accordion>
            </>
    );
};

