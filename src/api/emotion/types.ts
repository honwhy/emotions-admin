export interface ExperienceItem {
  record_id: string;
  user_id: string;
  flow_path: string;
  scene: string;
  content: string;
  create_time: number;
  score: number;
  summary: string;
  module: string;
  moduleName: string;
}

export interface QaAnswer {
  score: number;
  summary: string;
}

export interface ModuleInfo {
  module: string;
  moduleName: string;
}
