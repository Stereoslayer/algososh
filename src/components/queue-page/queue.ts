interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    getHead: () => { value: T | string; idx: number };
    getTail: () => { value: T | string; idx: number };
    clear: () => void;
    getLength: () => number;
    getElements: () => (string | T)[];
}

export class Queue<T> implements IQueue<T> {
    private container: (T | string)[];
    private head = 0;
    tail = 0;
    private length = 0;
    private size = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(this.size);
    }

    enqueue = (item: T): void => {
        this.container[this.tail] = item;
        this.tail += 1;
        this.length += 1;
    }

    dequeue = (): void => {
        if (this.head === this.size) {
            this.head = 0
        }

        this.container[this.head] = '';
        this.head += 1;
        this.length += 1;
    }

    getHead = () => {
        return {
            value: this.container[this.head],
            idx: this.head
        }
    }

    getTail = () => {
        return {
            value: this.container[this.tail - 1],
            idx: this.tail - 1
        }
    }

    clear = (): void => {
        this.container = [];
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    }

    getLength = () => {
        return this.length
    }

    getElements = () => {
        return this.container
    }
}