import React, {ChangeEvent, FormEvent, useEffect, useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import queueStyle from './queue.module.css';
import {ElementStates} from "../../types/element-states";
import {Queue} from "./queue";
import {Circle} from "../ui/circle/circle";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../constants/delays";

const maxValueLength = 4;
const queueMaxArrLength = 7;

interface IQueueArrItem {
    value: string;
    state?: ElementStates;
    head?: boolean;
    tail?: boolean;
}

export const QueuePage: React.FC = () => {
    const [queueArray, setQueueArray] = useState<IQueueArrItem[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [addLoading, setAddLoading] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }
    console.log(inputValue)

    const queue = useMemo(() => new Queue<string>(queueMaxArrLength), [])

    const initQueueItem: IQueueArrItem = {
        value: '',
        state: ElementStates.Default,
        head: false,
        tail: false,
    }

    const renderInitialArray = () => {
        const initQueue = [];
        for (let i = 0; i < queueMaxArrLength; i++) {
            initQueue.push(initQueueItem);
        }
        setQueueArray([...initQueue]);
    }

    useEffect(() => {
        renderInitialArray()
    }, []);

    const enqueue = () => {
        setAddLoading(true)
        setTimeout(() => {
            if (inputValue != '' && queue.getTail().idx != queueMaxArrLength - 1) {
                queue.enqueue(inputValue!);


                const head = queue.getHead();
                const tail = queue.getTail();

                queueArray[head.idx] = {
                    ...initQueueItem,
                    head: true,
                    value: head.value,
                }

                if (tail.idx) {
                    queueArray[tail.idx - 1].tail = false
                }

                queueArray[tail.idx] = {
                    ...queueArray[tail.idx],
                    tail: true,
                    value: tail.value,
                    state: ElementStates.Changing
                }

                setQueueArray([...queueArray])
                setInputValue('')
            }
        }, SHORT_DELAY_IN_MS)

        setTimeout(() => {
            const tail = queue.getTail();
            queueArray[tail.idx] = {
                ...queueArray[tail.idx],
                state: ElementStates.Default
            }
            setQueueArray([...queueArray])
            setAddLoading(false)
        }, DELAY_IN_MS + 500)
    }

    const dequeue = () => {
        setDeleteLoading(true)
        setTimeout(() => {
            const head = queue.getHead();
            const tail = queue.getTail();

            if (head.idx !== tail.idx) {
                queue.dequeue();

                queueArray[queue.getHead().idx - 1] = {
                    ...queueArray[queue.getHead().idx - 1],
                    state: ElementStates.Changing
                }

                setQueueArray([...queueArray])

                setTimeout(() => {
                    queueArray[queue.getHead().idx - 1] = initQueueItem;
                    queueArray[queue.getHead().idx].head = true

                    setQueueArray([...queueArray]);

                }, SHORT_DELAY_IN_MS)


            } else {
                queue.clear();
                renderInitialArray();
            }
            setDeleteLoading(false)
        }, SHORT_DELAY_IN_MS)

    }

    const clear = () => {
        queue.clear();
        renderInitialArray();
    };

    // const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     enqueue();
    // }


    const disableButtons = addLoading || deleteLoading;

    return (
        <SolutionLayout title="Очередь">
            <div className={queueStyle.mainBox}>
                <form className={queueStyle.form} onSubmit={e => e.preventDefault()}>
                    <Input extraClass={queueStyle.input} isLimitText={true} maxLength={maxValueLength}
                           onChange={onChangeInput} disabled={addLoading} value={inputValue}/>
                    <Button text="Добавить" onClick={enqueue} isLoader={addLoading}
                            disabled={disableButtons || inputValue === '' || inputValue === undefined}/>
                    <Button text="Удалить" onClick={dequeue} isLoader={deleteLoading}
                            disabled={queue.getLength() === 0 || disableButtons}/>
                    <Button text="Очистить" extraClass={'ml-30'} onClick={clear}
                            disabled={disableButtons || queue.getLength() === 0}/>
                </form>
                <div className={queueStyle.resultBox}>
                    {queueArray.map((item, idx) =>
                        <Circle letter={item.value} state={item.state} index={idx} head={item.head ? 'head' : ''}
                                tail={item.tail ? 'tail' : ''} key={idx}/>)}
                </div>
            </div>
        </SolutionLayout>
    );
};
