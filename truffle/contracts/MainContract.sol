// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MainContract{

    address public owner;
    uint256 public authorizedListSize;

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
        string name;
        uint256 registrationNumber;
        address wallet;
        uint256 amount;
    }

    mapping(address => donationRecord[]) public donationRecords;  
    AuthorizedNGO[] public authorizedList;
    NGO[] public enrolledNGOs;
    address[] public votedWallets;

    function addToAuthorizedNGO(uint256 registrationNumber, address wallet) public {
        require(msg.sender == owner);
        for(uint i = 0; i < authorizedList.length; i++){
            if(wallet == authorizedList[i].wallet){
                return;
            }
        }
        AuthorizedNGO memory newAuthorizedNGO = AuthorizedNGO(registrationNumber, wallet);
        authorizedList.push(newAuthorizedNGO);
    }

    function enrollAsNGO(string memory name, string memory description, address  wallet, uint256 registrationNumber ) external {
        require(msg.sender == wallet);
        
        for (uint i = 0; i < authorizedList.length; i++) {
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

    function getAuthorizedList() public view returns(AuthorizedNGO[] memory){
        return authorizedList;
    } 

    function changeOwner(address _newOwner) public {
        require(msg.sender == owner);
        owner = _newOwner;
    } 

    function getNGOList() external view returns(NGO[] memory) {
        return enrolledNGOs;
    }

    function myDonations() external view returns(donationRecord[] memory){
        return donationRecords[msg.sender]; 
    }

    function upvote(address ngoWallet) public {
        for (uint i = 0; i < votedWallets.length; i++){
            if(msg.sender == votedWallets[i]){
                return;
            } 
        }
        for (uint i = 0; i < enrolledNGOs.length; i++) {
            if(enrolledNGOs[i].wallet == ngoWallet){
                enrolledNGOs[i].upvotes += 1;
                votedWallets.push(msg.sender);
                return;
            }
        }
    }

    function donate(address payable ngoWallet) external payable {
        uint256 amount = msg.value;
        require(amount > 0);
        ngoWallet.transfer(msg.value);
        for (uint i = 0; i < enrolledNGOs.length; i++) {
            NGO memory currentNGO = enrolledNGOs[i];
            if(currentNGO.wallet == ngoWallet){
                donationRecord memory newDonationRecord = donationRecord(currentNGO.name, currentNGO.registrationNumber, ngoWallet, msg.value);
                donationRecords[msg.sender].push(newDonationRecord);
            }
        }
    }

}
