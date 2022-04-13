// ok, so you can create race conditions in js if you abuse it.
// obviously we must create a mutex because the language designers somehow forgot mutexes are extra
// cool and never cause any horrendous errors.

class Mutex {
  constructor() {
    this.q = [];
    this.locked = false;
  }

  async lock() {
    // If nobody has locked the mutex, then we can safely
    // enter!
    if(!this.locked) {
      this.locked = true;
      return 0;
    }

    // Otherwise, we sleep until the mutex is ready.
    var resolveDummyPromise;
    const prom = new Promise((resolve, reject) => {
      resolveDummyPromise = resolve;
    })
    this.q.push(resolveDummyPromise);
    await prom;
    return 0;
  }

  unlock() {
    // If nobody is waiting to be notified, exit.
    if(this.q.length == 0) {
      this.locked = false;
      return;
    }

    // Otherwise, notify the first waiter.
    const next = this.q[0];
    this.q = this.q.slice(1);
    next();
  }
}
