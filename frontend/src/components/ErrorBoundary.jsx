import React from 'react'
import rollbar from '../utils/rollbar'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    rollbar.error(error, { extra: info })
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так.</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary
