// race.js
// do you love race conditions?
// do you miss that js doesn't really have them?
// you've come to the right place!

async function add(i, j) {
  return i + j;
}

async function load(o) {
  return o.number;
}

async function store(o, i) {
  o.number = i;
}

async function increment(o) {
  await o.mutex.lock()
  const i = await load(o);
  const iPlusOne = await add(i, 1);
  await store(o, iPlusOne);
  o.mutex.unlock()
}

setTimeout(() => {
  const myObject = {
    number: 0,
    mutex: new Mutex(),
  };

  const numberSpan = document.getElementById("number-span");
  const raceButton = document.getElementById("race-button");
  raceButton.addEventListener("click", () => {
    const waitGroup = [];
    for(var i = 0; i < 100; i++) {
      increment(myObject).then(() => {
        numberSpan.innerText = `Race is at: ${myObject.number}`
      })
    }

    Promise.all(waitGroup).then(() => {
      numberSpan.innerText = `Race is at: ${myObject.number}`
    });
  })
}, 0);
