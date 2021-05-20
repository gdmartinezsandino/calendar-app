import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from '../store';
import * as fromActions from '../actions/shared.actions';

export function SharedReducer(state = fromStore.initialState, action: fromActions.SharedActions): fromStore.SharedState {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

const exportLoading = (state: fromStore.SharedState) => state.isLoading;
const selectSharedState = createFeatureSelector<fromStore.SharedState>('shared');

export const getLoading = createSelector(selectSharedState, exportLoading);
