export default [
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: '_functionSelector',
        type: 'bytes4',
      },
    ],
    name: 'facetAddress',
    outputs: [
      {
        internalType: 'address',
        name: 'facetAddress_',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'facetAddresses',
    outputs: [
      {
        internalType: 'address[]',
        name: 'facetAddresses_',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_facet',
        type: 'address',
      },
    ],
    name: 'facetFunctionSelectors',
    outputs: [
      {
        internalType: 'bytes4[]',
        name: 'facetFunctionSelectors_',
        type: 'bytes4[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'facets',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'facetAddress',
            type: 'address',
          },
          {
            internalType: 'bytes4[]',
            name: 'functionSelectors',
            type: 'bytes4[]',
          },
        ],
        internalType: 'struct IDiamondLoupe.Facet[]',
        name: 'facets_',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: '_functionSelector',
        type: 'bytes4',
      },
    ],
    name: 'facetAddress',
    outputs: [
      {
        internalType: 'address',
        name: 'facetAddress_',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'facetAddresses',
    outputs: [
      {
        internalType: 'address[]',
        name: 'facetAddresses_',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_facet',
        type: 'address',
      },
    ],
    name: 'facetFunctionSelectors',
    outputs: [
      {
        internalType: 'bytes4[]',
        name: '_facetFunctionSelectors',
        type: 'bytes4[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'facets',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'facetAddress',
            type: 'address',
          },
          {
            internalType: 'bytes4[]',
            name: 'functionSelectors',
            type: 'bytes4[]',
          },
        ],
        internalType: 'struct IDiamondLoupe.Facet[]',
        name: 'facets_',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: '_interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'AcceptCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'AcceptCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'AcceptCancelRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'AllocatePartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'EmergencyClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'EmergencyClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteClose',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteOpen',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'FillCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'FillCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBAllocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
    ],
    name: 'LiquidatePartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'LockQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'openedPrice',
        type: 'uint256',
      },
    ],
    name: 'OpenPosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBsWhiteList',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum PositionType',
        name: 'positionType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'marketPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cva',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lf',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyAmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'SendQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'UnlockQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'AcceptCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'AcceptCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'AcceptCancelRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'AllocatePartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'EmergencyClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'EmergencyClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteClose',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteOpen',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'FillCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'FillCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBAllocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
    ],
    name: 'LiquidatePartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'LockQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'openedPrice',
        type: 'uint256',
      },
    ],
    name: 'OpenPosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBsWhiteList',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum PositionType',
        name: 'positionType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'marketPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cva',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lf',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyAmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'SendQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'UnlockQuote',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'acceptCancelCloseRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'acceptCancelRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyA',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyB',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct PairUpnlAndPriceSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'emergencyClosePosition',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyA',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyB',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct PairUpnlAndPriceSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'fillCloseRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'openedPrice',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct SingleUpnlSig',
        name: 'upnlSig',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyA',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyB',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct PairUpnlAndPriceSig',
        name: 'pairUpnlSig',
        type: 'tuple',
      },
    ],
    name: 'lockAndOpenQuote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct SingleUpnlSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'lockQuote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'openedPrice',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyA',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyB',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct PairUpnlAndPriceSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'openPosition',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'unlockQuote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'AcceptCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'AcceptCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'AcceptCancelRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'AllocatePartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'EmergencyClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'EmergencyClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteClose',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteOpen',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'FillCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'FillCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBAllocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
    ],
    name: 'LiquidatePartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'LockQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'openedPrice',
        type: 'uint256',
      },
    ],
    name: 'OpenPosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBsWhiteList',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum PositionType',
        name: 'positionType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'marketPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cva',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lf',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyAmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'SendQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'UnlockQuote',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'acceptCancelCloseRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'acceptCancelRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyA',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyB',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct PairUpnlAndPriceSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'emergencyClosePosition',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyA',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyB',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct PairUpnlAndPriceSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'fillCloseRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'openedPrice',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct SingleUpnlSig',
        name: 'upnlSig',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyA',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyB',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct PairUpnlAndPriceSig',
        name: 'pairUpnlSig',
        type: 'tuple',
      },
    ],
    name: 'lockAndOpenQuote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct SingleUpnlSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'lockQuote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'openedPrice',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyA',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyB',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct PairUpnlAndPriceSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'openPosition',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'unlockQuote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'validAmount',
        type: 'uint256',
      },
    ],
    name: 'RestoreBridgeTransaction',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'SuspendBridgeTransaction',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'bridgeAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'TransferToBridge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'WithdrawReceivedBridgeValue',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'transactionIds',
        type: 'uint256[]',
      },
    ],
    name: 'WithdrawReceivedBridgeValues',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'validAmount',
        type: 'uint256',
      },
    ],
    name: 'RestoreBridgeTransaction',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'SuspendBridgeTransaction',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'bridgeAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'TransferToBridge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'WithdrawReceivedBridgeValue',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'transactionIds',
        type: 'uint256[]',
      },
    ],
    name: 'WithdrawReceivedBridgeValues',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'validAmount',
        type: 'uint256',
      },
    ],
    name: 'restoreBridgeTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'suspendBridgeTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'bridgeAddress',
        type: 'address',
      },
    ],
    name: 'transferToBridge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'withdrawReceivedBridgeValue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'transactionIds',
        type: 'uint256[]',
      },
    ],
    name: 'withdrawReceivedBridgeValues',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'validAmount',
        type: 'uint256',
      },
    ],
    name: 'RestoreBridgeTransaction',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'SuspendBridgeTransaction',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'bridgeAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'TransferToBridge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'WithdrawReceivedBridgeValue',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'transactionIds',
        type: 'uint256[]',
      },
    ],
    name: 'WithdrawReceivedBridgeValues',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'validAmount',
        type: 'uint256',
      },
    ],
    name: 'restoreBridgeTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'suspendBridgeTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'bridgeAddress',
        type: 'address',
      },
    ],
    name: 'transferToBridge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'withdrawReceivedBridgeValue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'transactionIds',
        type: 'uint256[]',
      },
    ],
    name: 'withdrawReceivedBridgeValues',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'allocatedBalanceOfPartyA',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'allocatedBalanceOfPartyB',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
    ],
    name: 'allocatedBalanceOfPartyBs',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'balanceInfoOfPartyA',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'balanceInfoOfPartyB',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'coolDownsOfMA',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'deallocateCooldown',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'forceCloseCooldowns',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
    ],
    name: 'forceCloseGapRatio',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'forceCloseMinSigPeriod',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'forceClosePricePenalty',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getActivePositionsFilteredByPartyB',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBalanceLimitPerUser',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'getBridgeTransaction',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'bridge',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'enum BridgeTransactionStatus',
            name: 'status',
            type: 'uint8',
          },
        ],
        internalType: 'struct BridgeTransaction',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'bridge',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getBridgeTransactions',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'bridge',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'enum BridgeTransactionStatus',
            name: 'status',
            type: 'uint8',
          },
        ],
        internalType: 'struct BridgeTransaction[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCollateral',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDeallocateDebounceTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDefaultFeeCollector',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
    ],
    name: 'getFeeCollector',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getInvalidBridgedAmountsPool',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'getLiquidatedStateOfPartyA',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes',
            name: 'liquidationId',
            type: 'bytes',
          },
          {
            internalType: 'enum LiquidationType',
            name: 'liquidationType',
            type: 'uint8',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'totalUnrealizedLoss',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'deficit',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'involvedPartyBCounts',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'partyAAccumulatedUpnl',
            type: 'int256',
          },
          {
            internalType: 'bool',
            name: 'disputed',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'liquidationTimestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct LiquidationDetail',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMuonConfig',
    outputs: [
      {
        internalType: 'uint256',
        name: 'upnlValidTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'priceValidTime',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMuonIds',
    outputs: [
      {
        internalType: 'uint256',
        name: 'muonAppId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'x',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'parity',
            type: 'uint8',
          },
        ],
        internalType: 'struct PublicKey',
        name: 'muonPublicKey',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'validGateway',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNextBridgeTransactionId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNextQuoteId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getOpenPositionsFilteredByPartyB',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getPartyAOpenPositions',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'getPartyAPendingQuotes',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
    ],
    name: 'getPartyBEmergencyStatus',
    outputs: [
      {
        internalType: 'bool',
        name: 'isEmergency',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getPartyBOpenPositions',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'getPartyBPendingQuotes',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getPositionsFilteredByPartyB',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'getQuote',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'getQuoteCloseId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getQuotes',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getQuotesByParent',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'size',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'offset',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'bitmap',
                type: 'uint256',
              },
            ],
            internalType: 'struct IViewFacet.BitmapElement[]',
            name: 'elements',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct IViewFacet.Bitmap',
        name: 'bitmap',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'gasNeededForReturn',
        type: 'uint256',
      },
    ],
    name: 'getQuotesWithBitmap',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote[]',
        name: 'quotes',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'str',
        type: 'string',
      },
    ],
    name: 'getRoleHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
    ],
    name: 'getSettlementStates',
    outputs: [
      {
        components: [
          {
            internalType: 'int256',
            name: 'actualAmount',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'expectedAmount',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'cva',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'pending',
            type: 'bool',
          },
        ],
        internalType: 'struct SettlementState[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
    ],
    name: 'getSymbol',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'isValid',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'minAcceptableQuoteValue',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minAcceptablePortionLF',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxLeverage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundingRateEpochDuration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundingRateWindowTime',
            type: 'uint256',
          },
        ],
        internalType: 'struct Symbol',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getSymbols',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'isValid',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'minAcceptableQuoteValue',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minAcceptablePortionLF',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxLeverage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundingRateEpochDuration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundingRateWindowTime',
            type: 'uint256',
          },
        ],
        internalType: 'struct Symbol[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
    ],
    name: 'isAffiliate',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'isPartyALiquidated',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'isPartyB',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'isPartyBLiquidated',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'isSuspended',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'liquidationTimeout',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'liquidatorShare',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'nonceOfPartyA',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'nonceOfPartyB',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'partyAPositionsCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'partyAStats',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'partyBLiquidationTimestamp',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'partyBPositionsCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pauseState',
    outputs: [
      {
        internalType: 'bool',
        name: 'globalPaused',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'liquidationPaused',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'accountingPaused',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'partyBActionsPaused',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'partyAActionsPaused',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'internalTransferPaused',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'emergencyMode',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pendingQuotesValidLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'quoteIdsOf',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'quotesLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'symbolIds',
        type: 'uint256[]',
      },
    ],
    name: 'symbolNameById',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
    ],
    name: 'symbolNameByQuoteId',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
    ],
    name: 'symbolsByQuoteId',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'isValid',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'minAcceptableQuoteValue',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minAcceptablePortionLF',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxLeverage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundingRateEpochDuration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundingRateWindowTime',
            type: 'uint256',
          },
        ],
        internalType: 'struct Symbol[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'hash',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'signature',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'nonce',
            type: 'address',
          },
        ],
        internalType: 'struct SchnorrSign',
        name: 'sign',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'gatewaySignature',
        type: 'bytes',
      },
    ],
    name: 'verifyMuonTSSAndGateway',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'withdrawCooldownOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'allocatedBalanceOfPartyA',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'allocatedBalanceOfPartyB',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
    ],
    name: 'allocatedBalanceOfPartyBs',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'balanceInfoOfPartyA',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'balanceInfoOfPartyB',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'coolDownsOfMA',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
    ],
    name: 'forceCloseGapRatio',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'forceCloseMinSigPeriod',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'forceClosePricePenalty',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getActivePositionsFilteredByPartyB',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBalanceLimitPerUser',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'transactionId',
        type: 'uint256',
      },
    ],
    name: 'getBridgeTransaction',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'bridge',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'enum BridgeTransactionStatus',
            name: 'status',
            type: 'uint8',
          },
        ],
        internalType: 'struct BridgeTransaction',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'bridge',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getBridgeTransactions',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'bridge',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'enum BridgeTransactionStatus',
            name: 'status',
            type: 'uint8',
          },
        ],
        internalType: 'struct BridgeTransaction[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCollateral',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDeallocateDebounceTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDefaultFeeCollector',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
    ],
    name: 'getFeeCollector',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getInvalidBridgedAmountsPool',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'getLiquidatedStateOfPartyA',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes',
            name: 'liquidationId',
            type: 'bytes',
          },
          {
            internalType: 'enum LiquidationType',
            name: 'liquidationType',
            type: 'uint8',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'totalUnrealizedLoss',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'deficit',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'involvedPartyBCounts',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'partyAAccumulatedUpnl',
            type: 'int256',
          },
          {
            internalType: 'bool',
            name: 'disputed',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'liquidationTimestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct LiquidationDetail',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMuonConfig',
    outputs: [
      {
        internalType: 'uint256',
        name: 'upnlValidTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'priceValidTime',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMuonIds',
    outputs: [
      {
        internalType: 'uint256',
        name: 'muonAppId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'x',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'parity',
            type: 'uint8',
          },
        ],
        internalType: 'struct PublicKey',
        name: 'muonPublicKey',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'validGateway',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNextBridgeTransactionId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNextQuoteId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getOpenPositionsFilteredByPartyB',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getPartyAOpenPositions',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'getPartyAPendingQuotes',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
    ],
    name: 'getPartyBEmergencyStatus',
    outputs: [
      {
        internalType: 'bool',
        name: 'isEmergency',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getPartyBOpenPositions',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'getPartyBPendingQuotes',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getPositionsFilteredByPartyB',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'getQuote',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getQuotes',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getQuotesByParent',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'size',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'offset',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'bitmap',
                type: 'uint256',
              },
            ],
            internalType: 'struct IViewFacet.BitmapElement[]',
            name: 'elements',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct IViewFacet.Bitmap',
        name: 'bitmap',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'gasNeededForReturn',
        type: 'uint256',
      },
    ],
    name: 'getQuotesWithBitmap',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'partyBsWhiteList',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'enum PositionType',
            name: 'positionType',
            type: 'uint8',
          },
          {
            internalType: 'enum OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'openedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialOpenedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedOpenPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marketPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'closedAmount',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'initialLockedValues',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'cva',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lf',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyAmm',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'partyBmm',
                type: 'uint256',
              },
            ],
            internalType: 'struct LockedValues',
            name: 'lockedValues',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'maxFundingRate',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'partyA',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'partyB',
            type: 'address',
          },
          {
            internalType: 'enum QuoteStatus',
            name: 'quoteStatus',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'avgClosedPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requestedClosePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityToClose',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'parentId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'createTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'statusModifyTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastFundingPaymentTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'affiliate',
            type: 'address',
          },
        ],
        internalType: 'struct Quote[]',
        name: 'quotes',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'str',
        type: 'string',
      },
    ],
    name: 'getRoleHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
    ],
    name: 'getSettlementStates',
    outputs: [
      {
        components: [
          {
            internalType: 'int256',
            name: 'actualAmount',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'expectedAmount',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'cva',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'pending',
            type: 'bool',
          },
        ],
        internalType: 'struct SettlementState[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
    ],
    name: 'getSymbol',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'isValid',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'minAcceptableQuoteValue',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minAcceptablePortionLF',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxLeverage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundingRateEpochDuration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundingRateWindowTime',
            type: 'uint256',
          },
        ],
        internalType: 'struct Symbol',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'getSymbols',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'isValid',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'minAcceptableQuoteValue',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minAcceptablePortionLF',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxLeverage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundingRateEpochDuration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundingRateWindowTime',
            type: 'uint256',
          },
        ],
        internalType: 'struct Symbol[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
    ],
    name: 'isAffiliate',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'isPartyALiquidated',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'isPartyB',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'isPartyBLiquidated',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'isSuspended',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'liquidationTimeout',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'liquidatorShare',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'nonceOfPartyA',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'nonceOfPartyB',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'partyAPositionsCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'partyAStats',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'partyBLiquidationTimestamp',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'partyBPositionsCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pauseState',
    outputs: [
      {
        internalType: 'bool',
        name: 'globalPaused',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'liquidationPaused',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'accountingPaused',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'partyBActionsPaused',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'partyAActionsPaused',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'internalTransferPaused',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'emergencyMode',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pendingQuotesValidLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'size',
        type: 'uint256',
      },
    ],
    name: 'quoteIdsOf',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'quotesLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'symbolIds',
        type: 'uint256[]',
      },
    ],
    name: 'symbolNameById',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
    ],
    name: 'symbolNameByQuoteId',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
    ],
    name: 'symbolsByQuoteId',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'isValid',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'minAcceptableQuoteValue',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minAcceptablePortionLF',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxLeverage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundingRateEpochDuration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundingRateWindowTime',
            type: 'uint256',
          },
        ],
        internalType: 'struct Symbol[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'hash',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'signature',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'nonce',
            type: 'address',
          },
        ],
        internalType: 'struct SchnorrSign',
        name: 'sign',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'gatewaySignature',
        type: 'bytes',
      },
    ],
    name: 'verifyMuonTSSAndGateway',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'withdrawCooldownOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteClose',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteOpen',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'ForceCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'ForceCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'ForceCancelQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'ForceClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'ForceClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBAllocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
    ],
    name: 'LiquidatePartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'RequestToCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'RequestToCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'RequestToCancelQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closePrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantityToClose',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'RequestToClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closePrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantityToClose',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'RequestToClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBsWhiteList',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum PositionType',
        name: 'positionType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'marketPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cva',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lf',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyAmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'SendQuote',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'expiredQuoteIds',
        type: 'uint256[]',
      },
    ],
    name: 'expireQuote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'forceCancelCloseRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'forceCancelQuote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'highest',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lowest',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'averagePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyB',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyA',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'currentPrice',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct HighLowPriceSig',
        name: 'sig',
        type: 'tuple',
      },
    ],
    name: 'forceClosePosition',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'requestToCancelCloseRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'requestToCancelQuote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'closePrice',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quantityToClose',
        type: 'uint256',
      },
      {
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'requestToClosePosition',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'partyBsWhiteList',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        internalType: 'enum PositionType',
        name: 'positionType',
        type: 'uint8',
      },
      {
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'cva',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lf',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'partyAmm',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'partyBmm',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxFundingRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct SingleUpnlAndPriceSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'sendQuote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'partyBsWhiteList',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        internalType: 'enum PositionType',
        name: 'positionType',
        type: 'uint8',
      },
      {
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'cva',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lf',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'partyAmm',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'partyBmm',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxFundingRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct SingleUpnlAndPriceSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'sendQuoteWithAffiliate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteClose',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteOpen',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'ForceCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'ForceCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'ForceCancelQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'ForceClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'ForceClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBAllocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
    ],
    name: 'LiquidatePartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'RequestToCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'RequestToCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'RequestToCancelQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closePrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantityToClose',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'RequestToClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closePrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantityToClose',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'RequestToClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBsWhiteList',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum PositionType',
        name: 'positionType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'marketPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cva',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lf',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyAmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'SendQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteClose',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteOpen',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'ForceCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'ForceCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'ForceCancelQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'ForceClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'filledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closedPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'ForceClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBAllocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
    ],
    name: 'LiquidatePartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'RequestToCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'RequestToCancelCloseRequest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'RequestToCancelQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closePrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantityToClose',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'RequestToClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closePrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantityToClose',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
    ],
    name: 'RequestToClosePosition',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBsWhiteList',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum PositionType',
        name: 'positionType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'marketPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cva',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lf',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyAmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'SendQuote',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'expiredQuoteIds',
        type: 'uint256[]',
      },
    ],
    name: 'expireQuote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'forceCancelCloseRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'forceCancelQuote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'highest',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lowest',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'averagePrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyB',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyA',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'currentPrice',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct HighLowPriceSig',
        name: 'sig',
        type: 'tuple',
      },
    ],
    name: 'forceClosePosition',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'requestToCancelCloseRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'requestToCancelQuote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'closePrice',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quantityToClose',
        type: 'uint256',
      },
      {
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'requestToClosePosition',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'partyBsWhiteList',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        internalType: 'enum PositionType',
        name: 'positionType',
        type: 'uint8',
      },
      {
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'cva',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lf',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'partyAmm',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'partyBmm',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxFundingRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct SingleUpnlAndPriceSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'sendQuote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'partyBsWhiteList',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        internalType: 'enum PositionType',
        name: 'positionType',
        type: 'uint8',
      },
      {
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'cva',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lf',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'partyAmm',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'partyBmm',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxFundingRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct SingleUpnlAndPriceSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'sendQuoteWithAffiliate',
    outputs: [
      {
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'AllocateForPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'AllocateForPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'AllocatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'AllocatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'DeallocateForPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'DeallocateForPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'DeallocatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'DeallocatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'userNewAllocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'InternalTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'origin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'originNewAllocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'recipientNewAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'TransferAllocation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'origin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'TransferAllocation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'allocate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'allocateForPartyB',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct SingleUpnlSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'deallocate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct SingleUpnlSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'deallocateForPartyB',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'depositAndAllocate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'depositFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'internalTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'origin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct SingleUpnlSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'transferAllocation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'withdrawTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'AllocateForPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'AllocateForPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'AllocatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'AllocatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'DeallocateForPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'DeallocateForPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'DeallocatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'DeallocatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'userNewAllocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'InternalTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'origin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'originNewAllocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'recipientNewAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'TransferAllocation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'origin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'TransferAllocation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'AllocateForPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'AllocateForPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'AllocatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'AllocatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'DeallocateForPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'DeallocateForPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'DeallocatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'DeallocatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'userNewAllocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'InternalTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'origin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'originNewAllocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'recipientNewAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'TransferAllocation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'origin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'TransferAllocation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'allocate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'allocateForPartyB',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct SingleUpnlSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'deallocate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct SingleUpnlSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'deallocateForPartyB',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'depositAndAllocate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'depositFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'internalTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'origin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct SingleUpnlSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'transferAllocation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'withdrawTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'rates',
        type: 'int256[]',
      },
    ],
    name: 'ChargeFundingRate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'rates',
        type: 'int256[]',
      },
    ],
    name: 'ChargeFundingRate',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
      {
        internalType: 'int256[]',
        name: 'rates',
        type: 'int256[]',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyA',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyB',
            type: 'int256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct PairUpnlSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'chargeFundingRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'rates',
        type: 'int256[]',
      },
    ],
    name: 'ChargeFundingRate',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
      {
        internalType: 'int256[]',
        name: 'rates',
        type: 'int256[]',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyA',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'upnlPartyB',
            type: 'int256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct PairUpnlSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'chargeFundingRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'facetAddress',
            type: 'address',
          },
          {
            internalType: 'enum IDiamondCut.FacetCutAction',
            name: 'action',
            type: 'uint8',
          },
          {
            internalType: 'bytes4[]',
            name: 'functionSelectors',
            type: 'bytes4[]',
          },
        ],
        indexed: false,
        internalType: 'struct IDiamondCut.FacetCut[]',
        name: '_diamondCut',
        type: 'tuple[]',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_init',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_calldata',
        type: 'bytes',
      },
    ],
    name: 'DiamondCut',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'facetAddress',
            type: 'address',
          },
          {
            internalType: 'enum IDiamondCut.FacetCutAction',
            name: 'action',
            type: 'uint8',
          },
          {
            internalType: 'bytes4[]',
            name: 'functionSelectors',
            type: 'bytes4[]',
          },
        ],
        internalType: 'struct IDiamondCut.FacetCut[]',
        name: '_diamondCut',
        type: 'tuple[]',
      },
      {
        internalType: 'address',
        name: '_init',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '_calldata',
        type: 'bytes',
      },
    ],
    name: 'diamondCut',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'facetAddress',
            type: 'address',
          },
          {
            internalType: 'enum IDiamondCut.FacetCutAction',
            name: 'action',
            type: 'uint8',
          },
          {
            internalType: 'bytes4[]',
            name: 'functionSelectors',
            type: 'bytes4[]',
          },
        ],
        indexed: false,
        internalType: 'struct IDiamondCut.FacetCut[]',
        name: '_diamondCut',
        type: 'tuple[]',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_init',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '_calldata',
        type: 'bytes',
      },
    ],
    name: 'DiamondCut',
    type: 'event',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'facetAddress',
            type: 'address',
          },
          {
            internalType: 'enum IDiamondCut.FacetCutAction',
            name: 'action',
            type: 'uint8',
          },
          {
            internalType: 'bytes4[]',
            name: 'functionSelectors',
            type: 'bytes4[]',
          },
        ],
        internalType: 'struct IDiamondCut.FacetCut[]',
        name: '_diamondCut',
        type: 'tuple[]',
      },
      {
        internalType: 'address',
        name: '_init',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '_calldata',
        type: 'bytes',
      },
    ],
    name: 'diamondCut',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'allocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'totalUnrealizedLoss',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'liquidationBlockNumber',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'liquidationTimestamp',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'liquidationAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'DeferredLiquidatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'DisputeForLiquidation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteClose',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteOpen',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'FullyLiquidatedPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'FullyLiquidatedPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'FullyLiquidatedPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'allocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'totalUnrealizedLoss',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'LiquidatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'allocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'totalUnrealizedLoss',
        type: 'int256',
      },
    ],
    name: 'LiquidatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBAllocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
    ],
    name: 'LiquidatePartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'liquidatedAmounts',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'LiquidatePendingPositionsPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'LiquidatePendingPositionsPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'liquidatedAmounts',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'closeIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'LiquidatePositionsPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
    ],
    name: 'LiquidatePositionsPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'liquidatedAmounts',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'closeIds',
        type: 'uint256[]',
      },
    ],
    name: 'LiquidatePositionsPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
    ],
    name: 'LiquidatePositionsPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'LiquidationDisputed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'LiquidationDisputed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'amounts',
        type: 'int256[]',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'disputed',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'ResolveLiquidationDispute',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'amounts',
        type: 'int256[]',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'disputed',
        type: 'bool',
      },
    ],
    name: 'ResolveLiquidationDispute',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBsWhiteList',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum PositionType',
        name: 'positionType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'marketPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cva',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lf',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyAmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'SendQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'symbolIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'prices',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'SetSymbolsPrices',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'symbolIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'prices',
        type: 'uint256[]',
      },
    ],
    name: 'SetSymbolsPrices',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'amounts',
        type: 'int256[]',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'SettlePartyALiquidation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'amounts',
        type: 'int256[]',
      },
    ],
    name: 'SettlePartyALiquidation',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationBlockNumber',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationAllocatedBalance',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'liquidationId',
            type: 'bytes',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'totalUnrealizedLoss',
            type: 'int256',
          },
          {
            internalType: 'uint256[]',
            name: 'symbolIds',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'prices',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct DeferredLiquidationSig',
        name: 'liquidationSig',
        type: 'tuple',
      },
    ],
    name: 'deferredLiquidatePartyA',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationBlockNumber',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationAllocatedBalance',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'liquidationId',
            type: 'bytes',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'totalUnrealizedLoss',
            type: 'int256',
          },
          {
            internalType: 'uint256[]',
            name: 'symbolIds',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'prices',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct DeferredLiquidationSig',
        name: 'liquidationSig',
        type: 'tuple',
      },
    ],
    name: 'deferredSetSymbolsPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'liquidationId',
            type: 'bytes',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'totalUnrealizedLoss',
            type: 'int256',
          },
          {
            internalType: 'uint256[]',
            name: 'symbolIds',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'prices',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct LiquidationSig',
        name: 'liquidationSig',
        type: 'tuple',
      },
    ],
    name: 'liquidatePartyA',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct SingleUpnlSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'liquidatePartyB',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'liquidatePendingPositionsPartyA',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
    ],
    name: 'liquidatePositionsPartyA',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256[]',
            name: 'quoteIds',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'prices',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct QuotePriceSig',
        name: 'priceSig',
        type: 'tuple',
      },
    ],
    name: 'liquidatePositionsPartyB',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
      {
        internalType: 'int256[]',
        name: 'amounts',
        type: 'int256[]',
      },
      {
        internalType: 'bool',
        name: 'disputed',
        type: 'bool',
      },
    ],
    name: 'resolveLiquidationDispute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'liquidationId',
            type: 'bytes',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'totalUnrealizedLoss',
            type: 'int256',
          },
          {
            internalType: 'uint256[]',
            name: 'symbolIds',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'prices',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct LiquidationSig',
        name: 'liquidationSig',
        type: 'tuple',
      },
    ],
    name: 'setSymbolsPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
    ],
    name: 'settlePartyALiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'allocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'totalUnrealizedLoss',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'liquidationBlockNumber',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'liquidationTimestamp',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'liquidationAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'DeferredLiquidatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'DisputeForLiquidation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteClose',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteOpen',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'FullyLiquidatedPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'FullyLiquidatedPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'FullyLiquidatedPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'allocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'totalUnrealizedLoss',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'LiquidatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'allocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'totalUnrealizedLoss',
        type: 'int256',
      },
    ],
    name: 'LiquidatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBAllocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
    ],
    name: 'LiquidatePartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'liquidatedAmounts',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'LiquidatePendingPositionsPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'LiquidatePendingPositionsPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'liquidatedAmounts',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'closeIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'LiquidatePositionsPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
    ],
    name: 'LiquidatePositionsPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'liquidatedAmounts',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'closeIds',
        type: 'uint256[]',
      },
    ],
    name: 'LiquidatePositionsPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
    ],
    name: 'LiquidatePositionsPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'LiquidationDisputed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'LiquidationDisputed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'amounts',
        type: 'int256[]',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'disputed',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'ResolveLiquidationDispute',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'amounts',
        type: 'int256[]',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'disputed',
        type: 'bool',
      },
    ],
    name: 'ResolveLiquidationDispute',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBsWhiteList',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum PositionType',
        name: 'positionType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'marketPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cva',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lf',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyAmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'SendQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'symbolIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'prices',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'SetSymbolsPrices',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'symbolIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'prices',
        type: 'uint256[]',
      },
    ],
    name: 'SetSymbolsPrices',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'amounts',
        type: 'int256[]',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'SettlePartyALiquidation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'amounts',
        type: 'int256[]',
      },
    ],
    name: 'SettlePartyALiquidation',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationBlockNumber',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationAllocatedBalance',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'liquidationId',
            type: 'bytes',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'totalUnrealizedLoss',
            type: 'int256',
          },
          {
            internalType: 'uint256[]',
            name: 'symbolIds',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'prices',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct DeferredLiquidationSig',
        name: 'liquidationSig',
        type: 'tuple',
      },
    ],
    name: 'deferredLiquidatePartyA',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationBlockNumber',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationAllocatedBalance',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'liquidationId',
            type: 'bytes',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'totalUnrealizedLoss',
            type: 'int256',
          },
          {
            internalType: 'uint256[]',
            name: 'symbolIds',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'prices',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct DeferredLiquidationSig',
        name: 'liquidationSig',
        type: 'tuple',
      },
    ],
    name: 'deferredSetSymbolsPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'liquidationId',
            type: 'bytes',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'totalUnrealizedLoss',
            type: 'int256',
          },
          {
            internalType: 'uint256[]',
            name: 'symbolIds',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'prices',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct LiquidationSig',
        name: 'liquidationSig',
        type: 'tuple',
      },
    ],
    name: 'liquidatePartyA',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct SingleUpnlSig',
        name: 'upnlSig',
        type: 'tuple',
      },
    ],
    name: 'liquidatePartyB',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'liquidatePendingPositionsPartyA',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
    ],
    name: 'liquidatePositionsPartyA',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256[]',
            name: 'quoteIds',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'prices',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct QuotePriceSig',
        name: 'priceSig',
        type: 'tuple',
      },
    ],
    name: 'liquidatePositionsPartyB',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
      {
        internalType: 'int256[]',
        name: 'amounts',
        type: 'int256[]',
      },
      {
        internalType: 'bool',
        name: 'disputed',
        type: 'bool',
      },
    ],
    name: 'resolveLiquidationDispute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'bytes',
            name: 'reqId',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'liquidationId',
            type: 'bytes',
          },
          {
            internalType: 'int256',
            name: 'upnl',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'totalUnrealizedLoss',
            type: 'int256',
          },
          {
            internalType: 'uint256[]',
            name: 'symbolIds',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'prices',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes',
            name: 'gatewaySignature',
            type: 'bytes',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'signature',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'nonce',
                type: 'address',
              },
            ],
            internalType: 'struct SchnorrSign',
            name: 'sigs',
            type: 'tuple',
          },
        ],
        internalType: 'struct LiquidationSig',
        name: 'liquidationSig',
        type: 'tuple',
      },
    ],
    name: 'setSymbolsPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
    ],
    name: 'settlePartyALiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'allocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'totalUnrealizedLoss',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'liquidationBlockNumber',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'liquidationTimestamp',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'liquidationAllocatedBalance',
        type: 'uint256',
      },
    ],
    name: 'DeferredLiquidatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'DisputeForLiquidation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'closeId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteClose',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'enum QuoteStatus',
        name: 'quoteStatus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
    ],
    name: 'ExpireQuoteOpen',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'FullyLiquidatedPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'FullyLiquidatedPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'FullyLiquidatedPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'allocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'totalUnrealizedLoss',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'LiquidatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'allocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'totalUnrealizedLoss',
        type: 'int256',
      },
    ],
    name: 'LiquidatePartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBAllocatedBalance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'upnl',
        type: 'int256',
      },
    ],
    name: 'LiquidatePartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'liquidatedAmounts',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'LiquidatePendingPositionsPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'LiquidatePendingPositionsPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'liquidatedAmounts',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'closeIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'LiquidatePositionsPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
    ],
    name: 'LiquidatePositionsPartyA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'liquidatedAmounts',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'closeIds',
        type: 'uint256[]',
      },
    ],
    name: 'LiquidatePositionsPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'quoteIds',
        type: 'uint256[]',
      },
    ],
    name: 'LiquidatePositionsPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'LiquidationDisputed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
    ],
    name: 'LiquidationDisputed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'amounts',
        type: 'int256[]',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'disputed',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'ResolveLiquidationDispute',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'amounts',
        type: 'int256[]',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'disputed',
        type: 'bool',
      },
    ],
    name: 'ResolveLiquidationDispute',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBsWhiteList',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum PositionType',
        name: 'positionType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'enum OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'marketPrice',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cva',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lf',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyAmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'partyBmm',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'SendQuote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'symbolIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'prices',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'SetSymbolsPrices',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'liquidator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'symbolIds',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'prices',
        type: 'uint256[]',
      },
    ],
    name: 'SetSymbolsPrices',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'amounts',
        type: 'int256[]',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'liquidationId',
        type: 'bytes',
      },
    ],
    name: 'SettlePartyALiquidation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyA',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'amounts',
        type: 'int256[]',
      },
    ],
    name: 'SettlePartyALiquidation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'ActiveEmergencyMode',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'bridge',
        type: 'address',
      },
    ],
    name: 'AddBridge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minAcceptableQuoteValue',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minAcceptablePortionLF',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxLeverage',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fundingRateEpochDuration',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fundingRateWindowTime',
        type: 'uint256',
      },
    ],
    name: 'AddSymbol',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'DeactiveEmergencyMode',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'affilate',
        type: 'address',
      },
    ],
    name: 'DeregisterAffiliate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'DeregisterPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PauseAccounting',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PauseGlobal',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PauseInternalTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PauseLiquidation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PausePartyAActions',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PausePartyBActions',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'affilate',
        type: 'address',
      },
    ],
    name: 'RegisterAffiliate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
    ],
    name: 'RegisterPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'bridge',
        type: 'address',
      },
    ],
    name: 'RemoveBridge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'balanceLimitPerUser',
        type: 'uint256',
      },
    ],
    name: 'SetBalanceLimitPerUser',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'collateral',
        type: 'address',
      },
    ],
    name: 'SetCollateral',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldDeallocateCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newDeallocateCooldown',
        type: 'uint256',
      },
    ],
    name: 'SetDeallocateCooldown',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldDeallocateDebounceTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newDeallocateDebounceTime',
        type: 'uint256',
      },
    ],
    name: 'SetDeallocateDebounceTime',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldDefaultFeeCollector',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newDefaultFeeCollector',
        type: 'address',
      },
    ],
    name: 'SetDefaultFeeCollector',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'oldFeeCollector',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newFeeCollector',
        type: 'address',
      },
    ],
    name: 'SetFeeCollector',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldForceCancelCloseCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newForceCancelCloseCooldown',
        type: 'uint256',
      },
    ],
    name: 'SetForceCancelCloseCooldown',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldForceCancelCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newForceCancelCooldown',
        type: 'uint256',
      },
    ],
    name: 'SetForceCancelCooldown',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldForceCloseFirstCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newForceCloseFirstCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldForceCloseSecondCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newForceCloseSecondCooldown',
        type: 'uint256',
      },
    ],
    name: 'SetForceCloseCooldowns',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldForceCloseGapRatio',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newForceCloseGapRatio',
        type: 'uint256',
      },
    ],
    name: 'SetForceCloseGapRatio',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldCloseMinSigPeriod',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newCloseMinSigPeriod',
        type: 'uint256',
      },
    ],
    name: 'SetForceCloseMinSigPeriod',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldPricePenalty',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newPricePenalty',
        type: 'uint256',
      },
    ],
    name: 'SetForceClosePricePenalty',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldInvalidBridgedAmountsPool',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newInvalidBridgedAmountsPool',
        type: 'address',
      },
    ],
    name: 'SetInvalidBridgedAmountsPool',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldLiquidationTimeout',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newLiquidationTimeout',
        type: 'uint256',
      },
    ],
    name: 'SetLiquidationTimeout',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldLiquidatorShare',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newLiquidatorShare',
        type: 'uint256',
      },
    ],
    name: 'SetLiquidatorShare',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'upnlValidTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'priceValidTime',
        type: 'uint256',
      },
    ],
    name: 'SetMuonConfig',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'muonAppId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'gateway',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'x',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'parity',
        type: 'uint8',
      },
    ],
    name: 'SetMuonIds',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    name: 'SetPartyBEmergencyStatus',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldPendingQuotesValidLength',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newPendingQuotesValidLength',
        type: 'uint256',
      },
    ],
    name: 'SetPendingQuotesValidLength',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isSuspended',
        type: 'bool',
      },
    ],
    name: 'SetSuspendedAddress',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldMinAcceptableQuoteValue',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldMinAcceptablePortionLF',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minAcceptableQuoteValue',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minAcceptablePortionLF',
        type: 'uint256',
      },
    ],
    name: 'SetSymbolAcceptableValues',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fundingRateEpochDuration',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fundingRateWindowTime',
        type: 'uint256',
      },
    ],
    name: 'SetSymbolFundingState',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldMaxLeverage',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxLeverage',
        type: 'uint256',
      },
    ],
    name: 'SetSymbolMaxLeverage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldMaxSlippage',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxSlippage',
        type: 'uint256',
      },
    ],
    name: 'SetSymbolMaxSlippage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldTradingFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
    ],
    name: 'SetSymbolTradingFee',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'oldState',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isValid',
        type: 'bool',
      },
    ],
    name: 'SetSymbolValidationState',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpauseAccounting',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpauseGlobal',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpauseInternalTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpauseLiquidation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpausePartyAActions',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpausePartyBActions',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'ActiveEmergencyMode',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'bridge',
        type: 'address',
      },
    ],
    name: 'AddBridge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minAcceptableQuoteValue',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minAcceptablePortionLF',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxLeverage',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fundingRateEpochDuration',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fundingRateWindowTime',
        type: 'uint256',
      },
    ],
    name: 'AddSymbol',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'DeactiveEmergencyMode',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'affilate',
        type: 'address',
      },
    ],
    name: 'DeregisterAffiliate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'DeregisterPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PauseAccounting',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PauseGlobal',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PauseInternalTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PauseLiquidation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PausePartyAActions',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PausePartyBActions',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'affilate',
        type: 'address',
      },
    ],
    name: 'RegisterAffiliate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
    ],
    name: 'RegisterPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'bridge',
        type: 'address',
      },
    ],
    name: 'RemoveBridge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'balanceLimitPerUser',
        type: 'uint256',
      },
    ],
    name: 'SetBalanceLimitPerUser',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'collateral',
        type: 'address',
      },
    ],
    name: 'SetCollateral',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldDeallocateCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newDeallocateCooldown',
        type: 'uint256',
      },
    ],
    name: 'SetDeallocateCooldown',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldDeallocateDebounceTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newDeallocateDebounceTime',
        type: 'uint256',
      },
    ],
    name: 'SetDeallocateDebounceTime',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldDefaultFeeCollector',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newDefaultFeeCollector',
        type: 'address',
      },
    ],
    name: 'SetDefaultFeeCollector',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'oldFeeCollector',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newFeeCollector',
        type: 'address',
      },
    ],
    name: 'SetFeeCollector',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldForceCancelCloseCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newForceCancelCloseCooldown',
        type: 'uint256',
      },
    ],
    name: 'SetForceCancelCloseCooldown',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldForceCancelCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newForceCancelCooldown',
        type: 'uint256',
      },
    ],
    name: 'SetForceCancelCooldown',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldForceCloseFirstCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newForceCloseFirstCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldForceCloseSecondCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newForceCloseSecondCooldown',
        type: 'uint256',
      },
    ],
    name: 'SetForceCloseCooldowns',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldForceCloseGapRatio',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newForceCloseGapRatio',
        type: 'uint256',
      },
    ],
    name: 'SetForceCloseGapRatio',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldCloseMinSigPeriod',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newCloseMinSigPeriod',
        type: 'uint256',
      },
    ],
    name: 'SetForceCloseMinSigPeriod',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldPricePenalty',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newPricePenalty',
        type: 'uint256',
      },
    ],
    name: 'SetForceClosePricePenalty',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldInvalidBridgedAmountsPool',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newInvalidBridgedAmountsPool',
        type: 'address',
      },
    ],
    name: 'SetInvalidBridgedAmountsPool',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldLiquidationTimeout',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newLiquidationTimeout',
        type: 'uint256',
      },
    ],
    name: 'SetLiquidationTimeout',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldLiquidatorShare',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newLiquidatorShare',
        type: 'uint256',
      },
    ],
    name: 'SetLiquidatorShare',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'upnlValidTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'priceValidTime',
        type: 'uint256',
      },
    ],
    name: 'SetMuonConfig',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'muonAppId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'gateway',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'x',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'parity',
        type: 'uint8',
      },
    ],
    name: 'SetMuonIds',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    name: 'SetPartyBEmergencyStatus',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldPendingQuotesValidLength',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newPendingQuotesValidLength',
        type: 'uint256',
      },
    ],
    name: 'SetPendingQuotesValidLength',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isSuspended',
        type: 'bool',
      },
    ],
    name: 'SetSuspendedAddress',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldMinAcceptableQuoteValue',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldMinAcceptablePortionLF',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minAcceptableQuoteValue',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minAcceptablePortionLF',
        type: 'uint256',
      },
    ],
    name: 'SetSymbolAcceptableValues',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fundingRateEpochDuration',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fundingRateWindowTime',
        type: 'uint256',
      },
    ],
    name: 'SetSymbolFundingState',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldMaxLeverage',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxLeverage',
        type: 'uint256',
      },
    ],
    name: 'SetSymbolMaxLeverage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldMaxSlippage',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxSlippage',
        type: 'uint256',
      },
    ],
    name: 'SetSymbolMaxSlippage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldTradingFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
    ],
    name: 'SetSymbolTradingFee',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'oldState',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isValid',
        type: 'bool',
      },
    ],
    name: 'SetSymbolValidationState',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpauseAccounting',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpauseGlobal',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpauseInternalTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpauseLiquidation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpausePartyAActions',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpausePartyBActions',
    type: 'event',
  },
  {
    inputs: [],
    name: 'activeEmergencyMode',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'bridge',
        type: 'address',
      },
    ],
    name: 'addBridge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'minAcceptableQuoteValue',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minAcceptablePortionLF',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxLeverage',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'fundingRateEpochDuration',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'fundingRateWindowTime',
        type: 'uint256',
      },
    ],
    name: 'addSymbol',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'isValid',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'minAcceptableQuoteValue',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minAcceptablePortionLF',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxLeverage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundingRateEpochDuration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundingRateWindowTime',
            type: 'uint256',
          },
        ],
        internalType: 'struct Symbol[]',
        name: 'symbols',
        type: 'tuple[]',
      },
    ],
    name: 'addSymbols',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'deactiveEmergencyMode',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
    ],
    name: 'deregisterAffiliate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'deregisterPartyB',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pauseAccounting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pauseGlobal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pauseInternalTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pauseLiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pausePartyAActions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pausePartyBActions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
    ],
    name: 'registerAffiliate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
    ],
    name: 'registerPartyB',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'bridge',
        type: 'address',
      },
    ],
    name: 'removeBridge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'setAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'balanceLimitPerUser',
        type: 'uint256',
      },
    ],
    name: 'setBalanceLimitPerUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'collateral',
        type: 'address',
      },
    ],
    name: 'setCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'deallocateCooldown',
        type: 'uint256',
      },
    ],
    name: 'setDeallocateCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'deallocateDebounceTime',
        type: 'uint256',
      },
    ],
    name: 'setDeallocateDebounceTime',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'feeCollector',
        type: 'address',
      },
    ],
    name: 'setDefaultFeeCollector',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'feeCollector',
        type: 'address',
      },
    ],
    name: 'setFeeCollector',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'forceCancelCloseCooldown',
        type: 'uint256',
      },
    ],
    name: 'setForceCancelCloseCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'forceCancelCooldown',
        type: 'uint256',
      },
    ],
    name: 'setForceCancelCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'forceCloseFirstCooldown',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'forceCloseSecondCooldown',
        type: 'uint256',
      },
    ],
    name: 'setForceCloseCooldowns',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'forceCloseGapRatio',
        type: 'uint256',
      },
    ],
    name: 'setForceCloseGapRatio',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'forceCloseMinSigPeriod',
        type: 'uint256',
      },
    ],
    name: 'setForceCloseMinSigPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'forceClosePricePenalty',
        type: 'uint256',
      },
    ],
    name: 'setForceClosePricePenalty',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pool',
        type: 'address',
      },
    ],
    name: 'setInvalidBridgedAmountsPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'liquidationTimeout',
        type: 'uint256',
      },
    ],
    name: 'setLiquidationTimeout',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'liquidatorShare',
        type: 'uint256',
      },
    ],
    name: 'setLiquidatorShare',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'upnlValidTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'priceValidTime',
        type: 'uint256',
      },
    ],
    name: 'setMuonConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'muonAppId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'validGateway',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'x',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'parity',
            type: 'uint8',
          },
        ],
        internalType: 'struct PublicKey',
        name: 'publicKey',
        type: 'tuple',
      },
    ],
    name: 'setMuonIds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
      {
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    name: 'setPartyBEmergencyStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'pendingQuotesValidLength',
        type: 'uint256',
      },
    ],
    name: 'setPendingQuotesValidLength',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minAcceptableQuoteValue',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minAcceptablePortionLF',
        type: 'uint256',
      },
    ],
    name: 'setSymbolAcceptableValues',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'fundingRateEpochDuration',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'fundingRateWindowTime',
        type: 'uint256',
      },
    ],
    name: 'setSymbolFundingState',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxLeverage',
        type: 'uint256',
      },
    ],
    name: 'setSymbolMaxLeverage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
    ],
    name: 'setSymbolTradingFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isValid',
        type: 'bool',
      },
    ],
    name: 'setSymbolValidationState',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'suspendedAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpauseAccounting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpauseGlobal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpauseInternalTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpauseLiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpausePartyAActions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpausePartyBActions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'unsuspendedAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'ActiveEmergencyMode',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'bridge',
        type: 'address',
      },
    ],
    name: 'AddBridge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minAcceptableQuoteValue',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minAcceptablePortionLF',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxLeverage',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fundingRateEpochDuration',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fundingRateWindowTime',
        type: 'uint256',
      },
    ],
    name: 'AddSymbol',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'DeactiveEmergencyMode',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'affilate',
        type: 'address',
      },
    ],
    name: 'DeregisterAffiliate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'DeregisterPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PauseAccounting',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PauseGlobal',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PauseInternalTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PauseLiquidation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PausePartyAActions',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'PausePartyBActions',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'affilate',
        type: 'address',
      },
    ],
    name: 'RegisterAffiliate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
    ],
    name: 'RegisterPartyB',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'bridge',
        type: 'address',
      },
    ],
    name: 'RemoveBridge',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'balanceLimitPerUser',
        type: 'uint256',
      },
    ],
    name: 'SetBalanceLimitPerUser',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'collateral',
        type: 'address',
      },
    ],
    name: 'SetCollateral',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldDeallocateCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newDeallocateCooldown',
        type: 'uint256',
      },
    ],
    name: 'SetDeallocateCooldown',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldDeallocateDebounceTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newDeallocateDebounceTime',
        type: 'uint256',
      },
    ],
    name: 'SetDeallocateDebounceTime',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldDefaultFeeCollector',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newDefaultFeeCollector',
        type: 'address',
      },
    ],
    name: 'SetDefaultFeeCollector',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'oldFeeCollector',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newFeeCollector',
        type: 'address',
      },
    ],
    name: 'SetFeeCollector',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldForceCancelCloseCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newForceCancelCloseCooldown',
        type: 'uint256',
      },
    ],
    name: 'SetForceCancelCloseCooldown',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldForceCancelCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newForceCancelCooldown',
        type: 'uint256',
      },
    ],
    name: 'SetForceCancelCooldown',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldForceCloseFirstCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newForceCloseFirstCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldForceCloseSecondCooldown',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newForceCloseSecondCooldown',
        type: 'uint256',
      },
    ],
    name: 'SetForceCloseCooldowns',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldForceCloseGapRatio',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newForceCloseGapRatio',
        type: 'uint256',
      },
    ],
    name: 'SetForceCloseGapRatio',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldCloseMinSigPeriod',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newCloseMinSigPeriod',
        type: 'uint256',
      },
    ],
    name: 'SetForceCloseMinSigPeriod',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldPricePenalty',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newPricePenalty',
        type: 'uint256',
      },
    ],
    name: 'SetForceClosePricePenalty',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldInvalidBridgedAmountsPool',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newInvalidBridgedAmountsPool',
        type: 'address',
      },
    ],
    name: 'SetInvalidBridgedAmountsPool',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldLiquidationTimeout',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newLiquidationTimeout',
        type: 'uint256',
      },
    ],
    name: 'SetLiquidationTimeout',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldLiquidatorShare',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newLiquidatorShare',
        type: 'uint256',
      },
    ],
    name: 'SetLiquidatorShare',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'upnlValidTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'priceValidTime',
        type: 'uint256',
      },
    ],
    name: 'SetMuonConfig',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'muonAppId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'gateway',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'x',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'parity',
        type: 'uint8',
      },
    ],
    name: 'SetMuonIds',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    name: 'SetPartyBEmergencyStatus',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldPendingQuotesValidLength',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newPendingQuotesValidLength',
        type: 'uint256',
      },
    ],
    name: 'SetPendingQuotesValidLength',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isSuspended',
        type: 'bool',
      },
    ],
    name: 'SetSuspendedAddress',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldMinAcceptableQuoteValue',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldMinAcceptablePortionLF',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minAcceptableQuoteValue',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minAcceptablePortionLF',
        type: 'uint256',
      },
    ],
    name: 'SetSymbolAcceptableValues',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fundingRateEpochDuration',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fundingRateWindowTime',
        type: 'uint256',
      },
    ],
    name: 'SetSymbolFundingState',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldMaxLeverage',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxLeverage',
        type: 'uint256',
      },
    ],
    name: 'SetSymbolMaxLeverage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldMaxSlippage',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxSlippage',
        type: 'uint256',
      },
    ],
    name: 'SetSymbolMaxSlippage',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldTradingFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
    ],
    name: 'SetSymbolTradingFee',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'oldState',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isValid',
        type: 'bool',
      },
    ],
    name: 'SetSymbolValidationState',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpauseAccounting',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpauseGlobal',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpauseInternalTransfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpauseLiquidation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpausePartyAActions',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'UnpausePartyBActions',
    type: 'event',
  },
  {
    inputs: [],
    name: 'activeEmergencyMode',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'bridge',
        type: 'address',
      },
    ],
    name: 'addBridge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'minAcceptableQuoteValue',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minAcceptablePortionLF',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxLeverage',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'fundingRateEpochDuration',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'fundingRateWindowTime',
        type: 'uint256',
      },
    ],
    name: 'addSymbol',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'symbolId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'isValid',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'minAcceptableQuoteValue',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minAcceptablePortionLF',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tradingFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxLeverage',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundingRateEpochDuration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundingRateWindowTime',
            type: 'uint256',
          },
        ],
        internalType: 'struct Symbol[]',
        name: 'symbols',
        type: 'tuple[]',
      },
    ],
    name: 'addSymbols',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'deactiveEmergencyMode',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
    ],
    name: 'deregisterAffiliate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'deregisterPartyB',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pauseAccounting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pauseGlobal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pauseLiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pausePartyAActions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pausePartyBActions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
    ],
    name: 'registerAffiliate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'partyB',
        type: 'address',
      },
    ],
    name: 'registerPartyB',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'bridge',
        type: 'address',
      },
    ],
    name: 'removeBridge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'setAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'balanceLimitPerUser',
        type: 'uint256',
      },
    ],
    name: 'setBalanceLimitPerUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'collateral',
        type: 'address',
      },
    ],
    name: 'setCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'deallocateCooldown',
        type: 'uint256',
      },
    ],
    name: 'setDeallocateCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'deallocateDebounceTime',
        type: 'uint256',
      },
    ],
    name: 'setDeallocateDebounceTime',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'affiliate',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'feeCollector',
        type: 'address',
      },
    ],
    name: 'setFeeCollector',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'forceCancelCloseCooldown',
        type: 'uint256',
      },
    ],
    name: 'setForceCancelCloseCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'forceCancelCooldown',
        type: 'uint256',
      },
    ],
    name: 'setForceCancelCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'forceCloseFirstCooldown',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'forceCloseSecondCooldown',
        type: 'uint256',
      },
    ],
    name: 'setForceCloseCooldowns',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'forceCloseGapRatio',
        type: 'uint256',
      },
    ],
    name: 'setForceCloseGapRatio',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'forceCloseMinSigPeriod',
        type: 'uint256',
      },
    ],
    name: 'setForceCloseMinSigPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'forceClosePricePenalty',
        type: 'uint256',
      },
    ],
    name: 'setForceClosePricePenalty',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pool',
        type: 'address',
      },
    ],
    name: 'setInvalidBridgedAmountsPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'liquidationTimeout',
        type: 'uint256',
      },
    ],
    name: 'setLiquidationTimeout',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'liquidatorShare',
        type: 'uint256',
      },
    ],
    name: 'setLiquidatorShare',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'upnlValidTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'priceValidTime',
        type: 'uint256',
      },
    ],
    name: 'setMuonConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'muonAppId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'validGateway',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'x',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'parity',
            type: 'uint8',
          },
        ],
        internalType: 'struct PublicKey',
        name: 'publicKey',
        type: 'tuple',
      },
    ],
    name: 'setMuonIds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'partyBs',
        type: 'address[]',
      },
      {
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    name: 'setPartyBEmergencyStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'pendingQuotesValidLength',
        type: 'uint256',
      },
    ],
    name: 'setPendingQuotesValidLength',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minAcceptableQuoteValue',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minAcceptablePortionLF',
        type: 'uint256',
      },
    ],
    name: 'setSymbolAcceptableValues',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'fundingRateEpochDuration',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'fundingRateWindowTime',
        type: 'uint256',
      },
    ],
    name: 'setSymbolFundingState',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'maxLeverage',
        type: 'uint256',
      },
    ],
    name: 'setSymbolMaxLeverage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'tradingFee',
        type: 'uint256',
      },
    ],
    name: 'setSymbolTradingFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'symbolId',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isValid',
        type: 'bool',
      },
    ],
    name: 'setSymbolValidationState',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'suspendedAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpauseAccounting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpauseGlobal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpauseLiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpausePartyAActions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpausePartyBActions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'unsuspendedAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
