onmessage = function (e) {
  const sharedBuffer = e.data;
  console.log("sharedBuffer", e);
  const sharedArray = new Int32Array(sharedBuffer);

  console.log("Message received from worker");
  console.log("sharedArray length", sharedArray.length); // should be 1 now

  for (let i = 0; i < 1000; i++) {
    Atomics.add(sharedArray, 0, 1);
  }

  postMessage("done");
};
