"use strict";(self.webpackChunkpodcaster=self.webpackChunkpodcaster||[]).push([[592],{7423:(g,P,a)=>{a.d(P,{X:()=>r});var d=a(9751),l=a(4004),h=a(262),_=a(8746),n=a(8256),E=a(529),p=a(3114);let r=(()=>{class i{constructor(t,e){this.http=t,this.stateService=e,this.PODCAST_CACHE_KEY="podcasts-cache",this.PODCAST_DETAIL_CACHE_KEY="podcasts-detail-cache",this.CACHE_TIME=864e5}getPodcasts(){this.stateService.updateState({isLoading:!0});const t=this.getPodcastsFromCache();return t.length?new d.y(e=>{e.next(t),this.stateService.updateState({isLoading:!1}),e.complete()}):this.http.get("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json").pipe((0,l.U)(e=>{const c=e.feed?.entry?.map(s=>({id:s.id.attributes["im:id"],title:s["im:name"].label,description:s.summary.label,image:s["im:image"].slice(-1)?.[0].label,author:s["im:artist"].label}));return this.setPodcastsCache(c),c}),(0,h.K)(e=>(console.error(e),e)),(0,_.x)(()=>this.stateService.updateState({isLoading:!1})))}getPodcastDetail(t){this.stateService.updateState({isLoading:!0});const e=this.getPodcastFromCache(t);return e?.id?new d.y(c=>{c.next(e),this.stateService.updateState({isLoading:!1}),c.complete()}):this.http.get(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${t}&country=US&media=podcast&entity=podcastEpisode&limit=1000`)}`).pipe((0,l.U)(s=>{if(200!==s.status.http_code)throw new Error("Error fetching podcast");const u=JSON.parse(s.contents),C={...this.stateService.getData("data")?.selectedPodcast??{},episodes:u.results.slice(1).map(o=>{const D=new Date(0,0,0,0,0,0);return D.setMilliseconds(o.trackTimeMillis),{id:o.trackId,title:o.trackName,audioUrl:o.previewUrl,description:o.description,duration:D,published:o.releaseDate,image:o.artworkUrl600,podcastId:o.collectionId}})};return this.setPodcastCache(t,C),C}),(0,h.K)(s=>(console.error(s),s)),(0,_.x)(()=>this.stateService.updateState({isLoading:!1})))}setSelectedPodcast(t){this.stateService.updateState({data:{...this.stateService.getData("data"),selectedPodcast:t}})}getPodcastsFromCache(){const t=JSON.parse(localStorage.getItem(this.getPodcastsCacheKey()));return t&&t?.expire>Date.now()?t.data:[]}getPodcastFromCache(t){const e=JSON.parse(localStorage.getItem(this.getPodcastCacheKey(t)));return e&&e?.expire>Date.now()?e.data:{}}setPodcastCache(t,e){const s={expire:Date.now()+this.CACHE_TIME,data:e};localStorage.setItem(this.getPodcastCacheKey(t),JSON.stringify(s))}setPodcastsCache(t){const c={expire:Date.now()+this.CACHE_TIME,data:t};localStorage.setItem(this.getPodcastsCacheKey(),JSON.stringify(c))}getPodcastsCacheKey(){return`${this.PODCAST_CACHE_KEY}`}getPodcastCacheKey(t){return`${this.PODCAST_DETAIL_CACHE_KEY}-${t}`}}return i.\u0275fac=function(t){return new(t||i)(n.LFG(E.eN),n.LFG(p.b))},i.\u0275prov=n.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})()},2722:(g,P,a)=>{a.d(P,{R:()=>n});var d=a(4482),l=a(5403),h=a(8421),_=a(5032);function n(E){return(0,d.e)((p,r)=>{(0,h.Xf)(E).subscribe((0,l.x)(r,()=>r.complete(),_.Z)),!r.closed&&p.subscribe(r)})}}}]);