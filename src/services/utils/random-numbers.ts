const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

export const generateRandomArray = (maxLength: number, minLength: number, maxValue: number): Array<number> => (
    [...new Array(getRandomInt(minLength, maxLength))].map(() => Math.round(Math.random() * maxValue))
);

