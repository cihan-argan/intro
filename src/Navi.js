import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import CartSummary from "./CartSummary";
export default class Navi extends React.Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Northwind App</NavbarBrand>
          <NavbarToggler />
          <Collapse navbar>
            <Nav className="justify-content-end" style={{ width: "100%" }}navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub 
                </NavLink>
              </NavItem>
             <CartSummary cart = {this.props.cart}/>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}