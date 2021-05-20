import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromActions from '../actions/calendar.actions';

export function CalendarReducer(state = fromStore.initialState, action: fromActions.CalendarActions): fromStore.CalendarState {
    switch (action.type) {
      case fromActions.ActionTypes.GetCalendar: {
        return { ...state, ...{
          isLoading: true,
        }};
      }

      case fromActions.ActionTypes.SetCalendar: {
        return { ...state, ...{
          isLoading: false,
          calendar: action.payload
        }};
      }

      case fromActions.ActionTypes.UpdateCalendar: {
        return { ...state, ...{
          isLoading: true,
        }};
      }
      case fromActions.ActionTypes.UpdateCalendarSuccess: {
        return { ...state, ...{
          isLoading: false,
          calendar: action.payload.calendar
        }};
      }
      case fromActions.ActionTypes.UpdateCalendarFailed: {
        return { ...state, ...{
          isLoading: false
        }};
      }

      default: {
        return state;
      }
  }
}

const exportLoading = (state: fromStore.CalendarState) => state.isLoading;
const exportCalendar = (state: fromStore.CalendarState) => state.calendar;
const selectCalendarState = createFeatureSelector<fromStore.CalendarState>('calendar');

export const getLoading = createSelector(selectCalendarState, exportLoading);
export const getCalendar = createSelector(selectCalendarState, exportCalendar);
