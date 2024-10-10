// Opisany w dokumentacji
import iziToast from "izitoast";
// Opcjonalny import stylów
import "izitoast/dist/css/iziToast.min.css";

// Opisany w dokumentacji
import SimpleLightbox from "simplelightbox";
// Opcjonalny import stylów
import "simplelightbox/dist/simple-lightbox.min.css";

// Opisany w dokumentacji
import axios from 'axios';

const fetchPostsBtn = document.querySelector(".btn");
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');

// Zmienna lightbox
let lightbox;

let keyWord = "";
let page = 1;
const perPage = 40;

// Funkcja do pobierania galerii
const fetchGallery = async () => { 
    const searchParams = new URLSearchParams({
        key: "46327041-9a6335f12388e2a1236167102",
        q: keyWord,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: perPage,
        page: page,
    });
    
    const url = `https://pixabay.com/api/?${searchParams}`;
    
    try { 
        loader.style.display = 'block'; // Pokazuje loader
        const response = await axios.get(url); // Wysyła zapytanie do API
        const data = response.data;

        if (Array.isArray(data.hits) && data.hits.length === 0) {
            iziToast.error({
                title: false,
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight'
            });
            return;
        }
        
        const markup = data.hits.map((image) => {
            return `
            <div class="card">
                <a href="${image.largeImageURL}" class="lightbox" title="${image.tags}">
                    <img src="${image.webformatURL}" alt="${image.tags}"></img>
                </a>
                <div class="container-box">
                <p class="desc"><span class="count">Likes:</span> ${image.likes}</p>
                <p class="desc"><span class="count">Views:</span> ${image.views}</p>
                    <p class="desc"><span class="count">Comments:</span> ${image.comments}</p>
                    <p class="desc"><span class="count">Downloads:</span> ${image.downloads}</p>
                </div>
                </div>
            `;
        }).join("");

        // Dodaj obrazy do galerii
        gallery.innerHTML = page === 1 ? markup : gallery.innerHTML + markup;

        // Inicjalizacja lightboxa
        lightbox = new SimpleLightbox('.gallery a', {
            captionsData: "alt",
            sourceAttr: "href",
            captions: true,
            captionDelay: 250
        });
        
        lightbox.refresh(); 
        
        if(data.totalHits <= gallery.childElementCount) {
            fetchPostsBtn.style.display = "none";    
            return iziToast.info({
                position: "topRight",
                message: "We're sorry, there are no more posts to load"
            });
        } else {
            fetchPostsBtn.style.display = "block";
        }

        //płynne scrollowanie
        const cards = document.querySelectorAll(".card");
        if(cards.length > 0) {
            const cardsHeight = cards[0].getBoundingClientRect().height;
                window.scrollBy(0, 2 * cardsHeight);
        }
        
    } catch (error) {
        console.log('There has been a problem with your fetch operation:', error);
    } finally {
        loader.style.display = 'none'; 
    }
    
};

// Obsługa kliknięcia przycisku wyszukiwania
document.getElementById('searchButton').addEventListener('click', async function(event) {
    event.preventDefault();
    keyWord = document.getElementById('searchInput').value; 
    page = 1; 
    gallery.innerHTML = ''; 
    fetchPostsBtn.style.display = "block";
    //pobieranie galerii
    await fetchGallery(); 
});

// Obsługa kliknięcia przycisku "Load more"
fetchPostsBtn.addEventListener('click', async () => {
    page += 1; 
    await fetchGallery(); 

    
});
// Zamykanie okna modalnego za pomocą klawiszy
document.addEventListener("keydown", e => {
    if (e.key === "Escape" && lightbox) {
        lightbox.close();
    }
});

