import renderer from "react-test-renderer";
import {Circle} from "./circle";
import {render, screen, within} from "@testing-library/react";
import {ElementStates} from "../../../types/element-states";


describe('Circle test', () => {
    it('Circle without letter test', () => {
        const circle = renderer.create(<Circle/>).toJSON();
        expect(circle).toMatchSnapshot();
    })
    it('Circle with letter test', () => {
        const props = {
            letter: '0'
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        expect(screen.getByTestId('circle')).toHaveTextContent('0');
        expect(circle).toMatchSnapshot();
    })
    it('Circle with head test', () => {
        const props = {
            head: 'someValue'
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        expect(screen.getByTestId('head')).toHaveTextContent('someValue');
        expect(circle).toMatchSnapshot();
    })
    it('Circle with react-element in head test', () => {
        const props = {
            head: <Circle isSmall={true}/>
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        within(screen.getByTestId('circle')).getByTestId('circleSmall');
        expect(circle).toMatchSnapshot();
    })
    it('Circle with tail test', () => {
        const props = {
            tail: 'someValue'
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        expect(screen.getByTestId('tail')).toHaveTextContent('someValue');
        expect(circle).toMatchSnapshot();
    })
    it('Circle with react-element in tail test', () => {
        const props = {
            tail: <Circle isSmall={true}/>
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        within(screen.getByTestId('circle')).getByTestId('circleSmall');
        expect(circle).toMatchSnapshot();
    })
    it('Circle with index test', () => {
        const props = {
            index: 'someValue'
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        expect(screen.getByTestId('index')).toHaveTextContent('someValue');
        expect(circle).toMatchSnapshot();
    })
    it('Circle with prop isSmall test', () => {
        const props = {
            isSmall: true
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        expect(screen.getByTestId('isSmall')).toBeTruthy();
        expect(circle).toMatchSnapshot();
    })
    it('Circle default color test', () => {
        const props = {
            state: ElementStates.Default
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        expect(screen.getByTestId('colouredCircle')).toHaveClass('default');
        expect(circle).toMatchSnapshot();
    })
    it('Circle default color test', () => {
        const props = {
            state: ElementStates.Changing
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        expect(screen.getByTestId('colouredCircle')).toHaveClass('changing');
        expect(circle).toMatchSnapshot();
    })
    it('Circle default color test', () => {
        const props = {
            state: ElementStates.Modified
        };
        const circle = renderer.create(<Circle {...props} />).toJSON();
        render(<Circle {...props} />);
        expect(screen.getByTestId('colouredCircle')).toHaveClass('modified');
        expect(circle).toMatchSnapshot();
    })
})