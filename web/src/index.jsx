import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/reset.css';
import TaskList from "views/components/TaskList";

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <RecoilRoot>
      <BrowserRouter>
        <TaskList />
      </BrowserRouter>
    </RecoilRoot>
);
