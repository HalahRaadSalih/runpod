import { Dialog, DialogTitle, IconButton, DialogContent, Box, ImageListItem } from "@mui/material";
import { RunPodImage } from "./GeneratedImages.types";
import CloseIcon from '@mui/icons-material/Close';

interface ImageModalProps {
    image: RunPodImage;
    prompt: string;
    open: boolean;
    onClose: () => void;
} 

export const ImageModal = (props: ImageModalProps): JSX.Element => {
    const { image, prompt, open, onClose } = props;
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                {prompt}
            </DialogTitle>
            <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Box>
                    <ImageListItem key={image.image} 
                                    sx={{
                                        objectFit: 'cover',
                                        aspectRatio: '1/1',
                                        outline: 'none'
                                    }}>
                        <img src={image.image} alt={image.seed} loading="lazy" />
                    </ImageListItem>
                </Box>
            </DialogContent>
        </Dialog>
    )
};