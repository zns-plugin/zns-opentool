import { Button, Result } from "antd";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  msg?: string;
  where?: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", { error }, { errorInfo });
    let msg = "";
    let where = "";
    if (error) {
      msg = error.message;
    }
    if (errorInfo) {
      const componentName = errorInfo.componentStack;
      where = componentName;
    }
    this.setState({ hasError: true, msg, where });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="404"
          subTitle="Đã có lỗi xảy ra, vui lòng thử lại."
          extra={
            <Button type="primary" onClick={() => window.history.back()}>
              Back Home
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
