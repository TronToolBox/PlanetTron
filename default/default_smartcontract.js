const contractAddress = '0x6A2F13bd7c1a0DF7555296Fbe192E72F586DB8Cb';
const contractAbi = [{"inputs":[{"internalType":"uint256","name":"_activationFee","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"AccessGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"SpacePlusActivated","type":"event"},{"inputs":[],"name":"activateSpacePlus","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"activationFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"grantAccess","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hasAccess","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isSpacePlusActivated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"revokeAccess","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}];

let web3;
let contractInstance;

async function initWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            return true;
        } catch (error) {
            console.error('User denied account access');
            return false;
        }
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
        return true;
    } else {
        console.error('No Ethereum provider detected. Please install MetaMask.');
        return false;
    }
}

async function initContract() {
    contractInstance = new web3.eth.Contract(contractAbi, contractAddress);
}

async function activateSpacePlus() {
    try {
        const accounts = await web3.eth.getAccounts();
        await contractInstance.methods.activateSpacePlus().send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });
        console.log('SpacePlus activated successfully');
    } catch (error) {
        console.error('Error activating SpacePlus:', error);
    }
}

async function isSpacePlusActivated() {
    try {
        const result = await contractInstance.methods.isSpacePlusActivated().call();
        return result;
    } catch (error) {
        console.error('Error checking if SpacePlus is activated:', error);
        return false;
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    const success = await initWeb3();
    if (success) {
        await initContract();
        await updateVisibleButtons();
    }
});


