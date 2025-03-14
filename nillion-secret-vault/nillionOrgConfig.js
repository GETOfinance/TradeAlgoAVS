import dotenv from 'dotenv';

dotenv.config();

export const orgConfig = {
    // demo org credentials
    // TODO in a production environment, make sure to put your org's credentials in environment variables
    orgCredentials: {
      secretKey: process.env.NILLION_ORG_SECRET,
      orgDid: process.env.NILLION_ORG_DID,
    },
    // demo node config
    nodes: [
      {
        url: 'https://nildb-zy8u.nillion.network',
        did: 'did:nil:testnet:nillion1fnhettvcrsfu8zkd5zms4d820l0ct226c3zy8u',
      },
      {
        url: 'https://nildb-rl5g.nillion.network',
        did: 'did:nil:testnet:nillion14x47xx85de0rg9dqunsdxg8jh82nvkax3jrl5g',
      },
      {
        url: 'https://nildb-lpjp.nillion.network',
        did: 'did:nil:testnet:nillion167pglv9k7m4gj05rwj520a46tulkff332vlpjp',
      },
    ],
  };