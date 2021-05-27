// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./Roles.sol";

contract DeliveryHub {
  using Roles for Roles.Role;

  event DeliveryHubAdded(address indexed _account);
  event DeliveryHubRemoved(address indexed _account);

  Roles.Role private deliveryHubsList;

  constructor() public {
    deliveryHubsList.addRole(msg.sender);
    emit DeliveryHubAdded(msg.sender);
  }

  ///@dev Modifiers for DeliveryHub.
  modifier onlyDeliveryHub() {
    require(isDeliveryHub(msg.sender));
    _;
  }
  /*-----------------------------*/

  ///@dev DeliveryHub Utility functions.
  function isDeliveryHub(address _account) public view returns (bool) {
    return deliveryHubsList.hasRole(_account);
  }

  function addDeliveryHub(address _account) public onlyDeliveryHub {
    deliveryHubsList.addRole(_account);
    emit DeliveryHubAdded(_account);
  }

  function removeDeliveryHub() public {
    deliveryHubsList.removeRole(msg.sender);
    emit DeliveryHubRemoved(msg.sender);
  }
  /*-----------------------------*/

}
