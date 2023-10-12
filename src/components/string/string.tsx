import React, {ChangeEvent, FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import stringStyle from './string.module.css';
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
    const [value, setValue] = useState<string>('');
    const [a, setA] = useState<Array<string>>();

    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const swap = (arr: string[], firstIndex: number, secondIndex: number): void => {
        const tmp = arr[firstIndex];
        arr[firstIndex] = arr[secondIndex];
        arr[secondIndex] = tmp;
    };

    const swapString = (str: string) => {
        let arr = Array.from(str)
        let start = 0;
        let end = arr.length - 1;
        const mid = Math.floor((start + end) / 2)

        for (let i = 0; i <= mid; i++) {
            swap(arr, end, start)
            start++;
            end--;
        }
        setA(arr)
    }

    console.log(a)

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        swapString(value)
    }


    return (
        <SolutionLayout title="Строка">
            <div className={stringStyle.mainBox}>
                <form className={stringStyle.form} onSubmit={e => onSubmitHandler(e)}>
                    <Input isLimitText={true} maxLength={11} value={value} onChange={onChangeText}/>
                    <Button text={'Развернуть'} type={'submit'}/>
                </form>
                <div className={stringStyle.box}>
                    {a && a.map((item, idx) =>
                        <Circle letter={item} key={idx}/>
                    )}
                </div>
            </div>
        </SolutionLayout>
    );
};
