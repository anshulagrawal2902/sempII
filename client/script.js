let account;
window.addEventListener("load", async () => {
  const contractAbi = ABI;
  const contractAddress = CONTRACT_ADDRESS;
  const web3 = new Web3(window.ethereum);
  contract = new web3.eth.Contract(contractAbi, contractAddress);

  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
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
  const ngoListContainer = document.getElementById("ngo_list");

  ngoList.forEach((ngo) => {
    let ngoCard = ngoCardTemplate.content.cloneNode(true);
    ngoCard.querySelector(".card-title").textContent = ngo.name;
    ngoCard.querySelector(".card-text").textContent = ngo.description;
    ngoCard.querySelector(".upvotes").textContent = ngo.upvotes;
    ngoCard.querySelector("#upvoteBtn").addEventListener("click", () => {
      contract.methods
        .upvote(ngo.wallet)
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
    });
    ngoCard.querySelector("#card_body").addEventListener("click", () => {
      window.location.href = `singleNGO.html?wallet=${ngo.wallet}`;
    });

    ngoListContainer.appendChild(ngoCard);
  });
}
