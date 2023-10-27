# EzQueue

    npm install easy-queue-ks

### How to import

commonJS:

```javascript
const EzQueue = require('eazy-queue-ks');
```

es2015:

```javascript
import EzQueue from 'eazy-queue-ks';
```

## What is it used for

- Easily add items to the queue.
- Asynchronously process the items with a customizable callback function.
- Events for queue progress tracking.
  - `job`: Triggered when the queue starts processing.
  - `done`: Triggered when a job is done (returns `true`).
  - `complete`: Triggered when the entire queue is completed.

### Class: EzQueue\<T>

#### Type parameters

| Name | Default | Description                         |
| ---- | ------- | ----------------------------------- |
| `T`  | -       | Type that is pushed onto the stack. |

### API

#### add(data: T | T[]): void

Add an item to the queue. You can pass a single item or an array of items.

#### process(callback: (data: T | undefined) => Promise<boolean>): void

Start processing the queue with the provided callback function. The callback function should return true for 'done' and false for 'finish' events.

#### checkQueue(): number

Get the current number of items in the queue.

### Events

job: Triggered when the queue starts processing.
done: Triggered when a job is done (returns true).
complete: Triggered when the entire queue is completed.

## Usage

```javascript
import EzQueue from 'eazy-queue-ks';

const ezq = new EzQueue();

ezq.on('job', () => {
  ezq.process(async (job) => {
    await somethingAsync();
    // ...TODO
    return `ok ${job}`; // Not require return
  });
});

ezq.add([1, 2, 3, 4]);

ezq.add(5);

ezq.on('complete', () => {
  // all job is done
  console.log('complete');
});

ezq.on('done', (result, job) => {
  // if ezq.process is return ezq.process example 'ok 1', 'ok 2'
  // job is data of process example 1, 2 ,3
  console.log('done', result, job);
});

```
