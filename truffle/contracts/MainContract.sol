// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MainContract{

    address public owner;
    uint256 public authorizedListSize;
    uint256 public temp;

    constructor(){
        owner = msg.sender;
    }
    
    struct NGO{
        string name;
        string description;
        address wallet;
        uint256 registrationNumber;
        uint256 upvotes;
    }

    struct AuthorizedNGO{
        uint256 registrationNumber;
        address wallet;
    }

    struct donationRecord{
        uint256 registrationNumber;
        address wallet;
        uint256 amount;
    }

    mapping(address => donationRecord[]) donationRecords;  
    AuthorizedNGO[] authorizedList;
    NGO[] enrolledNGOs;
    address[] donorAddresses;

    function addToAuthorizedNGO(uint256 registrationNumber, address wallet) public {
        require(msg.sender == owner);
        AuthorizedNGO memory newAuthorizedNGO = AuthorizedNGO(registrationNumber, wallet);
        authorizedList.push(newAuthorizedNGO);
    }

    function enrollAsNGO(string memory name, string memory description, address  wallet, uint256 registrationNumber ) external {
        require(msg.sender == wallet);
        
        for (uint i = 0; i < authorizedListSize; i++) {
            AuthorizedNGO memory currentNGO = authorizedList[i];
            if(currentNGO.registrationNumber == registrationNumber){
                NGO memory newNGO = NGO(name, description, wallet, registrationNumber, 0);
                enrolledNGOs.push(newNGO);
            }
        }
    }

    function getOwner() public view returns(address){
        return owner;
    }

    function changeOwner(address _newOwner) public {
        require(msg.sender == owner);
        owner = _newOwner;
    }

    function getNGOList() external view returns(NGO[] memory) {
        return enrolledNGOs;
    }

    function getDonors() external view returns(address[] memory){
        return donorAddresses;
    }

    function myDonations() public payable returns(donationRecord[] memory){
        return donationRecords[msg.sender];
    }
    
    function donate(address payable ngoWallet) public payable{
        uint256 amount = msg.value;
        require(amount > 0);
        ngoWallet.transfer(msg.value);
        donorAddresses.push(msg.sender);
        for (uint i = 0; i < authorizedListSize; i++) {
            AuthorizedNGO memory currentNGO = authorizedList[i];
            if(currentNGO.wallet == ngoWallet){
                donationRecord memory newDonationRecord = donationRecord(currentNGO.registrationNumber , ngoWallet, msg.value);
                donationRecords[msg.sender].push(newDonationRecord);
            }
        }
    }

}
