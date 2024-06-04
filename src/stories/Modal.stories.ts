import { Meta, StoryObj } from '@storybook/react/*';
import AiWinModal from '../component/modal/AiWinModal';
import { fn } from '@storybook/test';

const meta = {
	title: 'components/modal/AiWinModal',
	component: AiWinModal,
	tags: ['autodocs'],
	args: { onClose: fn(), isOpen: true },
} satisfies Meta<typeof AiWinModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		answer: 'TESTT',
		dict: {
			word: 'TEST',
			type: 'noun',
			definition: '테스트',
			example: '테스트 예시',
		},
	},
};
