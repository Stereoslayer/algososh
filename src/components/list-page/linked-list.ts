interface ILinkedList<T> {
    prepend: (item: T) => void;
    append: (item: T) => void;
    addByIndex: (item: T, index: number) => void;
    deleteByIndex: (index: number) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    getSize: () => number;
    toArray: () => T[] | undefined;
}

export class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;
    prev: LinkedListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

export class LinkedList<T> implements ILinkedList<T> {
    head: LinkedListNode<T> | null;
    tail: LinkedListNode<T> | null;
    size: number;

    constructor(arr: T[]) {
        this.head = new LinkedListNode<T>(arr[0]);
        this.tail = this.head;
        this.size = 1;

        for (let i = 1; i < arr.length; i++) {
            this.append(arr[i]);
        }
    }

    getSize = () => {
        return this.size;
    };

    prepend = (value: T) => {
        const node = new LinkedListNode<T>(value);

        if (this.head) {
            this.head.prev = node;
        }
        if (!this.tail) {
            this.tail = node;
        }

        node.next = this.head;
        this.head = node;
        this.size += 1;
    }

    append = (value: T) => {
        const node = new LinkedListNode<T>(value);

        if (this.tail) {
            this.tail.next = node;
        }
        if (!this.head) {
            node.next = this.head;
            this.head = node;
        }

        node.prev = this.tail;
        this.tail = node;
        this.size += 1;
    }

    addByIndex = (value: T, idx: number) => {
        if (idx > this.getSize() || idx < 0) {
            return null
        } else {
            const node = new LinkedListNode<T>(value);
            if (idx === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                let curr = this.head;
                let currIdx = 0;
                let prev = this.head;
                while (currIdx < idx) {
                    if (curr) {
                        currIdx++;
                        prev = curr;
                        curr = curr.next;
                    }
                }
                node.next = curr;
                if (prev) {
                    prev.next = node;
                }
            }
            this.size += 1;
        }
    }

    deleteByIndex = (idx: number) => {
        if (idx < 0 || idx > this.size) {
            return null
        }
        let curr = this.head;
        if (idx === 0 && curr) {
            this.head = curr.next;
        } else {
            let prev = null;
            let currIdx = 0;
            while (currIdx < idx && curr) {
                prev = curr;
                curr = curr.next;
                currIdx++
            }
            if (prev && curr) {
                prev.next = curr.next
            }
        }
        this.size -= 1;
    }

    deleteHead = () => {
        if (!this.head) {
            return null
        }

        const delHead = this.head;
        if (delHead.next) {
            this.head = delHead.next;
        } else {
            this.head = null;
            this.tail = null;
        }
        this.size -= 1;
    }

    deleteTail = () => {
        if (!this.tail || !this.head) {
            return null
        }

        const delTail = this.tail;
        if (delTail.prev) {
            this.tail = delTail.prev;
        }

        if (this.tail) {
            this.tail.next = null
        }

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }
        this.size -= 1;
    }

    toArray = () => {
        const arr: T[] = [];

        if (this.head) {
            let node = this.head;
            while (node.next) {
                arr.push(node.value);
                node = node.next;
            }

            arr.push(node.value)
            return arr
        }
        return arr
    }
}