window.addEventListener("load", ()=>{
    const connectMetamaskButton = document.getElementById('connect-metamask-button');
    const connectMetamaskButtonMobile = document.getElementById('connect-metamask-button-mobile');

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