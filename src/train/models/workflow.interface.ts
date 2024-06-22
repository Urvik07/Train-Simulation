export interface Workflow {
    start_role: string[];
    present_role: string;
    next_role: string[];
    action_by?: string[];
  }