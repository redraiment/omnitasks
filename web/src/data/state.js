import { atom, selector } from 'recoil';

const state = {};

state.tasks = atom({
  key: 'tasks',
  default: [],
});

state.completedKeys = selector({
  key: 'tasks/completed/keys',
  get: ({ get }) => get(state.tasks)
      ?.filter(({ completed }) => completed)
      ?.map(({ key }) => key),
});

export default state;
