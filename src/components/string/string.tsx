import React, {ChangeEvent, FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import stringStyle from './string.module.css';
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";

export const StringComponent: React.FC = () => {
    const [value, setValue] = useState<Array<string>>([]);
    const [performing, setPerforming] = React.useState<boolean>();
    const [flag, setFlag] = useState<boolean>(false);
    const [startIdx, setStartIdx] = React.useState<number | null>();
    const [endIdx, setEndIdx] = React.useState<number | null>();

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(Array.from(e.target.value));
        //setFlag(false);
    }

    const swap = (arr: string[], firstIdx: number, secondIdx: number): void => {
        const tmp = arr[firstIdx];
        arr[firstIdx] = arr[secondIdx];
        arr[secondIdx] = tmp;
    };

    const swapString = () => {
        let start = 0;
        let end = value.length - 1;
        const mid = Math.floor((start + end) / 2)
        for (let i = 0; i <= mid; i++) {
            setTimeout(() => {
                swap(value, end, start);
                setStartIdx(start);
                setEndIdx(end);
                setPerforming(true);
                start++;
                end--;
            }, 1000 * i)
        }
        setTimeout(() => {
            setPerforming(false);
            setStartIdx(null);
            setEndIdx(null);
        }, (1000 * mid) + 1000)
    }

    // const swapString = async () => {
    //     await new Promise<void>((resolve) => {
    //         let start = 0;
    //         let end = value!.length - 1;
    //         const mid = Math.floor((start + end) / 2);
    //         setInitial(false);
    //         for (let i = 0; i <= mid; i++) {
    //             setTimeout(() => {
    //                 swap(value!, end, start);
    //                 setStartIdx(start);
    //                 setEndIdx(end);
    //                 setPerforming(true);
    //                 start++;
    //                 end--;
    //             }, 1000 * i);
    //         }
    //         setTimeout(() => resolve(), 1000 * mid)
    //     });
    //     setPerforming(false);
    //     setStartIdx(null);
    //     setEndIdx(null);}


    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFlag(true);
        setPerforming(true);
        setTimeout(() => swapString(), 1000);
    }

    return (
        <SolutionLayout title="Строка">
            <div className={stringStyle.mainBox}>
                <form className={stringStyle.form} onSubmit={e => onSubmitHandler(e)}>
                    <Input isLimitText={true} maxLength={11} onChange={onChangeInput}/>
                    <Button text={'Развернуть'} type={'submit'}
                            disabled={(value.length > 11 || value.length < 1)} isLoader={performing}/>
                </form>
                <div className={stringStyle.box}>
                    {flag ? value && value.map((item, idx) => performing && (startIdx === idx || endIdx === idx) ?
                        <Circle letter={item} key={idx} state={ElementStates.Changing}/> :
                        (startIdx! >= idx || endIdx! <= idx) || !performing ?
                            < Circle letter={item} key={idx} state={ElementStates.Modified}/> :
                            <Circle letter={item} state={ElementStates.Default} key={idx}/>
                    ) : ''}
                </div>
            </div>
        </SolutionLayout>
    );
};
