import './global.css';

import { Book } from './components/cards/cards';
import { sorting } from './components/sort/sort';
import { filtres } from './components/filtres/filtres';
import { resetFiltres } from './components/reset/reset';
import { inputSearch } from './components/search/search';

export let globalMinPrice = 0;
export let globalMaxPrice = 0;
export let globalMinAmount = 0;
export let globalMaxAmount = 0;

console.log('Hello Online store');

let globalSort: string;

const books = new Book();

const sort: HTMLSelectElement = <HTMLSelectElement>document.querySelector('.sorting__item');
sort.addEventListener('click', (): void => {
    sorting(sort.value, books);
    globalSort = sort.value;
});

const filtresBtn: NodeListOf<HTMLElement> = document.querySelectorAll('.filtres__items-switch');
filtresBtn.forEach((item: HTMLElement): void => item.addEventListener('click', () => filtres(books, false, item)));

const resetBtn: HTMLElement = <HTMLElement>document.querySelector('.button-reset');
resetBtn.addEventListener('click', (): void => resetFiltres(books, filtresBtn));

const resetBtnStorage: HTMLElement = <HTMLElement>document.querySelector('.button-reset-storage');
resetBtnStorage.addEventListener('click', (): void => {
    localStorage.clear();
    globalMinPrice = 0;
    globalMaxPrice = 0;
    globalMinAmount = 0;
    globalMaxAmount = 0;
    globalSort = '';
});

const input: HTMLInputElement = <HTMLInputElement>document.querySelector('#input');

input.addEventListener('input', () => {
    inputSearch();
});

function setLocalStorage() {
    if (globalSort !== '') localStorage.setItem('globalSort', globalSort);
    if (globalMaxPrice) {
        const amount = document.getElementById('smooth-steps-amount-values');
        if (amount) {
            const tempAmount: Array<string> = amount.innerHTML.split(' :: ');
            localStorage.setItem('minAmount', tempAmount[0]);
            localStorage.setItem('maxAmount', tempAmount[1]);
        }
        const price = document.getElementById('smooth-steps-price-values');
        if (price) {
            const tempPrice: Array<string> = price.innerHTML.split(' :: ');
            localStorage.setItem('minPrice', tempPrice[0]);
            localStorage.setItem('maxPrice', tempPrice[1]);
        }
    }
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('globalSort')) {
        const globalSort = localStorage.getItem('globalSort');
        if (globalSort) sorting(globalSort, books);
    }
    console.log(
        localStorage.getItem('minPrice'),
        localStorage.getItem('maxPrice'),
        localStorage.getItem('minAmount'),
        localStorage.getItem('maxAmount')
    );
    if (
        localStorage.getItem('minPrice') &&
        localStorage.getItem('maxPrice') &&
        localStorage.getItem('minAmount') &&
        localStorage.getItem('maxAmount')
    ) {
        globalMinPrice = Number(localStorage.getItem('minPrice'));
        globalMaxPrice = Number(localStorage.getItem('maxPrice'));
        globalMinAmount = Number(localStorage.getItem('minAmount'));
        globalMaxAmount = Number(localStorage.getItem('maxAmount'));
        books.addSlider(globalMinPrice, globalMaxPrice, globalMinAmount, globalMaxAmount);
    }
}

window.addEventListener('load', getLocalStorage);
