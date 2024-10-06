let story = [
    {
        'text': 'As you look at this diagram, you see our solar system — a family of planets orbiting the Sun. The planets, from Mercury closest to the Sun to Neptune on the outer edge, follow their paths, or orbits, around our star. These planets are familiar to us because they belong to our solar system.',
        'heading': 'Introduction'
    },
    {
        'heading': 'The Star in Solar System',
        'text': 'Just like how sun is our star, for a planet to be an exoplanet, it has to revolve around a star like earth, jupiter, etc. Its not compulsory that there is only one star, exoplanets can also revolve around two or more than two stars. Imagine having two suns!'
    },
    {
        'heading': 'Habitable Zones',
        'text': 'Notice in the diagram that Earth is in a zone where liquid water can exist. This region is called the "habitable zone." Around distant stars, exoplanets also have habitable zones, and astronomers are particularly interested in planets that orbit within these regions. These exoplanets might have the right conditions for life, just like Earth.'
    },
    {
        'heading': 'The HUGE numbers',
        'text': 'There are around more than 5700 confirmed exoplanets and thousands more waiting for confirmation. It is believed that every star in the galaxy has atleast one exoplanet revolving around it. So we can imagine around billion exoplanets that exists.'
    },
    {
        'heading': 'Why do we study exoplanets?',
        'text': 'We study exoplanets to understand how planets form. We can understand how planets form and evolve, which could help us find planets that are similar to Earth. Studying exoplanets can also help us find other planets that could support life, similar to Earth.'
    }
];

let i = 1;
let text = document.getElementById('text');
let heading = document.getElementById('heading');
let button = document.getElementById('next');
let back = document.getElementById('back');

text.innerHTML = story[0]['text'];
heading.innerHTML = story[0]['heading'];
back.style.display = 'none'; // Hide the back button initially

back.addEventListener('click', () => {
    if (i > 1) {
        i--;
        heading.innerText = story[i-1]['heading'];
        text.innerText = story[i-1]['text'];
        if (i == 1) back.style.display = 'none';
        button.innerText = 'Next';
    }
});

button.addEventListener('click', () => {    
    if (i == story.length) {
        window.location.href = '/home';
    } else {
        back.style.display = 'block';
        heading.innerText = story[i]['heading'];
        text.innerText = story[i]['text'];
        i++;
        if (i == story.length) {
            button.innerText = 'Finish';
        }
    }
});