const statCache='statv4';
const dynaCache='dynav1';

const assets =['./', 'Site\wildlife.html','Site\wildlife.css','Site\ticketbook.js','Site\temple_of_tooth.html','Site\temple_of_tooth.css','Site\sigiriya.html','Site\sigiriya.css','Site\navbar.js', 'Site\main.js', 'Site\home.html', 'Site\home.css', 'Site\heritage.html', 'Site\heritage.css', 'Site\donations.html','Site\donations.css','Site\donation.js','Site\beach.html','Site\beach.css','Site\activities.html','Site\activities.css','Site\wildlife_pics\yala.jpg','Site\wildlife_pics\Wilpattu.jpg','Site\wildlife_pics\Minneriya.jpg', 'Site\wildlife_pics\main_pic.jpg','Site\wildlife_pics\background.jpg', 'Site\wildlife_pics\animals\squirrel.jpg','Site\wildlife_pics\animals\sloth bear.jpg','Site\wildlife_pics\animals\purple face monkey.jpg','Site\wildlife_pics\animals\leopard.jpg','Site\wildlife_pics\animals\elephant.jpg','Site\pics\beach.jpg','Site\pics\heritage.png','Site\pics\main_img.jpg','Site\pics\SL.jpg','Site\pics\wild.jpg','Site\merchendise\buddasta.jpg','Site\merchendise\cap.jpg','Site\merchendise\mask.jpg','Site\merchendise\sarong.jpg','Site\merchendise\shirt.jpg','Site\merchendise\statue.jpg','Site\merchendise\train_backgroung.jpg','Site\logo\m1.png','Site\logo\manifest.jpg','Site\heritage\Background.jpg','Site\heritage\dalada_maligawa.jpg','Site\heritage\Sigiriya_1.jpg','Site\heritage\sigiriya-.jpg','Site\heritage\Sigiriya-pic_left.jpg','Site\heritage\sigiriya-pic-right.jpg','Site\heritage\sigiriya.jpg','Site\heritage\temple of the tooth.jpg','Site\heritage\Temple-Sacred-Tooth_left.jpg','Site\heritage\Temple-Sacred-Tooth_right.jpg','Site\Beach_pics\3968744.jpg','Site\Beach_pics\5104226627001_5222667804001_5219436382001-vs.jpg','Site\Beach_pics\Arugam_bay_beach.jpg','Site\Beach_pics\background.jpg','Site\Beach_pics\background1.jpg','Site\Beach_pics\beaches-mirissa.jpg','Site\Beach_pics\Nilaveli-Beach-Sri-Lanka.jpg','Site\activities_pics\background_hiking.jpg','Site\activities_pics\hortanplain.jpg','Site\activities_pics\knuckles-range.jpg','Site\activities_pics\midigama_surfing.jpg','Site\activities_pics\mirissa_dive.jpg', 'Site\activities_pics\Pidurangala.jpg','Site\activities_pics\scuba-diving-trinco.jpg','Site\activities_pics\weligama-Surf.jpg'];


self.addEventListener('install',(evt)=>{
    evt.waitUntil(
        caches.open(statCache)
    .then((cache)=>{
        console.log("Caching assets...");
        cache.addAll(assets);
    })
    );
    
});

self.addEventListener('activate',(evt)=>{
    evt.waitUntil(
        caches.keys()
        .then((keys)=>{
            return Promise.all(
                keys.filter(key=>key!==statCache && key!==dynaCache)
                .map(key=>caches.delete(key))
            );

        })
    );
});

self.addEventListener('fetch',(evt)=>{
    evt.respondWith(
        caches.match(evt.request)
        .then((cacheRes)=>{
            return cacheRes || fetch(evt.request)
            .then(fetchRes=>{
                return caches.open(dynaCache)
                .then(cache=>{
                    cache.put(evt.request.url,fetchRes.clone());
                    return fetchRes;
                });
            });
        }).catch(()=>{
            if(evt.request.url.indexOf('.html')>-1){
                return caches.match('/fallback.html')
            }
            })
    );
})