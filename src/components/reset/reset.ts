import { Book } from '../cards/cards';
import { smoothStepsSliderAmount, smoothStepsSliderPrice } from '../slider/slider';
import { filtres } from '../filtres/filtres';

export function resetFiltres(books: Book, filtresBtn: NodeListOf<HTMLElement>): void {
    smoothStepsSliderPrice.noUiSlider?.reset();
    smoothStepsSliderAmount.noUiSlider?.reset();
    books.addSlider(
        Math.min(...books.bookPrice),
        Math.max(...books.bookPrice),
        Math.min(...books.bookCount),
        Math.max(...books.bookCount)
    );
    filtres(books, true);
    books.shop.forEach((item: HTMLElement): void => {
        item.classList.add('unhidden');
        item.classList.remove('hidden-2');
        item.classList.remove('hidden');
    });
    filtresBtn.forEach((item: HTMLElement): void => item.classList.remove('active'));
}
