/* ═══════════════════════════════════════════════════════════
   AgriCert DApp — app.js
   Library: Ethers.js v6
   Usage: Works with Live Server (VS Code) or any static server
═══════════════════════════════════════════════════════════ */

// ╔══════════════════════════════════════════════════════════╗
// ║  STEP 1: PASTE YOUR CONTRACT ADDRESS HERE               ║
// ║  After deploying in Remix, copy the contract address    ║
// ║  and replace the string below.                          ║
// ╚══════════════════════════════════════════════════════════╝
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";

// ╔══════════════════════════════════════════════════════════╗
// ║  STEP 2: PASTE YOUR CONTRACT ABI HERE                   ║
// ║  In Remix: after compiling, go to the ABI section       ║
// ║  under "Compilation Details" and copy the full ABI.    ║
// ║  Replace the empty array below with the copied ABI.     ║
// ╚══════════════════════════════════════════════════════════╝
const CONTRACT_ABI = [
  [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "studentAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "studentCode",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "assignmentTitle",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "fileHash",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "SubmissionCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum AcademicSubmission.Status",
        "name": "status",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "teacherComment",
        "type": "string"
      }
    ],
    "name": "SubmissionReviewed",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getMySubmissionIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getSubmission",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "studentAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "studentCode",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "assignmentTitle",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "fileHash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "enum AcademicSubmission.Status",
        "name": "status",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "teacherComment",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_accepted",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "_comment",
        "type": "string"
      }
    ],
    "name": "reviewSubmission",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "submissionCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_studentCode",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_assignmentTitle",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_fileHash",
        "type": "string"
      }
    ],
    "name": "submitAssignment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "teacher",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
];

// ═══════════════════════════════════════════════════════════
//  GLOBAL VARIABLES
// ═══════════════════════════════════════════════════════════

/** @type {ethers.BrowserProvider} */
let provider = null;

/** @type {ethers.Signer} */
let signer = null;

/** @type {ethers.Contract} */
let contract = null;

/** @type {string} Currently connected wallet address */
let connectedAddress = null;

// ═══════════════════════════════════════════════════════════
//  INITIALIZATION — runs when the page loads
// ═══════════════════════════════════════════════════════════

window.addEventListener("DOMContentLoaded", async () => {
  console.log("AgriCert DApp loaded.");

  // Check if MetaMask (or another EIP-1193 wallet) is already available
  if (window.ethereum) {
    // Listen for account changes (user switches wallet in MetaMask)
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    // Listen for network changes (user switches chain)
    window.ethereum.on("chainChanged", () => {
      console.log("Network changed — reloading page.");
      window.location.reload();
    });

    // Auto-connect if the user previously granted permission
    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        await setupProvider(accounts[0]);
      }
    } catch (err) {
      console.warn("Auto-connect check failed:", err.message);
    }
  } else {
    console.warn("No Ethereum wallet detected. Please install MetaMask.");
  }
});

// ═══════════════════════════════════════════════════════════
//  WALLET CONNECTION
// ═══════════════════════════════════════════════════════════

/**
 * Called when the user clicks "Connect Wallet".
 * Requests MetaMask account access and sets up ethers.js provider.
 */
async function connectWallet() {
  if (!window.ethereum) {
    showNotif("error", "🦊 MetaMask not found! Please install the MetaMask browser extension.");
    return;
  }

  try {
    // Request the user to grant access to their accounts
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    await setupProvider(accounts[0]);
    showNotif("success", `✓ Wallet connected: ${shortenAddress(accounts[0])}`);
  } catch (err) {
    if (err.code === 4001) {
      // User rejected the connection request
      showNotif("warning", "⚠ Wallet connection was rejected by the user.");
    } else {
      showNotif("error", "✗ Failed to connect wallet: " + err.message);
    }
  }
}

/**
 * Sets up ethers.js provider, signer, and contract instance.
 * @param {string} account - The connected Ethereum account address
 */
async function setupProvider(account) {
  // ethers.BrowserProvider wraps window.ethereum for ethers.js v6
  provider = new ethers.BrowserProvider(window.ethereum);

  // The signer can sign transactions on behalf of the user
  signer = await provider.getSigner();

  connectedAddress = await signer.getAddress();

  // Connect to the deployed smart contract
  // Using signer allows us to send transactions (write functions)
  contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  // Update the UI to reflect the connected state
  updateWalletUI(connectedAddress);

  // Refresh statistics from the blockchain
  await refreshStats();
}

/**
 * Updates the header wallet display.
 * @param {string} address - Full Ethereum address
 */
function updateWalletUI(address) {
  const connectBtn = document.getElementById("connectBtn");
  const walletInfo = document.getElementById("wallet-info");
  const walletAddressEl = document.getElementById("wallet-address");

  connectBtn.classList.add("hidden");
  walletInfo.classList.remove("hidden");
  walletAddressEl.textContent = shortenAddress(address);
}

/**
 * Called when the user changes their active account in MetaMask.
 * @param {string[]} accounts - New array of accounts from MetaMask
 */
async function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // User disconnected their wallet
    connectedAddress = null;
    provider = null;
    signer = null;
    contract = null;

    document.getElementById("connectBtn").classList.remove("hidden");
    document.getElementById("wallet-info").classList.add("hidden");
    showNotif("warning", "⚠ Wallet disconnected.");
  } else {
    // User switched to a different account
    await setupProvider(accounts[0]);
    showNotif("success", `✓ Account switched to: ${shortenAddress(accounts[0])}`);
  }
}

// ═══════════════════════════════════════════════════════════
//  SMART CONTRACT INTERACTIONS
// ═══════════════════════════════════════════════════════════

/**
 * Registers a new agricultural product batch on the blockchain.
 * Reads form inputs and calls the registerBatch() contract function.
 */
async function registerBatch() {
  if (!isConnected()) return;
  if (!isContractConfigured()) return;

  const productName = document.getElementById("productName").value.trim();
  const origin      = document.getElementById("origin").value.trim();
  const harvestDate = document.getElementById("harvestDate").value.trim();

  // Client-side validation before sending a transaction
  if (!productName) return showNotif("warning", "⚠ Please enter the product name.");
  if (!origin)      return showNotif("warning", "⚠ Please enter the origin/region.");
  if (!harvestDate) return showNotif("warning", "⚠ Please select a harvest date.");

  const btn     = document.getElementById("registerBtn");
  const spinner = document.getElementById("registerSpinner");
  const result  = document.getElementById("registerResult");

  setLoading(btn, spinner, true);
  hideEl(result);

  try {
    // Send the transaction — MetaMask will pop up for user confirmation
    const tx = await contract.registerBatch(productName, origin, harvestDate);

    showNotif("success", "⏳ Transaction sent! Waiting for confirmation…");

    // Wait for the transaction to be mined (included in a block)
    const receipt = await tx.wait();

    // Show success info
    showEl(result);
    result.className = "tx-result tx-success";
    result.innerHTML = `
      ✓ Batch registered successfully!<br/>
      <strong>Tx Hash:</strong> <code>${receipt.hash}</code><br/>
      <strong>Block:</strong> #${receipt.blockNumber}
    `;

    // Clear the form fields after success
    document.getElementById("productName").value = "";
    document.getElementById("origin").value      = "";
    document.getElementById("harvestDate").value  = "";

    showNotif("success", "✓ Batch registered on the blockchain!");

    // Refresh batch count in the hero stats
    await refreshStats();

  } catch (err) {
    showEl(result);
    result.className = "tx-result tx-error";
    result.textContent = "✗ " + parseError(err);
    showNotif("error", "✗ " + parseError(err));
  } finally {
    setLoading(btn, spinner, false);
  }
}

/**
 * Certifies an existing batch on the blockchain.
 * Only callable by the contract owner (certification authority).
 */
async function certifyBatch() {
  if (!isConnected()) return;
  if (!isContractConfigured()) return;

  const batchId  = document.getElementById("certifyId").value.trim();
  const certHash = document.getElementById("certHash").value.trim();

  // Client-side validation
  if (!batchId || isNaN(batchId) || parseInt(batchId) < 1) {
    return showNotif("warning", "⚠ Please enter a valid Batch ID.");
  }
  if (!certHash) return showNotif("warning", "⚠ Please enter the certificate hash.");

  const btn     = document.getElementById("certifyBtn");
  const spinner = document.getElementById("certifySpinner");
  const result  = document.getElementById("certifyResult");

  setLoading(btn, spinner, true);
  hideEl(result);

  try {
    // Call the certifyBatch function on the smart contract
    const tx = await contract.certifyBatch(parseInt(batchId), certHash);

    showNotif("success", "⏳ Certification transaction sent! Waiting for confirmation…");

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    showEl(result);
    result.className = "tx-result tx-success";
    result.innerHTML = `
      ✓ Batch #${batchId} certified successfully!<br/>
      <strong>Tx Hash:</strong> <code>${receipt.hash}</code><br/>
      <strong>Block:</strong> #${receipt.blockNumber}
    `;

    // Clear the form
    document.getElementById("certifyId").value = "";
    document.getElementById("certHash").value  = "";

    showNotif("success", `✓ Batch #${batchId} is now certified!`);

  } catch (err) {
    showEl(result);
    result.className = "tx-result tx-error";
    result.textContent = "✗ " + parseError(err);
    showNotif("error", "✗ " + parseError(err));
  } finally {
    setLoading(btn, spinner, false);
  }
}

/**
 * Retrieves and displays batch information by ID.
 * This is a read-only call — no transaction, no gas cost.
 */
async function getBatch() {
  if (!isContractConfigured()) return;

  // For read-only calls we can use a read-only provider (no signer needed)
  let readContract = contract;
  if (!readContract) {
    // If wallet not connected, create a read-only provider
    const readProvider = new ethers.BrowserProvider(window.ethereum);
    readContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, readProvider);
  }

  const searchId = document.getElementById("searchId").value.trim();

  if (!searchId || isNaN(searchId) || parseInt(searchId) < 1) {
    return showNotif("warning", "⚠ Please enter a valid Batch ID.");
  }

  const spinner = document.getElementById("searchSpinner");
  const result  = document.getElementById("batchResult");
  const errEl   = document.getElementById("verifyError");

  setLoadingSimple(spinner, true);
  hideEl(result);
  hideEl(errEl);

  try {
    // Call getBatch — view function, free to call
    const batch = await readContract.getBatch(parseInt(searchId));

    // batch is a Result object from ethers.js v6
    // Destructure by index (matches return order in the contract)
    const [
      id,
      productName,
      origin,
      harvestDate,
      certificateHash,
      certified,
      farmer,
      certifier,
      createdAt
    ] = batch;

    // Populate result fields
    document.getElementById("res-id").textContent       = `#${id.toString()}`;
    document.getElementById("res-product").textContent  = productName;
    document.getElementById("res-origin").textContent   = origin;
    document.getElementById("res-harvest").textContent  = harvestDate;
    document.getElementById("res-farmer").textContent   = farmer;
    document.getElementById("res-certifier").textContent = certifier === ethers.ZeroAddress
      ? "Not yet certified"
      : certifier;
    document.getElementById("res-hash").textContent     = certificateHash || "—";
    document.getElementById("res-created").textContent  = formatTimestamp(createdAt);

    // Update certification badge
    const badge = document.getElementById("res-certified-badge");
    if (certified) {
      badge.className = "badge badge-certified";
      badge.textContent = "✓ Certified";
    } else {
      badge.className = "badge badge-pending";
      badge.textContent = "⏳ Pending";
    }

    showEl(result);

  } catch (err) {
    showEl(errEl);
    errEl.textContent = "✗ " + parseError(err);
    showNotif("error", "✗ Batch not found or error: " + parseError(err));
  } finally {
    setLoadingSimple(spinner, false);
  }
}

// ═══════════════════════════════════════════════════════════
//  STATS
// ═══════════════════════════════════════════════════════════

/**
 * Fetches the total batch count from the blockchain and updates the hero stat.
 */
async function refreshStats() {
  if (!contract) return;

  try {
    const count = await contract.getBatchCount();
    document.getElementById("stat-batches").textContent = count.toString();
  } catch (err) {
    console.warn("Could not fetch batch count:", err.message);
  }
}

// ═══════════════════════════════════════════════════════════
//  NOTIFICATION SYSTEM
// ═══════════════════════════════════════════════════════════

/** @type {number|null} Timeout ID for auto-hiding notifications */
let notifTimeout = null;

/**
 * Displays a notification banner at the top of the page.
 * @param {"success"|"error"|"warning"} type - Visual style
 * @param {string} message - The message to display
 */
function showNotif(type, message) {
  const notif    = document.getElementById("notification");
  const iconEl   = document.getElementById("notification-icon");
  const msgEl    = document.getElementById("notification-msg");

  // Set icon based on type
  const icons = { success: "✓", error: "✗", warning: "⚠" };
  iconEl.textContent = icons[type] || "ℹ";
  msgEl.textContent  = message;

  notif.className = `notification ${type}`;
  notif.classList.remove("hidden");

  // Auto-hide after 5 seconds
  if (notifTimeout) clearTimeout(notifTimeout);
  notifTimeout = setTimeout(closeNotif, 5000);
}

/**
 * Closes the notification banner.
 */
function closeNotif() {
  document.getElementById("notification").classList.add("hidden");
}

// ═══════════════════════════════════════════════════════════
//  HELPER / UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════

/**
 * Checks if a wallet is currently connected.
 * Shows a notification if not.
 * @returns {boolean}
 */
function isConnected() {
  if (!connectedAddress) {
    showNotif("warning", "⚠ Please connect your MetaMask wallet first.");
    return false;
  }
  return true;
}

/**
 * Checks if the contract address and ABI have been configured.
 * @returns {boolean}
 */
function isContractConfigured() {
  if (CONTRACT_ADDRESS === "YOUR_CONTRACT_ADDRESS_HERE") {
    showNotif("error", "✗ Contract address not set. Open app.js and paste your deployed contract address.");
    return false;
  }
  if (!CONTRACT_ABI || CONTRACT_ABI.length === 0) {
    showNotif("error", "✗ Contract ABI is empty. Open app.js and paste the ABI from Remix.");
    return false;
  }
  return true;
}

/**
 * Parses a contract or MetaMask error into a readable message.
 * @param {any} err
 * @returns {string}
 */
function parseError(err) {
  // Contract revert reason (ethers.js v6)
  if (err?.reason) return err.reason;
  // MetaMask user rejection
  if (err?.code === 4001) return "Transaction rejected by user.";
  // Contract error data
  if (err?.data?.message) return err.data.message;
  // Standard error message
  if (err?.message) {
    // Clean up ethers.js verbose error messages
    const msg = err.message;
    if (msg.includes("AgriCert:")) {
      const match = msg.match(/AgriCert: (.+?)(?:"|$)/);
      if (match) return match[1];
    }
    // Truncate extremely long messages
    return msg.length > 120 ? msg.substring(0, 120) + "…" : msg;
  }
  return "An unknown error occurred.";
}

/**
 * Shortens an Ethereum address for display (0x1234…5678).
 * @param {string} address
 * @returns {string}
 */
function shortenAddress(address) {
  if (!address || address.length < 10) return address;
  return `${address.substring(0, 6)}…${address.substring(address.length - 4)}`;
}

/**
 * Converts a Unix timestamp (BigInt from contract) to a human-readable string.
 * @param {BigInt} timestamp
 * @returns {string}
 */
function formatTimestamp(timestamp) {
  const ts = Number(timestamp);
  if (!ts) return "Unknown";
  const date = new Date(ts * 1000); // Convert seconds to milliseconds
  return date.toLocaleString("en-US", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
}

/**
 * Shows a loading spinner inside a button and disables it.
 * @param {HTMLButtonElement} btn
 * @param {HTMLElement} spinner
 * @param {boolean} loading
 */
function setLoading(btn, spinner, loading) {
  if (loading) {
    btn.disabled = true;
    btn.style.opacity = "0.7";
    spinner.classList.remove("hidden");
  } else {
    btn.disabled = false;
    btn.style.opacity = "";
    spinner.classList.add("hidden");
  }
}

/**
 * Shows or hides a standalone spinner element.
 * @param {HTMLElement} spinner
 * @param {boolean} loading
 */
function setLoadingSimple(spinner, loading) {
  if (loading) spinner.classList.remove("hidden");
  else         spinner.classList.add("hidden");
}

/**
 * Shows a DOM element (removes 'hidden' class).
 * @param {HTMLElement} el
 */
function showEl(el) { el.classList.remove("hidden"); }

/**
 * Hides a DOM element (adds 'hidden' class).
 * @param {HTMLElement} el
 */
function hideEl(el) { el.classList.add("hidden"); }

// ═══════════════════════════════════════════════════════════
//  CONNECT BUTTON BINDING
// ═══════════════════════════════════════════════════════════
document.getElementById("connectBtn").addEventListener("click", connectWallet);
