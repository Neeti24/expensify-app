import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

const now = moment();
console.log(now.format('MMMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
    constructor (props) {
        super();

        this.state = {
            description : props.expense ? props.expense.description : '',
            note : props.expense ? props.expense.note : '',
            // calculate in Cens currency 
            // amount : props.expense ? (props.expense.amount / 100).toString() : '', 
            amount : props.expense ? (props.expense.amount).toString() : '',
            createdAt : props.expense ? moment(props.expense.createdAt) : moment(),
            calenderFocused : false,
            error : ''
        }
    }
    onDiscriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;

        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
          this.setState(() => ({ amount }))
        }
    };
    onDateChange = (createdAt) => {
        if(createdAt) {
          this.setState(() => ({ createdAt }))
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calenderFocused : focused }))
    };
    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.description || !this.state.amount) {
            this.setState(() => ({error : 'Please, provide description and amount!'}))
        } else {
            this.setState(() => ({ error : '' }))
            this.props.onSubmit({
                description : this.state.description,
                // calculate in Cens currency 
                // amount : parseFloat(this.state.amount, 10) * 100,
                amount : parseFloat(this.state.amount, 10),
                createdAt : this.state.createdAt.valueOf(),
                note : this.state.note
            });
        }
    }
    render() {
        return (
                <form onSubmit={this.onSubmit} className="form">
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <input
                        className='text-input'
                        type = "text"
                        placeholder = "Descripting"
                        autoFocus
                        value = {this.state.description}
                        onChange = {this.onDiscriptionChange}
                    />
                    <input
                        type = "text"
                        placeholder = "Amount"
                        className='text-input'
                        value = {this.state.amount} 
                        onChange = {this.onAmountChange}
                    />
                    <SingleDatePicker
                        date = {this.state.createdAt}
                        onDateChange = {this.onDateChange}
                        focused = {this.state.calenderFocused}
                        onFocusChange = {this.onFocusChange}
                        numberOfMonths = {1}
                        isOutsideRange = {() => false }
                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        value = {this.state.note}
                        onChange = {this.onNoteChange}
                        className='textarea'
                    >
                    </textarea>
                    <div>
                        <button className="button">Save Expense</button>
                    </div>
                </form>
        );
    }
};