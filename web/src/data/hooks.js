import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { gql, useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import state from "data/state";

export const useLoad = () => {
  const setTasks = useSetRecoilState(state.tasks);
  const [fetchTasks] = useLazyQuery(gql`{
    tasks {
      id
      title
      editing
      completed
    }
  }`);
  return useCallback(() => {
    fetchTasks().then(({ loading, data }) => {
      if (!loading && data) {
        setTasks(data?.tasks?.map(task => ({
          key: `${task.id}`,
          ...task,
        })));
      }
    });
  }, [fetchTasks, setTasks]);
}

export const useWatchTasks = () => {
  const setTasks = useSetRecoilState(state.tasks);
  const { loading, data } = useSubscription(gql`
    subscription {
      watch {
        id
        title
        editing
        completed
      }
    }
  `);
  useEffect(() => {
    if (!loading && data) {
      setTasks(data?.watch?.map(task => ({
        key: `${task.id}`,
        ...task,
      })));
    }
  }, [setTasks, loading, data]);
};

export const useCreate = () => {
  const [create] = useMutation(gql`mutation {
    create {
      id
    }
  }`);
  return useCallback(() => {
    create().then(() => {});
  }, [create]);
};

export const useRemove = () => {
  const [remove] = useMutation(gql`mutation Remove($id: Int!) {
    remove(id: $id) {
      id
    }
  }`);
  return useCallback((id) => {
    remove({ variables: { id } }).then(() => {});
  }, [remove]);
};

export const useSetTitle = () => {
  const [setTitle] = useMutation(gql`
    mutation setTitle($id: Int!, $title: String!) {
      setTitle(id: $id, title: $title) {
        id
        title
      }
    }
  `);
  return useCallback((id, title) => {
    setTitle({ variables: { id, title } }).then(() => {});
  }, [setTitle]);
};

export const useSetEditing = () => {
  const [setEditing] = useMutation(gql`
    mutation setEditing($id: Int!, $editing: Boolean!) {
      setEditing(id: $id, editing: $editing) {
        id
        editing
      }
    }
  `);
  return useCallback((id, editing) => {
    setEditing({ variables: { id, editing } }).then(() => {});
  }, [setEditing]);
};

export const useSetCompleted = () => {
  const [setCompleted] = useMutation(gql`
    mutation setCompleted($id: Int!, $completed: Boolean!) {
      setCompleted(id: $id, completed: $completed) {
        id
        completed
      }
    }
  `);
  return useCallback((id, completed) => {
    setCompleted({ variables: { id, completed } }).then(() => {});
  }, [setCompleted]);
};
