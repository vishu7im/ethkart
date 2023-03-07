// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

contract Ethkart {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    //  event
    event list(uint id, string name);
    // sturct for produ, ct

    modifier onlyowner() {
        require(owner == msg.sender);
        _;
    }

    struct ITEM {
        uint256 id;
        string name;
        string category;
        string img;
        uint256 cost;
        uint256 stock;
        uint256 rating;
    }

    // mapping for item
    mapping(uint256 => ITEM) public Items;

    function ListProduct(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _img,
        uint256 _cost,
        uint256 _stock,
        uint256 _rating
    ) public onlyowner {
        //list struct item

        ITEM memory item = ITEM(
            _id,
            _name,
            _category,
            _img,
            _cost,
            _stock,
            _rating
        );
        // add in DB
        Items[_id] = item;
        emit list(_id, _name);
    }

    //   buy product
    function buy(uint256 _id) public payable {
        // place order
        //  subtract stock
    }
}
