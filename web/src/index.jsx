import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import TaskList from "views/components/TaskList";
import 'antd/dist/reset.css';

const container = document.getElementById('app');
const root = createRoot(container);
const client = new ApolloClient({
    link: split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition'
                && definition.operation === 'subscription'
            );
        },
        new GraphQLWsLink(createClient({ url: 'ws://localhost:3000/graphql' })),
        new HttpLink({ uri: 'http://localhost:3000/graphql' }),
    ),
    cache: new InMemoryCache(),
});
root.render(
    <RecoilRoot>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <TaskList />
            </ApolloProvider>
        </BrowserRouter>
    </RecoilRoot>
);
