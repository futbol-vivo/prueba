document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const logoutBtn = document.getElementById("logoutBtn");
    const channelsContainer = document.getElementById("channels-container");

    // Lista de canales (Se puede ampliar fácilmente)
    const channels = [
        { id: "accion", name: "Canal Acción", img: "accion.jpg", url: "https://www.youtube.com/embed/tgbNymZ7vqY" },
        { id: "deportes", name: "Canal Deportes", img: "deportes.jpg", url: "https://www.youtube.com/embed/tgbNymZ7vqY" },
        { id: "noticias", name: "Canal Noticias", img: "noticias.jpg", url: "https://www.youtube.com/embed/tgbNymZ7vqY" },
        // Agrega más canales aquí
    ];

    // Generar canales en la página de inicio
    if (channelsContainer) {
        channels.forEach(channel => {
            const channelCard = document.createElement("div");
            channelCard.classList.add("channel-card");
            channelCard.innerHTML = `
                <img src="${channel.img}" alt="${channel.name}">
                <a href="channel.html?channel=${channel.id}">${channel.name}</a>
            `;
            channelsContainer.appendChild(channelCard);
        });
    }

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

    // Página de canal
    if (window.location.pathname.includes("channel.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const channelId = urlParams.get("channel");
        const channel = channels.find(c => c.id === channelId);
        if (channel) {
            document.getElementById("channelTitle").textContent = channel.name;
            document.getElementById("channelIframe").src = channel.url;
        }
    }
});

