// // SPDX-License-Identifier: MIT
// pragma solidity >=0.4.21 <0.9.0;

// import './SupplyChain.sol';

// contract FetchContract is SupplyChain {
//     ///@dev Fetch product 
//   function fetchProductPart1(uint _uid,string memory _type,uint i) public view returns
//   (
//       uint,
//       uint,
//       address,
//       address,
//       string memory,
//       string memory,
//       string memory,
//       string memory  
//   )
//   {  
//     Structure.Product memory product;
//     if(keccak256(bytes(_type)) == keccak256(bytes("product"))){
//       product = products[_uid];
//     }
//      if(keccak256(bytes(_type)) == keccak256(bytes("history"))){
//       product = productHistory[_uid].history[i];
//     }
//     return (
//      product.uid,
//      product.sku,
//      product.owner,
//      product.manufacturer.manufacturer,
//      product.manufacturer.manufacturerName,
//      product.manufacturer.manufacturerDetails,
//      product.manufacturer.manufacturerLongitude,
//      product.manufacturer.manufacturerLatitude
//     );
//   }

//   ///@dev Fetch product 
//   function fetchProductPart2(uint _uid,string memory _type,uint i) public view returns 
//   (   
//       uint256,
//       string memory,
//       uint,
//       uint,
//       string memory,
//       Structure.State,
//       address,
//       string memory
//   ){
//     Structure.Product memory product;
//     if(keccak256(bytes(_type)) == keccak256(bytes("product"))){
//       product = products[_uid];
//     }
//      if(keccak256(bytes(_type)) == keccak256(bytes("history"))){
//       product = productHistory[_uid].history[i];
//     }
//     return(
//      product.manufacturer.manufacturedDate,
//      product.productdet.productName,
//      product.productdet.productCode,
//      product.productdet.productPrice,
//      product.productdet.productCategory,
//      product.productState,
//      product.thirdparty.thirdParty,
//      product.thirdparty.thirdPartyLongitude
//     );
//   }

//   function fetchProductPart3(uint _uid,string memory _type,uint i) public view returns
//   (
//       string memory,
//       address,
//       string memory,
//       string memory,
//       address
//   ){
//     Structure.Product memory product;
//     if(keccak256(bytes(_type)) == keccak256(bytes("product"))){
//       product = products[_uid];
//     }
//      if(keccak256(bytes(_type)) == keccak256(bytes("history"))){
//       product = productHistory[_uid].history[i];
//     }
//     return (
//      product.thirdparty.thirdPartyLatitude,
//      product.deliveryhub.deliveryHub,
//      product.deliveryhub.deliveryHubLongitude,
//      product.deliveryhub.deliveryHubLatitude,
//      product.customer
//     );
//   }

//   function fetchProductCount() public view returns (uint) 
//   {
//     return uid;
//   }


//   function fetchProductHistoryLength(uint _uid) public view returns (uint)
//   {
//     return productHistory[_uid].history.length;
//   }
// }