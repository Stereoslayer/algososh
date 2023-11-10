import React, {ChangeEvent, FormEvent, useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import stackStyle from './stack.module.css';
import {ElementStates} from "../../types/element-states";
import {Stack} from "./stack";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Circle} from "../ui/circle/circle";

const maxInputLength = 4;

interface IStackItem {
    value: string | null;
    state?: ElementStates;
}

export const StackPage: React.FC = () => {
    const [stackArray, setStackArray] = useState<IStackItem[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [addLoading, setAddLoading] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

    const stack = useMemo(() => new Stack<string>(), [])

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const addItem = () => {
        setAddLoading(true)
        setTimeout(() => {
            stack.push(inputValue!)
            stackArray.push({
                value: inputValue!,
                state: ElementStates.Changing
            })
            setStackArray([...stackArray])
            setInputValue('')
        }, SHORT_DELAY_IN_MS)

        setTimeout(() => {
            stackArray[stackArray.length - 1].state = ElementStates.Default;
            setStackArray([...stackArray]);
            setAddLoading(false)
        }, DELAY_IN_MS)
    }

    const deleteItem = () => {
        setDeleteLoading(true)
        setTimeout(() => {
            stackArray[stackArray.length - 1].state = ElementStates.Changing
            setStackArray([...stackArray]);
        }, SHORT_DELAY_IN_MS)

        setTimeout(() => {
            stack.pop();
            stackArray.pop();
            setStackArray([...stackArray])
            setDeleteLoading(false)
        }, DELAY_IN_MS)
    }

    const clear = () => {
        stack.clear();
        setStackArray([]);
    }

    // const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     addItem();
    // }

    return (
        <SolutionLayout title="Стек">
            <div className={stackStyle.mainBox}>
                <form className={stackStyle.form} onSubmit={e => e.preventDefault()}>
                    <Input extraClass={stackStyle.input} isLimitText={true} maxLength={maxInputLength}
                           onChange={onChangeInput} disabled={addLoading || deleteLoading} value={inputValue}
                           id={'input'}/>
                    <Button text="Добавить" isLoader={addLoading} onClick={addItem}
                            disabled={inputValue === '' || inputValue === undefined} id={'button'}/>
                    <Button text="Удалить" isLoader={deleteLoading} onClick={deleteItem}
                            disabled={stackArray.length === 0 || addLoading} id={'buttonDelete'}/>
                    <Button text="Очистить" extraClass={'ml-30'} onClick={clear}
                            disabled={stackArray.length === 0 || addLoading || deleteLoading} id={'buttonClear'}/>
                </form>
                <div className={stackStyle.resultBox} id={'res'}>
                    {stackArray.map((item, idx) =>
                        <Circle letter={item.value!} state={item.state} index={idx}
                                head={stackArray.length - 1 === idx ? 'top' : ''} key={idx}/>)}
                </div>
            </div>
        </SolutionLayout>
    );
};
