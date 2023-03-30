let account;
let accounts;
let images = ['card_bg.jpg', 'card_bg1.jpg', 'card_bg2.jpg', 'card_bg3.jpg', 'card_bg4.jpg', 'card_bg5.jpg']
let i = 0;
window.addEventListener("load", async () => {
  const contractAbi = ABI;
  const contractAddress = CONTRACT_ADDRESS;
  const web3 = new Web3(window.ethereum);
  contract = new web3.eth.Contract(contractAbi, contractAddress);

  accounts = await ethereum.request({ method: "eth_requestAccounts" });
  account = accounts[0];
  console.log(account);

  const connectMetamaskButton = document.getElementById(
    "connect-metamask-button"
  );
  const connectMetamaskButtonMobile = document.getElementById(
    "connect-metamask-button-mobile"
  );

  let myDonations = document.getElementById("myDonations");
  let home = document.getElementById("home");
  let ngoList = document.getElementById("ngoList");

  displayNGOList();

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

async function displayNGOList() {
  const ngoList = await contract.methods.getNGOList().call(); // call contract function using Web3.js

  const ngoCardTemplate = document.getElementById("ngo_card_template");
  const ngoListContainer = document.getElementById("wrapper_container");

  ngoList.forEach((ngo) => {
    
    for(let j = 0; j < 6; j++){
      let ngoCard = ngoCardTemplate.content.cloneNode(true);
      ngoCard.querySelector(".card-title").textContent = ngo.name;
      // ngoCard.querySelector(".card-text").textContent = ngo.description;
      ngoCard.querySelector(".upvotes").textContent = `Upvotes : ${ngo.upvotes}`;
      ngoCard.querySelector(".front").style.backgroundImage = `url(${images[i]})`
      i = (i + 1) % images.length;
      // ngoCard.querySelector("#upvoteBtn").addEventListener("click", async() => {
      //   accounts = await ethereum.request({ method: "eth_requestAccounts" });
      //   account = accounts[0];
      //   contract.methods
      //   .upvote(ngo.wallet)
      //   .send({ from: account })
      //   .on("transactionHash", function (hash) {
      //     console.log("Transaction hash:", hash);
      //   })
      //   .on("receipt", function (receipt) {
      //     console.log("Transaction receipt:", receipt);
      //   })
      //   .on("error", function (error) {
      //     console.error("Transaction error:", error);
      //   });
      // });
      ngoCard.querySelector("#knowMoreBtn").addEventListener("click", () => {
        window.location.href = `singleNGO.html?wallet=${ngo.wallet}`;
      });

      ngoListContainer.appendChild(ngoCard);
    }
  });
}
