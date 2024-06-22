import { Injectable } from '@nestjs/common';
import { Workflow } from './models/workflow.interface';
import * as workflowJson from '../config/workflow.json';

@Injectable()
export class WorkflowManager {
  private workflow: Record<string, Workflow>;

  constructor() {
    this.workflow = workflowJson as Record<string, Workflow>;
  }

  getNextAction(currentRole: string): string[] {
    const currentWorkflow = Object.values(this.workflow).find(w => w.present_role === currentRole);
    return currentWorkflow ? currentWorkflow.next_role : [];
  }

  getActionBy(currentRole: string): string[] | undefined {
    const currentWorkflow = Object.values(this.workflow).find(w => w.present_role === currentRole);
    return currentWorkflow?.action_by;
  }
}