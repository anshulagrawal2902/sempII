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
    const regNumInput = document.getElementById('reg_num');
    const walletAddressInput = document.getElementById('wallet_address');

    const regNumValue = regNumInput.value.trim();
    const walletAddressValue = walletAddressInput.value.trim();

    // validate input values
    if (regNumValue === '' || walletAddressValue === '') {
        alert('Please enter both registration number and wallet address!');
        return;
    }

    contract.methods.addToAuthorizedNGO(regNumValue, walletAddressValue)
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
    regNumInput.value = '';
    walletAddressInput.value = '';

    alert('Form submitted successfully!');
}


 
  

  