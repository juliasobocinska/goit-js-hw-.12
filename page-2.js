import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{a as m,i as p,S as g}from"./assets/vendor-D73Uttp0.js";/* empty css                      */const o=document.querySelector(".btn"),d=document.querySelector(".loader"),a=document.querySelector(".gallery");let n,y="",r=1;const f=40,h=async()=>{const u=`https://pixabay.com/api/?${new URLSearchParams({key:"46327041-9a6335f12388e2a1236167102",q:y,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:f,page:r})}`;try{d.style.display="block";const s=(await m.get(u)).data;if(Array.isArray(s.hits)&&s.hits.length===0){p.error({title:!1,message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const l=s.hits.map(e=>`
            <div class="card">
                <a href="${e.largeImageURL}" class="lightbox" title="${e.tags}">
                    <img src="${e.webformatURL}" alt="${e.tags}"></img>
                </a>
                <div class="container-box">
                <p class="desc"><span class="count">Likes:</span> ${e.likes}</p>
                <p class="desc"><span class="count">Views:</span> ${e.views}</p>
                    <p class="desc"><span class="count">Comments:</span> ${e.comments}</p>
                    <p class="desc"><span class="count">Downloads:</span> ${e.downloads}</p>
                </div>
                </div>
            `).join("");if(a.innerHTML=r===1?l:a.innerHTML+l,n=new g(".gallery a",{captionsData:"alt",sourceAttr:"href",captions:!0,captionDelay:250}),n.refresh(),s.totalHits<=a.childElementCount)return o.style.display="none",p.info({position:"topRight",message:"We're sorry, there are no more posts to load"});o.style.display="block";const i=document.querySelectorAll(".card");if(i.length>0){const e=i[0].getBoundingClientRect().height;window.scrollBy(0,2*e)}}catch(c){console.log("There has been a problem with your fetch operation:",c)}finally{d.style.display="none"}};document.getElementById("searchButton").addEventListener("click",async function(t){t.preventDefault(),y=document.getElementById("searchInput").value,r=1,a.innerHTML="",o.style.display="block",await h()});o.addEventListener("click",async()=>{r+=1,await h()});document.addEventListener("keydown",t=>{t.key==="Escape"&&n&&n.close()});
//# sourceMappingURL=page-2.js.map
