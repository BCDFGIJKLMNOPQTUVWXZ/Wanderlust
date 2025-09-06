const stars = document.querySelectorAll('.star');
const ratingInput = document.getElementById('rating-value');
let selectedRating = 0;

stars.forEach((star, idx) => {
    star.addEventListener('mouseover', () => {
        for(let i = 0; i <= idx; i++){
            stars[i].classList.add('hovered');
        }
    });

    star.addEventListener('mouseout', () => {
        stars.forEach(s => s.classList.remove('hovered'));
    });

    star.addEventListener('click', () => {
        selectedRating = parseInt(star.getAttribute('data-value'));
        ratingInput.value = selectedRating;

        stars.forEach((s, i) => {
            s.classList.remove('selected');
            if (i < selectedRating) {
                s.classList.add('selected');
            }
        });
    });
});