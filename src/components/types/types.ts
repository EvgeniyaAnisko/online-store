export interface IBook {
    readonly id: number;
    title: string;
    img: string;
    author: string;
    year: number;
    description: string;
    category: string;
    publisher: string;
    binding: string;
    range: number;
    count: number;
    price: number;
}
