import { Injectable } from '@nestjs/common';
import { TrainBuilder } from './train-builder';
import { WorkflowManager } from './workflow-manager';
import { TrainCar } from './models/train-car.interface';

@Injectable()
export class TrainService {
  private train: TrainCar;
  private workflowManager: WorkflowManager;

  constructor(private trainBuilder: TrainBuilder, workflowManager: WorkflowManager) {
    this.train = this.trainBuilder
      .addCar('CC-1')
      .addCar('CC-2')
      .addCar('AC-1')
      .addCar('AC-2')
      .addCar('Gen-1')
      .addCar('Gen-2')
      .build();
    this.workflowManager = workflowManager;
  }

  getTrainModel(): string {
    let current: TrainCar | null = this.train;
    let model = '';
    while (current) {
      model += `[${current.type}]`;
      if (current.backConnection) model += ' - ';
      current = current.backConnection;
    }
    return model;
  }

  performAction(carType: string): string {
    const nextActions = this.workflowManager.getNextAction(carType);
    const actionBy = this.workflowManager.getActionBy(carType);
    let response = `Action performed on ${carType}.`;
    if (nextActions.length > 0) {
      response += ` Next actions: ${nextActions.join(', ')}.`;
    }
    if (actionBy) {
      response += ` Action performed by: ${actionBy.join(', ')}.`;
    }
    return response;
  }

  addPantryCar(type: 'full' | 'half'): void {
    const pantryType = type === 'full' ? 'Full Pantry' : 'Half Pantry, Half Passenger';
    this.trainBuilder.addCar(pantryType);
    // Rebuild the train
    this.train = this.trainBuilder.build();
  }
}