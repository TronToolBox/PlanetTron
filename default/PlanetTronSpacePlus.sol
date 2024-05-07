// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SpacePlusContract {
    address public owner;
    uint256 public activationFee;
    bool public isSpacePlusActivated;

    mapping(address => bool) public hasAccess;

    event SpacePlusActivated(address indexed user);
    event AccessGranted(address indexed user);

    constructor(uint256 _activationFee) {
        owner = 0xc0807E0702d46a78038Dfa4A761bDAF364122838;
        activationFee = _activationFee;
        isSpacePlusActivated = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier spacePlusActivated() {
        require(isSpacePlusActivated, "SpacePlus is not activated");
        _;
    }

    modifier hasPaidActivationFee() {
        require(msg.value >= activationFee, "Activation fee not paid");
        _;
    }

    function activateSpacePlus() external payable hasPaidActivationFee {
        require(!isSpacePlusActivated, "SpacePlus is already activated");
        isSpacePlusActivated = true;
        emit SpacePlusActivated(msg.sender);
    }

    function grantAccess(address _user) external onlyOwner {
        require(!hasAccess[_user], "User already has access");
        hasAccess[_user] = true;
        emit AccessGranted(_user);
    }

    function revokeAccess(address _user) external onlyOwner {
        require(hasAccess[_user], "User does not have access");
        hasAccess[_user] = false;
    }

    function withdrawFunds() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
