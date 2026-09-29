let name = "Chathunga"
// name = 10 -> #Type 'number' is not assignable to type 'string'.
let num : number = 100
let is : boolean = true
let hello : any = undefined
let numArray : number[] = [10, 20, 30, 40, 50, 60]
let strArray : string[] = ["A", "B", "C", "D"]

interface Student {
    name: string
    age: number
    email?: string // ? email yes or no (optional)
}

// type Student = {
//     name: string
//     age: number
// }

let obj : Student = {name: "Shaluka", age: 22}

enum Colors {
    RED,
    GREEN,
    BLUE
}

let color : Colors = Colors.RED

function add(num1: number, num2: number): number {
    return num1 + num2
}

function callMe(name: string, age?: number): string {
    // return age ? name + age : name
    return `Name: ${name} ` + `Age: ${age}`
}

function indentity<T>(arg: T): T {
    return arg
}

// Union Types
let numSTR: number | string = 100

console.log(name.toUpperCase())
console.log(obj)
console.log(add(10, 20))
console.log(callMe("Chathunga", 18))
console.log(numSTR)

// transfile(compile)
// TS -> JS
// npx tsc

// app.ts -> app.js
// node app.js