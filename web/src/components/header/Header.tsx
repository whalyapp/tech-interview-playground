import * as React from 'react';
import { Layout } from 'antd';

const { Header: AntDesignHeader } = Layout;

export interface IHeaderProps {
}

export default class Header extends React.Component<IHeaderProps> {
  public render() {
    return (
      <AntDesignHeader>
        🐳
      </AntDesignHeader>
    );
  }
}
