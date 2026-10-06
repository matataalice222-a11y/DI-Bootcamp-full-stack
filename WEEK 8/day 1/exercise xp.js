import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favoriteColor: "red" };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 2000);
  }

  shouldComponentUpdate() {
    console.log("in shouldComponentUpdate");
    return true; // try false to block updates
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate");
    return null;
  }

  componentDidUpdate() {
    console.log("after update");
  }

  render() {
    return (
      <div>
        <h1>My Favorite Color is {this.state.favoriteColor}</h1>
        <button onClick={() => this.setState({ favoriteColor: "blue" })}>
          Change to Blue
        </button>
      </div>
    );
  }
}

export default App;
