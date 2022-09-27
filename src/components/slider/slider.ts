import './slider.css';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { Book } from '../cards/cards';

export const smoothStepsSliderPrice: noUiSlider.target = <HTMLTemplateElement>(
    document.getElementById('smooth-steps-price')
);
const smoothStepsPriceValues: noUiSlider.target = <HTMLTemplateElement>(
    document.getElementById('smooth-steps-price-values')
);
export const smoothStepsSliderAmount: noUiSlider.target = <HTMLTemplateElement>(
    document.getElementById('smooth-steps-amount')
);
const smoothStepsAmountValues: noUiSlider.target = <HTMLTemplateElement>(
    document.getElementById('smooth-steps-amount-values')
);

export function addSlider(minPrice: number, maxPrice: number, minAmount: number, maxAmount: number, books: Book): void {
    //price
    if (smoothStepsSliderPrice.noUiSlider) smoothStepsSliderPrice.noUiSlider.destroy();
    noUiSlider.create(smoothStepsSliderPrice, {
        start: [minPrice, maxPrice],
        behaviour: 'smooth-steps',
        step: 0.01,
        connect: true,
        range: {
            min: Math.min(...books.bookPrice),
            max: Math.max(...books.bookPrice),
        },
    });
    if (smoothStepsSliderPrice.noUiSlider)
        smoothStepsSliderPrice.noUiSlider.on('update', (values: (string | number)[]): void => {
            console.log(books.bookPrice);
            if (smoothStepsPriceValues) {
                smoothStepsPriceValues.innerHTML = values.join(' :: ');
                books.shop.forEach((item) => {
                    let temp = item.childNodes[1].childNodes[5].childNodes[1].textContent;
                    if (temp) {
                        temp = temp.slice(0, -1);
                        if (parseFloat(temp) < Number(values[0]) || parseFloat(temp) > Number(values[1]))
                            item.classList.add('hidden');
                        else item.classList.remove('hidden');
                    }
                });
            }
        });
    //amount
    if (smoothStepsSliderAmount.noUiSlider) smoothStepsSliderAmount.noUiSlider.destroy();
    noUiSlider.create(smoothStepsSliderAmount, {
        start: [minAmount, maxAmount],
        behaviour: 'tap',
        step: 1,
        connect: true,
        range: {
            min: Math.min(...books.bookCount),
            max: Math.max(...books.bookCount),
        },
    });
    if (smoothStepsSliderAmount.noUiSlider)
        smoothStepsSliderAmount.noUiSlider.on('update', (values: (string | number)[]): void => {
            if (smoothStepsAmountValues) {
                smoothStepsAmountValues.innerHTML = values.join(' :: ');
                books.shop.forEach((item) => {
                    const temp = Number(item.childNodes[1].childNodes[3].childNodes[19].textContent);
                    if (temp < Number(values[0]) || temp > Number(values[1])) item.classList.add('hidden-2');
                    else item.classList.remove('hidden-2');
                });
            }
        });
}
