function toggleMenu() {
    const nav = document.getElementById('mobile-nav');
    nav.classList.toggle('hidden');
}



let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        // Scrolling down
        navbar.classList.add('py-2');
        navbar.classList.remove('py-4');
    } else {
        // Scrolling up
        navbar.classList.add('py-4');
        navbar.classList.remove('py-2');
    }

    lastScrollY = currentScrollY;
})



//Sign Up//

const form = document.getElementById('signupForm');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;

  const response = await fetch('/send-verification-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  alert(data.message || 'Check your email for the verification code!');
  if (data.message) {
    window.location.href = `/Verifyemail.html?email=${email}`;
  }
});
