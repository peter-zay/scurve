import { render, screen, fireEvent } from '@testing-library/react';
import InputForm from './InputForm';

describe('InputForm component', () => {
  it('prompts for three user input values and calculates S-Curve values correctly', () => {
    render(<InputForm />);

    const firstValueInput = screen.getByLabelText('First Value:');
    const durationInput = screen.getByLabelText('Duration (in months):');
    const totalProjectValueInput = screen.getByLabelText('Total Project Value:');

    fireEvent.change(firstValueInput, { target: { value: '100' } });
    fireEvent.change(durationInput, { target: { value: '6' } });
    fireEvent.change(totalProjectValueInput, { target: { value: '600' } });

    const calculateButton = screen.getByText('Calculate S-Curve');
    fireEvent.click(calculateButton);

    const sCurveGraph = screen.getByRole('img', { name: 'S-Curve Values' });
    expect(sCurveGraph).toBeInTheDocument();

    const sCurveTable = screen.getByRole('table');
    expect(sCurveTable).toBeInTheDocument();
  });
});
