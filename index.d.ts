/// <reference types="node" />
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
declare class EzQueue<T> extends EventEmitter {
    private queue;
    private isProcess;
    constructor();
    add(data: T | T[]): void;
    process(callback: (data: T | undefined) => Promise<boolean>): Promise<void>;
    checkQueue(): number;
}
export default EzQueue;
//# sourceMappingURL=index.d.ts.map