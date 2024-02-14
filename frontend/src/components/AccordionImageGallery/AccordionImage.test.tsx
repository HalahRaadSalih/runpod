import { render, screen, waitFor } from '@testing-library/react';
import { AccordionImage, ImageListItemWithHover } from './AccordionImage';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('<ImageListItemWithHover />', () => {
    it('Renders an image with a prompt, when hovered it displays the prompt', async() => {
        const test = 'test';
        const prompt = 'prompt';
        const dimention = 100;
        const imageSrc = 'imgSrc'
        const onClick = vi.fn();
        const item = {
            src: imageSrc,
            image: imageSrc,
            seed: test,
            prompt,
            width: dimention,
            height: dimention,
        };
        render(<ImageListItemWithHover item={item} prompt={test} onClick={onClick} />);
        const image = screen.getByRole('img', { name: test });
        expect(image).toBeInTheDocument();
        await userEvent.hover(image);
        const imageListItemBar = screen.getByText(test);
        expect(imageListItemBar).toBeInTheDocument();
        await userEvent.unhover(image);
        await waitFor(() => expect(screen.queryByText(test)).not.toBeInTheDocument());
        await userEvent.click(image);
        expect(onClick).toHaveBeenCalled();
    });
});
describe('<AccordionImage />', () => {
    it('Renders an accordion with an image, when clicked it displays a Lightbox', async() => {
        const test = 'test';
        const dimention = 100;
        const imageSrc = 'imgSrc'
        const images = [{
            src: imageSrc,
            image: imageSrc,
            seed: test,
            prompt: test,
            width: dimention,
            height: dimention,
        }];
        const item = {
            images,
            prompt: "test",
        };
        render(<AccordionImage item={item} />);
        const accordionTitle = screen.getByRole('button', { name: `${test} ${images.length} image` });
        expect(accordionTitle).toBeInTheDocument();
        const image = screen.getByRole('img', { name: test });
        expect(image).toBeInTheDocument();
        await userEvent.click(image);
        expect(screen.getByRole('presentation')).toBeInTheDocument();
        const close = screen.getByRole('button', { name: 'Close' });
        expect(close).toBeInTheDocument();
        await userEvent.click(close);
        await waitFor(() => expect(screen.queryByRole('presentation')).not.toBeInTheDocument())
    });
});