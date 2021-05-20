import * as fromModels from '@app/models';

export interface SharedState {
  isLoading: boolean;
}

export const initialState: SharedState = {
  isLoading: false,
};
