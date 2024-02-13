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
import { GeneratedImageProps, IMAGE_LIST_ITEM_PX } from './GeneratedImages.types';
import { useState } from 'react';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Lightbox from 'yet-another-react-lightbox';
import { convertRunPodGeneratedImagesToGalleryImages } from './GeneratedImage.utils';


export const GeneratedImage = (props: GeneratedImageProps): JSX.Element => {
    const { item } = props;
    const { images, prompt, width, height } = item;
    const [index, setIndex] = useState(-1);
    const galleryImages = convertRunPodGeneratedImagesToGalleryImages(images);

    return (
        <>
            <Lightbox
                slides={galleryImages}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                plugins={[Captions]}
            />
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
                                {images.length} {images.length === 1 ? 'image' : 'images'}
                            </Typography>
                        </Stack>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {images.length ? (
                        images.map((item, index) => (
                            <ImageListItem
                                key={item.image}
                                onClick={() => {
                                    setIndex(index);
                                }}
                                sx={{
                                    width: width || IMAGE_LIST_ITEM_PX,
                                    height: height || IMAGE_LIST_ITEM_PX,
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

