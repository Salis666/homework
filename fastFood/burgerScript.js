let valueSizeBurger;
const sizeBurger = document.querySelectorAll('.sizeBurger');
for (let i = sizeBurger.length-1; i >= 0; i--) {
    sizeBurger[i].addEventListener('click', (e) => {
        valueSizeBurger = e.target.value;
        console.log(valueSizeBurger);
    });
}

let valueFillingBurger;
const fillingBurger = document.querySelectorAll('.fillingBurger');
for (let i = fillingBurger.length-1; i >= 0; i--) {
    fillingBurger[i].addEventListener('click', (e) => {
        valueFillingBurger = e.target.value;
        console.log(valueFillingBurger);
    });
}

let valueAdditionBurger = [];
let controllerClickMayonnaise = 0;
let controllerClickSpice = 0;
const additionBurgerMayonnaise = document.querySelector('.additionBurgerMayonnaise')
    .addEventListener('click', (e) => {
    if (controllerClickMayonnaise == 0) {
        valueAdditionBurger.push(e.target.value);
        controllerClickMayonnaise = 1;
    } else {
        valueAdditionBurger.splice(e.target.value, 1)
        controllerClickMayonnaise = 0;
    }
});
const additionBurgerSpice = document.querySelector('.additionBurgerSpice')
    .addEventListener('click', (e) => {
        if (controllerClickSpice == 0) {
            valueAdditionBurger.push(e.target.value);
            controllerClickSpice = 1;
        } else {
            valueAdditionBurger.splice(e.target.value, 1)
            controllerClickSpice = 0;
        }
    });



class Hamburger {
    constructor(size, filling, addition) {
        this.size = size;
        this.filling = filling;
        this.addition = addition;
    }
    getPrice () {
        let sizeSplit = this.size.split(' ');
        let sizePrice = +sizeSplit[1];
        let fillingSplit = this.filling.split(' ');
        let fillingPrise = +fillingSplit[1];
        let additionPrice;
        if (this.addition.length > 1) {
            let addition_1 = this.addition[0].split(' ');
            let addition_2 = this.addition[1].split(' ');
            additionPrice = +addition_1[1] + +addition_2[1];
        } else if (this.addition.length > 0){
            let additionSplit = this.addition[0].split(' ');
            additionPrice = +additionSplit[1]
        } else additionPrice = 0;
        return sizePrice + fillingPrise + additionPrice;
    }
    getCalories () {
        let sizeSplit = this.size.split(' ');
        let sizeCalories = +sizeSplit[2];
        let fillingSplit = this.filling.split(' ');
        let fillingCalories = +fillingSplit[2];
        let additionCalories;
        if (this.addition.length > 1) {
            let addition_1 = this.addition[0].split(' ');
            let addition_2 = this.addition[1].split(' ');
            additionCalories = +addition_1[2] + +addition_2[2];
        } else if (this.addition.length > 0){
            let additionSplit = this.addition[0].split(' ');
            additionCalories = +additionSplit[2]
        } else additionCalories = 0;
        return sizeCalories + fillingCalories + additionCalories;
    }
}

let gamburger;

const resultBurger = document.querySelector('.gambResultButton')
    .addEventListener('click', (e) => {
        if (valueSizeBurger !== undefined && valueFillingBurger !== undefined) {
            gamburger = new Hamburger(valueSizeBurger, valueFillingBurger, valueAdditionBurger);
            let textResultBurger = document.querySelector('.resultText');
            textResultBurger.textContent = `Стоимость бургера ${gamburger.getPrice()}р Калорийность бургера  ${gamburger.getCalories()}Кк`;
        } else alert('Вы выбрали не все обязательные пункты:\nразмер бургера или начинка бургера')

    });

