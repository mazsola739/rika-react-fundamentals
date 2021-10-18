import { pipeDuration } from '../pipeDuration';

describe('Duration', () => {
	test('should return correct duration format', () => {
		expect(pipeDuration(1)).toBe('00:01 hours');
		expect(pipeDuration(120)).toBe('02:00 hours');
	});
});
