let sharedBuffer;
let sharedArray;
const workers = [];

if (window.SharedArrayBuffer) {
  sharedBuffer = new SharedArrayBuffer(4); // 4 bytes = 1 Int32
  sharedArray = new Int32Array(sharedBuffer);
  sharedArray[0] = 0;
} else {
  alert("SharedArrayBuffer not supported");
}

function startWorkers() {
  if (!sharedBuffer) {
    console.warn("SharedArrayBuffer not initialized");
    return;
  }
  for (let i = 0; i < 4; i++) {
    const worker = new Worker("worker.js");
    worker.postMessage(sharedBuffer);

    worker.onmessage = (e) => {
      console.log(`Worker ${i} says:`, e.data);
    };

    workers.push(worker);
  }
}

document
  .getElementById("start-workers")
  .addEventListener("click", startWorkers);

document.getElementById("show-result").addEventListener("click", () => {
  const currentValue = Atomics.load(sharedArray, 0);
  document.getElementById("result").textContent = currentValue;
});
