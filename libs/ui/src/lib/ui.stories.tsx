import { Story, Meta } from '@storybook/react';
import { Ui, UiProps } from './ui';

export default {
	component: Ui,
	title: 'Ui',
} as Meta;

const Template: Story<UiProps> = (args) => <Ui {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
