import { Select } from 'antd';
import 'antd/es/select/style/index';
import React from 'react';
import useDemoStore from './useDemoStore';

const companies = [
  {
    id: 1,
    name: 'Abstergo',
  },
  {
    id: 2,
    name: 'Google',
  },
  {
    id: 3,
    name: 'Electric Art',
  },
];

export const UserCompanies = () => {
  const [state, setter] = useDemoStore();

  const handleChange = (value: string, option: any) => {
    console.log(value, option);
    setter.setCompany({ id: Number(option.key), name: option.value });
  };

  return (
    <div>
      <Select onChange={handleChange}>
        {companies.map(item => (
          <Select.Option key={item.id} value={item.name}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
