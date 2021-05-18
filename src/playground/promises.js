const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'maurice',
            age : 25
        });
        // reject('something is wrong');
    }, 5000);
});

promise.then((data) => {
    console.log(data)

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('this is my other promise');
        }, 5000);
    });
}).then((str) => {
    console.log('Does this run?', str);
}).catch((error) => {
    console.log('error : ', error);
});

console.log('after');