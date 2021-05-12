import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('Should return 0 if no expenses', () => {
    const res = selectExpensesTotal([]);
    expect(res).toBe(0);
});

test('Should correctly add up a single expenses', () => {
    const res = selectExpensesTotal([expenses[0]]);
    expect(res).toBe(30);
});

test('Shouldcorrectly add up a multiple expenses', () => {
    const res = selectExpensesTotal(expenses);
    expect(res).toBe(7030);
});