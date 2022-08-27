import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ButtonComponent } from './button.component';

export default {
  title: 'ButtonComponent',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  argTypes: {
    value: {
      control: {
        type: 'text',
        defaultValue: 'Button',
      },
    },
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'link'],
      defaultValue: 'primary',
      control: { type: 'radio' },
    },
    disabled: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
  },
} as Meta<ButtonComponent>;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};
Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/U6C1mVp5LHE1DAQZdQdjDD/MealTime-Design-System?node-id=20%3A896',
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};
Secondary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/U6C1mVp5LHE1DAQZdQdjDD/MealTime-Design-System?node-id=28%3A91',
  },
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  variant: 'tertiary',
};
Tertiary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/U6C1mVp5LHE1DAQZdQdjDD/MealTime-Design-System?node-id=28%3A205',
  },
};

export const Link = Template.bind({});
Link.args = {
  variant: 'link',
};
Link.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/U6C1mVp5LHE1DAQZdQdjDD/MealTime-Design-System?node-id=28%3A263',
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
Disabled.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/U6C1mVp5LHE1DAQZdQdjDD/MealTime-Design-System?node-id=28%3A534',
  },
};
