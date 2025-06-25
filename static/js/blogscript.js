
function setActive(index) {
    const navLinks = document.querySelectorAll('.navbar ul li a');
    for (let i = 0; i < navLinks.length; i++) {
        if (i === index) {
            navLinks[i].classList.add('active');
        } else {
            navLinks[i].classList.remove('active');
        }
    }
}