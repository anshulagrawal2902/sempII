window.addEventListener("load", async () => {
    const contractAbi = ABI;
    const contractAddress = CONTRACT_ADDRESS;
    const web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(contractAbi, contractAddress);
  
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    account = accounts[0];

    const myDonations = await contract.methods.myDonations().call();

    console.log(myDonations)
    let sum = 0;
    myDonations.forEach(element => {
        sum +=  parseInt(element[2])
    });
    sum = sum / 1000000000000000000;
    document.querySelector(".totalDonations").textContent = `Total Donations : ${sum} ETH 🎉🎉`;
    console.log(sum)
})