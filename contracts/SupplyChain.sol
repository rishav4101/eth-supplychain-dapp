// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './Structure.sol';

contract SupplyChain {
    address private _owner;
    //PRODUCT CODE
    uint256 public uid;

    constructor() {
        _owner = msg.sender;
        uid = 1;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    // ----------- EVENT ----------
    // event CompanyAdded(address addr);
    event ProductManufactured(uint256 uid);
    event PurchasedByThirdParty(uint256 uid);
    event ShippedByManufacturer(uint256 uid);
    event ReceivedByThirdParty(uint256 uid);
    event PurchasedByCustomer(uint256 uid);
    event ShippedByThirdParty(uint256 uid);
    event ReceivedByDeliveryHub(uint256 uid);
    event ShippedByDeliveryHub(uint256 uid);
    event ReceivedByCustomer(uint256 uid);

    // MAPPING
    mapping(uint256 => Structure.Product) products;
    mapping(uint256 => Structure.ProductHistory) productHistory;
    mapping(address => Structure.Company) company;
    mapping(address => Structure.Customer) customer;
    address[] public companyAddresses;

    // HAS ROLE
    function hasRole(address _account) public view returns (string memory) {
        require(_account != address(0));
        if (
            keccak256(bytes(customer[_account].role)) ==
            keccak256(bytes('Customer'))
        ) {
            return customer[_account].role;
        }
        return company[_account].role;
    }

    // ---------- MODIFIER ----------
    modifier onlyOwner() {
        require(
            owner() == msg.sender,
            'Ownership Assertion: Caller of the function is not the owner.'
        );
        _;
    }
    // PRODUCT STATES
    modifier manufactured(uint256 _uid) {
        require(products[_uid].productState == Structure.State.Manufactured);
        _;
    }
    modifier shippedByManufacturer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ShippedByManufacturer
        );
        _;
    }
    modifier receivedByThirdParty(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByThirdParty
        );
        _;
    }
    modifier purchasedByCustomer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.PurchasedByCustomer
        );
        _;
    }
    modifier shippedByThirdParty(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ShippedByThirdParty
        );
        _;
    }

    modifier receivedByDeliveryHub(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByDeliveryHub
        );
        _;
    }

    modifier shippedByDeliveryHub(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ShippedByDeliveryHub
        );
        _;
    }

    modifier receivedByCustomer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByCustomer
        );
        _;
    }
    // VERIFY ADDRESS
    modifier verifyAddress(address addr) {
        require(msg.sender == addr);
        _;
    }
    modifier isManufacturer(address addr) {
        require(
            keccak256(bytes(hasRole(addr))) == keccak256(bytes('Manufacture')),
            'You are not a manufacturer'
        );
        _;
    }
    modifier isThirdParty(address addr) {
        require(
            keccak256(bytes(hasRole(addr))) == keccak256(bytes('Third Party')),
            'You are not a salesman'
        );
        _;
    }
    modifier isDeliveryHub(address addr) {
        require(
            keccak256(bytes(hasRole(addr))) == keccak256(bytes('Delivery Hub')),
            'You are not a shipper'
        );
        _;
    }
    modifier isCustomer(address addr) {
        require(
            keccak256(bytes(hasRole(addr))) == keccak256(bytes('Customer')),
            'You must sign in as customer'
        );
        _;
    }

    // ---------- ADD ROLE ----------
    function addCompany(
        string memory _code,
        string memory _name,
        string memory _legalType,
        string memory _representative,
        uint256 _startDate,
        string memory _longitude,
        string memory _latitude,
        string memory _role
    ) public {
        require(msg.sender != address(0));
        require(bytes(hasRole(msg.sender)).length == 0);
        company[msg.sender] = Structure.Company(
            payable(msg.sender),
            _code,
            _name,
            'Unverify',
            _legalType,
            _representative,
            _startDate,
            _longitude,
            _latitude,
            _role
        );
        companyAddresses.push(msg.sender);
    }

    function addCustomer(
        string memory _id,
        string memory _name,
        string memory _addre,
        string memory _phoneNumber1,
        string memory _phoneNumber2,
        string memory _mail
    ) public {
        require(msg.sender != address(0));
        require(bytes(hasRole(msg.sender)).length == 0);
        customer[msg.sender] = Structure.Customer(
            payable(msg.sender),
            _id,
            _name,
            'active',
            _addre,
            _phoneNumber1,
            _phoneNumber2,
            _mail,
            'Customer'
        );
    }

    function getCompanyCount() public view returns (uint256 _count) {
        return companyAddresses.length;
    }

    // GET ROLE
    function getCompany(address _account)
        public
        view
        returns (Structure.Company memory)
    {
        require(_account != address(0));
        return company[_account];
    }

    function getCompanies(uint256 i)
        public
        view
        returns (Structure.Company memory)
    {
        return company[companyAddresses[i]];
    }

    function changeCompanyStatus(address _addr, string memory _status) public {
        company[_addr].status = _status;
    }

    // ------------- MAKE PRODUCT -------------
    function productEmptyInitialize(Structure.Product memory product)
        internal
        pure
    {
        address thirdParty;
        address deliveryHub;
        address customerr;

        product.thirdParty = thirdParty;
        product.deliveryHub = deliveryHub;
        product.customer = customerr;
        product.transaction = '';
    }

    function productInitialize(
        Structure.Product memory product,
        string memory _name,
        uint256 _price,
        string memory _category,
        string memory _status,
        uint256 _mfg,
        uint256 _exp,
        uint256 _date
    ) internal pure {
        product.productDetail.name = _name;
        product.productDetail.price = _price;
        product.productDetail.category = _category;
        product.productDetail.status = _status;
        product.productDetail.mfg = _mfg;
        product.productDetail.exp = _exp;
        product.productDetail.createDate = _date;
        product.productDetail.updateDate = _date;
    }

    function updateProduct(
        uint256 _uid,
        string memory _category,
        string memory _name,
        string memory _sku,
        uint256 _price,
        uint256 _mfg,
        uint256 _exp
    ) public {
        products[_uid].sku = _sku;
        products[_uid].productDetail.name = _name;
        products[_uid].productDetail.price = _price;
        products[_uid].productDetail.category = _category;
        products[_uid].productDetail.mfg = _mfg;
        products[_uid].productDetail.exp = _exp;
        products[_uid].productDetail.updateDate = block.timestamp;
    }

    ///@dev STEP 1 : Manufactured a product.
    function makeProduct(
        string memory _category,
        string memory _name,
        string memory _sku,
        uint256 _price,
        uint256 _mfg,
        uint256 _exp
    ) public isManufacturer(msg.sender) {
        uint256 _uid = uid;
        Structure.Product memory product;
        product.sku = _sku;
        product.uid = _uid;
        product.manufacturer = msg.sender;
        product.owner = msg.sender;
        product.productState = Structure.State.Manufactured;

        productEmptyInitialize(product);
        productInitialize(
            product,
            _name,
            _price,
            _category,
            'available',
            _mfg,
            _exp,
            block.timestamp
        );

        products[_uid] = product;
        // History index 0
        productHistory[_uid].history.push(product);

        uid = uid + 1;
        emit ProductManufactured(_uid);
    }

    ///@dev STEP 2 : Purchase of manufactured product by Third Party.
    function purchaseByThirdParty(uint256 _uid)
        public
        manufactured(_uid)
        isThirdParty(msg.sender)
    {
        products[_uid].thirdParty = msg.sender;
        products[_uid].productState = Structure.State.PurchasedByThirdParty;
        // History index 1
        productHistory[_uid].history.push(products[_uid]);

        emit PurchasedByThirdParty(_uid);
    }

    ///@dev STEP 3 : Shipping of purchased product to Third Party.
    function shipToThirdParty(uint256 _uid)
        public
        verifyAddress(products[_uid].manufacturer)
        isManufacturer(msg.sender)
    {
        products[_uid].productState = Structure.State.ShippedByManufacturer;
        // History index 2
        productHistory[_uid].history.push(products[_uid]);

        emit ShippedByManufacturer(_uid);
    }

    ///@dev STEP 4 : Received the purchased product shipped by Manufacturer.
    function receiveByThirdParty(uint256 _uid)
        public
        shippedByManufacturer(_uid)
        verifyAddress(products[_uid].thirdParty)
        isThirdParty(msg.sender)
    {
        products[_uid].owner = msg.sender;
        products[_uid].productState = Structure.State.ReceivedByThirdParty;
        // History index 3
        productHistory[_uid].history.push(products[_uid]);

        emit ReceivedByThirdParty(_uid);
    }

    ///@dev STEP 5 : Purchase of a product at third party by Customer.
    function purchaseByCustomer(uint256 _uid)
        public
        receivedByThirdParty(_uid)
        isCustomer(msg.sender)
    {
        products[_uid].customer = msg.sender;
        products[_uid].productState = Structure.State.PurchasedByCustomer;
        // History index 4
        productHistory[_uid].history.push(products[_uid]);

        emit PurchasedByCustomer(_uid);
    }

    ///@dev STEP 6 : Shipping of product by third party purchased by customer.
    function shipByThirdParty(uint256 _uid)
        public
        verifyAddress(products[_uid].owner)
        verifyAddress(products[_uid].thirdParty)
        isThirdParty(msg.sender)
    {
        products[_uid].productState = Structure.State.ShippedByThirdParty;
        // History index 5
        productHistory[_uid].history.push(products[_uid]);

        emit ShippedByThirdParty(_uid);
    }

    ///@dev STEP 7 : Receiveing of product by delivery hub purchased by customer.
    function receiveByDeliveryHub(uint256 _uid)
        public
        shippedByThirdParty(_uid)
        isDeliveryHub(msg.sender)
    {
        products[_uid].owner = msg.sender;
        products[_uid].deliveryHub = msg.sender;
        products[_uid].productState = Structure.State.ReceivedByDeliveryHub;
        // History index 6
        productHistory[_uid].history.push(products[_uid]);

        emit ReceivedByDeliveryHub(_uid);
    }

    ///@dev STEP 8 : Shipping of product by delivery hub purchased by customer.
    function shipByDeliveryHub(uint256 _uid)
        public
        receivedByDeliveryHub(_uid)
        verifyAddress(products[_uid].owner)
        verifyAddress(products[_uid].deliveryHub)
        isDeliveryHub(msg.sender)
    {
        products[_uid].productState = Structure.State.ShippedByDeliveryHub;
        // History index 7
        productHistory[_uid].history.push(products[_uid]);

        emit ShippedByDeliveryHub(_uid);
    }

    ///@dev STEP 9 : Shipping of product by delivery hub purchased by customer.
    function receiveByCustomer(uint256 _uid)
        public
        shippedByDeliveryHub(_uid)
        verifyAddress(products[_uid].customer)
        isCustomer(msg.sender)
    {
        products[_uid].owner = msg.sender;
        products[_uid].productState = Structure.State.ReceivedByCustomer;
        // History index 8
        productHistory[_uid].history.push(products[_uid]);

        emit ReceivedByCustomer(_uid);
    }

    ///@dev Fetch product
    function getProductPart1(
        uint256 _uid,
        string memory _type,
        uint256 i
    )
        public
        view
        returns (
            uint256,
            string memory,
            address,
            address,
            Structure.State,
            string memory,
            address,
            address
        )
    {
        require(products[_uid].uid != 0);
        Structure.Product storage product = products[_uid];
        if (keccak256(bytes(_type)) == keccak256(bytes('product'))) {
            product = products[_uid];
        }
        if (keccak256(bytes(_type)) == keccak256(bytes('history'))) {
            product = productHistory[_uid].history[i];
        }
        return (
            product.uid,
            product.sku,
            product.owner,
            product.customer,
            product.productState,
            product.transaction,
            product.manufacturer,
            product.thirdParty
        );
    }

    function getProductPart2(
        uint256 _uid,
        string memory _type,
        uint256 i
    )
        public
        view
        returns (
            address,
            uint256,
            uint256,
            string memory,
            string memory,
            uint256,
            uint256,
            string memory,
            uint256
        )
    {
        require(products[_uid].uid != 0);
        Structure.Product storage product = products[_uid];
        if (keccak256(bytes(_type)) == keccak256(bytes('product'))) {
            product = products[_uid];
        }
        if (keccak256(bytes(_type)) == keccak256(bytes('history'))) {
            product = productHistory[_uid].history[i];
        }
        return (
            product.deliveryHub,
            product.productDetail.createDate,
            product.productDetail.price,
            product.productDetail.name,
            product.productDetail.category,
            product.productDetail.mfg,
            product.productDetail.exp,
            product.productDetail.status,
            product.productDetail.updateDate
        );
    }

    function getProductCount() public view returns (uint256) {
        return uid;
    }

    function getProductHistoryLength(uint256 _uid)
        public
        view
        returns (uint256)
    {
        return productHistory[_uid].history.length;
    }

    function getProductState(uint256 _uid)
        public
        view
        returns (Structure.State)
    {
        return products[_uid].productState;
    }

    // function changePrice(uint256 _uid, uint256 _newPrice) public {
    //     productHistory[_uid].history[3].price = _newPrice;
    // }

    function setTransactionHashOnProduct(string memory tran) public {
        productHistory[uid - 1]
            .history[productHistory[uid - 1].history.length - 1]
            .transaction = tran;
    }

    function setTransactionHash(uint256 _uid, string memory tran) public {
        Structure.Product storage p = productHistory[_uid].history[
            productHistory[_uid].history.length - 1
        ];
        p.transaction = tran;
    }
}
