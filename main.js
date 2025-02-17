
//Trinh Huu Hoang Anh - 2180606064


let Student = function(name, age, score1, score2){
    this.name=name;
    this.age=age;
    this.score1=score1;
    this.score2=score2
}
let Student1=new Student("Hoang Anh",22,10,10);
let Student2=new Student("Phi Long",21,8,7);
let Student3=new Student("Hoang Tin",20,6,7);
let Student4=new Student("Quoc Trung",17,5,6);

let students = [Student1, Student2, Student3, Student4];

function xepLoai(Student){
    const dtb=(Student.score1+Student.score2)/2;
    if(dtb>=8){
        return `${Student.name}: Gioi`;
    }else if(dtb>=7){
        return `${Student.name}: Kha`;
    }else if(dtb>=6){
        return `${Student.name}: Trung Binh`;
    }else{
        return `${Student.name}: Yeu`;
    }
}

const xepLoaiSinhVien = students.map(xepLoai);
console.log("Xếp loại từng sinh viên:");
console.log(xepLoaiSinhVien);


const dtbLop = students.reduce((total,student) => {
    const dtb = (student.score1 + student.score2)/2;
    return total+dtb;
}, 0) / students.length;

console.log(`Điểm trung bình của sinh viên trong lớp là:${dtbLop.toFixed(2)}`);


const checkTuoiSV=students.some(student=>student.age<18);
console.log("Có sinh viên nào dưới 18 tuổi hay không ?   " + (checkTuoiSV ? "Có" : "Không"));

const checkTenSV=students.every(student=>student.name && student.name.trim() != "");
console.log("Tất cả sinh viên có đủ tên hay không ?  " + (checkTenSV ? "Có" : "Không"));