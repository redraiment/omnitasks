import { Button } from 'antd';
import { useRemove } from 'data/hooks';

export default ({ task: { id } }) => {
  const remove = useRemove();
  return <Button type="link" onClick={() => remove(id)}>删除</Button>;
};
