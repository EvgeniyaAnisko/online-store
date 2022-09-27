import './sorting.css';
import { Book } from '../cards/cards';

enum Sort {
    'name-up',
    'name-down',
    'year-up',
    'year-down',
}

export function sorting(sort: string, books: Book): void {
    const sortBooksTitle: string[] = books.bookName.sort();
    const sortBooksYear: string[] = books.bookYear.sort();
    const bookTitle: NodeListOf<HTMLTitleElement> = document.querySelectorAll('.book__information-title');
    const bookYear: NodeListOf<HTMLSpanElement> = document.querySelectorAll('.book__information-year');
    function sortName(sortArr: string[], cards: NodeListOf<HTMLTitleElement>): void {
        for (let i = 0; i < sortArr.length; i++) {
            for (const item of cards) {
                if (item.innerHTML === sortArr[i])
                    if (item.parentNode)
                        if (item.parentNode.parentNode)
                            if (item.parentNode.parentNode.parentElement)
                                item.parentNode.parentNode.parentElement.style.order = i.toString();
            }
        }
    }

    function sortYear(sortArr: string[], cards: NodeListOf<HTMLSpanElement>): void {
        for (let i = 0; i < sortArr.length; i++) {
            for (const item of cards) {
                if (item.innerHTML === sortArr[i])
                    if (item.parentNode)
                        if (item.parentNode.parentNode)
                            if (item.parentNode.parentNode.parentNode)
                                if (item.parentNode.parentNode.parentNode.parentElement)
                                    item.parentNode.parentNode.parentNode.parentElement.style.order = i.toString();
            }
        }
    }

    switch (sort) {
        case Sort[0]:
            sortName(sortBooksTitle, bookTitle);
            break;
        case Sort[1]:
            sortBooksTitle.reverse();
            sortName(sortBooksTitle, bookTitle);
            break;
        case Sort[2]:
            sortYear(sortBooksYear, bookYear);
            break;
        case Sort[3]:
            sortBooksYear.reverse();
            sortYear(sortBooksYear, bookYear);
            break;
        default:
            break;
    }
}
