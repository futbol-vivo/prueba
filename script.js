document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const logoutBtn = document.getElementById("logoutBtn");

    // Función para verificar sesión
    function checkAuth() {
        if (!localStorage.getItem("user")) {
            window.location.href = "login.html";
        }
    }

    // Página de login
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "admin" && password === "1234") {
                localStorage.setItem("user", username);
                window.location.href = "index.html";
            } else {
                alert("Credenciales incorrectas");
            }
        });
    }

    // Página protegida
    if (window.location.pathname !== "/login.html") {
        checkAuth();
    }

    // Cerrar sesión
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("user");
            window.location.href = "login.html";
        });
    }

    // Página de canales
    if (window.location.pathname.includes("channel.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const channel = urlParams.get("channel");
        const channelTitle = document.getElementById("channelTitle");
        const channelContent = document.getElementById("channelContent");

        const channels = {
            accion: "Bienvenido al canal de Acción, disfruta de tus películas favoritas.",
            deportes: "Bienvenido al canal de Deportes, sigue los mejores eventos deportivos.",
            noticias: "Bienvenido al canal de Noticias, mantente informado."
        };

        if (channel && channels[channel]) {
            channelTitle.textContent = `Canal ${channel.charAt(0).toUpperCase() + channel.slice(1)}`;
            channelContent.textContent = channels[channel];
        } else {
            channelTitle.textContent = "Canal no encontrado";
            channelContent.textContent = "El canal solicitado no existe.";
        }
    }
});
