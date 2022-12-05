import { Button } from 'antd';
import { useCreate } from 'data/hooks';

export default () => {
  const create = useCreate();
  return <Button type="link" onClick={() => create()}>添加任务</Button>;
}
