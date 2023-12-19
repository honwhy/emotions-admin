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
}

export interface QaAnswer {
  score: number;
  summary: string;
}
