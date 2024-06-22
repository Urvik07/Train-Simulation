import { Module } from '@nestjs/common';
import { TrainController } from './train.controller';
import { TrainService } from './train.service';
import { TrainBuilder } from './train-builder';
import { WorkflowManager } from './workflow-manager';

@Module({
  controllers: [TrainController],
  providers: [TrainService, TrainBuilder, WorkflowManager],
})
export class TrainModule {}