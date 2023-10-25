import { EventEmitter } from 'events';

/**
 * @class EzQueue
 * @extends EventEmitter
 * @event job - When the queue is started
 * @event done - When the job is done (return true)
 * @event finish - When the job is finished (return false)
 * @event complete - When the queue all is completed
 */
class EzQueue<T> extends EventEmitter {
  private queue: Array<T>;
  private limit: number;
  private isProcess: boolean;

  constructor() {
    super();
    this.queue = [];
    this.limit = 1000;
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
    const processNext = async () => {
      if (this.queue.length === 0) {
        this.emit('complete');
        this.isProcess = false;
        return;
      }

      const q = this.queue.shift();
      const result = await new Promise((resolve) => {
        resolve(callback(q));
      });
      setTimeout(() => {
        if (result) this.emit('done', q);
        this.emit('finish', q);
        processNext();
      }, 1000 / this.limit);
    };
    processNext();
  }

  checkQueue() {
    return this.queue.length;
  }
}

export default EzQueue;
