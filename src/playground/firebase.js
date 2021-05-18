import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDLCMkXEzUXB4-YA5AbRhf1zimxN2B_F3Y",
    authDomain: "expensifyapp-aef15.firebaseapp.com",
    databaseURL: "https://expensifyapp-aef15-default-rtdb.firebaseio.com",
    projectId: "expensifyapp-aef15",
    storageBucket: "expensifyapp-aef15.appspot.com",
    messagingSenderId: "458833151457",
    appId: "1:458833151457:web:18621f1c0cd786e36e7ea0",
    measurementId: "G-30P2M7WJNM"
  };

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();


database.ref('expenses').push({
  description : 'Rent',
  amount : 5000,
  note : 'Rent of May',
  createdAt : 130521
});

database.ref('expenses').push({
  description : 'Cafe bill',
  amount : 500,
  note : 'Coffe with myself',
  createdAt : 190521
});

database.ref('expenses').push({
  description : 'Shopping',
  amount : 2000,
  note : 'buy jean and a sexy top',
  createdAt : 150521
});

database.ref('expenses').on('child_removed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

database.ref('expenses').on('child_changed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

database.ref('expenses').on('child_added', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

database.ref('expenses')
  .once('value')
  .then((snapshot) => {
  const expenses = [];

  snapshot.forEach((childSnapshot) => {
    expenses.push({
      id : childSnapshot.key,
      ...childSnapshot.val()
    });
  });
  console.log(expenses);
});

database.ref('expenses').on('value', (snapshot) => {
  const expenses = [];

  snapshot.forEach((childSnapshot) => {
    expenses.push({
      id : childSnapshot.key,
      ...childSnapshot.val()
    });
  });
  console.log(expenses);
});

database.ref().set({
    name : 'Neeti Dawar',
    age : 25,
    stressLevel : 6,
    job : {
      title : 'Manager',
      company : 'google'
    },
    isSingle : false,
    location : {
      city : 'Bhopal',
      Country : 'India'
    }
}).then(() => {
  console.log('Data is saved!');
}).catch((error) => {
  console.log('This failed.', error);
});

database.ref('attribute').set({
    height : 155,
    weight : 45
});

database.ref().update({
  name : 'Maurice David',
  age : 24,
  isSingle : null,
  stressLevel : 9,
  'job/company' : 'Amazon',
  'location/city' : 'Seattle',
  'location/Country' : 'United States'
});


database.ref().on('value', (snapshot) => {
  const val = snapshot.val();
  console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
});


database.ref()
  .once('value')
  .then((snapshot) => {
  const val = snapshot.val();
  console.log(val);
});

database.ref('isSingle').remove().then(() => {
    console.log('Remove succeeded.')
}).catch((error) => {
  console.log('Remove failed.' + error)
});
