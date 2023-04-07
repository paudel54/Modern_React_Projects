//Js Object=>Pass by reference
//All we are doing this is to save Memory. 

let obj1 = {
    name: 'Mark',
    password: '123'
}
let obj2 = obj1;
//I want to change obj2 password to 333
obj2.password = '333';
console.log('log from obj1', obj1); ///output { name: 'Mark', password: '333' }
console.log('log from obj2', obj2);//{ name: 'Mark', password: '333' }
//Object1 and Object2 are pointing to same
//memory locations.


//https://www.executeprogram.com/courses/typescript-basics/lessons/basic-types?interactive=1 learn TS best resource