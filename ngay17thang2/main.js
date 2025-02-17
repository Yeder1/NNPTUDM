let Student = function(name, age, score1, score2){
    this.name=name;
    this.age=age;
    this.score1=score1;
    this.score2=score2
}


function getRandomStudent() {
    let students = [
        { name: "Hoang Anh", age: 22, score1: 10, score2: 10 },
        { name: "Phi Long", age: 21, score1: 8, score2: 7 },
        { name: "Hoang Tin", age: 20, score1: 6, score2: 7 },
        { name: "Quoc Trung", age: 17, score1: 5, score2: 6 }
    ];
    return students[Math.floor(Math.random() * students.length)];
}

let promise1 = new Promise((resolve, reject) => {
    let randomNum = Math.floor(Math.random() * 10);
    setTimeout(() => {
        if (randomNum % 2 === 0) {
            resolve(getRandomStudent());
        } else {
            reject("Dữ liệu lỗi");
        }
    }, 2000);
});

let promise2 = new Promise((resolve, reject) => {
    let rd = Math.floor(Math.random() * 10);
    setTimeout(() => {
        if (rd % 2 === 0) {
            resolve(getRandomStudent());
        } else {
            reject("Dữ liệu lỗi");
        }
    }, 4000);
});

Promise.all([promise1, promise2])
    .then(results => {
        console.log("Lấy dữ liệu hoàn thành", results);
    })
    .catch(error => {
        console.log("Lỗi: ", error);
    });

Promise.race([promise1, promise2])
    .then(result => {
        console.log("Đã lấy được dữ liệu", result);
    })
    .catch(error => {
        console.log("Lỗi: ", error);
    });
