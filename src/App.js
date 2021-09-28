import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import FavFruit from './components/FavFruit';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fruits: [],
      favorites: [],
      user: {},
      additionResult: '',
      showModal: false,
    }
  }
  componentDidMount() {
    this.getAllFruits();
  }
  getAllFruits = async () => {
    let config = {
      method: 'get',
      baseURL: 'https://fruits-be.herokuapp.com',
      url: '/fruits'
    }
    try {
      let fruits = await (await axios(config)).data;
      this.setState({fruits: await fruits});
    } catch (error) {
      console.log('error getting fruits data')
    }
  }
  getFavorites = async () => {
    let config = {
      method: 'get',
      baseURL: 'https://fruits-be.herokuapp.com',
      url: `/getFavorties?email=${this.props.auth0.user.email}`
    }
    try {
      let favorites = await (await axios(config)).data;
      this.setState({favorites: await favorites});
    } catch (error) {
      console.log('error getting favortie fruits data')
    }
  }
  addUser = async () => {
    let config = {
      method: 'post',
      baseURL: 'https://fruits-be.herokuapp.com',
      url: `/user`,
      data: {email: this.props.auth0.user.email, name:this.props.auth0.user.name }
    }
    try {
      let user = await (await axios(config)).data;
      this.setState({user: await user});
    } catch (error) {
      console.log('error adding/ checking for current user')
    }
  }
  addToFavorites = async (obj) => {
    //console.log(obj)
    let config = {
      method: 'post',
      baseURL: 'https://fruits-be.herokuapp.com',
      url: `/addToFavorites`,
      data: {email: this.props.auth0.user.email, fruitData: obj }
    }
    try {
      let additionResult = await (await axios(config)).data;
      this.setState({additionResult: await additionResult});
      this.getFavorites();
    } catch (error) {
      console.log('error adding item to favorites')
    }
  }
 updateFavoriteItem = async (name, {newName, newPrice, newImage}) => {
  let config = {
    method: 'put',
    baseURL: 'https://fruits-be.herokuapp.com',
    url: `/updateOneFromFavorites/${name}/${this.props.auth0.user.email}`,
    data: {newName, newPrice, newImage}
  }
  try {
    let favorites = await (await axios(config)).data;
    this.setState({favorites: await favorites});
  } catch (error) {
    console.log('error updating favorite fruit ')
  }
 }
 removeFavoriteItem = async (name) => {
   console.log('to remove: ', name)
  let config = {
    method: 'delete',
    baseURL: 'https://fruits-be.herokuapp.com',
    url: `/removeFromFavorites/${name}/${this.props.auth0.user.email}`,
  }
  try {
    let favorites = await (await axios(config)).data;
    this.setState({favorites: await favorites});
  } catch (error) {
    console.log('error removing fruit form favorties ')
  }
 }
  render() {
    //console.log('favs: ',this.state.favorites)
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `Home` component, if they are not, render the `Login` component */}
              {isAuthenticated ?
                <Home
                fruits={this.state.fruits}
                addUser={this.addUser}
                user={this.state.user}
                addToFavorites={this.addToFavorites}
                /> : <Login />}
            </Route>
            <Route exact path="/favFruit">
              {/* TODO: if the user is logged in, render the `FavFruit` component, if they are not, render the `Login` component */}
              {isAuthenticated ?
                <FavFruit
                getFavorites={this.getFavorites}
                favorites={this.state.favorites}
                showModal={this.showModal}
                removeFavoriteItem={this.removeFavoriteItem}
                updateFavoriteItem={this.updateFavoriteItem}
                /> : <Login />}
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
