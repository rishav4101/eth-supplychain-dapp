// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./Roles.sol";

contract Customer {
  using Roles for Roles.Role;

  event CustomerAdded(address indexed _account);
  event CustomerRemoved(address indexed _account);

  Roles.Role private customersList;

  constructor() public {
    customersList.addRole(msg.sender);
    emit CustomerAdded(msg.sender);
  }

  ///@dev Modifiers for Customer.
  modifier onlyCustomer() {
    require(isCustomer(msg.sender));
    _;
  }
  /*-----------------------------*/

  ///@dev Customer Utility functions.
  function isCustomer(address _account) public view returns (bool) {
    return customersList.hasRole(_account);
  }

  function addCustomer(address _account) public onlyCustomer {
    customersList.addRole(_account);
    emit CustomerAdded(_account);
  }

  function removeCustomer() public {
    customersList.removeRole(msg.sender);
    emit CustomerRemoved(msg.sender);
  }
  /*-----------------------------*/

}
