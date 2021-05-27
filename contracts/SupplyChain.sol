// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import './rolesUtils/Customer.sol';
import './rolesUtils/DeliveryHub.sol';
import './rolesUtils/Manufacturer.sol';
import './rolesUtils/SortationHub.sol';
import './rolesUtils/Thirdparty.sol';

contract SupplyChain is Customer,DeliveryHub,Manufacturer,SortationHub,Thirdparty{
  //product code
  uint uid;

  uint sku;

  address owner;
  Manufacturer private m;
  enum State
  {
   Manufactured,
   PurchasedByThirdParty,
   ShippedByManufacturer,
   ReceivedByThirdParty,
   PurchasedByCustomer,
   ShippedByThirdParty,
   ReceivedByDeliveryHub,
   ShippedByDeliveryHub,
   ReceivedByCustomer
  }

  // State constant defaultState = State.Manufactured;
  struct ManufactureDetails{
      address manufacturer;
      string manufacturerName;
      string manufacturerDetails;
      string manufacturerLongitude;
      string manufacturerLatitude;
      uint256 manufacturedDate;
  }
  struct ProductDetails{
      string productName;
      uint productCode;
      uint productPrice;
      string productCategory;
  }
  struct ThirdPartyDetails{
    address thirdParty;
    string thirdPartyLongitude;
    string thirdPartyLatitude;
  }
  struct SortationHubDetails{
    address sortationHub;
    string sortationHubLongitude;
    string sortationHubLatitude;
  }
  struct DeliveryHubDetails{
      address deliveryHub;
      string deliveryHubLongitude;
      string deliveryHubLatitude;
  }
  struct Product {
      uint uid;
      uint sku;
      address owner;
      State productState;
      ManufactureDetails manufacturer;
      ThirdPartyDetails thirdparty;
      SortationHubDetails sortationhub;
      ProductDetails productdet;
      DeliveryHubDetails deliveryhub;
      address customer;
    }

  struct ProductHistory{
      Product[] history;
  }
  mapping (uint => Product) products;
  mapping (uint => ProductHistory) productHistory;
  
  
  constructor() public payable{
    owner = msg.sender;
    sku = 1;
    uid = 1;
    m = new Manufacturer();
  }

  event  Manufactured(uint uid);
  event  PurchasedByThirdParty(uint uid);
  event  ShippedByManufacturer(uint uid);
  event  ReceivedByThirdParty(uint uid);
  event  PurchasedByCustomer(uint uid);
  event  ShippedByThirdParty(uint uid);
  event  ReceivedByDeliveryHub(uint uid);
  event  ShippedByDeliveryHub(uint uid);
  event  ReceivedByCustomer(uint uid);
  
  modifier verifyOwner() {
      require(msg.sender == owner);
      _;
  }

  modifier verifyAddress(address add) {
      require(msg.sender == add);
      _;
  }
  
  modifier manufactured(uint _uid){
    require(products[_uid].productState == State.Manufactured);
    _;
  }
  
  modifier shippedByManufacturer(uint _uid){
    require(products[_uid].productState == State.ShippedByManufacturer);
    _;
  }
  
  modifier receivedByThirdParty(uint _uid){
    require(products[_uid].productState == State.ReceivedByThirdParty);
    _;
  }
  
  modifier purchasedByCustomer(uint _uid){
    require(products[_uid].productState == State.PurchasedByCustomer);
    _;
  }
  
  modifier shippedByThirdParty(uint _uid){
    require(products[_uid].productState ==  State.ShippedByThirdParty);
    _;
  }

  modifier receivedByDeliveryHub(uint _uid){
    require(products[_uid].productState == State.ReceivedByDeliveryHub);
    _;
  }

  modifier shippedByDeliveryHub(uint _uid){
    require(products[_uid].productState == State.ShippedByDeliveryHub);
    _;
  }
  
  modifier receivedByCustomer(uint _uid){
    require(products[_uid].productState == State.ReceivedByCustomer);
    _;
  }
  function manufactureEmptyInitialize(Product memory product) internal pure {
      address thirdParty;
      string memory thirdPartyLongitude;
      string memory thirdPartyLatitude;
      address sortationHub;
      string memory sortationHubLongitude;
      string memory sortationHubLatitude;
      address deliveryHub;
      string memory deliveryHubLongitude;
      string memory deliveryHubLatitude;
      address customer;

      product.thirdparty.thirdParty = thirdParty;
      product.thirdparty.thirdPartyLongitude = thirdPartyLongitude;
      product.thirdparty.thirdPartyLatitude = thirdPartyLatitude;
      product.sortationhub.sortationHub = sortationHub;
      product.sortationhub.sortationHubLongitude = sortationHubLongitude;
      product.sortationhub.sortationHubLatitude = sortationHubLatitude;
      product.deliveryhub.deliveryHub = deliveryHub;
      product.deliveryhub.deliveryHubLongitude = deliveryHubLongitude;
      product.deliveryhub.deliveryHubLatitude = deliveryHubLatitude;
      product.customer = customer;
  }

  function manufactureProductInitialize(
    
    Product memory product,
    string memory productName,
    uint productCode,
    uint productPrice,
    string memory productCategory
  ) internal pure {
    product.productdet.productName = productName;
    product.productdet.productCode = productCode;
    product.productdet.productPrice = productPrice;
    product.productdet.productCategory = productCategory;
  }

  ///@dev STEP 1 : Manufactured a product.
  function manufactureProduct (
    uint _uid,
      string memory manufacturerName,
      string memory manufacturerDetails,
      string memory manufacturerLongitude,
      string memory manufacturerLatitude,
      string memory productName,
      uint productCode,
      uint productPrice,
      string memory productCategory

      ) public  {
        // uint _uid = uid;
        // require(isManufacturer(msg.sender));
        Product memory product;
        product.sku = sku;
        product.uid = _uid;
        product.manufacturer.manufacturerName = manufacturerName;
        product.manufacturer.manufacturerDetails = manufacturerDetails;
        product.manufacturer.manufacturerLongitude = manufacturerLongitude;
        product.manufacturer.manufacturerLatitude = manufacturerLatitude;
        product.manufacturer.manufacturedDate = block.timestamp;
        
        product.owner = msg.sender;
        product.manufacturer.manufacturer = msg.sender;
        
        manufactureEmptyInitialize(product);
        
        product.productState = State.Manufactured;
        
        manufactureProductInitialize(
          product,
          productName,
          productCode,
          productPrice,
          productCategory
        );
      
        products[_uid] = product;

        productHistory[_uid].history.push(product);
        
        sku ++;
        uid = uid + 1;
        
        emit Manufactured(_uid);
      }

  ///@dev STEP 2 : Purchase of manufactured product by Third Party.
  function purchaseByThirdParty(
    uint _uid
  ) public onlyThirdparty() manufactured(_uid) {
    products[_uid].thirdparty.thirdParty = msg.sender;
    products[_uid].productState = State.PurchasedByThirdParty;
    productHistory[_uid].history.push(products[_uid]);

    emit PurchasedByThirdParty(_uid);
  }
  
  ///@dev STEP 3 : Shipping of purchased product to Third Party.
  function shipToThirdParty(
    uint _uid
  ) public onlyManufacturer()  verifyAddress(products[_uid].manufacturer.manufacturer) {
    products[_uid].productState = State.ShippedByManufacturer;
    productHistory[_uid].history.push(products[_uid]);

    emit ShippedByManufacturer(_uid);
  }

  ///@dev STEP 4 : Received the purchased product shipped by Manufacturer.
  function receiveByThirdParty(
    uint _uid,
    string memory thirdPartyLongitude,
    string memory thirdPartyLatitude
  ) public onlyThirdparty() shippedByManufacturer(_uid) verifyAddress(products[_uid].thirdparty.thirdParty) {
    products[_uid].owner = msg.sender;
    products[_uid].thirdparty.thirdPartyLongitude = thirdPartyLongitude;
    products[_uid].thirdparty.thirdPartyLatitude = thirdPartyLatitude;
    products[_uid].productState = State.ReceivedByThirdParty;
    productHistory[_uid].history.push(products[_uid]);

    emit ReceivedByThirdParty(_uid);
  }

  ///@dev STEP 5 : Purchase of a product at third party by Customer.
  function purchaseByCustomer(
    uint _uid
  ) public onlyCustomer() receivedByThirdParty(_uid) {
    products[_uid].customer = msg.sender;
    products[_uid].productState = State.PurchasedByCustomer;
    productHistory[_uid].history.push(products[_uid]);

    emit PurchasedByCustomer(_uid);
  }

}