import { addSlider } from '../slider/slider';
import { IBook } from '../types/types';
import './cards.css';

export class Book {
    public shop!: NodeListOf<HTMLElement>;
    public bookId: Array<number> = [];
    public bookPrice: Array<number> = [];
    public bookCount: Array<number> = [];
    public bookName: Array<string> = [];
    public bookYear: Array<string> = [];
    public bookActive: Array<string> = [];

    constructor() {
        this.getBooks();
    }

    protected getBooks(): void {
        const books = './src/assets/books.json';
        fetch(books)
            .then(this.errorHandler.bind(this))
            .then((res: Response) => res.json())
            .then((data: IBook[]) => {
                this.addCards(data);
                for (const item of data) {
                    this.bookId.push(item.id);
                    this.bookPrice.push(item.price);
                    this.bookCount.push(item.count);
                    this.bookName.push(item.title);
                    this.bookYear.push(item.year.toString());
                }
                console.log('bb');
                this.addSlider(
                    Math.min(...this.bookPrice),
                    Math.max(...this.bookPrice),
                    Math.min(...this.bookCount),
                    Math.max(...this.bookCount)
                );
            })
            .catch((err: Error) => console.error(err));
    }

    public addSlider(
        globalMinPrice: number,
        globalMaxPrice: number,
        globalMinAmount: number,
        globalMaxAmount: number
    ): void {
        addSlider(globalMinPrice, globalMaxPrice, globalMinAmount, globalMaxAmount, this);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    public addCards(data: IBook[]): void {
        const cardsWrapper: HTMLElement = <HTMLElement>document.querySelector('.cards');
        cardsWrapper.innerHTML = '';
        for (const book of data) {
            const newCard = `
    <div class="card unhidden" data-id="${book.id}">
    <div class="book">
        <img class="book__image" src=${book.img} alt="${book.title}"/>
        <div class="book__iformation">
            <h2 class="book__information-title">${book.title}</h2>
            <h3 class="book__information-author">
            ${book.author}, <span class="book__information-year">${book.year}</span>
            </h3>
            <div class="book__information-range" data-range=${book.range}>
                <img src="./src/assets/svg/starActive.svg" alt="1" />
                <img src="./src/assets/svg/star${book.range - 1 > 0 ? 'Active' : ''}.svg" alt="2" />
                <img src="./src/assets/svg/star${book.range - 2 > 0 ? 'Active' : ''}.svg" alt="3" />
                <img src="./src/assets/svg/star${book.range - 3 > 0 ? 'Active' : ''}.svg" alt="4" />
                <img src="./src/assets/svg/star${book.range - 4 > 0 ? 'Active' : ''}.svg" alt="5" />
            </div>
            <span class="book__information-category"> ${book.category} </span>
            <span class="book__information-subtitle">Издательство</span>
            <span class="book__information-publisher"> ${book.publisher} </span>
            <span class="book__information-subtitle">Переплёт</span>
            <span class="book__information-binding"> ${book.binding} </span>
            <span class="book__information-subtitle">Остаток на складе</span>
            <span class="book__information-count"> ${book.count} </span>
        </div>
        <div class="book__sales">
            <span class="price">${book.price}$</span>
            <div class="btns">
                <button class="button-more btn">Product Details</button>
                <button class="button-basket btn">
                    <img src="./src/assets/svg/heart.svg" alt="to-basket" />
                    Add to whish
                </button>
            </div>
        </div>
    </div>
</div>
`;
            cardsWrapper.insertAdjacentHTML('beforeend', newCard);
        }
        const bracket = document.querySelector('.counter') as HTMLElement;
        this.shop = document.querySelectorAll('.card');
        this.shop.forEach((card: HTMLElement): void =>
            card.addEventListener('click', () => {
                let counter: number = parseInt(bracket.innerHTML, 10);
                if (card.classList.contains('active')) {
                    counter--;
                    card.classList.toggle('active');
                } else {
                    if (counter === 20) {
                        alert('Извините, все слоты заполнены');
                    } else {
                        counter++;
                        card.classList.toggle('active');
                    }
                }
                bracket.innerHTML = String(counter);
            })
        );
    }
}
