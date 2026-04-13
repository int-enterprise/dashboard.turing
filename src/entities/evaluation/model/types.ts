export type SttMetrics = {
  stt_velocity: number;
  uer: number;
  pii_protection: number;
  mmr: number;
  mdr: number;
  diarization_accuracy: number;
  redundancy_ratio: number;
};

export type SummaryMetrics = {
  summarization_velocity: number;
  hallucination_ratio: number;
  ssr: number;
  icr: number;
  mir: number;
  summary_mdr: number;
  ssa: number;
};

export type EvaluationMetrics = {
  processing_velocity: number;
  stt: SttMetrics;
  summary: SummaryMetrics;
};

export type EvaluationItem = {
  id: number;
  job_id: string;
  audio_filename: string;
  audio_duration: number;
  language: string | null;
  specialty: string | null;
  created_at: string;
  metrics: EvaluationMetrics;
};

export type EvaluationAverages = EvaluationMetrics & {
  sample_count: { stt: number; summary: number };
};

export type EvaluationsResponse = {
  total: number;
  page: number;
  size: number;
  averages: EvaluationAverages;
  items: EvaluationItem[];
};

export type EvaluationQuery = {
  page?: number;
  size?: number;
  from?: string;
  to?: string;
  language?: string;
  specialty?: string;
  job_id?: string;
};
