
let dolphinsScores = [96, 108, 89];
let koalasScores = [88, 91, 110];


let averageDolphins = (dolphinsScores[0] + dolphinsScores[1] + dolphinsScores[2]) / 3;
let averageKoalas = (koalasScores[0] + koalasScores[1] + koalasScores[2]) / 3;

console.log(`Dolphins' average score: ${averageDolphins}`);
console.log(`Koalas' average score: ${averageKoalas}`);


if (averageDolphins > averageKoalas && averageDolphins >= 100) {
    console.log("Dolphins win the trophy!");
} else if (averageKoalas > averageDolphins && averageKoalas >= 100) {
    console.log("Koalas win the trophy!");
} else if (averageDolphins === averageKoalas && averageDolphins >= 100 && averageKoalas >= 100) {
    console.log("It's a draw! Both teams win the trophy!");
} else {
    console.log("No team wins the trophy!");
}


dolphinsScores = [97, 112, 101];
koalasScores = [109, 95, 123];

averageDolphins = (dolphinsScores[0] + dolphinsScores[1] + dolphinsScores[2]) / 3;
averageKoalas = (koalasScores[0] + koalasScores[1] + koalasScores[2]) / 3;

console.log('Bonus1:');
console.log(`Dolphins' average score: ${averageDolphins}`);
console.log(`Koalas' average score: ${averageKoalas}`);

if (averageDolphins > averageKoalas && averageDolphins >= 100) {
    console.log("Dolphins win the trophy!");
} else if (averageKoalas > averageDolphins && averageKoalas >= 100) {
    console.log("Koalas win the trophy!");
} else if (averageDolphins === averageKoalas && averageDolphins >= 100 && averageKoalas >= 100) {
    console.log("It's a draw! Both teams win the trophy!");
} else {
    console.log("No team wins the trophy!");
}


dolphinsScores = [97, 112, 101];
koalasScores = [109, 95, 106];

averageDolphins = (dolphinsScores[0] + dolphinsScores[1] + dolphinsScores[2]) / 3;
averageKoalas = (koalasScores[0] + koalasScores[1] + koalasScores[2]) / 3;

console.log('Bonus2:');
console.log(`Dolphins' average score: ${averageDolphins}`);
console.log(`Koalas' average score: ${averageKoalas}`);

if (averageDolphins > averageKoalas && averageDolphins >= 100) {
    console.log("Dolphins win the trophy!");
} else if (averageKoalas > averageDolphins && averageKoalas >= 100) {
    console.log("Koalas win the trophy!");
} else if (averageDolphins === averageKoalas && averageDolphins >= 100 && averageKoalas >= 100) {
    console.log("It's a draw! Both teams win the trophy!");
} else {
    console.log("No team wins the trophy!");
}
