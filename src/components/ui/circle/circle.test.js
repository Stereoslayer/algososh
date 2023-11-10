import renderer from "react-test-renderer";
import {Circle} from "./circle";
import {render, screen, within} from "@testing-library/react";
import {ElementStates} from "../../../types/element-states";


describe('Circle component test', () => {
    it('Circle without letter test', () => {
        const circle = renderer.create(<Circle/>).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Circle with letter is rendered correctly', () => {
        const props = {
            letter: '0'
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        expect(screen.getByTestId('circle')).toHaveTextContent('0');
        expect(circle).toMatchSnapshot();
    })
    it('Circle with head is rendered correctly', () => {
        const props = {
            head: 'someValue'
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        expect(screen.getByTestId('head')).toHaveTextContent('someValue');
        expect(circle).toMatchSnapshot();
    })
    it('Circle with react-element in head is rendered correctly', () => {
        const props = {
            head: <Circle isSmall={true}/>
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        within(screen.getByTestId('circle')).getByTestId('circleSmall');
        expect(circle).toMatchSnapshot();
    })
    it('Circle with tail is rendered correctly', () => {
        const props = {
            tail: 'someValue'
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        expect(screen.getByTestId('tail')).toHaveTextContent('someValue');
        expect(circle).toMatchSnapshot();
    })
    it('Circle with react-component in tail is rendered correctly', () => {
        const props = {
            tail: <Circle isSmall={true}/>
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        within(screen.getByTestId('circle')).getByTestId('circleSmall');
        expect(circle).toMatchSnapshot();
    })
    it('Circle with index is rendered correctly', () => {
        const props = {
            index: 'someValue'
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        expect(screen.getByTestId('index')).toHaveTextContent('someValue');
        expect(circle).toMatchSnapshot();
    })
    it('Circle with prop isSmall is rendered correctly', () => {
        const props = {
            isSmall: true
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        expect(screen.getByTestId('isSmall')).toBeTruthy();
        expect(circle).toMatchSnapshot();
    })
    it('default color Circle is rendered correctly', () => {
        const props = {
            state: ElementStates.Default
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        expect(screen.getByTestId('colouredCircle')).toHaveClass('default');
        expect(circle).toMatchSnapshot();
    })
    it('changing color Circle is rendered correctly', () => {
        const props = {
            state: ElementStates.Changing
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        expect(screen.getByTestId('colouredCircle')).toHaveClass('changing');
        expect(circle).toMatchSnapshot();
    })
    it('modified color Circle is rendered correctly', () => {
        const props = {
            state: ElementStates.Modified
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        expect(screen.getByTestId('colouredCircle')).toHaveClass('modified');
        expect(circle).toMatchSnapshot();
    })
})