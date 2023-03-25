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
  let ngoList = document.getElementById("ngoList")

  contract.methods
      .getNGOList()
      .call()
      .then((result) => {
        console.log(result);
        ngoList.innerHTML = result;
      });

  myDonations.addEventListener("click", () => {
    contract.methods
      .myDonations()
      .call()
      .then((result) => {
        console.log(result);
      });
  });

  home.addEventListener("click", () => {
    const value = web3.utils.toWei("1", "ether"); // Replace with the amount of Ether you want to send
    let gas = 1000000;

    const transaction = contract.methods
      .donate("0xf7937137330Bd9C8d630AEa211e251433c4fdC72")
      .send({ from: account, value: value});

    transaction.on('confirmation', function(confirmationNumber, receipt) {
      console.log('confirmation', confirmationNumber);
    });

    transaction.on('error', function(error) {
      console.error('error', error);
    });
      
  });

  // enroll.addEventListener("click", ()=>{
  //   contract.methods
  //     .getAuthorizedList()
  //     .call()
  //     .then((result) => {
  //       console.log(result);
  //     });
  // })


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
