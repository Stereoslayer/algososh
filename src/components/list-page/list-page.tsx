import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import listStyle from './list.module.css';
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {generateRandomArray} from "../../services/utils/random-numbers";
import {ElementStates} from "../../types/element-states";
import {LinkedList} from "./linked-list";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../constants/delays";

const minLength = 2;
const maxLength = 7;
const maxValue = 100;
const maxInputLength = 4;

interface IListArrayItem {
    value: string;
    state: ElementStates;
    head: string | React.ReactElement | null;
    tail: string | React.ReactElement | null;
}

const getInitArr = (): IListArrayItem[] => {
    const arr: Array<number> = generateRandomArray(maxLength, minLength, maxValue);
    return arr.map((item, idx) => {
        return {
            value: item.toString(),
            state: ElementStates.Default,
            head: idx === 0 ? 'head' : null,
            tail: idx === arr.length - 1 ? 'tail' : null
        }
    })
}
type TListPageProps = {
    initArr?: IListArrayItem[];
};

export const ListPage: React.FC = () => {
    const [linkedListArray, setLinkedListArray] = useState<Array<IListArrayItem>>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [indexValue, setIndexValue] = useState<string>('');
    const [addHeadLoading, setAddHeadLoading] = useState<boolean>(false);
    const [deleteHeadLoading, setDeleteHeadLoading] = useState<boolean>(false);
    const [addTailLoading, setAddTailLoading] = useState<boolean>(false);
    const [deleteTailLoading, setDeleteTailLoading] = useState<boolean>(false);
    const [addByIndexLoading, setAddByIndexLoading] = useState<boolean>(false);
    const [deleteByIndexLoading, setDeleteByIndexLoading] = useState<boolean>(false);

    const linkedList = useMemo(() => new LinkedList(getInitArr()), []);

    useEffect(() => {
        setLinkedListArray([...linkedList.toArray()])
    }, [linkedList])


    const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }
    const onChangeInputIndex = (e: ChangeEvent<HTMLInputElement>) => {
        setIndexValue(e.target.value);
    }

    const headAdd = () => {
        setAddHeadLoading(true);
        setTimeout(() => {
            if (linkedList.head) {
                linkedList.head.value.head =
                    <Circle letter={inputValue} state={ElementStates.Changing} isSmall={true}/>
            }

            setLinkedListArray([...linkedList.toArray()])

        }, SHORT_DELAY_IN_MS)

        setTimeout(() => {
            const newArrItem: IListArrayItem = {
                value: inputValue!,
                state: ElementStates.Modified,
                head: 'head',
                tail: linkedList.head ? null : 'tail'
            };

            if (linkedList.head) {
                linkedList.head.value.head = null
            }

            setLinkedListArray([newArrItem, ...linkedList.toArray()])

            linkedList.prepend(newArrItem)
        }, DELAY_IN_MS)


        setTimeout(() => {

            if (linkedList.head) {
                linkedList.head.value.state = ElementStates.Default
            }
            setAddHeadLoading(false);
        }, DELAY_IN_MS + 500)
    }

    const headDelete = () => {
        setDeleteHeadLoading(true)
        setTimeout(() => {
            if (linkedList.head) {
                linkedList.head.value.tail =
                    <Circle letter={linkedList.head.value.value} state={ElementStates.Changing} isSmall={true}/>
                linkedList.head.value.value = ''
            }

            setLinkedListArray([...linkedList.toArray()])
        }, SHORT_DELAY_IN_MS)
        setTimeout(() => {
            if (linkedList.head) {
                linkedList.deleteHead();
                if (linkedList.head) {
                    linkedList.head.value.head = 'head';
                    setLinkedListArray([...linkedList.toArray()])
                } else {
                    setLinkedListArray([])
                }
            }

            setDeleteHeadLoading(false)
        }, DELAY_IN_MS)
    }

    const addTail = () => {
        setAddTailLoading(true)
        setTimeout(() => {
            if (linkedList.tail) {
                linkedList.tail.value.head = <Circle letter={inputValue} state={ElementStates.Changing} isSmall={true}/>
            }

            setLinkedListArray([...linkedList.toArray()])
        }, SHORT_DELAY_IN_MS)

        setTimeout(() => {
            const newArrItem: IListArrayItem = {
                value: inputValue!,
                state: ElementStates.Modified,
                head: linkedList.head ? null : 'head',
                tail: 'tail'
            };
            if (linkedList.tail) {
                linkedList.tail.value.tail === 'tail' ? linkedList.tail.value.tail = null : linkedList.tail.value.tail = 'tail';
                linkedList.tail.value.head = null;
            }
            if (linkedList.head) {
                linkedList.head.value.head = 'head';
            }

            setLinkedListArray([...linkedList.toArray(), newArrItem])
            linkedList.append(newArrItem)
        }, DELAY_IN_MS)

        setTimeout(() => {
            if (linkedList.tail) {
                linkedList.tail.value.state = ElementStates.Default
            }
            setAddTailLoading(false)
        }, DELAY_IN_MS + 500)
    }

    const tailDelete = () => {
        setDeleteTailLoading(true)
        setTimeout(() => {
            if (linkedList.tail) {
                linkedList.tail.value.tail =
                    <Circle letter={linkedList.tail.value.value} state={ElementStates.Changing} isSmall={true}/>
                linkedList.tail.value.value = '';
            }
            setLinkedListArray([...linkedList.toArray()])
        }, SHORT_DELAY_IN_MS)

        setTimeout(() => {
            if (linkedList.tail) {
                linkedList.deleteTail()
                if (linkedList.tail) {
                    linkedList.tail.value.tail = 'tail';
                    setLinkedListArray([...linkedList.toArray()]);
                } else {
                    linkedList.deleteHead()
                    setLinkedListArray([])
                }
            }
            setDeleteTailLoading(false)
        }, DELAY_IN_MS)
    }

    const addBuIndex = async () => {
        setAddByIndexLoading(true)
        const arr = linkedList.toArray();
        const idx = Number(indexValue);
        const newArrItem: IListArrayItem = {
            value: inputValue!,
            state: ElementStates.Default,
            head: linkedList.head ? null : 'head',
            tail: linkedList.tail ? null : 'tail'
        }

        linkedList.addByIndex(newArrItem, idx)

        for (let i = 0; i <= idx; i++) {
            let tmp = arr[i].head;
            arr[i] = {...arr[i], head: <Circle letter={inputValue} state={ElementStates.Changing} isSmall={true}/>}
            if (i > 0) {
                arr[0].head = 'head'
                arr[i - 1] = {...arr[i - 1], state: ElementStates.Changing, head: tmp}
            }

            setLinkedListArray([...arr])
            await (new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS)));
        }


        arr[idx].head = linkedList.head ? null : 'head';

        for (let i = 0; i < idx; i++) {
            arr[i].state = ElementStates.Default
        }
        arr.splice(idx, 0, {
            value: inputValue!,
            state: ElementStates.Modified,
            head: linkedList.head ? null : 'head',
            tail: linkedList.tail ? null : 'tail'
        })
        setLinkedListArray([...arr])
        await (new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS)));


        arr[idx].state = ElementStates.Default;
        arr[0].head = 'head';
        setLinkedListArray([...arr])
        setAddByIndexLoading(false)

    }

    const deleteByIndex = async () => {
        setDeleteByIndexLoading(true)
        const arr = linkedList.toArray()
        const idx = Number(indexValue);

        linkedList.deleteByIndex(idx);
        for (let i = 0; i <= idx; i++) {
            arr[i].state = ElementStates.Changing
            setLinkedListArray([...arr])
            await (new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS)));
        }


        arr[idx] = {
            ...arr[idx],
            tail: <Circle letter={arr[idx].value} state={ElementStates.Changing} isSmall={true}/>,
            value: '',
            state: ElementStates.Default
        }
        setLinkedListArray([...arr])
        await (new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS)));


        arr.splice(idx, 1)
        arr.forEach((item) => item.state = ElementStates.Default)
        setLinkedListArray([...arr])
        setDeleteByIndexLoading(false)

    }

    const loading: boolean = addHeadLoading || deleteHeadLoading || addTailLoading || deleteTailLoading || addByIndexLoading || deleteByIndexLoading;
    const indexButtonsDisable = indexValue === undefined || Number(indexValue) < 0 || Number(indexValue) >= linkedList.getSize() || loading;
    const buttonsDisable = inputValue === undefined || Number(inputValue) < 1 || loading;

    return (
        <SolutionLayout title="Связный список">
            <div className={listStyle.mainBox}>
                <form className={listStyle.form}>
                    <Input extraClass={listStyle.input} type="text" isLimitText={true} placeholder="Введите значение"
                           maxLength={maxInputLength} onChange={onChangeInputValue} value={inputValue}
                           disabled={loading} id={'input'}/>
                    <Button text="Добавить в head" linkedList="small" onClick={headAdd} isLoader={addHeadLoading}
                            disabled={buttonsDisable} id={'addHead'}/>
                    <Button text="Добавить в tail" linkedList="small"
                            onClick={addTail} isLoader={addTailLoading}
                            disabled={buttonsDisable} id={'addTail'}/>
                    <Button text="Удалить из head" linkedList="small" onClick={headDelete}
                            isLoader={deleteHeadLoading} disabled={loading || linkedListArray.length === 0}
                            id={'deleteHead'}/>
                    <Button text="Удалить из tail" linkedList="small" disabled={loading || linkedListArray.length === 0}
                            isLoader={deleteTailLoading}
                            onClick={tailDelete} id={'deleteTail'}/>
                    <Input extraClass={listStyle.input} type="number" placeholder="Введите индекс"
                           onChange={onChangeInputIndex} value={indexValue} id={'inputIndex'}/>
                    <Button text="Добавить по индексу" linkedList="big" onClick={addBuIndex}
                            isLoader={addByIndexLoading}
                            disabled={indexButtonsDisable || inputValue === '' || indexValue === ''} id={'addByIndex'}/>
                    <Button text="Удалить по индексу" linkedList="big" isLoader={deleteByIndexLoading}
                            onClick={deleteByIndex}
                            disabled={indexButtonsDisable || indexValue === ''} id={'deleteByIndex'}/>
                </form>
                <div className={listStyle.resultBox}>
                    {linkedListArray.map((item, idx) =>
                        <div className={listStyle.list} key={idx}><Circle letter={item.value} state={item.state}
                                                                          index={idx}
                                                                          head={item.head} tail={item.tail}/>
                            {idx < linkedListArray.length - 1 && <ArrowIcon/>}</div>)}
                </div>
            </div>
        </SolutionLayout>
    );
};
