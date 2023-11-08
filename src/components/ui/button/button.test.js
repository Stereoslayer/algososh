import {Button} from './button';
import renderer from 'react-test-renderer';
import {render, screen, fireEvent} from '@testing-library/react';

describe('Button test', () => {
    it('Button render test', () => {
        const button = renderer.create(<Button/>).toJSON();
        expect(button).toMatchSnapshot();
    })
    it('Button with text test', () => {
        const props = {
            text: 'someText'
        };
        render(<Button {...props} />);
        const button = renderer.create(<Button {...props} />).toJSON();
        expect(screen.getByRole('button')).toHaveTextContent('someText');
        expect(button).toMatchSnapshot();
    })
    it('disabled Button test', () => {
        const props = {
            disabled: true
        };
        render(<Button {...props} />);
        const button = renderer.create(<Button {...props} />).toJSON();
        expect(screen.getByRole('button')).toBeDisabled();
        expect(button).toMatchSnapshot();
    })
    it('Button loading test', () => {
        const props = {
            isLoader: true
        };
        render(<Button {...props} />);
        const button = renderer.create(<Button {...props} />).toJSON();
        expect(screen.getByAltText('Загрузка.')).not.toEqual(null);
        expect(button).toMatchSnapshot();
    })
    it('callback test', () => {
        const callback = jest.fn();
        render(<Button onClick={callback}/>);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(callback).toHaveBeenCalled();
    })
})