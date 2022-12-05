import { Input } from 'antd';
import { useSetTitle, useSetEditing } from 'data/hooks';

export default ({ task: { id, title, editing } }) => {
  const setTitle = useSetTitle();
  const setEditing = useSetEditing();
  return editing ? (
    <Input
      defaultValue={title}
      onBlur={(event) => setTitle(id, event.target.value)}
      onPressEnter={(event) => setTitle(id, event.target.value)}
    />
  ) : (
    <div onDoubleClick={() => setEditing(id, true)}>{title}</div>
  );
};
