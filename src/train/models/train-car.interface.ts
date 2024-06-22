export interface TrainCar {
    type: string;
    frontConnection: TrainCar | null;
    backConnection: TrainCar | null;
    action?: () => void;
  }