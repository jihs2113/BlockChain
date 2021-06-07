interface Human {
//인터페이스는 JS에선 움직이지 않고type에서만 움직임.
//블록체인의 경우 하나의 block을 인터페이스로 할수있음.   
//그블록이 가져야되는 모든세부설명과 함께 한블록을
//인터페이스로 정의해준다.type에서만 가능하다.    
    name: string,
    age: number,
    gender: string
}

const person ={
    name : "Jihwan",
    age : 24,
    gender : "male"
};

// const sayHi = (name:string, age:number, gender:string):string =>{
//     return (`Hello ${name}, you are ${age}, you r a ${gender}!`);
// };

const sayHi = (person: Human):string =>{
    //위에처럼 따로 파싱하지않고 
    return (`Hello ${person.name}, you are ${person.age}, you r a ${person.gender}!`);
};

console.log(sayHi(person));
//person인 오브젝트를 보냈을때 human 인터페이스와
//같은 구조인지를 함수의 pasing을 통해서 보고

export {};