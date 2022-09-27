import { Book } from '../cards/cards';
import { inputSearch } from '../search/search';
import './filtres.css';

export let globalFilter: Array<HTMLElement> = [];

export let globalFilterCategory: Array<HTMLElement> = [];
export let globalFilterPublisher: Array<HTMLElement> = [];
export let globalFilterBinding: Array<HTMLElement> = [];
export let globalFilterRange: Array<HTMLElement> = [];

enum DataFill {
    'category',
    'publisher',
    'binding',
    'range',
}

export function filtres(book: Book, flag: boolean, fill?: HTMLElement): void {
    if (flag) {
        globalFilter = [];
        globalFilterCategory = [];
        globalFilterPublisher = [];
        globalFilterBinding = [];
        globalFilterRange = [];
        globalFilter.forEach((item) => allFiltres(item, book));
    }
    if (globalFilter.length === 0) {
        book.shop.forEach((item) => item.classList.remove('unhidden'));
    }
    if (fill && !fill.classList.contains('active')) {
        if (fill) globalFilter.push(fill);
        book.shop.forEach((item) => item.classList.remove('unhidden'));
        globalFilter.forEach((item) => allFiltres(item, book, flag));
    } else {
        if (fill) globalFilter.splice(globalFilter.indexOf(fill), 1);
        book.shop.forEach((item) => item.classList.remove('unhidden'));
        const filtresBtn: NodeListOf<HTMLElement> = document.querySelectorAll('.filtres__items-switch');
        filtresBtn.forEach((item) => item.classList.remove('active'));
        globalFilterCategory = [];
        globalFilterPublisher = [];
        globalFilterBinding = [];
        globalFilterRange = [];
        globalFilter.forEach((item) => allFiltres(item, book));
    }
    if (document.querySelectorAll('.filtres__items-switch.active').length === 0)
        book.shop.forEach((item) => item.classList.add('unhidden'));
    inputSearch();
}

function allFiltres(fill: HTMLElement, book: Book, flag?: boolean): void {
    switch (fill.dataset.type) {
        case DataFill[0]:
            fill.classList.add('active');
            book.shop.forEach((item) => {
                if (item.children[0].children[1].children[3].innerHTML === fill.innerHTML) {
                    globalFilterCategory.push(item);
                    if (
                        (globalFilterBinding.length === 0 || globalFilterBinding.includes(item)) &&
                        (globalFilterPublisher.length === 0 || globalFilterPublisher.includes(item)) &&
                        (globalFilterRange.length === 0 || globalFilterRange.includes(item))
                    ) {
                        item.classList.add('unhidden');
                    } else item.classList.remove('unhidden');
                } else if (!globalFilterCategory.includes(item)) item.classList.remove('unhidden');
                if (
                    (globalFilterCategory.length !== 0 && !globalFilterCategory.includes(item)) ||
                    (globalFilterBinding.length !== 0 && !globalFilterBinding.includes(item)) ||
                    (globalFilterPublisher.length !== 0 && !globalFilterPublisher.includes(item)) ||
                    (globalFilterRange.length !== 0 && !globalFilterRange.includes(item))
                ) {
                    item.classList.remove('unhidden');
                }
            });
            break;
        case DataFill[1]:
            fill.classList.add('active');
            book.shop.forEach((item) => {
                if (item.children[0].children[1].children[5].innerHTML === fill.innerHTML) {
                    globalFilterPublisher.push(item);
                    if (
                        (globalFilterBinding.length === 0 || globalFilterBinding.includes(item)) &&
                        (globalFilterCategory.length === 0 || globalFilterCategory.includes(item)) &&
                        (globalFilterRange.length === 0 || globalFilterRange.includes(item))
                    ) {
                        item.classList.add('unhidden');
                    } else item.classList.remove('unhidden');
                } else if (!globalFilterPublisher.includes(item)) item.classList.remove('unhidden');
                if (
                    (globalFilterCategory.length !== 0 && !globalFilterCategory.includes(item)) ||
                    (globalFilterBinding.length !== 0 && !globalFilterBinding.includes(item)) ||
                    (globalFilterPublisher.length !== 0 && !globalFilterPublisher.includes(item)) ||
                    (globalFilterRange.length !== 0 && !globalFilterRange.includes(item))
                ) {
                    item.classList.remove('unhidden');
                }
            });
            break;
        case DataFill[2]:
            fill.classList.add('active');
            book.shop.forEach((item) => {
                if (item.children[0].children[1].children[7].innerHTML === fill.innerHTML) {
                    globalFilterBinding.push(item);
                    if (
                        (globalFilterPublisher.length === 0 || globalFilterPublisher.includes(item)) &&
                        (globalFilterCategory.length === 0 || globalFilterCategory.includes(item)) &&
                        (globalFilterRange.length === 0 || globalFilterRange.includes(item))
                    ) {
                        item.classList.add('unhidden');
                    } else item.classList.remove('unhidden');
                } else if (!globalFilterBinding.includes(item)) item.classList.remove('unhidden');
                if (
                    (globalFilterCategory.length !== 0 && !globalFilterCategory.includes(item)) ||
                    (globalFilterBinding.length !== 0 && !globalFilterBinding.includes(item)) ||
                    (globalFilterPublisher.length !== 0 && !globalFilterPublisher.includes(item)) ||
                    (globalFilterRange.length !== 0 && !globalFilterRange.includes(item))
                ) {
                    item.classList.remove('unhidden');
                }
            });
            break;
        case DataFill[3]:
            fill.classList.add('active');
            book.shop.forEach((item: HTMLElement) => {
                if (
                    (item.children[0].children[1].children[2] as HTMLElement).dataset.range ===
                    fill.children[0].innerHTML
                ) {
                    globalFilterRange.push(item);
                    if (
                        (globalFilterBinding.length === 0 || globalFilterBinding.includes(item)) &&
                        (globalFilterPublisher.length === 0 || globalFilterPublisher.includes(item)) &&
                        (globalFilterCategory.length === 0 || globalFilterCategory.includes(item))
                    ) {
                        item.classList.add('unhidden');
                    } else item.classList.remove('unhidden');
                } else if (!globalFilterRange.includes(item)) item.classList.remove('unhidden');
                if (
                    (globalFilterCategory.length !== 0 && !globalFilterCategory.includes(item)) ||
                    (globalFilterBinding.length !== 0 && !globalFilterBinding.includes(item)) ||
                    (globalFilterPublisher.length !== 0 && !globalFilterPublisher.includes(item)) ||
                    (globalFilterRange.length !== 0 && !globalFilterRange.includes(item))
                ) {
                    item.classList.remove('unhidden');
                }
            });
            break;
        default:
            break;
    }
}
