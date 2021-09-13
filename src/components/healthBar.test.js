import HealthBar from './healthBar';
import { render } from '@testing-library/react';
import context from '../core/context';
import GameService from '../services/gameService';

jest.mock('../core/context', () => ({
	state: { health: 40 },
}));

describe('testing HealthBar', () => {
	test('healthBar is visible?', () => {
		jest.spyOn(GameService, 'healthColor');
		const component = render(HealthBar()).getByRole('healthBar');

		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('health-bar');
		expect(GameService.healthColor)
			.toHaveBeenCalledWith(context.state.health);
	});
});
