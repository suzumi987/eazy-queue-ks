import { EventEmitter } from 'events';

/**
 * @class EzQueue
 * @extends EventEmitter
 * @event job - When the queue is started
 * @event done - When the job is done (return true)
 * @event finish - When the job is finished (return false)
 * @event complete - When the queue all is completed
 * @method add - Add a job to the queue
 * @method process - Start the queue
 * @method checkQueue - Check the queue length
 */
class EzQueue<T> extends EventEmitter {
  private queue: Array<T>;
  private isProcess: boolean;

  constructor() {
    super();
    this.queue = [];
    this.isProcess = false;
  }

  add(data: T) {
    if (Array.isArray(data) && data.length > 0) {
      this.queue = this.queue.concat(data);
    } else {
      this.queue.push(data);
    }
    if (!this.isProcess) {
      this.emit('job');
    }
  }

  async process(callback: (data: T | undefined) => Promise<boolean>) {
    this.isProcess = true;

    while (this.queue.length > 0) {
      const job = this.queue.shift();
      const result = await callback(job);
      this.emit('done', result, job);
    }

    const c = this.checkQueue();
    if (c === 0) {
      this.emit('complete');
      this.isProcess = false;
    } else {
      this.emit('job');
    }
  }

  public checkQueue() {
    return this.queue.length;
  }
}

export default EzQueue;
