export interface IReminder {
  date: string;
  id: string;
  note: string;
}

export interface IFormatedReminder {
  date: string;
  time: string;
  id: string;
  note: string;
}

export interface IApiState {
  status: string;
  code: string;
}
