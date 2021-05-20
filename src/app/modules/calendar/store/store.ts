export interface CalendarState {
  isLoading: boolean;
  calendar: any;
}

export const initialState: CalendarState = {
  isLoading: false,
  calendar: null
};
