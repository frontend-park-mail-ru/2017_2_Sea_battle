const cacheList = ["/main2.js", "/Resources/Textures/paper.jpg",
    "https://fonts.gstatic.com/s/indieflower/v9/10JVD_humAd5zP2yrFqw6ugdm0LZdjqr5-oayXSOefg.woff2",
    "https://fonts.googleapis.com/css?family=Indie+Flower",
];

this.addEventListener("install", (event) =>
{
    console.log("Installed");
    event.waitUntil(
        caches.open("SeaBattle")
            .then((cache) =>
            {
                console.log("Cached");
                return cache.addAll(cacheList);
            })
    )
});

this.addEventListener("fetch", (event) =>
{
    if(event.request.method != "GET")
        return;

    event.respondWith(async function()
       {
           if(!navigator.onLine)
               return fetch(event.request);

           const cache = await caches.open("SeaBattle");
           const cached = await cache.match(event.request);

           if(cached)
               return cached;

           return fetch(event.request);
       }()
   );
});

