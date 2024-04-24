import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	render: () => {
		const handleClick = () => {
			console.log('Это где то в сторисе');
		};
		return (
			<>
				<ArrowButton onClick={handleClick} isContainerOpen={true} />
			</>
		);
	},
};
