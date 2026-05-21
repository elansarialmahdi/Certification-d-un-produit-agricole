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
const CONTRACT_ADDRESS = "6080604052348015600e575f5ffd5b50335f5f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061174b8061005b5f395ff3fe608060405234801561000f575f5ffd5b5060043610610060575f3560e01c80632797695b146100645780633e8686cc146100805780636ec02be9146100b75780636fb370f9146100d55780638ff0346e146100f3578063b46bff891461010f575b5f5ffd5b61007e60048036038101906100799190610c43565b61012d565b005b61009a60048036038101906100959190610d1a565b610433565b6040516100ae989796959493929190610e66565b60405180910390f35b6100bf6107d3565b6040516100cc9190610efe565b60405180910390f35b6100dd6107d9565b6040516100ea9190610fce565b60405180910390f35b61010d60048036038101906101089190611023565b61086a565b005b610117610ad2565b604051610124919061108f565b60405180910390f35b5f835111610170576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610167906110f2565b60405180910390fd5b5f8251116101b3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101aa9061115a565b60405180910390fd5b5f8151116101f6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ed906111c2565b60405180910390fd5b60015f8154809291906102089061120d565b919050555060405180610100016040528060015481526020013373ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018381526020018281526020014281526020015f600281111561026857610267610df3565b5b815260200160405180602001604052805f81525081525060025f60015481526020019081526020015f205f820151815f01556020820151816001015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020190816102f59190611462565b50606082015181600301908161030b9190611462565b5060808201518160040190816103219190611462565b5060a0820151816005015560c0820151816006015f6101000a81548160ff0219169083600281111561035657610355610df3565b5b021790555060e08201518160070190816103709190611462565b5090505060035f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20600154908060018154018082558091505060019003905f5260205f20015f90919091909150553373ffffffffffffffffffffffffffffffffffffffff166001547f3944d90d344472fae394b9f5db76423366d52c5f3f8fc54dcdd88bfd1eac1949858585426040516104269493929190611531565b60405180910390a3505050565b5f5f60608060605f5f60605f8911801561044f57506001548911155b61048e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610485906115d3565b60405180910390fd5b5f60025f8b81526020019081526020015f20604051806101000160405290815f8201548152602001600182015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160028201805461051a90611281565b80601f016020809104026020016040519081016040528092919081815260200182805461054690611281565b80156105915780601f1061056857610100808354040283529160200191610591565b820191905f5260205f20905b81548152906001019060200180831161057457829003601f168201915b505050505081526020016003820180546105aa90611281565b80601f01602080910402602001604051908101604052809291908181526020018280546105d690611281565b80156106215780601f106105f857610100808354040283529160200191610621565b820191905f5260205f20905b81548152906001019060200180831161060457829003601f168201915b5050505050815260200160048201805461063a90611281565b80601f016020809104026020016040519081016040528092919081815260200182805461066690611281565b80156106b15780601f10610688576101008083540402835291602001916106b1565b820191905f5260205f20905b81548152906001019060200180831161069457829003601f168201915b5050505050815260200160058201548152602001600682015f9054906101000a900460ff1660028111156106e8576106e7610df3565b5b60028111156106fa576106f9610df3565b5b815260200160078201805461070e90611281565b80601f016020809104026020016040519081016040528092919081815260200182805461073a90611281565b80156107855780601f1061075c57610100808354040283529160200191610785565b820191905f5260205f20905b81548152906001019060200180831161076857829003601f168201915b5050505050815250509050805f015181602001518260400151836060015184608001518560a001518660c001518760e001519850985098509850985098509850985050919395975091939597565b60015481565b606060035f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2080548060200260200160405190810160405280929190818152602001828054801561086057602002820191905f5260205f20905b81548152602001906001019080831161084c575b5050505050905090565b5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146108f8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108ef90611661565b60405180910390fd5b5f8311801561090957506001548311155b610948576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161093f906115d3565b60405180910390fd5b5f600281111561095b5761095a610df3565b5b60025f8581526020019081526020015f206006015f9054906101000a900460ff16600281111561098e5761098d610df3565b5b146109ce576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109c5906116c9565b60405180910390fd5b8115610a1557600160025f8581526020019081526020015f206006015f6101000a81548160ff02191690836002811115610a0b57610a0a610df3565b5b0217905550610a51565b6002805f8581526020019081526020015f206006015f6101000a81548160ff02191690836002811115610a4b57610a4a610df3565b5b02179055505b8060025f8581526020019081526020015f206007019081610a729190611462565b50827f371d839ddb7b350a32cd3b22900a8a96d76f00b9f7a5a376bdeac88a7088ee7a60025f8681526020019081526020015f206006015f9054906101000a900460ff1683604051610ac59291906116e7565b60405180910390a2505050565b5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f604051905090565b5f5ffd5b5f5ffd5b5f5ffd5b5f5ffd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b610b5582610b0f565b810181811067ffffffffffffffff82111715610b7457610b73610b1f565b5b80604052505050565b5f610b86610af6565b9050610b928282610b4c565b919050565b5f67ffffffffffffffff821115610bb157610bb0610b1f565b5b610bba82610b0f565b9050602081019050919050565b828183375f83830152505050565b5f610be7610be284610b97565b610b7d565b905082815260208101848484011115610c0357610c02610b0b565b5b610c0e848285610bc7565b509392505050565b5f82601f830112610c2a57610c29610b07565b5b8135610c3a848260208601610bd5565b91505092915050565b5f5f5f60608486031215610c5a57610c59610aff565b5b5f84013567ffffffffffffffff811115610c7757610c76610b03565b5b610c8386828701610c16565b935050602084013567ffffffffffffffff811115610ca457610ca3610b03565b5b610cb086828701610c16565b925050604084013567ffffffffffffffff811115610cd157610cd0610b03565b5b610cdd86828701610c16565b9150509250925092565b5f819050919050565b610cf981610ce7565b8114610d03575f5ffd5b50565b5f81359050610d1481610cf0565b92915050565b5f60208284031215610d2f57610d2e610aff565b5b5f610d3c84828501610d06565b91505092915050565b610d4e81610ce7565b82525050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610d7d82610d54565b9050919050565b610d8d81610d73565b82525050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f610dc582610d93565b610dcf8185610d9d565b9350610ddf818560208601610dad565b610de881610b0f565b840191505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602160045260245ffd5b60038110610e3157610e30610df3565b5b50565b5f819050610e4182610e20565b919050565b5f610e5082610e34565b9050919050565b610e6081610e46565b82525050565b5f61010082019050610e7a5f83018b610d45565b610e87602083018a610d84565b8181036040830152610e998189610dbb565b90508181036060830152610ead8188610dbb565b90508181036080830152610ec18187610dbb565b9050610ed060a0830186610d45565b610edd60c0830185610e57565b81810360e0830152610eef8184610dbb565b90509998505050505050505050565b5f602082019050610f115f830184610d45565b92915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b610f4981610ce7565b82525050565b5f610f5a8383610f40565b60208301905092915050565b5f602082019050919050565b5f610f7c82610f17565b610f868185610f21565b9350610f9183610f31565b805f5b83811015610fc1578151610fa88882610f4f565b9750610fb383610f66565b925050600181019050610f94565b5085935050505092915050565b5f6020820190508181035f830152610fe68184610f72565b905092915050565b5f8115159050919050565b61100281610fee565b811461100c575f5ffd5b50565b5f8135905061101d81610ff9565b92915050565b5f5f5f6060848603121561103a57611039610aff565b5b5f61104786828701610d06565b93505060206110588682870161100f565b925050604084013567ffffffffffffffff81111561107957611078610b03565b5b61108586828701610c16565b9150509250925092565b5f6020820190506110a25f830184610d84565b92915050565b7f53747564656e7420636f646520697320726571756972656400000000000000005f82015250565b5f6110dc601883610d9d565b91506110e7826110a8565b602082019050919050565b5f6020820190508181035f830152611109816110d0565b9050919050565b7f41737369676e6d656e74207469746c65206973207265717569726564000000005f82015250565b5f611144601c83610d9d565b915061114f82611110565b602082019050919050565b5f6020820190508181035f83015261117181611138565b9050919050565b7f46696c65206861736820697320726571756972656400000000000000000000005f82015250565b5f6111ac601583610d9d565b91506111b782611178565b602082019050919050565b5f6020820190508181035f8301526111d9816111a0565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61121782610ce7565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611249576112486111e0565b5b600182019050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061129857607f821691505b6020821081036112ab576112aa611254565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f6008830261130d7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826112d2565b61131786836112d2565b95508019841693508086168417925050509392505050565b5f819050919050565b5f61135261134d61134884610ce7565b61132f565b610ce7565b9050919050565b5f819050919050565b61136b83611338565b61137f61137782611359565b8484546112de565b825550505050565b5f5f905090565b611396611387565b6113a1818484611362565b505050565b5f5b828110156113c7576113bc5f82840161138e565b6001810190506113a8565b505050565b601f82111561141a5782821115611419576113e6816112b1565b6113ef836112c3565b6113f8856112c3565b6020861015611405575f90505b808301611414828403826113a6565b505050505b5b505050565b5f82821c905092915050565b5f61143a5f198460080261141f565b1980831691505092915050565b5f611452838361142b565b9150826002028217905092915050565b61146b82610d93565b67ffffffffffffffff81111561148457611483610b1f565b5b61148e8254611281565b6114998282856113cc565b5f60209050601f8311600181146114ca575f84156114b8578287015190505b6114c28582611447565b865550611529565b601f1984166114d8866112b1565b5f5b828110156114ff578489015182556001820191506020850194506020810190506114da565b8683101561151c5784890151611518601f89168261142b565b8355505b6001600288020188555050505b505050505050565b5f6080820190508181035f8301526115498187610dbb565b9050818103602083015261155d8186610dbb565b905081810360408301526115718185610dbb565b90506115806060830184610d45565b95945050505050565b7f5375626d697373696f6e20646f6573206e6f74206578697374000000000000005f82015250565b5f6115bd601983610d9d565b91506115c882611589565b602082019050919050565b5f6020820190508181035f8301526115ea816115b1565b9050919050565b7f4f6e6c7920746561636865722063616e20706572666f726d20746869732061635f8201527f74696f6e00000000000000000000000000000000000000000000000000000000602082015250565b5f61164b602483610d9d565b9150611656826115f1565b604082019050919050565b5f6020820190508181035f8301526116788161163f565b9050919050565b7f416c7265616479207265766965776564000000000000000000000000000000005f82015250565b5f6116b3601083610d9d565b91506116be8261167f565b602082019050919050565b5f6020820190508181035f8301526116e0816116a7565b9050919050565b5f6040820190506116fa5f830185610e57565b818103602083015261170c8184610dbb565b9050939250505056fea2646970667358221220adc94570a79469c289157dbc7490990dffd049f27c25cd01bf6f41a84d3af7b764736f6c63430008220033";

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
