// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

// import './rolesUtils/Customer.sol';
// import './rolesUtils/DeliveryHub.sol';
// import './rolesUtils/Manufacturer.sol';
// import './rolesUtils/Thirdparty.sol';
import './Structure.sol';
// import "./rolesUtils/Roles.sol";

contract SupplyChain {

  event ManufacturerAdded(address indexed _account);

  //product code
  uint public uid;
  uint sku;

  address owner;

  mapping (uint => Structure.Product) products;
  mapping (uint => Structure.ProductHistory) productHistory;
  mapping (address => Structure.Roles) roles;

  function hasManufacturerRole(address _account)
    public
    view
    returns (bool)
  {
    require(_account != address(0));
    return roles[_account].Manufacturer;
  }

  function addManufacturerRole(address _account) 
    public
  {
    require(_account != address(0));
    require(!hasManufacturerRole(_account));

    roles[_account].Manufacturer = true;
  }
  
  function hasThirdPartyRole(address _account)
    public
    view
    returns (bool)
  {
    require(_account != address(0));
    return roles[_account].ThirdParty;
  }

  function addThirdPartyRole(address _account) 
    public
  {
    require(_account != address(0));
    require(!hasThirdPartyRole(_account));

    roles[_account].ThirdParty = true;
  }
    function hasDeliveryHubRole(address _account)
    public
    view
    returns (bool)
  {
    require(_account != address(0));
    return roles[_account].DeliveryHub;
  }

  function addDeliveryHubRole(address _account) 
    public
  {
    require(_account != address(0));
    require(!hasDeliveryHubRole(_account));

    roles[_account].DeliveryHub = true;
  }
    
  constructor() public payable{
    owner = msg.sender;
    sku = 1;
    uid = 1;
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

  modifier verifyAddress(address add) {
      require(msg.sender == add);
      _;
  }
  
  modifier manufactured(uint _uid){
    require(products[_uid].productState == Structure.State.Manufactured);
    _;
  }
  
  modifier shippedByManufacturer(uint _uid){
    require(products[_uid].productState == Structure.State.ShippedByManufacturer);
    _;
  }
  
  modifier receivedByThirdParty(uint _uid){
    require(products[_uid].productState == Structure.State.ReceivedByThirdParty);
    _;
  }
  
  modifier purchasedByCustomer(uint _uid){
    require(products[_uid].productState == Structure.State.PurchasedByCustomer);
    _;
  }
  
  modifier shippedByThirdParty(uint _uid){
    require(products[_uid].productState ==  Structure.State.ShippedByThirdParty);
    _;
  }

  modifier receivedByDeliveryHub(uint _uid){
    require(products[_uid].productState == Structure.State.ReceivedByDeliveryHub);
    _;
  }

  modifier shippedByDeliveryHub(uint _uid){
    require(products[_uid].productState == Structure.State.ShippedByDeliveryHub);
    _;
  }
  
  modifier receivedByCustomer(uint _uid){
    require(products[_uid].productState == Structure.State.ReceivedByCustomer);
    _;
  }
  function manufactureEmptyInitialize(Structure.Product memory product) internal pure {
      address thirdParty;
      string memory thirdPartyLongitude;
      string memory thirdPartyLatitude;

      address deliveryHub;
      string memory deliveryHubLongitude;
      string memory deliveryHubLatitude;
      address customer;

      product.thirdparty.thirdParty = thirdParty;
      product.thirdparty.thirdPartyLongitude = thirdPartyLongitude;
      product.thirdparty.thirdPartyLatitude = thirdPartyLatitude;

      product.deliveryhub.deliveryHub = deliveryHub;
      product.deliveryhub.deliveryHubLongitude = deliveryHubLongitude;
      product.deliveryhub.deliveryHubLatitude = deliveryHubLatitude;

      product.customer = customer;
  }

  function manufactureProductInitialize(
    Structure.Product memory product,
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
        require(hasManufacturerRole(msg.sender));
        Structure.Product memory product;
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
        
        product.productState = Structure.State.Manufactured;
        
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
  ) public manufactured(_uid) {
    require(hasThirdPartyRole(msg.sender));
    products[_uid].thirdparty.thirdParty = msg.sender;
    products[_uid].productState = Structure.State.PurchasedByThirdParty;
    productHistory[_uid].history.push(products[_uid]);

    emit PurchasedByThirdParty(_uid);
  }
  
  ///@dev STEP 3 : Shipping of purchased product to Third Party.
  function shipToThirdParty(
    uint _uid
  ) public verifyAddress(products[_uid].manufacturer.manufacturer) {
    require(hasManufacturerRole(msg.sender));
    products[_uid].productState = Structure.State.ShippedByManufacturer;
    productHistory[_uid].history.push(products[_uid]);

    emit ShippedByManufacturer(_uid);
  }

  ///@dev STEP 4 : Received the purchased product shipped by Manufacturer.
  function receiveByThirdParty(
    uint _uid,
    string memory thirdPartyLongitude,
    string memory thirdPartyLatitude
  ) public shippedByManufacturer(_uid) verifyAddress(products[_uid].thirdparty.thirdParty) {
    require(hasThirdPartyRole(msg.sender));
    products[_uid].owner = msg.sender;
    products[_uid].thirdparty.thirdPartyLongitude = thirdPartyLongitude;
    products[_uid].thirdparty.thirdPartyLatitude = thirdPartyLatitude;
    products[_uid].productState = Structure.State.ReceivedByThirdParty;
    productHistory[_uid].history.push(products[_uid]);

    emit ReceivedByThirdParty(_uid);
  }

  ///@dev STEP 5 : Purchase of a product at third party by Customer.
  function purchaseByCustomer(
    uint _uid
  ) public receivedByThirdParty(_uid) {
    products[_uid].customer = msg.sender;
    products[_uid].productState = Structure.State.PurchasedByCustomer;
    productHistory[_uid].history.push(products[_uid]);

    emit PurchasedByCustomer(_uid);
  }
  ///@dev STEP 7 : Shipping of product by third party purchased by customer.
  function shipByThirdParty(
    uint _uid
  ) public  verifyAddress(products[_uid].owner) verifyAddress(products[_uid].thirdparty.thirdParty) {
    require(hasThirdPartyRole(msg.sender));
    products[_uid].productState = Structure.State.ShippedByThirdParty;
    productHistory[_uid].history.push(products[_uid]);

    emit ShippedByThirdParty(_uid);
  }


  ///@dev STEP 8 : Receiveing of product by delivery hub purchased by customer.
  function receiveByDeliveryHub(
    uint _uid,
    string memory deliveryHubLongitude,
    string memory deliveryHubLatitude
  ) public shippedByDeliveryHub(_uid) {
    require(hasDeliveryHubRole(msg.sender));
    products[_uid].owner = msg.sender;
    products[_uid].deliveryhub.deliveryHub = msg.sender;
    products[_uid].deliveryhub.deliveryHubLongitude = deliveryHubLongitude;
    products[_uid].deliveryhub.deliveryHubLatitude = deliveryHubLatitude;
    products[_uid].productState = Structure.State.ReceivedByDeliveryHub;
    productHistory[_uid].history.push(products[_uid]);

    emit ReceivedByDeliveryHub(_uid);
  }

  ///@dev STEP 9 : Shipping of product by delivery hub purchased by customer.
  function shipByDeliveryHub(
    uint _uid
  ) public receivedByDeliveryHub(_uid) verifyAddress(products[_uid].owner) verifyAddress(products[_uid].deliveryhub.deliveryHub) {
    require(hasDeliveryHubRole(msg.sender));
    products[_uid].productState = Structure.State.ShippedByDeliveryHub;
    productHistory[_uid].history.push(products[_uid]);

    emit ShippedByDeliveryHub(_uid);
  }

  ///@dev STEP 10 : Shipping of product by delivery hub purchased by customer.
  function receiveByCustomer(
    uint _uid
  ) public shippedByDeliveryHub(_uid) verifyAddress(products[_uid].customer) {
    products[_uid].owner = msg.sender;
    products[_uid].productState = Structure.State.ReceivedByCustomer;
    productHistory[_uid].history.push(products[_uid]);

    emit ReceivedByCustomer(_uid);
  }

  ///@dev Fetch product 
  function fetchProductPart1(uint _uid,string memory _type,uint i) public view returns
  (
      uint,
      uint,
      address,
      address,
      string memory,
      string memory,
      string memory,
      string memory  
  )
  {  
    Structure.Product memory product;
    if(keccak256(bytes(_type)) == keccak256(bytes("product"))){
      product = products[_uid];
    }
     if(keccak256(bytes(_type)) == keccak256(bytes("history"))){
      product = productHistory[_uid].history[i];
    }
    return (
     product.uid,
     product.sku,
     product.owner,
     product.manufacturer.manufacturer,
     product.manufacturer.manufacturerName,
     product.manufacturer.manufacturerDetails,
     product.manufacturer.manufacturerLongitude,
     product.manufacturer.manufacturerLatitude
    );
  }

  ///@dev Fetch product 
  function fetchProductPart2(uint _uid,string memory _type,uint i) public view returns 
  (   
      uint256,
      string memory,
      uint,
      uint,
      string memory,
      Structure.State,
      address,
      string memory
  ){
    Structure.Product memory product;
    if(keccak256(bytes(_type)) == keccak256(bytes("product"))){
      product = products[_uid];
    }
     if(keccak256(bytes(_type)) == keccak256(bytes("history"))){
      product = productHistory[_uid].history[i];
    }
    return(
     product.manufacturer.manufacturedDate,
     product.productdet.productName,
     product.productdet.productCode,
     product.productdet.productPrice,
     product.productdet.productCategory,
     product.productState,
     product.thirdparty.thirdParty,
     product.thirdparty.thirdPartyLongitude
    );
  }

  function fetchProductPart3(uint _uid,string memory _type,uint i) public view returns
  (
      string memory,
      address,
      string memory,
      string memory,
      address
  ){
    Structure.Product memory product;
    if(keccak256(bytes(_type)) == keccak256(bytes("product"))){
      product = products[_uid];
    }
     if(keccak256(bytes(_type)) == keccak256(bytes("history"))){
      product = productHistory[_uid].history[i];
    }
    return (
     product.thirdparty.thirdPartyLatitude,
     product.deliveryhub.deliveryHub,
     product.deliveryhub.deliveryHubLongitude,
     product.deliveryhub.deliveryHubLatitude,
     product.customer
    );
  }

  function fetchProductCount() public view returns (uint) 
  {
    return uid;
  }

  function fetchProductHistoryLength(uint _uid) public view returns (uint)
  {
    return productHistory[_uid].history.length;
  }
}