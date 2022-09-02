import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FieldComponent } from './field.component';

export default {
  title: 'FieldComponent',
  component: FieldComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<FieldComponent>;

const Template: Story<FieldComponent> = (args: FieldComponent) => ({
  props: args,
});


export const Default = Template.bind({});
Default.args = {
}
Default.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/U6C1mVp5LHE1DAQZdQdjDD/MealTime-Design-System?node-id=69%3A1146',
	},
};