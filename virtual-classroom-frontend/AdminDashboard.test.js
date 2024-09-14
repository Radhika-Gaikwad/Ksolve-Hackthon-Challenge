import { render, fireEvent } from '@testing-library/react';
import AdminDashboard from '../components/AdminDashboard';

test('Admin creates a class', () => {
  const { getByPlaceholderText, getByText } = render(<AdminDashboard />);

  fireEvent.change(getByPlaceholderText('Class Title'), { target: { value: 'Sample Class' } });
  fireEvent.click(getByText('Create Class'));

  expect(window.alert).toHaveBeenCalledWith('Class created successfully');
});
