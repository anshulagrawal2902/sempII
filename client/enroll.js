window.addEventListener("load", async() => {
    const contractAbi = ABI;
    const contractAddress = CONTRACT_ADDRESS;
    const web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(contractAbi, contractAddress);
  
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log(account)
  
    const connectMetamaskButton = document.getElementById(
      "connect-metamask-button"
    );
    const connectMetamaskButtonMobile = document.getElementById(
      "connect-metamask-button-mobile"
    );
  
    let myDonations = document.getElementById("myDonations");
    let home = document.getElementById("home");
    let enroll = document.getElementById("enroll")
    
    const form = document.querySelector("form");
    form.addEventListener("submit", handleFormSubmission);
    
  
    // Check if the user has Metamask installed
    if (typeof window.ethereum !== "undefined") {
      // Enable the Metamask button
      connectMetamaskButton.disabled = false;
      connectMetamaskButtonMobile.disabled = false;
  
      // Add a click event listener to the Metamask button
      connectMetamaskButton.addEventListener("click", async () => {
        try {
          // Request permission to connect to the user's Metamask wallet
          await window.ethereum.request({ method: "eth_requestAccounts" });
          console.log("Connected to Metamask!");
        } catch (error) {
          console.error(error);
        }
      });
  
      connectMetamaskButtonMobile.addEventListener("click", async () => {
        try {
          // Request permission to connect to the user's Metamask wallet
          await window.ethereum.request({ method: "eth_requestAccounts" });
          console.log("Connected to Metamask!");
        } catch (error) {
          console.error(error);
        }
      });
    } else {
      // Disable the Metamask button if the user does not have Metamask installed
      connectMetamaskButton.disabled = true;
      connectMetamaskButtonMobile.disabled = true;
    }
  });

  function handleFormSubmission(event) {
    event.preventDefault(); // prevent default form submission behavior

    // get form input values
    const nameInput = document.getElementById('name');
    const descInput = document.getElementById('description');
    const walletAddressInput = document.getElementById('wallet_address');
    const regNumInput = document.getElementById('reg_num');

    const nameValue = nameInput.value.trim();
    const descValue = descInput.value.trim();
    const walletAddressValue = walletAddressInput.value.trim();
    const regNumValue = regNumInput.value.trim();

    // validate input values
    if (nameValue === '' || descValue === '' || walletAddressValue === '' || regNumValue === '') {
        alert('Please enter all the details!');
        return;
    }

    // call contract function using Web3.js
    contract.methods.enrollAsNGO(nameValue, descValue, walletAddressValue, regNumValue)
        .send({from: ethereum.selectedAddress})
        .on('transactionHash', function(hash) {
            console.log('Transaction hash:', hash);
            alert('Transaction submitted successfully!');
        })
        .on('error', function(error) {
            console.error('Transaction error:', error);
            alert('Transaction failed!');
        });

    // clear form input fields
    nameInput.value = '';
    descInput.value = '';
    walletAddressInput.value = '';
    regNumInput.value = '';
}

  

  