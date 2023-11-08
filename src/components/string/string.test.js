import {StringComponent} from "./string";
import {BrowserRouter} from "react-router-dom";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const evenString = 'even';
const oddString = 'odd';
const oneElementString = '1';
const emptyString = '';
describe('String test', () => {
    it('even number of letters test', async () => {
        render(<StringComponent/>, {wrapper: BrowserRouter});
        const input = screen.getByTestId('input');
        const button = screen.getByText('Развернуть');
        fireEvent.change(input, {target: {value: evenString}});
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getAllByTestId('colouredCircle')[0]).toHaveTextContent('n');
        }, {timeout: 3000})
        await waitFor(() => {
            expect(screen.getAllByTestId('colouredCircle')[0]).toHaveClass('modified');
        }, {timeout: 3000})
        await waitFor(() => {
            expect(screen.getAllByTestId('colouredCircle')[1]).toHaveTextContent('e');
        }, {timeout: 3000})
        await waitFor(() => {
            expect(screen.getAllByTestId('colouredCircle')[1]).toHaveClass('modified');
        }, {timeout: 3000})
        await waitFor(() => {
            expect(screen.getAllByTestId('colouredCircle')[2]).toHaveTextContent('v');
        }, {timeout: 3000})
        await waitFor(() => {
            expect(screen.getAllByTestId('colouredCircle')[2]).toHaveClass('modified');
        }, {timeout: 3000})
        await waitFor(() => {
            expect(screen.getAllByTestId('colouredCircle')[3]).toHaveTextContent('e');
        }, {timeout: 3000})
        await waitFor(() => {
            expect(screen.getAllByTestId('colouredCircle')[3]).toHaveClass('modified');
        }, {timeout: 3000})
    })
    it('odd number of letters test', async () => {
        render(<StringComponent/>, {wrapper: BrowserRouter});
        const input = screen.getByTestId('input');
        const button = screen.getByText('Развернуть');
        userEvent.type(input, '{backspace}{backspace}{backspace}{backspace}')
        fireEvent.change(input, {target: {value: oddString}});
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getAllByTestId('colouredCircle')[0]).toHaveTextContent('d');
        }, {timeout: 3000})
        await waitFor(() => {
            expect(screen.getAllByTestId('colouredCircle')[0]).toHaveClass('modified');
        }, {timeout: 3000})
        await waitFor(() => {
            expect(screen.getAllByTestId('colouredCircle')[1]).toHaveTextContent('d');
        }, {timeout: 3000})
        await waitFor(() => {
            expect(screen.getAllByTestId('colouredCircle')[1]).toHaveClass('modified');
        }, {timeout: 3000})
        await waitFor(() => {
            expect(screen.getAllByTestId('colouredCircle')[2]).toHaveTextContent('o');
        }, {timeout: 3000})
        await waitFor(() => {
            expect(screen.getAllByTestId('colouredCircle')[2]).toHaveClass('modified');
        }, {timeout: 3000})
    })
    it('one letter test', async () => {
        render(<StringComponent/>, {wrapper: BrowserRouter});
        const input = screen.getByTestId('input');
        const button = screen.getByText('Развернуть');
        userEvent.type(input, '{backspace}{backspace}{backspace}')
        fireEvent.change(input, {target: {value: oneElementString}});
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getAllByTestId('colouredCircle')[0]).toHaveTextContent('1');
        }, {timeout: 3000})
        await waitFor(() => {
            expect(screen.getAllByTestId('colouredCircle')[0]).toHaveClass('modified');
        }, {timeout: 3000})
    })
    it('empty string test', () => {
        render(<StringComponent/>, {wrapper: BrowserRouter});
        const input = screen.getByTestId('input');
        const button = screen.getByText('Развернуть');
        userEvent.type(input, '{backspace}')
        fireEvent.change(input, {target: {value: emptyString}});
        fireEvent.click(button);
        expect(screen.getByTestId('button')).toBeDisabled();
        expect(screen.getByTestId('res')).toBeEmpty();
    })
})