import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {SortingPage} from "./sorting-page";
import {BrowserRouter} from "react-router-dom";

const emptyArray = [];
const oneElementArray = [{idx: 1}];
const fourElementsArray = [{idx: 2}, {idx: 0}, {idx: 3}, {idx: 1}];
describe('Test Sorting algorithms', () => {
    it('bubble sort desc with empty array is correct', async () => {
        render(<SortingPage initValue={emptyArray}/>, {wrapper: BrowserRouter});
        const descButton = screen.getByText('По убыванию');
        const bubbleWay = screen.getByLabelText('Пузырёк');
        fireEvent.click(bubbleWay);
        fireEvent.click(descButton);
        await waitFor(() => {
            expect(screen.getByTestId('res')).toBeEmptyDOMElement();
        }, {timeout: 1000})
    })
    it('bubble sort asc with empty array is correct', async () => {
        render(<SortingPage initValue={emptyArray}/>, {wrapper: BrowserRouter});
        const ascButton = screen.getByText('По возрастанию');
        const bubbleWay = screen.getByLabelText('Пузырёк');
        fireEvent.click(bubbleWay);
        fireEvent.click(ascButton);
        await waitFor(() => {
            expect(screen.getByTestId('res')).toBeEmptyDOMElement();
        }, {timeout: 1000})
    })
    it('selection sort desc with empty array is correct', async () => {
        render(<SortingPage initValue={emptyArray}/>, {wrapper: BrowserRouter});
        const descButton = screen.getByText('По убыванию');
        const selectionWay = screen.getByLabelText('Выбор');
        fireEvent.click(selectionWay);
        fireEvent.click(descButton);
        await waitFor(() => {
            expect(screen.getByTestId('res')).toBeEmptyDOMElement();
        }, {timeout: 1000})
    })
    it('selection sort asc with empty array is correct', async () => {
        render(<SortingPage initValue={emptyArray}/>, {wrapper: BrowserRouter});
        const ascButton = screen.getByText('По возрастанию');
        const selectionWay = screen.getByLabelText('Выбор');
        fireEvent.click(selectionWay);
        fireEvent.click(ascButton);
        await waitFor(() => {
            expect(screen.getByTestId('res')).toBeEmptyDOMElement();
        }, {timeout: 1000})
    })
    it('bubble sort desc with one element array is correct', async () => {
        render(<SortingPage initValue={oneElementArray}/>, {wrapper: BrowserRouter})
        const descButton = screen.getByText('По убыванию');
        const bubbleWay = screen.getByLabelText('Пузырёк');
        fireEvent.click(bubbleWay);
        fireEvent.click(descButton);
        await waitFor(() => {
            expect(screen.getByTestId('columnTittle')).toHaveTextContent('1');
        }, {timeout: 1000})
        await waitFor(() => {
            expect(screen.getByTestId('column')).toHaveClass('modified');
        }, {timeout: 1000})
    })
    it('bubble sort asc with one element array is correct', async () => {
        render(<SortingPage initValue={oneElementArray}/>, {wrapper: BrowserRouter})
        const ascButton = screen.getByText('По возрастанию');
        const bubbleWay = screen.getByLabelText('Пузырёк');
        fireEvent.click(bubbleWay);
        fireEvent.click(ascButton);
        await waitFor(() => {
            expect(screen.getByTestId('columnTittle')).toHaveTextContent('1');
        }, {timeout: 1000})
        await waitFor(() => {
            expect(screen.getByTestId('column')).toHaveClass('modified');
        }, {timeout: 1000})
    })
    it('selection sort desc with one element array is correct', async () => {
        render(<SortingPage initValue={oneElementArray}/>, {wrapper: BrowserRouter})
        const descButton = screen.getByText('По убыванию');
        const selectionWay = screen.getByLabelText('Выбор');
        fireEvent.click(selectionWay);
        fireEvent.click(descButton);
        await waitFor(() => {
            expect(screen.getByTestId('columnTittle')).toHaveTextContent('1');
        }, {timeout: 1000})
        await waitFor(() => {
            expect(screen.getByTestId('column')).toHaveClass('modified');
        }, {timeout: 1000})
    })
    it('selection sort asc with one element array is correct', async () => {
        render(<SortingPage initValue={oneElementArray}/>, {wrapper: BrowserRouter})
        const ascButton = screen.getByText('По возрастанию');
        const selectionWay = screen.getByLabelText('Выбор');
        fireEvent.click(selectionWay);
        fireEvent.click(ascButton);
        await waitFor(() => {
            expect(screen.getByTestId('columnTittle')).toHaveTextContent('1');
        }, {timeout: 1000})
        await waitFor(() => {
            expect(screen.getByTestId('column')).toHaveClass('modified');
        }, {timeout: 1000})
    })
    it('bubble sort desc with several elements array is correct', async () => {
        render(<SortingPage initValue={fourElementsArray}/>, {wrapper: BrowserRouter})
        const descButton = screen.getByText('По убыванию');
        const bubbleWay = screen.getByLabelText('Пузырёк');
        fireEvent.click(bubbleWay);
        fireEvent.click(descButton);
        await waitFor(() => {
            expect(screen.getAllByTestId('columnTittle')[0]).toHaveTextContent('3');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('column')[0]).toHaveClass('modified');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('columnTittle')[1]).toHaveTextContent('2');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('column')[1]).toHaveClass('modified');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('columnTittle')[2]).toHaveTextContent('1');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('column')[2]).toHaveClass('modified');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('columnTittle')[3]).toHaveTextContent('0');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('column')[3]).toHaveClass('modified');
        }, {timeout: 5000})
    })
    it('bubble sort asc with several elements array is correct', async () => {
        render(<SortingPage initValue={fourElementsArray}/>, {wrapper: BrowserRouter})
        const ascButton = screen.getByText('По возрастанию');
        const bubbleWay = screen.getByLabelText('Пузырёк');
        fireEvent.click(bubbleWay);
        fireEvent.click(ascButton);
        await waitFor(() => {
            expect(screen.getAllByTestId('columnTittle')[0]).toHaveTextContent('0');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('column')[0]).toHaveClass('modified');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('columnTittle')[1]).toHaveTextContent('1');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('column')[1]).toHaveClass('modified');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('columnTittle')[2]).toHaveTextContent('2');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('column')[2]).toHaveClass('modified');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('columnTittle')[3]).toHaveTextContent('3');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('column')[3]).toHaveClass('modified');
        }, {timeout: 5000})
    })
    it('selection sort desc with several elements array is correct', async () => {
        render(<SortingPage initValue={fourElementsArray}/>, {wrapper: BrowserRouter})
        const descButton = screen.getByText('По убыванию');
        const selectionWay = screen.getByLabelText('Выбор');
        fireEvent.click(selectionWay);
        fireEvent.click(descButton);
        await waitFor(() => {
            expect(screen.getAllByTestId('columnTittle')[0]).toHaveTextContent('3');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('column')[0]).toHaveClass('modified');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('columnTittle')[1]).toHaveTextContent('2');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('column')[1]).toHaveClass('modified');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('columnTittle')[2]).toHaveTextContent('1');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('column')[2]).toHaveClass('modified');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('columnTittle')[3]).toHaveTextContent('0');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('column')[3]).toHaveClass('modified');
        }, {timeout: 5000})
    })
    it('selection sort asc with several elements array is correct', async () => {
        render(<SortingPage initValue={fourElementsArray}/>, {wrapper: BrowserRouter})
        const ascButton = screen.getByText('По возрастанию');
        const selectionWay = screen.getByLabelText('Выбор');
        fireEvent.click(selectionWay);
        fireEvent.click(ascButton);
        await waitFor(() => {
            expect(screen.getAllByTestId('columnTittle')[0]).toHaveTextContent('0');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('column')[0]).toHaveClass('modified');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('columnTittle')[1]).toHaveTextContent('1');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('column')[1]).toHaveClass('modified');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('columnTittle')[2]).toHaveTextContent('2');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('column')[2]).toHaveClass('modified');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('columnTittle')[3]).toHaveTextContent('3');
        }, {timeout: 5000})
        await waitFor(() => {
            expect(screen.getAllByTestId('column')[3]).toHaveClass('modified');
        }, {timeout: 5000})
    })
})