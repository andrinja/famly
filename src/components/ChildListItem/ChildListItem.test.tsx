import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import {Child} from '../../types/Child';
import ChildListItem from './ChildListItem';
import userEvent from '@testing-library/user-event';

const mockData = {
	childId: '123',
	name: {fullName: 'John Doe'},
	image: {small: 'https://example.com/avatar.jpg'},
	checkedIn: false,
};

const defaultProps = {
	data: mockData as Child,
	onCheckIn: vi.fn(),
	onCheckOut: vi.fn(),
};

describe('Basic rendering', () => {
	it('renders ChildListItem with given data', () => {
		render(<ChildListItem {...defaultProps} />);
		expect(screen.getByText('John Doe')).toBeInTheDocument();
		const avatarImage = screen.getByAltText('John Doe');
		expect(avatarImage).toHaveAttribute('src', 'https://example.com/avatar.jpg');
		expect(screen.getByRole('button', {name: 'Check in'})).toBeInTheDocument();
	});
});

describe('Show correct check in / check out button state', () => {
	it('shows check in button when checkIn is false', () => {
		render(<ChildListItem {...defaultProps} />);
		const checkInButton = screen.getByRole('button', {name: 'Check in'});
		expect(checkInButton).toBeInTheDocument();
	});

	it('shows check out button when checkIn is true', () => {
		render(<ChildListItem {...defaultProps} data={{...mockData, checkedIn: true} as Child} />);
		const checkInButton = screen.getByRole('button', {name: 'Check out'});
		expect(checkInButton).toBeInTheDocument();
	});
});

describe('Calls correct callback when check in / check out buttons are pressed', () => {
	it('calls onCheckIn when check in button is pressed', async () => {
		render(<ChildListItem {...defaultProps} />);
		const checkInButton = screen.getByRole('button', {name: 'Check in'});
		await userEvent.click(checkInButton);
		expect(defaultProps.onCheckIn).toHaveBeenCalledWith(mockData.childId);
	});

	it('calls onCheckOut when check in button is pressed', async () => {
		render(<ChildListItem {...defaultProps} data={{...mockData, checkedIn: true} as Child} />);
		const checkOutButton = screen.getByRole('button', {name: 'Check out'});
		await userEvent.click(checkOutButton);
		expect(defaultProps.onCheckOut).toHaveBeenCalledWith(mockData.childId);
	});
});
