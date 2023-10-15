import React, {ChangeEvent, FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import fibonacciStyle from "./fibonacci.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
    const maxNumber = 19;
    const [value, setValue] = useState<number>();
    const [loading, setLoading] = useState<boolean>();
    const [fibonacciSequence, setFibonacciSequence] = useState<Array<number>>([]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    }
    const calcFibonacci = () => {
        setLoading(true);
        const fibArr: Array<number> = [];
        for (let i = 0; i <= value!; i++) {
            setTimeout(() => {
                if (i === 0 || i === 1) {
                    fibArr.push(1);
                    setFibonacciSequence([...fibArr]);
                } else {
                    fibArr.push(fibArr[i - 1] + fibArr[i - 2]);
                    setFibonacciSequence([...fibArr]);
                }
            }, SHORT_DELAY_IN_MS * i);
            setTimeout(() => {
                setLoading(false);
            }, SHORT_DELAY_IN_MS * (value!));
        }
    }
    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        calcFibonacci();
    }

    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <div className={fibonacciStyle.mainBox}>
                <form className={fibonacciStyle.form} onSubmit={e => onSubmitHandler(e)}>
                    <Input type={'number'} isLimitText={true} max={maxNumber} onChange={onChangeHandler}
                           disabled={loading}/>
                    <Button text={'Рассчитать'} type={'submit'}
                            disabled={value === undefined || value > maxNumber || value < 1} isLoader={loading}/>
                </form>
                <div className={fibonacciStyle.resultBox}>
                    {fibonacciSequence.length !== 0 ? fibonacciSequence.map((item, idx) =>
                        <Circle letter={item.toString()} state={ElementStates.Default} index={idx} key={idx}/>
                    ) : ''}
                </div>
            </div>
        </SolutionLayout>
  );
};
