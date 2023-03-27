window.addEventListener("load", async () => {
    const contractAbi = ABI;
    const contractAddress = CONTRACT_ADDRESS;
    const web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(contractAbi, contractAddress);
  
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    account = accounts[0];

    const myDonations = await contract.methods.myDonations().call();

    console.log(myDonations)

})