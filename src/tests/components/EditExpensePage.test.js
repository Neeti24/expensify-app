import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, history, wrapper, startRremoveExpense;

beforeEach(() => {
    editExpense = jest.fn();
    startRremoveExpense = jest.fn();
    history = { push : jest.fn() };
    wrapper = shallow(
    <EditExpensePage
    editExpense={editExpense}
    startRremoveExpense={startRremoveExpense}
    history={history}
    expense={expenses[0]}
    />)
});

test('Should render EditExpensePage correctly', () => {
   expect(wrapper).toMatchSnapshot();
});

test('Should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
});

test('Should handle startRremoveExpense', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRremoveExpense).toHaveBeenLastCalledWith({
        id : expenses[0].id
    });
});