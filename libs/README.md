This directory `libs` contains the implementation of actions. If you are an action developer, you need to initialize your action project in this directory, implement it with code, and submit a PR. We will review your code and consider whether to accept it.

## Develop an Action

The following outlines the process for developing an action:

1. In the project's root directory, execute `npx nest g library my-action`. This command utilizes the `nest` CLI tool to initialize the action directory `libs/my-action` and configure the necessary files.
2. Implement the `Action` class defined in [`action.dto.ts`](../src/common/dto/action.dto.ts). The abstract class is structured as follows:

```ts
abstract class Action {
  abstract getMetadata(): Promise<ActionMetadata>;

  abstract generateTransaction(parameters: {
    [key: string]: any;
  }): Promise<GeneratedTransaction>;
}
```

The `getMetadata` method returns metadata that describes the action for display on the frontend. The `generateTransaction` method is responsible for constructing transactions. When a user confirms the action on the interface, this method executes in the background to construct and return the transaction, which will subsequently be added to the blockchain.

To implement this functionality, you must extend the `Action` abstract class based on your specific business logic. Export an instance of your implementation as the default export in the `index.ts` file within your `libs/my-action` directory. This step is mandatory, as our framework relies on it to register your action and manage routing and other related operations.

For reference, the [`novaswap`](./novaswap/) directory contains an exemplary implementation of a real action that you can use as a guide.
