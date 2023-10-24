interface IStack<T> {
    pop: () => void;
    push: (item: T) => void;
    clear: () => void;
    getSize: () => number;
    getElements: () => T[];
};

export class Stack<T> implements IStack<T> {
    container: T[];

    constructor() {
        this.container = []
    }

    pop = (): void => {
        this.container.pop()
    }
    push = (item: T): void => {
        this.container.push(item)
    }
    clear = (): void => {
        this.container = []
    }
    getSize = (): number => {
        return this.container.length
    }

    getElements = (): T[] => {
        return this.container
    }
}