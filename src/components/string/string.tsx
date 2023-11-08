import React, {ChangeEvent, FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import stringStyle from './string.module.css';
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";

type TLetter = {
    value: string;
    state: ElementStates;
};
export const StringComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [value, setValue] = useState<Array<TLetter>>([]);
    const [loading, setLoading] = React.useState<boolean>();

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const swap = (arr: TLetter[], firstIdx: number, secondIdx: number): void => {
        const tmp = arr[firstIdx];
        arr[firstIdx] = arr[secondIdx];
        arr[secondIdx] = tmp;
    };

    const swapString = (arr: TLetter[]) => {
        const mid = Math.floor(arr.length / 2)
        setValue([...arr]);
        for (let i = 0; i <= mid; i++) {
            setTimeout(() => {
                let start = i;
                let end = arr.length - 1 - i;
                arr[start].state = ElementStates.Changing;
                arr[end].state = ElementStates.Changing;
                setTimeout(() => {
                    swap(arr, end, start);
                    arr[start].state = ElementStates.Modified;
                    arr[end].state = ElementStates.Modified;
                    setValue([...arr]);
                }, DELAY_IN_MS)
            }, DELAY_IN_MS * i)
        }
        setTimeout(() => {
            setLoading(false);
        }, DELAY_IN_MS * mid)
    }

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const arr = Array.from(inputValue!).map((value) => ({
            value,
            state: ElementStates.Default
        }));
        setLoading(true);
        swapString(arr);
    }

    return (
        <SolutionLayout title="Строка">
            <div className={stringStyle.mainBox}>
                <form className={stringStyle.form} onSubmit={e => onSubmitHandler(e)}>
                    <Input isLimitText={true} maxLength={11} onChange={onChangeInput} disabled={loading} id={'input'}
                           value={inputValue}/>
                    <Button text={'Развернуть'} type={'submit'} data-testid={'button'} id={'button'}
                            disabled={(inputValue!.length > 11 || inputValue!.length < 1)} isLoader={loading}/>
                </form>
                <div className={stringStyle.resultBox} data-testid={'res'}>
                    {value.map((item, idx) =>
                        <Circle letter={item.value} key={idx} state={item.state}/>)}
                </div>
            </div>
        </SolutionLayout>
    );
};
