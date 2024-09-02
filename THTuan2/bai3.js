
const mark = {
    hoTen: "Mark Miller",
    canNang: 78, 
    chieuCao: 1.69, 

    
    calcBMI: function() {
        this.BMI = this.canNang / (this.chieuCao ** 2);
        return this.BMI;
    }
};

const john = {
    hoTen: "John Smith",
    canNang: 92, 
    chieuCao: 1.95, 

 
    calcBMI: function() {
        this.BMI = this.canNang / (this.chieuCao ** 2);
        return this.BMI;
    }
};


mark.calcBMI();
john.calcBMI();


if (mark.BMI > john.BMI) {
    console.log(`${mark.hoTen}'s BMI (${mark.BMI}) cao hơn ${john.hoTen}'s BMI (${john.BMI})!`);
} else if (john.BMI > mark.BMI) {
    console.log(`${john.hoTen}'s BMI (${john.BMI}) cao hơn ${mark.hoTen}'s BMI (${mark.BMI})!`);
} else {
    console.log(`${mark.hoTen} và ${john.hoTen} có cùng BMI (${mark.BMI})!`);
}
