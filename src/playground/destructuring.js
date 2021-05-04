// Object destructuring
const book = {
    title : 'Ego is the Enemy',
    author : 'Ryan Holiday',
    publisher :  {
        // name : 'Penguin'
    }
};

const  { title, author } = book;
const  { name:publisher_Name = 'Self-Publisher' } = book.publisher;

console.log(`I am reading "${title}" book and its author is "${author}"`);
console.log(`and it publish by ${publisher_Name}`);

// Array destructuring

const item = [
    undefined,
    '$2.00',
    '$2.50',
    '$2.75'
]

const [itemName = 'coffee (hot)', , medium] = item;

console.log(`A medium ${itemName} costs ${medium}`);