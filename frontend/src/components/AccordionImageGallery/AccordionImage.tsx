import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    ImageListItem,
    ImageListItemBar,
    Stack,
    Typography,
} from '@mui/material';
import { GeneratedImageProps, IMAGE_LIST_ITEM_PX, ImageListItemWithHoverProps } from './types';
import { useState } from 'react';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Lightbox from 'yet-another-react-lightbox';
import { convertRunPodGeneratedImagesToGalleryImages } from './AccordionImage.utils';

export const ImageListItemWithHover = (props: ImageListItemWithHoverProps) => {
    const { item, prompt, onClick } = props;
    const [displayPromot, setDisplayPrompt] = useState(false);

    return (
        <ImageListItem
            key={item.image}
            onClick={() => onClick()}
            sx={{
                width: item.width || IMAGE_LIST_ITEM_PX,
                height: item.height || IMAGE_LIST_ITEM_PX,
                objectFit: 'cover',
                aspectRatio: '1/1',
                borderRadius: 1,
                '> img':{
                    borderRadius: 1
                }

            }}
        >
            <img src={item.image}
                alt={item.seed}
                loading="lazy"
                onMouseEnter={()=> setDisplayPrompt(true)}
                onMouseLeave={()=> setDisplayPrompt(false)}
                />
            { displayPromot && <ImageListItemBar title={prompt}/> }
        </ImageListItem>
    )
}

export const AccordionImage = (props: GeneratedImageProps): JSX.Element => {
    const { item } = props;
    const { images, prompt} = item;
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
                            <ImageListItemWithHover item={item} prompt={prompt} onClick={() =>setIndex(index)} key={item.image}/>
                        ))
                    ) : (
                        <Typography variant="body1">No available Images</Typography>
                    )}
                </AccordionDetails>
            </Accordion>
            </>
    );
};

