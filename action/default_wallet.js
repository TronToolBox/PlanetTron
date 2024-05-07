const toggleButton = document.querySelector(".toggle-button");
const navbarLinks = document.querySelector(".navbar-links");

toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
});

function connectMetamask() {
    const connectButton = document.querySelector(".connect-metamask-button");

    if (window.ethereum) {
    window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
        console.log('Connected to Metamask');
        console.log('Accounts:', accounts);

        connectButton.textContent = "Connected";
        connectButton.disabled = true; 
        })
        .catch((error) => {
        console.error('Error connecting to Metamask:', error);
        });
    } else {
    alert("Metamask not detected. Please install Metamask to connect.");
    }
}

const sendBTTButton = document.querySelector('.activate');

async function getAccounts() {
    try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
    } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
    }
}

async function sendBTT() {
    try {
    const accounts = await getAccounts();
    const donationAmount = 2000;

    const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
        {
            from: accounts[0], 
            to: '0xc0807E0702d46a78038Dfa4A761bDAF364122838', 
            value: `0x${(donationAmount * 1000000000000000000).toString(16)}`, 
            gasPrice: '110D9316EC000', 
            gas: '0x5208', 
            chainId: '0x9A'
        }
        ]
    });

    console.log('Transaction Hash:', txHash);
    } catch (error) {
    console.error('Error sending BTT:', error);
    }
}

async function listBTTTransactions(userAddress) {
    try {
    const response = await fetch(`https://api.bttcscan.com/api?module=account&action=txlist&address=${userAddress}&startblock=1&endblock=99999999&sort=asc`);
    const data = await response.json();

    const transactions = data.result.filter(transaction => transaction.to.toLowerCase() === '0xc0807E0702d46a78038Dfa4A761bDAF364122838'.toLowerCase());

    const bttTransactions = document.getElementById('bttTransactions');
    if (bttTransactions.innerHTML.trim() === '') {
        transactions.forEach(transaction => {
        bttTransactions.innerHTML += `
            <div>
            <p>From: ${transaction.from}</p>
            <p>To: ${transaction.to}</p>
            <p>Amount: ${transaction.value/1000000000000000000}</p>
            <hr>
            </div>
        `;
        });
    }
    
    return transactions;
    } catch (error) {
    console.error('Error fetching BTT transactions:', error);
    }
}