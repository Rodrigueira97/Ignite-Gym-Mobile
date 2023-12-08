export interface exerciseHistoryDTO {
  id: string;
  name: string;
  user_id: string;
  exercise_id: string;
  group: string;
  hour: string;
}
export interface HistoryDTO {
  title: string;
  data: exerciseHistoryDTO[];
}
