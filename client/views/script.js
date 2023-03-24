window.addEventListener("load", ()=>{


  const contractAbi = ABI; 
  const contractAddress = CONTRACT_ADDRESS; 
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  // const account = web3.eth.accounts.create();




    const connectMetamaskButton = document.getElementById('connect-metamask-button');
    const connectMetamaskButtonMobile = document.getElementById('connect-metamask-button-mobile');
    let myDonations = document.getElementById("myDonations");



    myDonations.addEventListener("click", ()=>{
      // const result = await contract.methods.getOwner().send({
      // from: account.address,
      // gas: 1000000
      // });
      console.log("hiii");
      // console.log(result);
    })

// Check if the user has Metamask installed
if (typeof window.ethereum !== 'undefined') {
  // Enable the Metamask button
  connectMetamaskButton.disabled = false;
  connectMetamaskButtonMobile.disabled = false;

  // Add a click event listener to the Metamask button
  connectMetamaskButton.addEventListener('click', async () => {
    try {
      // Request permission to connect to the user's Metamask wallet
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected to Metamask!');
    } catch (error) {
      console.error(error);
    }
  });

  connectMetamaskButtonMobile.addEventListener('click', async () => {
    try {
      // Request permission to connect to the user's Metamask wallet
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected to Metamask!');
    } catch (error) {
      console.error(error);
    }
  });
} else {
  // Disable the Metamask button if the user does not have Metamask installed
  connectMetamaskButton.disabled = true;
  connectMetamaskButtonMobile.disabled = true;
}
})





