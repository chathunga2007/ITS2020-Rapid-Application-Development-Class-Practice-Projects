let name = "Chathunga";
// name = 10 -> #Type 'number' is not assignable to type 'string'.
let num = 100;
let is = true;
let hello = undefined;
let numArray = [10, 20, 30, 40, 50, 60];
let strArray = ["A", "B", "C", "D"];
// type Student = {
//     name: string
//     age: number
// }
let obj = { name: "Shaluka", age: 22 };
var Colors;
(function (Colors) {
    Colors[Colors["RED"] = 0] = "RED";
    Colors[Colors["GREEN"] = 1] = "GREEN";
    Colors[Colors["BLUE"] = 2] = "BLUE";
})(Colors || (Colors = {}));
let color = Colors.RED;
function add(num1, num2) {
    return num1 + num2;
}
function callMe(name, age) {
    // return age ? name + age : name
    return `Name: ${name} ` + `Age: ${age}`;
}
function indentity(arg) {
    return arg;
}
// Union Types
let numSTR = 100;
console.log(name.toUpperCase());
console.log(obj);
console.log(add(10, 20));
console.log(callMe("Chathunga", 18));
console.log(numSTR);
export {};
// transfile(compile)
// TS -> JS
// npx tsc
// app.ts -> app.js
// node app.js
//# sourceMappingURL=app.js.map