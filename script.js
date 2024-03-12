const fetchCards = (folderName, n) => {
    const carousel = document.querySelector('.carousel');
    console.log(folderName);

    carousel.innerHTML = '';
    for (let i = 1; i <= n; i++) {
        const img = `Images/${folderName}/${i}.webp`;

        const card = document.createElement('div');
        card.setAttribute('class', 'carousel-item');
        card.innerHTML = `
            <div class="img" style="background-image: url('${img}')"></div>
            <span class="number">${i}</span>
        `;
        carousel.appendChild(card);

        // Dynamically set the content of ::before pseudo-element
        const style = document.createElement('style');
        style.textContent = `
            .carousel .carousel-item:nth-child(${i}) .number::before {
                content: '${i}';
                // background: red;
            }
        `;
        document.head.appendChild(style);
    }
}


const showCards = () => {
    const country = document.getElementById('country')
    const films = document.getElementById('films');

    country.addEventListener('change', (e) => {
        let value = e.target.value;
        if (value === 'locale') {
            films.innerHTML = `
                <option value="movies">Movies</option>
                <option value="tv-shows">TV Shows</option>
            `;
            films.offsetParent.style.width = "111px";
            fetchCards("locale/movies", 10);
        }
        else {
            films.innerHTML = `
                <option value="movies-en">Movies - English</option>
                <option value="movies-g">Movies - Other Languages</option>
                <option value="tv-shows-en">TV Shows - English</option>
                <option value="tv-shows-g">TV Shows - Other Languages</option>
            `;
            films.offsetParent.style.width = "265px";
            fetchCards("global/movies-en", 8);
        }
    });

    films.addEventListener('change', (e) => {
        let value = e.target.value;

        if (value === 'movies') { fetchCards("locale/movies", 10) }
        if (value === 'tv-shows') { fetchCards("locale/tv-shows", 10) }
        if (value === 'movies-en') { fetchCards("global/movies-en", 8) }
        if (value === 'movies-g') { fetchCards("global/movies-g", 9) } //done
        if (value === 'tv-shows-en') { fetchCards("global/tv-shows-en", 10) }
        if (value === 'tv-shows-g') { fetchCards("global/tv-shows-g", 10) }
    })
}


const carouselSlider = () => {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselItems = document.querySelectorAll('.carousel-item');
    // console.log(carouselItems);

    let currentIndex = 0;
    const itemsPerSlide = 3;
    const totalItems = carouselItems.length;
    const totalSlides = Math.ceil(totalItems / itemsPerSlide);
    const slideWidth = carouselItems[0].offsetWidth * itemsPerSlide;
    // const slideWidth = carouselItems[0] * itemsPerSlide;

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
        console.log('left');
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
        console.log('right');
    });

    function updateCarousel() {
        const offsetX = -currentIndex * slideWidth;
        carousel.style.transform = `translateX(${offsetX}px)`;
    }
}

const faq = () => {
    const questions = document.querySelectorAll('.questions li');

    questions.forEach((ques) => {
        ques.addEventListener('click', (e) => {
            let img = e.target.lastElementChild;
            let div = e.target.nextElementSibling;
            let opacity = div.style.opacity;

            if (opacity === '0') {
                div.style.transform= 'translateY(0%)';
                div.style.opacity= '1';
                div.style.zIndex = '999';
                ques.style.height = 'auto';
                img.style.rotate=  '45deg';
            } else {
                div.style.transform= 'translateY(-10%)';
                div.style.opacity= '0';
                div.style.zIndex = '-999';
                ques.style.height = '85px';
                img.style.rotate=  '0deg';
            }
        })
    })
}


const main = () => {
    fetchCards("locale/movies", 10);
    showCards();
    carouselSlider();
    faq();
}


//*--------------------------------------------------------------------*/



main();