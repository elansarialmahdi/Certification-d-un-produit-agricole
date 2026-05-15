# 🌱 AgriCert DApp
### Certification de Produits Agricoles sur la Blockchain

> **Mini-Projet Universitaire** · Blockchain · Agriculture · Agroalimentaire
> Année Académique 2024–2025

---

## 1. 📌 Titre du Projet

**AgriCert** — Application Décentralisée de Certification de Produits Agricoles

---

## 2. 🌾 Secteur Choisi

**Agriculture / Agroalimentaire**

Ce secteur souffre d'un manque de transparence dans la chaîne d'approvisionnement : les consommateurs ne peuvent pas vérifier l'origine réelle d'un produit, et les certifications papier sont facilement falsifiables. AgriCert répond à ce problème en utilisant la blockchain comme registre public, immuable et vérifiable.

---

## 3. 🎯 Objectif de la DApp

AgriCert permet de :

- **Enregistrer** des lots de produits agricoles sur la blockchain (par l'agriculteur)
- **Certifier** ces lots par une autorité de certification reconnue
- **Vérifier** publiquement l'authenticité et la traçabilité de tout lot, sans intermédiaire

L'objectif final est de **remplacer les certificats papier falsifiables** par des enregistrements blockchain immuables, accessibles à tous et vérifiables instantanément.

---

## 4. ❓ Analyse du Cas d'Usage — Étape 2

### 4.1 Quel problème veut-on résoudre ?

Dans le secteur agricole, la certification des produits repose encore largement sur des documents papier ou des bases de données centralisées, ce qui pose plusieurs problèmes :

- **Falsification facile** des certificats d'origine et de qualité
- **Manque de transparence** entre les producteurs, les distributeurs et les consommateurs
- **Absence de traçabilité** fiable du champ jusqu'à l'assiette
- **Dépendance à des tiers de confiance** (organismes centralisés) coûteux et lents
- **Fraude à l'origine** : produits étrangers vendus comme locaux ou biologiques

AgriCert résout ces problèmes en enregistrant chaque certification directement sur la blockchain Ethereum, rendant les données **publiques, immuables et vérifiables sans tiers**.

---

### 4.2 Qui sont les acteurs ?

| Acteur | Rôle | Droits dans le système |
|---|---|---|
| 🧑‍🌾 **Agriculteur** | Producteur du lot agricole | Enregistre un nouveau lot (nom, origine, date de récolte) |
| 🏛️ **Autorité de Certification** | Organisme certificateur (propriétaire du contrat) | Certifie un lot en attachant un hash de certificat officiel |
| 🌍 **Utilisateur Public** | Consommateur, distributeur, inspecteur | Consulte et vérifie les informations d'un lot par son ID |

> L'autorité de certification est le **compte qui a déployé le smart contract** (le `owner`). Elle est la seule à pouvoir valider une certification.

---

### 4.3 Quelles données seront stockées ON-CHAIN ?

Les données on-chain sont **permanentes, publiques et immuables** une fois écrites sur la blockchain.

| Donnée | Type Solidity | Justification |
|---|---|---|
| `id` | `uint` | Identifiant unique auto-incrémenté du lot |
| `productName` | `string` | Nom du produit agricole (ex. "Tomates") |
| `origin` | `string` | Région/pays d'origine du produit |
| `harvestDate` | `string` | Date de récolte déclarée par l'agriculteur |
| `certified` | `bool` | Statut de certification (vrai/faux) |
| `certificateHash` | `string` | Empreinte cryptographique du document de certification |
| `farmer` | `address` | Adresse Ethereum de l'agriculteur (preuve d'identité) |
| `certifier` | `address` | Adresse Ethereum de l'autorité certificatrice |
| `createdAt` | `uint` | Horodatage blockchain de l'enregistrement |

> Ces données sont stockées dans un `mapping(uint => Batch)` dans le smart contract.

---

### 4.4 Quelles données resteront OFF-CHAIN ?

Les données off-chain sont **trop volumineuses ou sensibles** pour être stockées directement sur la blockchain (coût en gas trop élevé, vie privée, etc.).

| Donnée | Stockage suggéré | Raison |
|---|---|---|
| **Document PDF du certificat** | IPFS / Serveur de l'autorité | Fichier volumineux, non adapté à la blockchain |
| **Photos du produit / du champ** | IPFS / Cloud | Médias binaires, trop lourds pour être on-chain |
| **Données personnelles de l'agriculteur** | Base de données privée | Conformité RGPD / protection de la vie privée |
| **Rapports d'inspection détaillés** | Système interne de l'autorité | Documents internes confidentiels |
| **Informations logistiques** (transport, température) | Base de données IoT | Données en temps réel, volume trop important |
| **Numéros de téléphone / emails** | Base de données privée | Données personnelles sensibles |

> Le lien entre on-chain et off-chain se fait via le **`certificateHash`** : c'est l'empreinte SHA-256 (ou le CID IPFS) du document stocké hors chaîne. Quiconque possède le document peut vérifier qu'il correspond au hash enregistré sur la blockchain.

---

### 4.5 Pourquoi utiliser la Blockchain ?

| Concept Blockchain | Application concrète dans AgriCert |
|---|---|
| **Immuabilité** | Une fois un lot enregistré, ses données ne peuvent plus être modifiées ni supprimées |
| **Transparence** | Tout le monde peut consulter les informations d'un lot sans permission |
| **Traçabilité** | L'adresse de l'agriculteur et l'horodatage prouvent l'origine et le moment de l'enregistrement |
| **Décentralisation** | Aucune entité centrale ne contrôle les données — elles appartiennent à la blockchain |
| **Confiance sans tiers** | Un consommateur peut vérifier une certification sans contacter l'organisme certificateur |
| **Preuve cryptographique** | Le `certificateHash` lie le document physique à l'enregistrement blockchain de façon vérifiable |
| **Contrôle d'accès** | Seul le propriétaire du contrat (autorité) peut certifier — garanti par le code, pas par la confiance |

La blockchain est justifiée ici car **plusieurs parties qui ne se font pas confiance** (agriculteurs, autorités, consommateurs) ont besoin d'un **registre commun et neutre**. Un système centralisé pourrait être manipulé par l'une des parties.

---

### 4.6 Quelles sont les limites de la solution ?

| Limite | Explication |
|---|---|
| **Blockchain locale uniquement** | Le projet utilise Ganache (réseau local). Un déploiement sur un réseau public (Sepolia, Polygon) serait nécessaire pour une vraie utilisation |
| **Identité non vérifiée** | N'importe qui peut s'enregistrer comme "agriculteur" — il n'y a pas de vérification d'identité réelle (KYC) |
| **Une seule autorité** | Un seul compte peut certifier. Si la clé privée du propriétaire est perdue, le système est bloqué |
| **Données off-chain non garanties** | Le hash garantit l'intégrité du document, mais pas sa disponibilité (si le fichier PDF est supprimé du serveur, le hash seul ne suffit pas) |
| **Coût en gas** | Sur un réseau public, chaque enregistrement et chaque certification coûtent des frais de transaction (gas) |
| **Pas de mise à jour possible** | La blockchain est immuable : une erreur dans un enregistrement (faute de frappe, mauvaise date) ne peut pas être corrigée |
| **Scalabilité** | Ethereum mainnet est limité en débit de transactions (~15 tx/s), ce qui peut poser problème à grande échelle |
| **Interface en anglais** | L'interface frontend est en anglais — une localisation serait nécessaire pour les agriculteurs locaux |

---

## 5. ⚙️ Fonctions du Smart Contract

### Contrat : `AgriculturalCertification.sol` (Solidity `^0.8.20`)

#### Struct principale

```solidity
struct Batch {
    uint id;
    string productName;
    string origin;
    string harvestDate;
    string certificateHash;
    bool certified;
    address farmer;
    address certifier;
    uint createdAt;
}
```

#### Fonctions

| Fonction | Accès | Description |
|---|---|---|
| `registerBatch(productName, origin, harvestDate)` | Tout utilisateur connecté | Crée un nouveau lot avec un ID unique et l'horodate |
| `certifyBatch(id, certificateHash)` | Propriétaire uniquement (`onlyOwner`) | Marque un lot comme certifié et enregistre le hash du certificat |
| `getBatch(id)` | Public (lecture gratuite) | Retourne toutes les informations d'un lot par son ID |
| `getBatchCount()` | Public (lecture gratuite) | Retourne le nombre total de lots enregistrés |
| `transferOwnership(newOwner)` | Propriétaire uniquement | Transfère les droits de certification à une nouvelle adresse |

#### Modificateurs

| Modificateur | Rôle |
|---|---|
| `onlyOwner` | Restreint l'accès aux fonctions sensibles au seul propriétaire du contrat |
| `batchExists(id)` | Vérifie qu'un lot avec cet ID existe avant d'exécuter une fonction |

#### Événements émis

| Événement | Paramètres | Déclenchement |
|---|---|---|
| `BatchRegistered` | `id`, `productName`, `farmer` | À chaque nouveau lot enregistré |
| `BatchCertified` | `id`, `certificateHash`, `certifier` | À chaque lot certifié |
| `OwnershipTransferred` | `previousOwner`, `newOwner` | Au déploiement et à chaque transfert de propriété |

---

## 6. 🛠️ Outils Utilisés

| Couche | Outil | Version / Notes |
|---|---|---|
| Smart Contract | **Solidity** | `^0.8.20` |
| IDE & Déploiement | **Remix IDE** | [remix.ethereum.org](https://remix.ethereum.org) |
| Blockchain Locale | **Ganache** | Réseau local `http://127.0.0.1:7545` |
| Portefeuille | **MetaMask** | Extension navigateur Chrome/Firefox |
| Interface Frontend | **HTML5 + CSS3 + JavaScript** | Vanilla JS, aucun framework |
| Bibliothèque Blockchain | **Ethers.js v6** | Chargé via CDN |
| Serveur de Développement | **VS Code Live Server** | Extension VS Code |

---

## 7. 📁 Architecture du Projet

```
AgriCert/
├── contracts/
│   └── AgriculturalCertification.sol   # Smart contract Solidity (logique métier)
├── frontend/
│   ├── index.html                       # Interface utilisateur principale
│   ├── style.css                        # Styles (thème vert agriculture, dark mode)
│   └── app.js                           # Connexion MetaMask + appels contrat (Ethers.js v6)
└── README.md                            # Documentation complète du projet
```

---

## 8. 🚀 Étapes d'Exécution

### Prérequis

- [Ganache](https://trufflesuite.com/ganache/) installé
- [MetaMask](https://metamask.io/) installé dans le navigateur
- [VS Code](https://code.visualstudio.com/) + extension **Live Server**
- Navigateur Chrome ou Firefox

---

### Étape 1 — Lancer Ganache

1. Ouvrez Ganache et cliquez sur **"Quickstart Ethereum"**
2. Notez l'URL RPC : `HTTP://127.0.0.1:7545` et le Network ID : `1337`
3. Laissez Ganache ouvert

---

### Étape 2 — Configurer MetaMask

1. Ouvrez MetaMask → menu réseaux → **"Ajouter un réseau manuellement"**
2. Remplissez :
   - Nom : `Ganache Local`
   - RPC : `http://127.0.0.1:7545`
   - Chain ID : `1337`
   - Symbole : `ETH`
3. Importez deux comptes Ganache (icône 🔑) dans MetaMask :
   - **Compte 1** = Propriétaire / Autorité de certification
   - **Compte 2** = Agriculteur

---

### Étape 3 — Déployer le Contrat avec Remix

1. Allez sur [https://remix.ethereum.org](https://remix.ethereum.org)
2. Créez le fichier `AgriculturalCertification.sol` et collez le code du contrat
3. Onglet **Compilateur** → version `0.8.20` → **Compiler**
4. Onglet **Deploy & Run** → Environment : **"Injected Provider - MetaMask"**
5. Sélectionnez `AgriculturalCertification` → **Deploy** → Confirmez dans MetaMask
6. Copiez l'**adresse du contrat** déployé
7. Copiez l'**ABI** depuis l'onglet Compilateur

---

### Étape 4 — Configurer le Frontend

Ouvrez `frontend/app.js` et remplacez :

```javascript
const CONTRACT_ADDRESS = "0xVotreAdresseIci";   // ← adresse copiée depuis Remix
const CONTRACT_ABI = [ /* ... collez l'ABI ici ... */ ];
```

---

### Étape 5 — Lancer l'Interface

1. Ouvrez le dossier `frontend/` dans VS Code
2. Clic droit sur `index.html` → **"Open with Live Server"**
3. Le navigateur ouvre `http://127.0.0.1:5500/frontend/index.html`
4. Cliquez sur **"Connect Wallet"** → acceptez dans MetaMask

---

### Flux d'utilisation complet

```
[Agriculteur]  →  Remplit le formulaire  →  registerBatch()  →  Tx confirmée ✓
[Autorité]     →  Entre l'ID + hash      →  certifyBatch()   →  Tx confirmée ✓
[Public]       →  Entre l'ID             →  getBatch()       →  Résultat affiché ✓
```

---

## 9. 📸 Captures d'Écran Principales

> Remplacez ces espaces par de vraies captures après avoir exécuté le projet.

| N° | Fichier | Description |
|---|---|---|
| 1 | `screenshots/01_ganache.png` | Ganache lancé avec les comptes de test et les soldes ETH |
| 2 | `screenshots/02_metamask_reseau.png` | MetaMask connecté au réseau Ganache Local |
| 3 | `screenshots/03_remix_compilation.png` | Contrat compilé sans erreur dans Remix |
| 4 | `screenshots/04_remix_deploiement.png` | Confirmation de déploiement dans MetaMask |
| 5 | `screenshots/05_accueil_connecte.png` | Page d'accueil AgriCert avec le portefeuille connecté |
| 6 | `screenshots/06_enregistrement_form.png` | Formulaire d'enregistrement de lot rempli |
| 7 | `screenshots/07_metamask_tx.png` | Pop-up MetaMask de confirmation de transaction |
| 8 | `screenshots/08_lot_certifie.png` | Résultat de vérification affichant le badge ✓ Certifié |
| 9 | `screenshots/09_lot_en_attente.png` | Résultat de vérification affichant le badge ⏳ En attente |
| 10 | `screenshots/10_erreur_acces.png` | Erreur renvoyée lors d'une tentative de certification non autorisée |

---

## 10. ⚠️ Limites du Projet

1. **Blockchain locale uniquement** — Ganache est un réseau de test local. Pour une vraie utilisation, il faudrait déployer sur un réseau public (Sepolia, Polygon).
2. **Identité non vérifiée (pas de KYC)** — N'importe quel portefeuille peut s'enregistrer comme agriculteur. Il n'y a pas de vérification d'identité réelle.
3. **Autorité de certification unique** — Un seul compte (`owner`) peut certifier des lots. La perte de la clé privée bloquerait le système.
4. **Données off-chain non garanties** — Le hash garantit l'intégrité du document, mais si le fichier PDF est supprimé du serveur, le hash seul devient inutile.
5. **Données non modifiables** — En cas d'erreur de saisie (mauvaise date, faute de frappe), il est impossible de corriger un enregistrement — la blockchain est immuable.
6. **Coût en gas** — Sur un réseau public, chaque transaction (enregistrement, certification) engendre des frais payés en ETH.
7. **Pas de liste des lots** — L'interface ne permet pas de lister tous les lots. L'utilisateur doit connaître l'ID du lot à rechercher.
8. **Interface en anglais** — L'interface n'est pas localisée en français ou en arabe pour les agriculteurs locaux.

---

## 11. 🚀 Améliorations Possibles

| Priorité | Amélioration | Description |
|---|---|---|
| 🔴 Haute | **Déploiement sur réseau public** | Déployer sur Sepolia ou Polygon Mumbai pour un environnement réel |
| 🔴 Haute | **Intégration IPFS** | Stocker les PDFs de certificats sur IPFS, enregistrer le CID on-chain pour garantir la disponibilité |
| 🟡 Moyenne | **Système multi-certificateurs** | Permettre à plusieurs autorités agréées de certifier (via `AccessControl` d'OpenZeppelin) |
| 🟡 Moyenne | **Liste et pagination des lots** | Afficher tous les lots enregistrés dans un tableau paginé |
| 🟡 Moyenne | **Génération de QR Code** | Générer un QR code par lot qui pointe vers sa page de vérification publique |
| 🟢 Basse | **Vérification d'identité (KYC)** | Lier les adresses Ethereum à des identités vérifiées (agriculteurs enregistrés) |
| 🟢 Basse | **Application mobile** | Frontend React Native pour une utilisation terrain par les agriculteurs |
| 🟢 Basse | **Mise à jour par étapes** | Permettre d'ajouter des checkpoints (transport, stockage, vente) à chaque lot |
| 🟢 Basse | **Localisation** | Traduire l'interface en français et en arabe |

---

## 👨‍💻 Auteurs

> Mini-Projet Universitaire — Blockchain dans l'Agriculture
> Année Académique 2024–2025

---

## 📜 Licence

Ce projet est à des fins éducatives uniquement.
Licence MIT — libre d'utilisation, de modification et de distribution.
