export function inputSearch(): void {
    const input: HTMLInputElement = <HTMLInputElement>document.querySelector('#input');
    const visibleCard: NodeListOf<HTMLElement> = document.querySelectorAll('.card');
    visibleCard.forEach((item) => {
        if (
            item.innerText.toUpperCase().indexOf(input.value.toUpperCase()) < 0 ||
            !item.classList.contains('unhidden')
        ) {
            item.classList.add('unvisible');
        } else item.classList.remove('unvisible');
    });
    if (input.value === '') {
        const unvisibleCrad: NodeListOf<HTMLElement> = document.querySelectorAll('.card.unvisible');
        unvisibleCrad.forEach((item) => item.classList.remove('unvisible'));
    }
    let counter = 0;
    const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.card');
    cards.forEach((item) => {
        if (
            item.classList.contains('hidden') ||
            item.classList.contains('hidden-2') ||
            item.classList.contains('unvisible') ||
            !item.classList.contains('unhidden')
        )
            counter++;
    });
    if (counter === visibleCard.length) alert('Извините, совпадений не обнаружено');
}
