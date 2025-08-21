// Simple chat composer logic: append message, simulate a reply
(function () {
    const form = document.getElementById('composer');
    const input = document.getElementById('composer-input');
    const messages = document.getElementById('messages');

    function appendMessage(text, role = 'bot') {
        const el = document.createElement('div');
        el.className = 'message ' + (role === 'user' ? 'user' : 'bot');
        el.textContent = text;
        messages.appendChild(el);
        messages.scrollTop = messages.scrollHeight;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const v = input.value.trim();
        if (!v) return;
        appendMessage(v, 'user');
        input.value = '';
        setTimeout(() => {
            appendMessage('Auto-reply: I received "' + v + '"', 'bot');
        }, 700);
    });

    // menu toggle for mobile: open sidebar full-screen
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            // only toggle on small viewports
            if (window.innerWidth <= 899) {
                sidebar.classList.toggle('open');
            }
        });
        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (window.innerWidth <= 899) {
                    sidebar.classList.remove('open');
                }
            });
        }
        // close sidebar when clicking outside it on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 899 && sidebar.classList.contains('open')) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }
})();
