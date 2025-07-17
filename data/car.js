class Car {
  #brand; #model;
  speed = 0;
  isTrunkOpen = false;
  topspeed = 200;
  
  constructor(brand, model) {
    this.#brand = brand;
    this.#model = model;
  }
  
  displayInfo() {
    console.log(`${this.#brand} ${this.#model} Speed: ${this.speed} km/h isTrunkOpen: ${this.isTrunkOpen}`);
  }
  
  go() {
    if (this.speed+5 <= this.topspeed && this.isTrunkOpen === false) {
      this.speed+=5
      console.log(`Speed: ${this.speed} km/h`)
    } else {
      console.log('Car cannot move, trunk is open!')
    }
  }
  
  brake() {
    if (this.speed-5 >= 0) {
      this.speed-=5
      console.log(`Brake: ${this.speed} km/h`)
    }
  }
  
  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
      console.log('Trunk open');
    } else {
      console.log('Trunk cannot open, Car is moving!');
    }
  }
  
  closeTrunk() {
    this.isTrunkOpen = false;
  }
  
}

class Racecar extends Car{
  acceleration;
  topspeed = 300;
  
  constructor (brand, model, acceleration) {
    super(brand, model);
    this.acceleration = acceleration;
  }
  
  go() {
    if (this.speed+5 <= this.topspeed && this.isTrunkOpen === false) {
      this.speed+=this.acceleration
      console.log(`Speed: ${this.speed} km/h`)
    } else {
      console.log('Car cannot move, trunk is open!')
    }
  }
  
  openTrunk() {}
  
  closeTrunk() {}
  
}

const toyo = new Car('Toyota', 'Venza');
const mer = new Car('Mercedes', 'GLK');
const mc = new Racecar('McLaren', 'F1', 40);
console.log(mc.displayInfo());