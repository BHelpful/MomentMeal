import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SpinnerComponent } from './spinner.component';

export default {
  title: 'SpinnerComponent',
  component: SpinnerComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<SpinnerComponent>;

const Template: Story<SpinnerComponent> = (args: SpinnerComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}