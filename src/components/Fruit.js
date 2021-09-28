import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
class Fruit extends Component {
  render() {
    let { name, price, image } = this.props.fruitData;
    return (
      <Card style={{ width: '10rem' }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            Price: {price}
          </Card.Text>
          {this.props.atHome ?
            <Button variant="primary" onClick={() => this.props.addToFavorites({ name, price, image })}>add to favorites</Button>
            :
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="primary" onClick={() => {
                this.props.showModal({ name, price, image });
              }
              }>update</Button>
              <Button variant="primary" onClick={() => this.props.removeFavoriteItem(name)}>delete</Button>
            </div>
          }
        </Card.Body>
      </Card>
    )
  }
}

export default Fruit
