import React, { Component } from "react";
import { Table } from "reactstrap";

export default class CartList extends Component {
  renderCart() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Id</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Units in Stock</th>
            <th>Quantity </th>
          </tr>
        </thead>
        <tbody>
          {this.props.cart.map((cartElement) => (
            <tr key={cartElement.product.id}>
              <td>{cartElement.product.id}</td>
              <td>{cartElement.product.categoryId}</td>
              <td>{cartElement.product.productName}</td>
              <td>{cartElement.product.unitPrice}</td>
              <td>{cartElement.product.unitsInStock}</td>
              <td>{cartElement.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
  render() {
    return <div>{this.renderCart()}</div>;
  }
}
