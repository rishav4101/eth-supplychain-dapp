// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

///@title Library to add, remove and verify role.
///@author Rishav Raj Kumar, Ramiz Mollah.
///@notice You can use this as helper functions for contracts making use of Roles.
///@dev All internal functions from use by contracts internally only.
library Roles{
  struct Role {
    mapping (address => bool) list;
  }
  
  ///@notice Checks is the given account has the given role.
  function hasRole(Role storage role, address _account)
    internal
    view
    returns (bool)
  {
    require(_account != address(0));
    return role.list[_account];
  }

  ///@notice Adds the given role to the given account.
  function addRole(Role storage role, address _account) 
    internal 
  {
    require(_account != address(0));
    require(!hasRole(role, _account));

    role.list[_account] = true;
  }

  ///@notice Removes the given role from the given account.
  function removeRole(Role storage role, address _account) 
    internal 
  {
    require(_account != address(0));
    require(hasRole(role, _account));

    role.list[_account] = false;
  }

}