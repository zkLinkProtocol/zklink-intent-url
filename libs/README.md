This directory `libs` contains the implementation of actions. If you are an action developer, you need to initialize your action project in this directory, implement it with code, and submit a PR. We will review your code and consider whether to accept it.

## Develop an Action

The following introduces the process of developing an action.

First, in the root directory of the project, execute `npx nest g library my-action`. The `nest` command-line tool will initialize the action directory `libs/my-action` and configure the necessary files for you.

The `Action` class in [`action.dto.ts`](../src/common/dto/action.dto.ts) represents an action, and its definition is as follows:


```ts
abstract class Action {
  abstract getMetadata(): Promise<ActionMetadata>;

  abstract generateTransaction(parameters: {
    [key: string]: any;
  }): Promise<GeneratedTransaction>;
}
```

Here, the `getMetadata` method returns metadata describing the action for display on the frontend. The `generateTransaction` method is responsible for constructing transactions. When a user clicks confirm on your action page, this method will be executed in the background to construct the transaction and return it, eventually leading to it being added to the blockchain.

You need to implement this `Action` abstract class based on your business logic and export its instance as default in the `index.ts` file in your `libs/my-action` (this is required). Our framework will register your action and handle routing and other operations.

[`novaswap`](./novaswap/) is a good example of real action implementation.
