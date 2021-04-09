export const baseUnit = 4;
export const previewExt = 'jpg';
export const maxGrabDistance = 1.5;

export const rarityColors = {
  common: [0xDCDCDC, 0x373737],
  uncommon: [0xff8400, 0x875806],
  rare: [0x00CE21, 0x00560E],
  epic: [0x00B3DB, 0x003743],
  legendary: [0xAD00EA, 0x32002D],
};

export const isMainChain = true;
const mainChainName = isMainChain ? 'mainnet' : 'rinkeby';

export const storageHost = 'https://ipfs.exokit.org';
export const previewHost = 'https://preview.exokit.org'
export const worldsHost = 'https://worlds.exokit.org';
export const accountsHost = `https://${mainChainName}sidechain-accounts.webaverse.com`;
export const contractsHost = 'https://contracts.webaverse.com';
export const localstorageHost = 'https://localstorage.webaverse.com';
export const loginEndpoint = 'https://login.exokit.org';
export const tokensHost = `https://${mainChainName}all-tokens.webaverse.com`;
export const landHost = `https://${mainChainName}sidechain-land.webaverse.com`;
export const web3MainnetSidechainEndpoint = 'https://mainnetsidechain.exokit.org';
export const web3RinkebySidechainEndpoint = 'https://rinkebysidechain.exokit.org';
//export const homeScnUrl = `https://webaverse.github.io/street/street.scn`;
export const homeScnUrl = `http://localhost:3000/street/street.scn`;
export const forceAvatarUrl = null;
// export const forceAvatarUrl = './assets2/sacks3.vrm';
// export const forceAvatarUrl = './assets2/Vizenagy.vrm';
// export const forceAvatarUrl = './assets2/kasamoto_kanji.vrm';
// export const forceAvatarUrl = './assets2/shilo.vrm';
// export const forceAvatarUrl = './assets2/eggy.vrm';
