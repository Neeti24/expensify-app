import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { setTextFilter } from './actions/filters';
import { addExpense } from './actions/expenses';
import getVisiableExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisiableExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
});

// store.dispatch(addExpense({description:'Rent', amount:5000}));
// store.dispatch(addExpense({description:'Gas bill', amount:200}));
// store.dispatch(addExpense({description:'Water bill', amount:300, createAt: 1000}));


const jsx = (
   <Provider store={store}>
        <AppRouter />
   </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
