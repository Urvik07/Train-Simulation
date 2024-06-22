import { Injectable } from '@nestjs/common';
import { TrainCar } from './models/train-car.interface';

@Injectable()
export class TrainBuilder {
  private engine: TrainCar;
  private cars: TrainCar[] = [];

  constructor() {
    this.engine = { type: 'Engine', frontConnection: null, backConnection: null };
  }

  addCar(type: string): TrainBuilder {
    const newCar: TrainCar = { type, frontConnection: null, backConnection: null };
    if (this.cars.length > 0) {
      const lastCar = this.cars[this.cars.length - 1];
      lastCar.backConnection = newCar;
      newCar.frontConnection = lastCar;
    } else {
      this.engine.backConnection = newCar;
      newCar.frontConnection = this.engine;
    }
    this.cars.push(newCar);
    return this;
  }

  build(): TrainCar {
    return this.engine;
  }
}