import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TrainService } from './train.service';

@Controller('train')
export class TrainController {
  constructor(private trainService: TrainService) {}

  @Get('model')
  getTrainModel(): string {
    return this.trainService.getTrainModel();
  }

  @Post('action/:carType')
  performAction(@Param('carType') carType: string): string {
    return this.trainService.performAction(carType);
  }

  @Post('add-pantry')
  addPantryCar(@Body('type') type: 'full' | 'half'): string {
    this.trainService.addPantryCar(type);
    return `Added ${type} pantry car to the train.`;
  }
}