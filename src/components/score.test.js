/* eslint-disable max-statements */
import { render } from '@testing-library/react';
import Score from './score';
import blast from '../images/damage.jpg';
import context from '../core/context';

jest.mock('../core/context', () => ({
	state: { score: 0 },
}));

describe('score card', () => {
	test('to Check score card', () => {
		const { getByRole } = render(Score());
		const component = getByRole('score-card');

		expect(component).toBeInTheDocument();

		expect(getByRole('score-card')).toBeInTheDocument();
		expect(getByRole('damage-icon')).toBeInTheDocument();
		expect(getByRole('score')).toBeInTheDocument();

		expect(getByRole('score-card')).toHaveClass('container');
		expect(getByRole('damage-icon')).toHaveClass('flightDamage');
		expect(getByRole('score')).toHaveClass('score');

		expect(getByRole('damage-icon'))
			.toHaveAttribute('src', blast);

		expect(component).toHaveTextContent(context.state.score);
	});
});
