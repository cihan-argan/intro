import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import alertify from "alertifyjs";
import { Route, Routes } from "react-router-dom";
import CartList from "./CartList";
import NotFound from "./NotFound";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: [],
  };
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };
  componentDidMount() {
    this.getProducts();
  }
  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url) //Promise yapısı olacak ve fetch(içinde api nin urlsini yazdık.) bunu çalıştırıyor ve bir response dönüyor.
      .then((response) => response.json()) //gelen response için response u json'a döndür diyoruz.
      .then((data) => this.setState({ products: data })); //this.setState diyerek yukarıdaki  state içindeki products dizisi içine data.json içindeki categories bilgilerini atadık
  };
  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(
      (cartItem) => cartItem.product.id === product.id
    );
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ cart: newCart });
    alertify.success(product.productName + " added to your Cart!", 2);
    // alertify.alert('You Have A Message ', product.productName + " added Cart.", function(){ alertify.success('Ok'); });
  };
  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(
      (cartItem) => cartItem.product.id !== product.id
    );
    this.setState({ cart: newCart });
    alertify.error(product.productName + " remove from to your Cart!", 2);
    // alertify.alert('You Have A Message ', product.productName + " added Cart.", function(){ alertify.success('Ok'); });
  };
  render() {
    let productInfo = { title: "Product List" };
    let categoryInfo = { title: "Category List" };
    return (
      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <ProductList
                      products={this.state.products}
                      currentCategory={this.state.currentCategory}
                      addToCart={this.addToCart}
                      info={productInfo}
                    />
                  }
                ></Route>
                <Route
                  exact
                  path="/cart"
                  element={
                    <CartList
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                    />
                  }
                ></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
