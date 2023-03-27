let params = new URLSearchParams(window.location.search);
console.log(params)
let wallet;
let web3;


window.addEventListener('DOMContentLoaded', async()=>{
    wallet = params.get('wallet');
    const image_div = document.getElementById("image-div")
    let upvote = document.getElementById("upvote")
    let name = document.getElementById("name")
    let description = document.getElementById("description")

    const contractAbi = ABI;
    const contractAddress = CONTRACT_ADDRESS;
    web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(contractAbi, contractAddress);

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
  
    upvote.addEventListener("click", ()=>{
        contract.methods
        .upvote(wallet)
        .send({ from: account })
        .on("transactionHash", function (hash) {
          console.log("Transaction hash:", hash);
        })
        .on("receipt", function (receipt) {
          console.log("Transaction receipt:", receipt);
        })
        .on("error", function (error) {
          console.error("Transaction error:", error);
        });
    })


    const ngoList = await contract.methods.getNGOList().call();
    ngoList.forEach((ngo) => {
        if(ngo.wallet == wallet){
            name.innerHTML = ngo.name
            description.innerHTML = ngo.description
        }
    });

    const form = document.querySelector("form");
    form.addEventListener("submit", handleFormSubmission);


})

function handleFormSubmission(event) {
    event.preventDefault(); // prevent default form submission behavior

    // get form input values
    const amount = document.getElementById("amount")

    // validate input values
    if (amount === '') {
        alert('Please enter both registration number and wallet address!');
        return;
    }
    const amountValue = amount.value.trim();
    const etherValue = web3.utils.toWei(amountValue, 'ether');

    contract.methods.donate(wallet)
    .send({from: ethereum.selectedAddress, value:etherValue})
    .on('transactionHash', function(hash) {
        console.log('Transaction hash:', hash);
        alert('Transaction submitted successfully!');
    })
    .on('error', function(error) {
        console.error('Transaction error:', error);
        alert('Transaction failed!');
    });

    // clear form input fields
    amount.value = '';

}
