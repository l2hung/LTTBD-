let markMass1 = 78;
let markMass2 = 95;
let markHeight1 = 1.69;
let markHeight2 = 1.88;
let johnMass1 = 92;
let johnMass2 = 85;
let johnHeight1 = 1.95;
let johnHeight2 = 1.76;

let bmiMark1 = markMass1 / (markHeight1 ** 2);
let bmiMark2 = markMass2 / (markHeight2 ** 2);
let bmiJohn1 = johnMass1 / (johnHeight1 ** 2);
let bmiJohn2 = johnMass1 / (johnHeight2 ** 2);

let markHigherBMI1 = bmiMark1 > bmiJohn1;
let markHigherBMI2 = bmiMark2 > bmiJohn2;
console.log("Data 1:BMIMark Higher Than BMIJohn:", markHigherBMI1);
console.log("Data 2:BMIMark Higher Than BMIJohn:", markHigherBMI1);