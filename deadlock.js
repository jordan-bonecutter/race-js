// now that we have mutexes, it's only natural we want to get
// into deadlock.

async function monkeyMagic() {
  return 0;
}

async function threadFunc(mutexA, mutexB) {
  await mutexA.lock()
  await monkeyMagic();
  await mutexB.lock();
  await monkeyMagic();
  mutexA.unlock();
  mutexB.unlock();
}

(() => {
  const mutexA = new Mutex();
  const mutexB = new Mutex();
  for(var iter = 0; iter < 100; iter++) {
    let i = iter;
    const waitGroup = [];
    waitGroup.push(threadFunc(mutexA, mutexB));
    waitGroup.push(threadFunc(mutexB, mutexA));
    Promise.all(waitGroup).then(() => {
      console.log(`Finished iteration ${i}`)
    })
  }
})();
