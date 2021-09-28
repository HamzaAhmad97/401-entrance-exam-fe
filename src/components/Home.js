import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Fruit from './Fruit';
class Home extends React.Component {

  componentDidMount() {
    this.props.addUser();
  }
  render() {
    console.log(this.props.fruits)
    return (
      <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem'}}>
        {
          this.props.fruits.map((itm, idx) => (
            <Fruit 
            key={idx}
            fruitData={itm}
            atHome={true}
            addToFavorites={this.props.addToFavorites}
            />
          ))
        }
      </div>
    )
  }
}

export default Home;
