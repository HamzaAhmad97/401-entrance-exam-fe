import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Fruit from './Fruit';
import { Modal, Button } from 'react-bootstrap'
class FavFruit extends React.Component {
  constructor() {
    super();
    this.state = {
      newPrice: 0,
      newImage: '',
      newName: '',
      showModal: false,
      itemToRemove: '',
      originalName: ''
    }
  }
  componentDidMount() {
    this.props.getFavorites();
  }
  showModal = ({ name, price, image }) => {
    this.setState({ showModal: true, newPrice: price, newImage: image, newName: name, originalName: name })
  }
  getItemToRemove = (name) => {
    this.setState({itemToRemove: name})
  }
  render() {
    let {newName, newPrice, newImage} = this.state;
    console.log(this.state.itemToRemove)
    return (
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        {
          this.props.favorites.map((itm, idx) => (
            <Fruit
              key={idx}
              fruitData={itm}
              atHome={false}
              showModal={this.showModal}
              getItemToRemove={this.getItemToRemove}
              removeFavoriteItem={this.props.removeFavoriteItem}
              
            />
          ))
        }

        <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Update or remove a fruit from favorites</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: '100%'}}>
              <label for='name'>name</label>
              <input id='name' type='text' value={this.state.newName} onChange={(e) => this.setState({ newName: e.target.value })} />

              <label for='image'>image</label>
              <input id='image' type='text' value={this.state.newImage} onChange={(e) => this.setState({ newImage: e.target.value })} />

              <label for='price'>price</label>
              <input id='price' type='text' value={this.state.newPrice} onChange={(e) => this.setState({ newPrice: e.target.value })} />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              this.setState({showModal: false});
              this.props.updateFavoriteItem(this.state.originalName, {newImage, newName, newPrice})}}>
              update
            </Button>
            <Button variant="warning" onClick={() => this.setState({showModal: false})}>
              close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default FavFruit;
