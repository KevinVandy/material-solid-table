import { Story, Meta } from '@storybook/html';
import MaterialSolidTable, {
  MaterialSolidTableProps,
  MST_ColumnDef,
} from '../src';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Prop Playground',
};

export default meta;

const Template: Story<MaterialSolidTableProps> = (
  args: MaterialSolidTableProps,
) => <MaterialSolidTable {...args} />;

export const Default = Template.bind({});

interface Row {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
}

Default.args = {
  columns: [
    {
      header: 'First Name',
      accessorKey: 'firstName',
    },
    {
      header: 'Last Name',
      accessorKey: 'lastName',
    },
    {
      header: 'Age',
      accessorKey: 'age',
    },
    {
      header: 'Address',
      accessorKey: 'address',
    },
  ] as MST_ColumnDef<Row>[],
  data: [...Array(6)].map(() => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(80),
    address: faker.address.streetAddress(),
  })),
} as MaterialSolidTableProps<Row>;
