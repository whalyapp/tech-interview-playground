import * as React from 'react';
import HelloWorld from '../../components/hello-world/HelloWorld';
import { Layout } from 'antd';
import Header from '../../components/header/Header';
import "./Page.css"
import GraphQLService from '../../services/GraphQLService';

const { Content, Footer } = Layout

export interface IPageProps {
}

export default class Page extends React.Component<IPageProps> {

  componentDidMount() {
    GraphQLService(`query Articles {
      articles {
        title
      }
    }`, {})
  }

  public render() {
    return (
      <Layout className="layout">
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <HelloWorld />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}
