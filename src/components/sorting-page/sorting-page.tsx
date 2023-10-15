import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import sortingStyle from './sorting.module.css';
import {Button} from "../ui/button/button";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {generateRandomArray} from "../../services/utils/random-numbers";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Column} from "../ui/column/column";


interface ISortingArrayItem {
    idx: number,
    state?: ElementStates
}

interface ISortingState {
    array: ISortingArrayItem[];
    way: string;
}

enum SortingWays {
    Selection = 'selection',
    Bubble = 'bubble',
}

const minLength = 3;
const maxLength = 17;
const maxValue = 100;

export const SortingPage: React.FC = () => {
    const getArr = () => {
        const arr: Array<number> = generateRandomArray(maxLength, minLength, maxValue);
        return arr.map((item, idx) => {
            return {
                idx: arr[idx],
                state: ElementStates.Default
            }
        })
    }

    const [sortingState, setSortingState] = useState<ISortingState>({
        array: getArr(),
        way: SortingWays.Selection
    });
    const [loading, setLoading] = useState('');

    const setWay = (e: ChangeEvent<HTMLInputElement>) => {
        setSortingState({
            ...sortingState,
            way: e.target.value
        })
    }

    const setArr = (): void => {
        setSortingState({
            ...sortingState,
            array: getArr(),
        })
    }


    const sortSelectionWay = async (arr: ISortingArrayItem[], dir: Direction): Promise<ISortingArrayItem[]> => {
        for (let i = 0; i < arr.length; i++) {
            let start = i;
            arr[start].state = ElementStates.Changing
            for (let j = i + 1; j < arr.length; j++) {
                arr[j].state = ElementStates.Changing

                setSortingState({
                    ...sortingState,
                    array: [...arr]
                })
                await (new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS)));

                if (dir === Direction.Ascending ? arr[j].idx < arr[start].idx : arr[j].idx > arr[start].idx) {
                    start = j
                    arr[j].state = ElementStates.Default
                    i === start ? arr[start].state = ElementStates.Changing : arr[start].state = ElementStates.Default
                }
                if (j != start) {
                    arr[j].state = ElementStates.Default
                }
                setSortingState({
                    ...sortingState,
                    array: [...arr]
                })
            }
            const tmp = arr[i];
            arr[i] = arr[start];
            arr[start] = tmp;

            arr[start].state = ElementStates.Default;
            arr[i].state = ElementStates.Modified;

            setSortingState({
                ...sortingState,
                array: [...arr]
            })
        }
        setLoading('')
        return arr
    }

    const sortBubbleWay = async (arr: ISortingArrayItem[], dir: Direction): Promise<ISortingArrayItem[]> => {

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {

                arr[j].state = ElementStates.Changing
                arr[j + 1].state = ElementStates.Changing
                setSortingState({
                    ...sortingState,
                    array: [...arr]
                })
                await (new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS)));
                if (dir === Direction.Ascending ? arr[j].idx > arr[j + 1].idx : arr[j].idx < arr[j + 1].idx) {
                    const temp = arr[j].idx;
                    arr[j].idx = arr[j + 1].idx;
                    arr[j + 1].idx = temp;
                }
                arr[j].state = ElementStates.Default
                if (arr[j + 1]) {
                    arr[j + 1].state = ElementStates.Default
                }
                setSortingState({
                    ...sortingState,
                    array: [...arr]
                })
            }
            arr[arr.length - i - 1].state = ElementStates.Modified

            setSortingState({
                ...sortingState,
                array: [...arr]
            })
        }
        setLoading('')


        return arr
    }


    const sort = (dir: Direction): void => {
        setLoading(dir);
        if (sortingState.way === SortingWays.Bubble) {
            sortBubbleWay(sortingState.array, dir)
        }
        if (sortingState.way === SortingWays.Selection) {
            sortSelectionWay(sortingState.array, dir)
        }
    }

    return (
        <SolutionLayout title="Сортировка массива">
            <div className={sortingStyle.mainBox}>
                <form className={sortingStyle.form}>
                    <fieldset className={sortingStyle.radioFieldset}>
                        <RadioInput label='Выбор' name='sorting way' defaultChecked onChange={setWay}
                                    value={SortingWays.Selection} disabled={loading != ''}/>
                        <RadioInput label='Пузырёк' name='sorting way' onChange={setWay} value={SortingWays.Bubble}
                                    disabled={loading != ''}/>
                    </fieldset>
                    <fieldset className={sortingStyle.buttonsFieldset}>
                        <Button text='По возрастанию' sorting={Direction.Ascending}
                                isLoader={loading === Direction.Ascending} disabled={loading === Direction.Descending}
                                onClick={() => sort(Direction.Ascending)}/>
                        <Button text='По убыванию' sorting={Direction.Descending}
                                isLoader={loading === Direction.Descending} disabled={loading === Direction.Ascending}
                                onClick={() => sort(Direction.Descending)}/>
                        <Button text="Новый массив" extraClass={'ml-30'} onClick={setArr}
                                disabled={loading === Direction.Descending || loading === Direction.Ascending}/>
                    </fieldset>
                </form>
                <div className={sortingStyle.resultBox}>
                    {sortingState.array.map((item, idx) => <Column key={idx} index={item.idx} state={item.state}/>)}
                </div>
            </div>
        </SolutionLayout>
    );
};
