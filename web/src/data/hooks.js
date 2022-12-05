import { useCallback, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import { graph } from 'middlewares/http';
import { tasksState } from "data/state";

const useGraphQL = (query) => {
  const setTasks = useSetRecoilState(tasksState);
  const name = useMemo(() => query.replace(/^[^{]*\{\s*/, '').replace(/[^a-zA-Z].*$/, ''), [query]);
  return useCallback((variables = null) => {
    graph(query, variables).then(data => {
      const tasks = data[name]?.map(task => ({
        key: `${task.id}`,
        ...task
      })) || [];
      setTasks(tasks);
    });
  }, [setTasks, name]);
};

export const useLoad = () => {
  return useGraphQL('{ tasks { id, title, editing, completed } }');
};

export const useCreate = () => {
  return useGraphQL('mutation { create { id, title, editing, completed } }');
};

export const useRemove = () => {
  const gq = useGraphQL('mutation Remove($id: Int!) { remove(id: $id) { id, title, editing, completed } }');
  return useCallback((id) => {
    gq({ id });
  }, [gq]);
};

export const useSetTitle = () => {
  const gq = useGraphQL('mutation setTitle($id: Int!, $title: String!) { setTitle(id: $id, title: $title) { id, title, editing, completed } }');
  return useCallback((id, title) => {
    gq({ id, title });
  }, [gq]);
};

export const useSetEditing = () => {
  const gq = useGraphQL('mutation setEditing($id: Int!, $editing: Boolean!) { setEditing(id: $id, editing: $editing) { id, title, editing, completed } }');
  return useCallback((id, editing) => {
    console.log('set editing')
    gq({ id, editing });
  }, [gq]);
};

export const useSetCompleted = () => {
  const gq = useGraphQL('mutation setCompleted($id: Int!, $completed: Boolean!) { setCompleted(id: $id, completed: $completed) { id, title, editing, completed } }');
  return useCallback((id, completed) => {
    gq({ id, completed });
  }, [gq]);
};
