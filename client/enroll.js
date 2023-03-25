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
    form.addEventListener("submit", handleSubmit);
    


  
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

  function handleSubmit(event) {
    event.preventDefault(); // prevent the form from submitting normally
    
    // retrieve the values entered by the user
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const regNumber = document.getElementById("reg-number").value;
    const walletAddress = document.getElementById("wallet-address").value;
    
    contract.methods
      .enrollAsNGO(name, description, walletAddress, regNumber)
      .call()
      .then((result) => {
        console.log(result);
      });

    // perform any necessary actions with the values
    // for example, you could create a new smart contract with these values
    
    // clear the form inputs
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("reg-number").value = "";
    document.getElementById("wallet-address").value = "";
    
  }
  

  