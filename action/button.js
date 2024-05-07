async function updateVisibleButtons(isSpacePlusOn) {
    if (isSpacePlusOn) {
    const hiddenButtons = document.querySelectorAll('.hidden');
    hiddenButtons.forEach(button => {
        button.classList.remove('hidden');
    });
    }
}

setInterval(async () => {
    if (window.ethereum && window.ethereum.selectedAddress) {
    const connectButton = document.querySelector(".connect-metamask-button");
    connectButton.textContent = "Connected";
    connectButton.disabled = true;

    try {
        const accounts = await getAccounts();
        if (accounts.length > 0) {
        const transactions = await listBTTTransactions(accounts[0]);
        const isSpacePlusOn = transactions.some(transaction => transaction.value > 1);
        const spacePlusButton = document.querySelector('.activate');
        spacePlusButton.textContent = isSpacePlusOn ? 'BTTC-SpacePlus: on' : 'BTTC-SpacePlus: off';
        sendBTTButton.disabled = true;
        updateVisibleButtons(isSpacePlusOn);
        }
    } catch (error) {
        console.error(error);
    }
    }
}, 2000);

sendBTTButton.addEventListener('click', () => {
    sendBTT();
});

window.addEventListener('load', async () => {
    try {
    const accounts = await getAccounts();
    if (accounts.length > 0) {
        await listBTTTransactions(accounts[0]);
    }
    } catch (error) {
    console.error(error);
    }
});