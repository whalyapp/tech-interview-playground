import * as React from 'react';
import './HelloWorld.css';

export interface IHelloWorldProps {
}

export default class HelloWorld extends React.Component<IHelloWorldProps> {
  public render() {
    return (
      <span className="hello-world">
        👋 🌍
      </span>
    );
  }
}
