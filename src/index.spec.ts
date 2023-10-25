import EzQueue from './index';

describe('EzQueue', () => {
  let ezQueue: EzQueue<number | number[]>;

  beforeEach(() => {
    ezQueue = new EzQueue();
  });

  test('adds a single item to the queue', () => {
    ezQueue.add(1);
    expect(ezQueue.checkQueue()).toBe(1);
  });

  test('adds an array of items to the queue', () => {
    ezQueue.add([1, 2, 3]);
    expect(ezQueue.checkQueue()).toBe(3);
  });

  test('processes the queue with a callback', async () => {
    const callback = jest.fn().mockResolvedValue(true);
    ezQueue.add(1);

    await ezQueue.process(callback);

    expect(callback).toHaveBeenCalledWith(1);
    expect(ezQueue.checkQueue()).toBe(0);
  });

  test('emits the job, done, finish, and complete events', (done) => {
    const callback = jest.fn().mockResolvedValue(true);

    ezQueue.on('job', () => {
      done();
    });

    ezQueue.on('done', (data) => {
      expect(data).toBe(1);
    });

    ezQueue.on('finish', (data) => {
      expect(data).toBe(1);
    });

    ezQueue.on('complete', () => {
      done();
    });

    ezQueue.add(1);

    ezQueue.process(callback);
  });
});