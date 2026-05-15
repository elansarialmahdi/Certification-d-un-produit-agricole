// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AgriculturalCertification
 * @author AgriCert DApp - University Mini-Project
 * @notice This contract allows farmers to register agricultural product batches,
 *         certification authorities to certify them, and anyone to verify them publicly.
 * @dev Demonstrates: Traceability, Transparency, Proof of Origin, Certification,
 *      Immutability, Public Verification, and Access Control on the blockchain.
 */
contract AgriculturalCertification {

    // ============================================================
    //  STATE VARIABLES
    // ============================================================

    /// @notice The owner/admin of the contract (certification authority)
    address public owner;

    /// @notice Counter to track how many batches have been registered
    uint public batchCounter;

    // ============================================================
    //  STRUCTS
    // ============================================================

    /**
     * @notice Represents a single agricultural product batch
     * @dev All fields are stored permanently on-chain (immutable after write)
     */
    struct Batch {
        uint id;                  // Unique batch identifier
        string productName;       // Name of the agricultural product (e.g., "Tomatoes")
        string origin;            // Geographic origin (e.g., "Agadir, Morocco")
        string harvestDate;       // Date of harvest (e.g., "2025-06-15")
        string certificateHash;   // Hash of the certificate document (proof of authenticity)
        bool certified;           // Whether the batch has been certified by the authority
        address farmer;           // Ethereum address of the farmer who registered the batch
        address certifier;        // Ethereum address of the authority who certified the batch
        uint createdAt;           // Unix timestamp of batch registration
    }

    // ============================================================
    //  MAPPINGS
    // ============================================================

    /// @notice Stores all batches by their unique ID
    /// @dev mapping(batchId => Batch)
    mapping(uint => Batch) private batches;

    /// @notice Tracks which batch IDs actually exist (to validate lookups)
    mapping(uint => bool) private batchExists_map;

    // ============================================================
    //  EVENTS
    // ============================================================

    /**
     * @notice Emitted when a new batch is registered by a farmer
     * @param id The unique batch ID assigned
     * @param productName Name of the product
     * @param farmer Address of the farmer who registered it
     */
    event BatchRegistered(uint indexed id, string productName, address indexed farmer);

    /**
     * @notice Emitted when a batch is certified by the owner/authority
     * @param id The batch ID that was certified
     * @param certificateHash The hash of the certification document
     * @param certifier Address of the certifier
     */
    event BatchCertified(uint indexed id, string certificateHash, address indexed certifier);

    /**
     * @notice Emitted when ownership of the contract is transferred
     * @param previousOwner The old owner's address
     * @param newOwner The new owner's address
     */
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    // ============================================================
    //  MODIFIERS
    // ============================================================

    /**
     * @notice Restricts function access to only the contract owner (certification authority)
     * @dev Throws if called by any account other than the owner
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "AgriCert: Caller is not the owner");
        _;
    }

    /**
     * @notice Ensures the given batch ID exists before proceeding
     * @param _id The batch ID to check
     */
    modifier batchExists(uint _id) {
        require(batchExists_map[_id], "AgriCert: Batch does not exist");
        _;
    }

    // ============================================================
    //  CONSTRUCTOR
    // ============================================================

    /**
     * @notice Sets the contract deployer as the initial owner
     * @dev The deployer is the certification authority
     */
    constructor() {
        owner = msg.sender;
        batchCounter = 0;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    // ============================================================
    //  FUNCTIONS
    // ============================================================

    /**
     * @notice Registers a new agricultural product batch on the blockchain
     * @dev Any user (farmer) can call this function. A new batch ID is auto-assigned.
     * @param _productName Name of the agricultural product (must not be empty)
     * @param _origin Geographic origin of the product (must not be empty)
     * @param _harvestDate Harvest date in string format (must not be empty)
     */
    function registerBatch(
        string memory _productName,
        string memory _origin,
        string memory _harvestDate
    ) external {
        // Validate that none of the required fields are empty
        require(bytes(_productName).length > 0, "AgriCert: Product name cannot be empty");
        require(bytes(_origin).length > 0, "AgriCert: Origin cannot be empty");
        require(bytes(_harvestDate).length > 0, "AgriCert: Harvest date cannot be empty");

        // Increment counter to generate a unique ID
        batchCounter++;
        uint newId = batchCounter;

        // Create and store the new batch in the mapping
        batches[newId] = Batch({
            id: newId,
            productName: _productName,
            origin: _origin,
            harvestDate: _harvestDate,
            certificateHash: "",      // Empty until certified
            certified: false,          // Not certified yet
            farmer: msg.sender,        // The caller is the farmer
            certifier: address(0),     // No certifier yet
            createdAt: block.timestamp // Record the current block timestamp
        });

        // Mark this ID as existing
        batchExists_map[newId] = true;

        // Emit event so the frontend and external services can react
        emit BatchRegistered(newId, _productName, msg.sender);
    }

    /**
     * @notice Certifies an existing batch (only callable by the owner/authority)
     * @dev Sets the certified flag to true and records the certificate hash
     * @param _id The ID of the batch to certify
     * @param _certificateHash A hash (e.g., SHA-256 or IPFS CID) of the certificate document
     */
    function certifyBatch(
        uint _id,
        string memory _certificateHash
    ) external onlyOwner batchExists(_id) {
        // Validate certificate hash is not empty
        require(bytes(_certificateHash).length > 0, "AgriCert: Certificate hash cannot be empty");

        // Ensure the batch is not already certified
        require(!batches[_id].certified, "AgriCert: Batch is already certified");

        // Update the batch fields
        batches[_id].certified = true;
        batches[_id].certificateHash = _certificateHash;
        batches[_id].certifier = msg.sender;

        // Emit event to signal successful certification
        emit BatchCertified(_id, _certificateHash, msg.sender);
    }

    /**
     * @notice Retrieves all information about a specific batch
     * @dev This is a public view function — no gas cost for reading
     * @param _id The ID of the batch to look up
     * @return id Batch ID
     * @return productName Name of the product
     * @return origin Geographic origin
     * @return harvestDate Date of harvest
     * @return certificateHash Hash of the certificate document
     * @return certified Whether the batch is certified
     * @return farmer Address of the registering farmer
     * @return certifier Address of the certifying authority
     * @return createdAt Unix timestamp of registration
     */
    function getBatch(uint _id)
        external
        view
        batchExists(_id)
        returns (
            uint id,
            string memory productName,
            string memory origin,
            string memory harvestDate,
            string memory certificateHash,
            bool certified,
            address farmer,
            address certifier,
            uint createdAt
        )
    {
        Batch storage b = batches[_id];
        return (
            b.id,
            b.productName,
            b.origin,
            b.harvestDate,
            b.certificateHash,
            b.certified,
            b.farmer,
            b.certifier,
            b.createdAt
        );
    }

    /**
     * @notice Returns the total number of batches registered so far
     * @dev Useful for the frontend to display the total count
     * @return The current batch counter
     */
    function getBatchCount() external view returns (uint) {
        return batchCounter;
    }

    /**
     * @notice Transfers ownership of the contract to a new address
     * @dev Only the current owner can call this. Used to change the certification authority.
     * @param newOwner The address of the new owner
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "AgriCert: New owner cannot be zero address");
        require(newOwner != owner, "AgriCert: New owner is already the current owner");

        address previousOwner = owner;
        owner = newOwner;

        emit OwnershipTransferred(previousOwner, newOwner);
    }
}
