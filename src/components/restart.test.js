import { render, fireEvent } from '@testing-library/react';
import Restart from './restart';
import context from '../core/context';

describe('restart Button', () => {
	test('dom Check', () => {
		const component = render(Restart()).getByRole('restartButton');

		expect(component).toBeInTheDocument();
		expect(component).toHaveTextContent('Restart');
	});
	test('Click Event', () => {
		jest.spyOn(context.actions, 'restart');

		const component = render(Restart()).getByRole('restartButton');

		fireEvent.click(component);
		expect(context.actions.restart).toHaveBeenCalled();
	});
});
