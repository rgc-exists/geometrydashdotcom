let levelString = null;
let songID = null;

self.addEventListener("message", (event) => {
  levelString = event.data.levelString;
  songID = event.data.songID;
});

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.includes("1.txt")) {
    event.respondWith(new Response(levelString), {
      headers: { "Content-Type": "text/plain" },
    });
    return;
  }

  if (url.pathname.includes("StereoMadness.mp3")) {
    var resp = null;
    try {
      resp = event.respondWith(
        fetch(`https://geometrydashfiles.b-cdn.net/music/{${songID}.mp3`),
      );
    } catch (error) {
      try {
        resp = event.respondWith(
          fetch(`https://www.newgrounds.com/audio/download/${songID}`),
        );
      } catch (error) {
        console.error("Could not download song ID from GD music");
      }
    }
    return;
  }
});

async function handleLevelRequest() {
  /*
  const res = await fetch(
    `https://getleveldata.lasokar.workers.dev?id=${levelID}`,
  );

  const data = await res.json();

  if (data.error) {
    self.clients.matchAll().then((clients) => {
      for (const client of clients) {
        client.postMessage({
          type: data.error === "rate-limit" ? "rate-limit" : "invalid-id",
        });
      }
    });
    return new Response("-1");
  }

  self.clients.matchAll().then((clients) => {
    for (const client of clients) {
      client.postMessage({
        type: "set-level-name",
        name: data["name"],
      });
    }
  });

  
  return new Response(data["data"]);
  */
  console.error(
    "this version of the website is not for loading levels from the GD servers!",
  );
}
