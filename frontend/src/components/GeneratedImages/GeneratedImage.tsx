import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
    ImageListItem,
    ImageListItemBar,
    Link,
    Stack,
    Typography
} from '@mui/material';
import { RunPodImage } from './GeneratedImages.types';



interface GeneratedImageProps {
    images: RunPodImage[];
    prompt: string;
}

const IMAGE_LIST_ITEM_PX = 234;
export const GeneratedImage = (props: GeneratedImageProps): JSX.Element => {
    const { images, prompt } = props;
    return (
        <Accordion defaultExpanded data-testid="galleryItem">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" gap={2}>
                    
                    <Stack direction="row" alignItems="center" gap={0.5}>
                        <TextSnippetIcon />
                        <Typography variant="body1">{prompt}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                        <InsertPhotoOutlinedIcon />
                        <Typography variant="body1">
                            {images.length} {images.length === 1 ? 'photo' : 'photos'}
                        </Typography>
                    </Stack>
                </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {images.length ? (
                    images.map((item) => (
                        <ImageListItem
                            key={item.image}
                            sx={{
                                width: IMAGE_LIST_ITEM_PX,
                                height: IMAGE_LIST_ITEM_PX,
                                objectFit: 'cover',
                                aspectRatio: '1/1'
                            }}
                            data-testid="galleryItemImage"
                        >
                            <img src={item.image} alt={item.seed} loading="lazy" />
                            <ImageListItemBar
                                title={prompt}
                                actionIcon={
                                    <IconButton LinkComponent={Link} href={item.image} target="_blank">
                                        <OpenInNewIcon />
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))
                ) : (
                    <Typography variant="body1">No available Images</Typography>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

