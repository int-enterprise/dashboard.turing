export type MetricKey =
  | "processing_velocity"
  | "stt_velocity"
  | "uer"
  | "pii_protection"
  | "mmr"
  | "mdr"
  | "diarization_accuracy"
  | "redundancy_ratio"
  | "summarization_velocity"
  | "hallucination_ratio"
  | "ssr"
  | "icr"
  | "summary_mdr"
  | "mir"
  | "ssa";

export type MetricGroup = "performance" | "stt" | "summary";
export type Direction = "lower-better" | "higher-better";

export type Threshold = {
  good: number;
  ok: number;
};

export type MetricSpec = {
  key: MetricKey;
  label: string;
  group: MetricGroup;
  direction: Direction;
  unit: "ratio" | "sec" | "percent";
  displayMin: number;
  displayMax: number;
  threshold: Threshold;
  /** 카드 제목 아래 한 줄 요약 — 비전문가도 이해 가능하도록 */
  summary: string;
  /** 툴팁 · 드로워 상세 설명 — 쉬운 말로 짧게 */
  description: string;
};

export const METRICS: MetricSpec[] = [
  {
    key: "processing_velocity",
    label: "전체 처리 속도",
    group: "performance",
    direction: "lower-better",
    unit: "ratio",
    displayMin: 0,
    displayMax: 2,
    threshold: { good: 0.3, ok: 1.0 },
    summary: "오디오 대비 전체 처리 시간",
    description:
      "오디오 길이 대비 처리 시간 비율. 0.3이면 오디오보다 3배 빠름, 1.0은 실시간과 같음. 낮을수록 빠릅니다.",
  },
  {
    key: "stt_velocity",
    label: "음성→텍스트 속도",
    group: "stt",
    direction: "lower-better",
    unit: "ratio",
    displayMin: 0,
    displayMax: 1.5,
    threshold: { good: 0.2, ok: 0.5 },
    summary: "받아쓰기 단계 속도",
    description:
      "음성을 글자로 받아 적는 단계만의 속도. 0.2 이하면 5배속, 0.5 이하면 2배속 이상. 낮을수록 빠릅니다.",
  },
  {
    key: "uer",
    label: "이상 문장 비율",
    group: "stt",
    direction: "lower-better",
    unit: "ratio",
    displayMin: 0,
    displayMax: 1,
    threshold: { good: 0.05, ok: 0.15 },
    summary: "부자연스러운 문장이 섞인 비율",
    description:
      "AI가 잘못 만들어낸 이상 문장(예: '네네네네네', '시청해주셔서 감사합니다')의 비율. 낮을수록 깔끔합니다.",
  },
  {
    key: "pii_protection",
    label: "개인정보 보호율",
    group: "stt",
    direction: "higher-better",
    unit: "ratio",
    displayMin: 0,
    displayMax: 1,
    threshold: { good: 0.9, ok: 0.5 },
    summary: "주민번호·전화번호 등을 가린 비율",
    description:
      "텍스트 안의 개인정보를 AI가 얼마나 잘 마스킹했는지. 1.0은 전부 가렸거나 개인정보 자체가 없음을 의미합니다.",
  },
  {
    key: "mmr",
    label: "의료 용어 누락률",
    group: "stt",
    direction: "lower-better",
    unit: "ratio",
    displayMin: 0,
    displayMax: 1,
    threshold: { good: 0.1, ok: 0.3 },
    summary: "놓친 의료 용어 비율",
    description:
      "실제 대화에 나온 의료 용어(예: '관절염', 'MRI') 중 AI가 받아 적지 못한 비율. 낮을수록 정확히 알아들은 것.",
  },
  {
    key: "mdr",
    label: "의료 용어 왜곡률",
    group: "stt",
    direction: "lower-better",
    unit: "ratio",
    displayMin: 0,
    displayMax: 1,
    threshold: { good: 0.1, ok: 0.3 },
    summary: "의료 용어를 잘못 받아 적은 비율",
    description:
      "의료 용어가 비슷하지만 다른 형태로 잘못 적힌 비율 (예: '관절염'→'관정염'). 낮을수록 정확합니다.",
  },
  {
    key: "diarization_accuracy",
    label: "화자 분리 정확도",
    group: "stt",
    direction: "higher-better",
    unit: "ratio",
    displayMin: 0,
    displayMax: 1,
    threshold: { good: 0.8, ok: 0.5 },
    summary: "누가 말했는지 맞게 구분한 비율",
    description:
      "의사가 말한 부분과 환자가 말한 부분을 AI가 얼마나 정확히 나눴는지. 높을수록 대화 상대를 잘 구분한 것.",
  },
  {
    key: "redundancy_ratio",
    label: "반복 문장 비율",
    group: "stt",
    direction: "lower-better",
    unit: "ratio",
    displayMin: 0,
    displayMax: 1,
    threshold: { good: 0.05, ok: 0.15 },
    summary: "똑같은 말이 반복된 비율",
    description:
      "AI가 실수로 같은 문장을 연속 출력한 비율. 낮을수록 매끄러운 받아쓰기입니다.",
  },
  {
    key: "summarization_velocity",
    label: "요약 속도",
    group: "summary",
    direction: "lower-better",
    unit: "ratio",
    displayMin: 0,
    displayMax: 1,
    threshold: { good: 0.1, ok: 0.3 },
    summary: "요약 단계 처리 속도",
    description:
      "받아 적은 텍스트를 요약하는 단계의 속도. 0.1 이하면 오디오 대비 10배 빠름. 낮을수록 빠릅니다.",
  },
  {
    key: "hallucination_ratio",
    label: "환각(지어낸 내용) 비율",
    group: "summary",
    direction: "lower-better",
    unit: "ratio",
    displayMin: 0,
    displayMax: 1,
    threshold: { good: 0.1, ok: 0.3 },
    summary: "원본에 없는 내용을 지어낸 비율",
    description:
      "요약문 문장 중 실제 대화에 근거가 없는(AI가 지어낸) 문장 비율. 낮을수록 신뢰할 만한 요약입니다.",
  },
  {
    key: "ssr",
    label: "의미 보존율",
    group: "summary",
    direction: "higher-better",
    unit: "ratio",
    displayMin: 0,
    displayMax: 1,
    threshold: { good: 0.7, ok: 0.4 },
    summary: "원본 의미를 제대로 담은 비율",
    description:
      "요약문 문장 중 실제 대화 내용과 의미가 맞는 문장 비율. 높을수록 원본을 잘 반영합니다.",
  },
  {
    key: "icr",
    label: "요약 압축율",
    group: "summary",
    direction: "lower-better",
    unit: "ratio",
    displayMin: 0,
    displayMax: 1,
    threshold: { good: 0.5, ok: 1.0 },
    summary: "원본 대비 요약이 얼마나 짧아졌나",
    description:
      "요약 길이 ÷ 원본 길이. 0.5 이하면 절반 이하로 압축. 낮을수록 간결합니다.",
  },
  {
    key: "summary_mdr",
    label: "요약 의료 용어 왜곡률",
    group: "summary",
    direction: "lower-better",
    unit: "ratio",
    displayMin: 0,
    displayMax: 1,
    threshold: { good: 0.1, ok: 0.3 },
    summary: "요약문의 의료 용어 오타 비율",
    description:
      "요약문에 의료 용어가 잘못된 형태로 적힌 비율. 낮을수록 정확한 요약입니다.",
  },
  {
    key: "mir",
    label: "의료 정보 포함률",
    group: "summary",
    direction: "higher-better",
    unit: "ratio",
    displayMin: 0,
    displayMax: 1,
    threshold: { good: 0.7, ok: 0.4 },
    summary: "중요한 의료 용어가 요약에 남은 비율",
    description:
      "대화에 나온 의료 용어 중 요약문에도 들어간 비율. 높을수록 중요한 의료 정보를 놓치지 않았습니다.",
  },
  {
    key: "ssa",
    label: "SOAP 배치 정확도",
    group: "summary",
    direction: "higher-better",
    unit: "ratio",
    displayMin: 0,
    displayMax: 1,
    threshold: { good: 0.7, ok: 0.4 },
    summary: "SOAP 항목별 분류 정확도",
    description:
      "의료 요약은 S(증상)·O(검사)·A(진단)·P(치료)로 나눠 적습니다. 각 문장이 맞는 항목에 배치된 비율. 높을수록 구조가 정확합니다.",
  },
];

export const METRIC_MAP: Record<MetricKey, MetricSpec> = Object.fromEntries(
  METRICS.map((m) => [m.key, m]),
) as Record<MetricKey, MetricSpec>;
