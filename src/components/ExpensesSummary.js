import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(expensesTotal).format('0,0.00');

    return (
        <div>
            <h1>Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}</h1>
        </div>
    );
};

const mapStateTpProps = (state) => {
    const visiableExpenses = selectExpenses(state.expenses, state.filters);

    return {
        expenseCount : visiableExpenses.length,
        expensesTotal : selectExpensesTotal(visiableExpenses)
    };
};

export default connect(mapStateTpProps)(ExpensesSummary);