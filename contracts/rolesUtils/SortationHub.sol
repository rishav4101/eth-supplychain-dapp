// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./Roles.sol";

contract SortationHub {
  using Roles for Roles.Role;

  event SortationHubAdded(address indexed _account);
  event SortationHubRemoved(address indexed _account);

  Roles.Role private sortationHubsList;

  constructor() public {
    sortationHubsList.addRole(msg.sender);
    emit SortationHubAdded(msg.sender);
  }

  ///@dev Modifiers for SortationHub.
  modifier onlySortationHub() {
    require(isSortationHub(msg.sender));
    _;
  }
  /*-----------------------------*/

  ///@dev SortationHub Utility functions.
  function isSortationHub(address _account) public view returns (bool) {
    return sortationHubsList.hasRole(_account);
  }

  function addSortationHub(address _account) public onlySortationHub {
    sortationHubsList.addRole(_account);
    emit SortationHubAdded(_account);
  }

  function removeSortationHub() public {
    sortationHubsList.removeRole(msg.sender);
    emit SortationHubRemoved(msg.sender);
  }
  /*-----------------------------*/

}
