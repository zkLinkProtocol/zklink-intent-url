
# zkLink Nova Actions & Intent URL SDK

Comprehensive Guide for Creating, Registering, and Utilizing Actions with Intent URLs in the zkLink Nova Network

## Overview

Intent URL is a feature launched by zkLink that converts the act of constructing a transaction into an actionable link. Intent URL is a sharable short link to complete specified action in the zkLink Nova network. User who has the Intent URL can build a certain transaction easily. They can preview, sign the transaction and finally send it to the zkLink Nova network, without understanding the details of the transaction. Intent URL can be used for various on-chain activities such as token swaps, voting, and sponsorship. It greatly lowers the barrier to entry into the blockchain world. More importantly, Intent URl is short, easy to share on social media and webpage.

**Key Concepts**

- **Action**: An Action is a standardized API implementation created by developers. It accepts certain parameters and generates transactions that meet specific needs based on predefined logic.
- **Intent URL**: It is a shareable short link that serves as the entry point for executing an action. On the page of this short link, users can set a few parameters using selection boxes or input fields. After clicking confirm, they can generate and preview the transaction. If everything is correct, the user can sign and send it to the zkLink Nova network.

## Role

- Developer: The role responsible for developing Actions. Developers need to implement the Action specifications and submit the code to the repository. We (zkLink) will register the reviewed Actions.
- Intent Creator: The role responsible for creating Intent URLs. They select a registered Action, configure it, and generate a shareable short link.
- User: The person using the Intent URL. Users do not need to understand complex transaction details; they can send transactions and participate in activities with simple inputs and clicks.

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

You will see `package.json` in repository root is modified, and a new directory named `my-action` in the `libs` directory. This directory contains the basic structure of a nest project.

### 2. Implement

We provide an abstract class that you must extend to implement your action.

The action is described by the `Action` class defined in [`action.dto.ts`](../src/common/dto/action.dto.ts#10). The abstract class is structured as follows:

```ts
type ActionTransactionParams = { [key: string]: string };

abstract class Action {
  abstract getMetadata(): Promise<ActionMetadata>;

  abstract generateTransaction(
    params: ActionTransactionParams,
  ): Promise<GeneratedTransaction>;
}
```

The `getMetadata` method returns metadata (`ActionMetadata`) that describes the action for display on the frontend. The `generateTransaction` method is responsible for constructing transactions. When a user confirms the action in intent url page, this method executes in the background to construct and return the transaction, which will subsequently be sent to the blockchain.

To implement this functionality, you must extend the `Action` abstract class based on your specific business logic.

```ts
class MyAction extends Action {
  async getMetadata(): Promise<ActionMetadata> {
    return {
      title: 'An Action Example',
      description: 'This is a simple action',

      description: 'Support the works you love',
      logo: '',
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
  ): Promise<GeneratedTransaction> {
    // Build and return your transaction
    const tx = {
      chainId: 810180,
      to: params.recipient,
      value: params.value,
      data: '0x',
      dataObject: {
        "Sent Value": params.value,
      },
      // tell the render whether to send the transaction
      shouldSend: true
    }
    return {
      txs: [tx],
      tokens: [],
    };
  }
}
```

For [`ActionMetadata`](../src/common/dto/action-metadata.dto.ts#137), it must be noticeable that the `intent` field describes the parameters that the intent creator or user can set in Intent URL, which will be displayed on the frontend.

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
        },
        {
          label: 'USDC',
          value: '0x1a1A3b2ff016332e866787B311fcB63928464509',
        },
      ]
    }

  ]
  ```
- `regex`: a regular expression that the frontend will use to validate the input.

[`GeneratedTransaction`](../src/common/dto/transaction.dto.ts#57) is a type that describes the transaction that will be sent to the blockchain. It contains the
fields `txs` and `tokens`.

- The `txs` field is an array of transactions that will be sent to the blockchain. The field `chainId`, `to`, `value`, `data` are standard Ethereum transaction fields. It has two additional fields: `dataObject` and `shouldSend`. The `dataObject` field is a JSON object that will be displayed on the frontend. The `shouldSend` field tells the frontend whether to send the transaction.
- The `tokens` field is a list of tokens that should be prepared in target. You can think of this field as describing the prerequisites for initiating a transaction. The frontend will automatically search and perform cross-chain transactions to meet the prerequisites on your target chain. Then, it starts to send the transaction.

### 3. Register

The last step for implementation is to register your action into our framework. You need to put your action instance into the registered action list in [`registeredActions`](../src/modules/action/registeredActions.ts).

```ts
import * as myAction from '@action/my-action';

export const registeredActions = [
  { key: 'novaswap', module: novaSwapAction.default },
  { key: 'buyMeACoffee', module: buyMeACoffeeAction.default },
  { key: 'myAction', module: myAction.default },
];
```

Our framework will register your Action implementation into the routing system. When a request arrives, it will locate your Action implementation based on your ID, pass in the parameters, and execute your business logic, ultimately generating a transaction for the user to sign and send.

### 4. Submit

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
    afterActionUrlCreated?(params:GenerateTransactionData): any;
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

### 1. How do I update an action?

To update an existing action, follow these steps:

1. Modify Your Code: Make the necessary changes to your action implementation.
Test Thoroughly: Ensure all changes are thoroughly tested, including unit, integration, and manual tests.
2. Submit a Pull Request (PR): Create a PR with a detailed description of the changes and the reasons for the update.
3. Code Review: The zkLink team will review your PR for quality, security, and compliance with standards.
Approval and Registration: Once approved, your updated action will be registered and available for use.

### 2. What if my action requires external data?

Minimize reliance on external APIs. If necessary, use them cautiously and ensure they do not impact business operations.

### 3. What is the submission and review process for new actions?

1. Submit a PR: Follow the repository's guidelines for submitting a pull request.
2. Code Review: Your code will be reviewed for quality, security, and compliance with standards.
3. Approval: Once approved, your action will be registered and available for use.

## Glossary

1. Action: A standardized API implementation for generating transactions.
2. Intent URL: A shareable link for executing actions on the zkLink Nova network.
3. Swagger: A tool for testing and verifying APIs.
