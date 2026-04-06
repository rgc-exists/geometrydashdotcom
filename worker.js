let levelID = null;

self.addEventListener('message', event => {
  if (event.data.levelId) {
    levelID = event.data.levelId;
  }
});

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);  
  if (levelID < 0) {
    if (url.pathname.includes("1.txt")) {
      event.respondWith(
        fetch(`/geometrydashdotcom/assets/levels/${levelID}.txt`)
      );
      return;
    }

    if (url.pathname.includes("StereoMadness.mp3")) {
      event.respondWith(
        fetch(`/geometrydashdotcom/assets/music/${levelID}.mp3`)
      );
      return;
    }
  }
  
  if (levelID >= 0) {
    if (url.pathname.includes("1.txt")) {
      event.respondWith(
        fetch(`https://getleveldata.lasokar.workers.dev?id=${levelID}`)
      );
      return;
    }

    if (url.pathname.includes("StereoMadness.mp3")) {
      event.respondWith(
        fetch(`/geometrydashdotcom/assets/music/-1.mp3`)
      );
      return;
    }
  }
});
