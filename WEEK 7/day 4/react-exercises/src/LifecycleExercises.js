import { Component } from 'react'

class FavoriteColor extends Component {
  state = { favoriteColor: 'red' }

  componentDidMount() {
    if (this.props.changesToYellow) {
      this.timer = window.setTimeout(() => {
        this.setState({ favoriteColor: 'yellow' })
      }, 1000)
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer)
  }

  shouldComponentUpdate() {
    return true
  }

  getSnapshotBeforeUpdate() {
    console.log('in getSnapshotBeforeUpdate')
    return this.state.favoriteColor
  }

  componentDidUpdate(_previousProps, _previousState, snapshot) {
    console.log('after update')
    console.log('Previous favorite color:', snapshot)
  }

  render() {
    return (
      <div className="lifecycle-example">
        <p>
          My favorite color is{' '}
          <strong style={{ color: this.state.favoriteColor }}>
            {this.state.favoriteColor}
          </strong>
        </p>
        <button
          className="demo-button"
          onClick={() => this.setState({ favoriteColor: 'blue' })}
          type="button"
        >
          Change color to blue
        </button>
      </div>
    )
  }
}

class Child extends Component {
  componentDidMount() {
    window.clearTimeout(this.unmountTimer)
    this.unmountTimer = null
  }

  componentWillUnmount() {
    this.unmountTimer = window.setTimeout(() => {
      window.alert('The Child component is unmounted.')
    }, 0)
  }

  render() {
    return <h3>Hello World!</h3>
  }
}

class UnmountingDemo extends Component {
  state = { show: true }

  render() {
    return (
      <div className="lifecycle-example">
        {this.state.show && <Child />}
        {this.state.show && (
          <button
            className="demo-button"
            onClick={() => this.setState({ show: false })}
            type="button"
          >
            Delete
          </button>
        )}
      </div>
    )
  }
}

function LifecycleExercises() {
  return (
    <section className="exercise-section" aria-labelledby="lifecycle-title">
      <div className="section-heading">
        <span>09</span>
        <h2 id="lifecycle-title">Class component lifecycle</h2>
      </div>
      <div className="lifecycle-grid">
        <article className="lifecycle-card">
          <h3>shouldComponentUpdate</h3>
          <p>Updates are allowed, so the color changes from red to blue.</p>
          <FavoriteColor />
        </article>
        <article className="lifecycle-card">
          <h3>Update and snapshot lifecycle</h3>
          <p>The color changes to yellow after mounting. Check the console for lifecycle logs.</p>
          <FavoriteColor changesToYellow />
        </article>
        <article className="lifecycle-card">
          <h3>Unmounting</h3>
          <p>Delete removes the child and displays an unmount alert.</p>
          <UnmountingDemo />
        </article>
      </div>
    </section>
  )
}

export default LifecycleExercises
