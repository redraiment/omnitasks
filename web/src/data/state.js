import { atom } from 'recoil';

export const tasksState = atom({
  key: 'tasks',
  default: [],
});
