import { selector } from 'recoil';
import { tasksState } from 'data/state';

export const completedKeys = selector({
  key: 'tasks/completed/keys',
  get: ({ get }) => get(tasksState)
    .filter(({ completed }) => completed)
    .map(({ key }) => key),
});
