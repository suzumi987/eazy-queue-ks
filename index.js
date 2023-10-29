const { EventEmitter } = require('events');

/**
 * @class EzQueue
 * @extends EventEmitter
 * @event job - When the queue is started
 * @event done - When the job is done (return true)
 * @event complete - When the queue all is completed
 * @method add - Add a job to the queue
 * @method process - Start the queue
 * @method checkQueue - Check the queue length
 */
class EzQueue extends EventEmitter {

  constructor() {
    super();
    this.queue = [];
    this.isProcess = false;
  }

  add(data) {
    if (Array.isArray(data) && data.length > 0) {
      this.queue.push(...data);
    } else if (!Array.isArray(data)){
      this.queue.push(data);
    }
    if (!this.isProcess) {
      this.emit('job');
    }
  }

  async process(callback) {
    this.isProcess = true;

    while (this.queue.length > 0) {
      const job = this.queue.shift();
      const result = await callback(job);
      this.emit('done', result, job);
    }

    const c = this.checkQueue();
    if (c === 0) {
      this.isProcess = false;
      this.emit('complete');
    } else {
      this.emit('job');
    }
  }

  checkQueue() {
    return this.queue.length;
  }
}

module.exports = EzQueue;
