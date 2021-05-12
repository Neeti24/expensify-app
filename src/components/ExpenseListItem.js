import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({id, description, amount, createdAt, note}) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h2>{description}</h2>
        </Link>
        <p>
         {numeral(amount).format('0,0.00')}
         -
         {moment(createdAt).format("MMMM Do, YYYY")}
         -
         {note}
        </p>
    </div>
);


export default ExpenseListItem;