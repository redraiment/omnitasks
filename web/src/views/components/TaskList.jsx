import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Table } from 'antd';
import EditableTask from 'views/components/EditableTask';
import Operators from 'views/components/Operators';
import Toolbar from 'views/components/Toolbar';
import state from 'data/state';
import { useLoad, useWatchTasks, useSetCompleted } from 'data/hooks';

export default () => {
  const tasks = useRecoilValue(state.tasks);
  const keys = useRecoilValue(state.completedKeys);
  const setCompleted = useSetCompleted();
  const load = useLoad();

  useWatchTasks();
  useEffect(() => {
    load();
  }, []);

  return (
    <Table
      bordered
      pagination={false}
      title={() => <Toolbar />}
      rowSelection={{
        hideSelectAll: true,
        columnTitle: '状态',
        selectedRowKeys: keys,
        onSelect: (task, isCompleted) => setCompleted(task.id, isCompleted),
      }}
      columns={[{
        title: '任务',
        key: 'title',
        dataIndex: 'title',
        render: (_, record) => <EditableTask task={record} />,
      }, {
        title: '操作',
        key: 'operators',
        width: '100px',
        render: (_, record) => <Operators task={record} />,
      }]}
      dataSource={tasks}
    />
  );
}
