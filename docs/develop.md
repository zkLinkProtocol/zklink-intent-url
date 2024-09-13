
# zkLink Nova Actions & MagicLink SDK

> [!NOTE]  
> Actions & MagicLink is in beta and undergoing audit. Please [Contact Us](https://t.me/laniakeiaa) if you plan on going live with it.

Comprehensive Guide for Creating, Registering, and Utilizing Actions with MagicLinks in the zkLink Nova Network

## Overview

MagicLink is a feature launched by zkLink that converts the act of constructing a transaction into an actionable link. MagicLink is a sharable short link to complete specified action in the zkLink Nova network. User who has the MagicLink can build a certain transaction easily. They can preview, sign the transaction and finally send it to the zkLink Nova network, without understanding the details of the transaction. MagicLink can be used for various on-chain activities such as token swaps, voting, and sponsorship. It greatly lowers the barrier to entry into the blockchain world. More importantly, MagicLink is short, easy to share on social media and webpage.

**Key Concepts**

- **Action**: An Action is a standardized API implementation created by developers. It accepts certain parameters and returns signable transaction or message, enabling specific on-chain or off-chain activities. Actions allow developers to abstract their services to meet user's potential intents, while being maximally flexible by allowing anyone to set parameters when creating a magicLink. Actions simplify the process of integrating the "actionables" throughout EVM-compatible networks right into specific environment, allowing users to execute blockchain transactions without switching between different apps or websites. 
- **MagicLink**: It is a shareable short link that serves as the entry point for executing an action. On the page of this short link, users can set a few parameters using selection boxes or input fields. After clicking confirm, they can generate and preview the transaction. If everything is correct, the user can sign and send it to the zkLink Nova network. While on a website, a magicLink might immediately initiate a transaction preview in a wallet without redirecting users to a dApp. In Telegram, a bot can be used to expand a magicLink into an interactive set of buttons. In the future iteration, this function will be expanded to Discord. 

## Role

- Developer: The role responsible for developing Actions. Developers need to implement the Action specifications and submit the code to the repository. We (zkLink) will register the reviewed Actions.
- Intent Creator: The role responsible for creating magicLinks. They select a registered Action, configure it, and generate a shareable short link.
- User: The person using the magicLink. Users do not need to understand complex transaction details; they can send transactions and participate in activities with simple inputs and clicks.

![](./img/interactive-workflow.png)

# Getting Started

## Develop an Action

We provide a toolkit that allows you to create actions that fulfill users’ intent of achieving an outcome on any of Nova’s connected chains. An action could consist of multiple transactions on multiple chains, interacting with multiple DApps. The complexity of multi-chain transactions is abstracted away from the user experience, and users don’t need to be concerned about having enough funds for a transaction on one specific chain.

Our framework maintains the registration of actions. Once you complete an action and register it in our repository, our server will automatically route requests to your action.

Here is the workflow.

![](./img/backend-action-flow.png)

### 0. Prepare

The toolkit is based on Node.js and NestJS framework, so make sure you have already installed Node.js before developing an action.

You must develop your action under our repository. To get started, clone the repository:

```shell
git clone git@github.com:zkLinkProtocol/zklink-intent-url.git
```

Then install the dependencies:

```shell
npm install
```

Build the project at first to make sure everything is OK:

```shell
npm run build
```

From now you can start to develop your action.

### 1. Initialize

All Action implementations must be in the `libs` directory as a nest sub-project. So you must initiate your action project here. Run the following command:

```shell
cd lib
npx nest g library my-action
```

According to the command line prompt, enter **action** and press _Enter_. You will see `nest-cli.json` in repository root is modified, and a new directory named `my-action` in the `libs` directory. This directory contains the basic structure of a nest project.

### 2. Action Definition

We provide an abstract class that you must extend to implement your action.

The action is described by the `Action` class defined in [`action.dto.ts`](../src/common/dto/action.dto.ts). The abstract class is structured as follows:

```ts
type ActionTransactionParams = { [key: string]: string };

abstract class Action {
  abstract getMetadata(): Promise<ActionMetadata>;

  abstract generateTransaction(
    data: GenerateTransactionData,
  ): Promise<TransactionInfo[]>;

  async validateIntentParams(_: ActionTransactionParams): Promise<string> {
    return Promise.resolve('');
  }

  async reloadAdvancedInfo?(data: GenerateTransactionData): Promise<{
    title: string;
    content: string;
  }>;

  async onMagicLinkCreated?(
    data: GenerateTransactionData,
  ): Promise<TransactionInfo[]>;
}
```

- The `getMetadata` method returns metadata (`ActionMetadata`) that describes the action for display on the frontend. 
- validateIntentParams
- The `generateTransaction` method is responsible for constructing transactions. When a user confirms the action in magicLink page, this method executes in the background to construct and return the transaction, which will subsequently be sent to the blockchain.
- The `validateIntentParams` method allows developers to create more flexible validation rules. It takes `ActionTransactionParams` as input and returns a string containing error messages. When the frontend creates an magicLink, the parameters passed can be validated against custom rules using this hook function. If an error message is returned, the frontend will display it.
- The `reloadAdvancedInfo` optional function processes real-time contract information that should be displayed to users through the magicLink. 

  For example, for a red packet contract, it might show something like _"There are 20 red packets in total, and 3 red packets have been claimed."_  Developers can use this method to return a title and an HTML string based on the contract's stored information, making it easier for users to refresh and view the information. 

  After the developer defines the title and rich text content, the display in the magicLink will be similar to the part highlighted in red in the image ![](./img/real-time-example.png)

- Sometimes, after constructing the parameters and creating the magicLink, it may not become active immediately and will remain in an inactive state. You will need to initiate one or more transactions to the smart contract before you can create an active magicLink. For example, with a red packet contract, you need to deposit a red packet asset into the contract before the magicLink can become active. The `onMagicLinkCreated` provides this capability. It returns `TransactionInfo[]`. The frontend will initiate the on-chain transaction based on this information.

### 3.Implement

To implement this functionality, you must extend the `Action` abstract class based on your specific business logic and use the `RegistryPlug` decorator on it. 

Here's an example code, and we will dive into it:

```ts
@RegistryPlug('my-action', 'v1')
@Injectable()
class MyActionService extends Action {
  async getMetadata(): Promise<ActionMetadata> {
    return {
      title: 'An Action Example',
      description: 'This is a simple action',

      description: 'Support the works you love',
      networks: [
        {
          name: 'zkLink Nova',
          chainId: '810180',,
          contractAddress: '0x',
        },
      ],
      dApp: { name: 'An Action Example' },
      intent: {
        components: [
          {
            name: 'value',
            label: 'Amount',
            desc: 'The amount to sponsor',
            type: 'input',
            regex: '^[0-9]+$',
            regexDesc: 'Must be a number',
          },
         {
            name: 'recipient',
            label: 'Recipient',
            desc: 'The address that is sponsored',
            type: 'input',
            regex: '^0x[a-fA-F0-9]{40}$',
            regexDesc: 'Address',
          },
        ]
      },
    };
  }

  async generateTransaction(
    params: ActionTransactionParams,
  ): Promise<TransactionInfo[]> {
    // Build and return your transaction
    const tx = {
      chainId: 810180,
      to: params.recipient,
      value: params.value,
      data: '0x',
     
      // tell the render whether to send the transaction
      shouldPublishToChain: true
    }
    return {
      txs: [tx],
      tokens: [],
    };
  }
}
```
`networks`: `networks` is an array that represents the networks on which the magicLink can initiate transactions. If the length is greater than 1, it means that the magicLink can initiate transactions on multiple chains.

`intent`: it must be noticeable that the `intent` field describes the parameters that the **intent creator** or **user** can set in magicLink, which will be displayed on the frontend.

The filed `components` is an array of objects that describe the parameters that the user can set. There are some fields to pay attention to：

- `type`: describes the type that the frontend will render. It can be `input` (user inputs), `searchSelect` (drop-down box), `searchSelectErc20` (drop-down box for ERC20 token), `text` (action creator inputs). If you choose `searchSelect` or `searchSelectErc20`, you need to provide available value in `options` field like this:
  ```ts
  components: [
    {
      name: "token",
      options: [
        {
          label: 'WETH',
          value: '0x8280a4e7D5B3B658ec4580d3Bc30f5e50454F169',
          chainId: '1',
        },
        {
          label: 'USDC',
          value: '0x1a1A3b2ff016332e866787B311fcB63928464509',
          chainId: '1',
        },
      ]
    }

  ]
  ```
When you allow magicLink can initiate transactions on multiple chains, the `option` here should include `chainId` to indicate that it is available for selection only on the corresponding `chainId`.

- `regex`: a regular expression that the frontend will use to validate the input.

[`TransactionInfo[]`](../src/common/dto/transaction.dto.ts#57) is a type that describes the transaction that will be sent to the blockchain. It contains the
fields `txs` and `tokens`.

- The `txs` field is an array of transactions that will be sent to the blockchain. The field `chainId`, `to`, `value`, `data` are standard Ethereum transaction fields. It has an additional fields: `shouldPublishToChain`. The `shouldPublishToChain` field tells the frontend whether to send the transaction.
- The `tokens` field is a list of tokens that should be prepared in target. You can think of this field as describing the prerequisites for initiating a transaction. The frontend will automatically search and perform cross-chain transactions to meet the prerequisites on your target chain. Then, it starts to send the transaction.

### 4. Switch `env`
We offer two environment variables, `dev` and `prod`, that allow you to configure contract addresses or settings for both environments. The env variable for the **dev** branch is set to `dev`, while the env variable for the **main** branch is set to `prod`. In the **dev** branch, you can test with the test-network's magicLink, and once the code is merged into the main branch, it will read the mainnet network's contract configurations.

Here's how you can implement this:

1. Create a config.ts file:
```typescript
export const config = {
  dev: {
    chainId: 810181,
    rpcUrl: 'https://sepolia.rpc.zklink.io',
    quoterContractAddress: '0x86Fc6ab84CFc6a506d51FC722D3aDe959599A98A',
  },
  prod: {
    chainId: 810180,
    rpcUrl: 'https://rpc.zklink.io',
    quoterContractAddress: '0x23Fc6ab84CFc6a506321FC722D3aDe959599A901',
  },
} as const;
```

2. Read the env using NestJS DI:

```typescript
@Injectable()
export class RedEnvelopeService extends ActionDto {
  constructor(readonly configService: ConfigService) {
    const env = configService.get('env', { infer: true })!;
    this.config = config[env];
  }
}
```
This setup ensures that your Actions uses the correct configuration based on the environment it is running in.


### 5. Register
The final step is to register **Action** on our platform. We provide the `RegistryPlug` decorator, which requires two input parameters: args[0] is the action ID, and args[1] is the version number.

The action ID should follow the snake case naming convention and match the name used in the command `npx nest g library my-action`, which is the name of your Action folder. This ensures that it is unique and does not conflict with other actions. This ID will be used as a runtime index throughout the system, guiding the runtime code to load and execute the Action.

The version represents the version of your action, and the version number should start from `v1`. Each time you upgrade the action, increment the version by 1. For example, the initial submission of the action should be version `v1`. If you upgrade the action multiple times in the future, the version number should be updated to **v2**, **v3**, **v4**, and so on. For upgrading an action, please refer to the [Action Upgrade](#1-how-do-i-update-or-upgrade-an-action) section.

```typescript
@RegistryPlug('my-action', 'v1')
@Injectable()
class MyActionService extends Action {
  ...
}
```
In the `libs` folder, we have defined the `RegistryPlug` decorator. Additionally, we have defined the `Registry Module`. This module acts as a registry for all the actions developed by developers. It uses NestJS's IoC to inject all the actions into our application, making them effective.

The application will scan all action classes decorated with **RegistryPlug** in the **registry module**. It will register the action IDs into the application and use the highest version number for each ID as the currently available action for the intent creator. Meanwhile, for *already* created magic links, they will continue to use their originally corresponding version number.

```typescript
@Module({
  providers: [
    MyActionService,
    ... // other actions
  ],
  exports: [
    MyActionService
    ... // other actions
  ],
})
export class RegistryModule {}
```

Our framework will register your Action implementation into the routing system. When a request arrives, it will locate your Action implementation based on your ID, pass in the parameters, and execute your business logic, ultimately generating a transaction for the user to sign and send.

### 6. Submit

After implementing your action, you need to submit a PR to the repository. We will review your code and consider whether to accept it.

## Example

The [buy-me-a-coffee](../libs/buy-me-a-coffee/) and [`novaswap`](../libs/novaswap/) Actions are good examples for you to learn how to implement an action.

## Advanced Usage

Our action definition provides two more optional methods for advanced usage.

```ts
abstract class Action {
    // Validate the parameters with user custom logic
    validateIntentParams(_: ActionTransactionParams): Promise<string>;
    // Process something after the action URL is created
    onMagicLinkCreated?(params:GenerateTransactionData): any;
}
```

Most of the time, you don't need to implement these methods. But if you have some special requirements, you can override them. See the [red-envelope](../libs/red-envelope/) Action for an example.

## Tips and Tricks

### Keep it Simple

Our Action interface offers flexibility, allowing you to implement TypeScript business logic according to your requirements. However, please ensure that your logic implementation remains as straightforward as possible.

### Use Industry-Standard Libraries

While you may introduce new dependencies, please ensure that you use industry-standard libraries.

### Minimize External Dependencies

You are permitted to reference external API services with caution. During the code review process, we will consider the impact on our business operations. The preferred approach is to avoid relying on external API services and, if necessary, to only obtain essential data from the zkLink Nova blockchain.

### Prioritize Security

Security is our top priority. Minimizing dependencies and external services enhances the robustness of our service. This will be a key criterion in our evaluation of your Action implementation.

### Verify your Action with Swagger

After completing an Action, you should test it to ensure it works properly. Our code acts as SWAGGER, allowing you to test whether your Action functions correctly within our API on this page. The process is as follows:

Before running the project, you need to run PostgreSQL locally. You also need to configure environment variables in the .env file, which you can get from the .env.example template. You should replace the variables with your own (especially for the PostgreSQL configuration).

Start the project using the following command:

```shell
npm run migration:run  # create the database tables if you haven't done it before
npm run start  # start the project
```

At this point, you can access SWAGGER through `localhost:4101`. You should ensure the proper functioning of three APIs:

- `/api/actions`: This should include the description of your Action.
- `/api/actions/{id}`: Upon entering the corresponding ID, it should return the description of your Action.
- `/api/actions/{id}/transaction`: Upon entering the corresponding ID and the required parameters of the Action, it should generate the desired transaction.

When you encounter issues, you can observe the logs in the command line console to pinpoint the problem. This is the most intuitive troubleshooting method.

## FAQs

### 1. How do I update or upgrade an action?

Whether you update or upgrade your action depends on which part of the logic you have modified. It is crucial to consider "**whether the changes impact the creation of on-chain transactions**".

If you are making changes such as correcting typos, updating titles, logos, or adding a few options without affecting the core logic of `generateTransaction`, then it is considered an **update**.

However, if the changes affect the core logic of `generateTransaction`—for example, if version 1 requires casting 1 vote per transaction and now version 2 enforces casting 5 votes per transaction—then it constitutes an **upgrade**.

Follow these steps:

1. Modify Your Code: Make the necessary changes to your action implementation.
Test Thoroughly: Ensure all changes are thoroughly tested, including unit, integration, and manual tests:
  
    - **update**: Directly modifying the code logic without changing the version number in the `RegistryPlug` decorator.
    - **upgrade**: Upgrade the version number to the next number. And you can cleverly use TypeScript's inheritance capabilities to override any core methods in the V1 Action class.

    ```typescript
      @RegistryPlug('my-action', 'v1')
      @Injectable()
      class MyActionService extends Action {
        async private getSignature() {
          ...
        }

        async public generateTransaction() {
            const signature = await this.getSignature()
            ...
        }
      }

      @RegistryPlug('my-action', 'v2')
      @Injectable()
      class MyActionServiceV2 extends Action {
        async private getSignature() {
          console.log('enhanced functionality')
          ... // original logic
          console.log('another enhanced functionality')
        }

        async public generateTransaction() {
            const signature = await this.getSignature()
            ...
        }
      }
    ```
    The above `MyActionServiceV2` inherits most of the functionality from `MyActionService`, but overrides the `getSignature` method. It's that simple — just a small amount of code allows you to easily upgrade to a new version of an action.

    Finally, don't forget to register the new version of the action.

    ```typescript
      @Module({
        providers: [
          MyActionService, // KEEP the old version action!!!
          MyActionServiceV2,
          ... // other actions
        ],
        exports: [
          MyActionService,
          MyActionServiceV2,
          ... // other actions
        ],
      })
      export class RegistryModule {}
      ```

    
2. Submit a Pull Request (PR): Create a PR with a detailed description of the changes and the reasons for the update.
3. Code Review: The zkLink team will review your PR for quality, security, and compliance with standards.
4. Approval and Registration: Once approved, your updated action will be registered and available for use.

### 2. What if my action requires external data?

Minimize reliance on external APIs. If necessary, use them cautiously and ensure they do not impact business operations.

### 3. What is the submission and review process for new actions?

1. Submit a PR: Follow the repository's guidelines for submitting a pull request.
2. Code Review: Your code will be reviewed for quality, security, and compliance with standards.
3. Approval: Once approved, your action will be registered and available for use.

## Glossary

1. Action: A standardized API implementation for generating transactions.
2. magicLink: A shareable link for executing actions on the zkLink Nova network.
3. Swagger: A tool for testing and verifying APIs.
