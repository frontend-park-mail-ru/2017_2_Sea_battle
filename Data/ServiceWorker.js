const cacheList = ["/main2.js", "/Resources/Textures/paper.jpg",
    "https://fonts.gstatic.com/s/indieflower/v9/10JVD_humAd5zP2yrFqw6ugdm0LZdjqr5-oayXSOefg.woff2",
    "https://fonts.googleapis.com/css?family=Indie+Flower",
];

const cacheName = "SeaBattle-v3";

this.addEventListener("install", (event) =>
{
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) =>
            {
                return cache.addAll(cacheList);
            })
    )
});

this.addEventListener("fetch", (event) =>
{
    if(event.request.method != "GET")
        return;

    let result;

    if(navigator.onLine)
        result = fetch(event.request);

    else
    {
        result = caches.open(cacheName).then((cache) =>
        {
            return cache.match(event.request);
        });
        result = result.then((cached) =>
        {
            if(cached)
            {
                return cached;
            }
            else
                return fetch(event.request);

        });
    }

    event.respondWith(result);
});

