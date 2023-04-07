window.addEventListener("load", async () => {
    const contractAbi = ABI;
    const contractAddress = CONTRACT_ADDRESS;
    const web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(contractAbi, contractAddress);
  
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    account = accounts[0];
    console.log(`account 1 ${account}`)
    let myDonations = await contract.methods.myDonations().call({ from: account });
    
    console.log(myDonations)
    let sum = 0;




    const donationRowTemplate = document.getElementById("donationRowTemplate");
    const thbody = document.getElementById("thbody");
    let i  = 1;
    myDonations.forEach((row)=>{
        let rowTemp = donationRowTemplate.content.cloneNode(true);
        console.log(rowTemp);
        let sr = rowTemp.querySelector('#sr-no').textContent = i;
        rowTemp.querySelector('#ngo-name').textContent = row.name;
        rowTemp.querySelector('#ngo-wallet').textContent = row.wallet;
        rowTemp.querySelector('#amount-donated').textContent = row.amount / 1000000000000000000  + " ETH" ;

        thbody.appendChild(rowTemp);

        i++;
    })
  






    myDonations.forEach(element => {
        sum +=  parseInt(element[3])
    });
    sum = sum / 1000000000000000000;
    document.querySelector(".totalDonations").textContent = `Total Donations : ${sum} ETH 🎉🎉`;
    console.log(sum)
})

async function displayDonations(){

    let myDonations = await contract.methods.myDonations().call({ from: account });

    const donationRowTemplate = document.getElementById("donationRowTemplate");
    const thbody = document.getElementById("thbody");
    let i  = 1;
    myDonations.forEach((row)=>{
        let rowTemp = donationRowTemplate.cloneNode(true);
        rowTemp.querySelector('#sr-no').textContent = i;
        rowTemp.querySelector('#ngo-name').textContent = i;
        rowTemp.querySelector('#ngo-wallet').textContent = i;
        rowTemp.querySelector('#amount-donated').textContent = i;

        thbody.appendChild(rowTemp);

        i++;
    })
  

}
