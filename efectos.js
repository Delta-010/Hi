const EMOJIS = ["💖","💗", "💕", "💞"];

document.addEventListener("DOMContentLoaded", () => {
    const botonEntrar = document.getElementById("botonentrar");
    const ventanaInicial = document.querySelector(".ventanainicial");
    const ventana2 = document.querySelector(".ventana2");
    const finalBoxMarkup = `
        <div id="final">
        <div class="big-heart">💙</div>
        <p class="final-text">Usted es lo mejor que me ha pasado 💕</p>
        <button id="reiniciar">Volver a ver la magia</button>
        </div>
    `;
    if (!document.getElementById("final")) {
        ventana2.insertAdjacentHTML("beforeend", finalBoxMarkup);
    }

    const finalBox = document.getElementById("final");
    const reiniciarBtn = () => document.getElementById("reiniciar");

    function limpiarCorazones() {
        document.querySelectorAll(".heart-wrap").forEach(n => n.remove());
    }

    function crearParticula({leftPercent, sizePx, driftPx, delayMs, durationMs, emoji}) {
        const wrap = document.createElement("div");
        wrap.className = "heart-wrap";
        wrap.style.left = leftPercent + "%";
        wrap.style.animationDuration = (durationMs / 1000) + "s";
        wrap.style.animationDelay = (delayMs / 1000) + "s";
        wrap.style.opacity = 1 - Math.random() * 0.2;

        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerText = emoji;
        heart.style.fontSize = sizePx + "px";
        heart.style.setProperty("--drift", driftPx + "px");
        const sideDur = (1.4 + Math.random() * 1.6).toFixed(2);
        const sideDelay = (Math.random() * 0.8).toFixed(2);
        heart.style.animationDuration = `${sideDur}s, ${sideDur}s`;
        heart.style.animationDelay = `${sideDelay}s, ${sideDelay}s`;
        heart.style.transform = `rotate(${(Math.random() * 20 - 10).toFixed(1)}deg)`;
        
        wrap.appendChild(heart);
        document.body.appendChild(wrap);

        wrap.addEventListener("animationend", (ev) => {
        if (ev.animationName === "floatUp") {
            wrap.remove();
        }
        });
    }

    function lanzarAnimacionCantidad(total = 60) {
        limpiarCorazones();
        finalBox.style.display = "none";

        const baseDuration = 4800; 
        for (let i = 0; i < total; i++) {
        const delayMs = Math.random() * 900;
        const left = 5 + Math.random() * 90;
        const size = 24 + Math.random() * 42;
        const drift = (Math.random() * 140 - 70);
        const duration = baseDuration + Math.random() * 3200;

        setTimeout(() => {
            crearParticula({
            leftPercent: left,
            sizePx: Math.round(size),
            driftPx: Math.round(drift),
            delayMs: 0,
            durationMs: Math.round(duration),
            emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
            });
        }, delayMs);
        }

        const esperaFinal = baseDuration;
        setTimeout(() => {
        finalBox.style.display = "block";
        const btn = reiniciarBtn();
        if (btn) {
            btn.replaceWith(btn.cloneNode(true));
            const nuevo = reiniciarBtn();
            nuevo.addEventListener("click", () => {
            lanzarAnimacionCantidad(70);
            });
        }
        }, esperaFinal);
    }

    botonEntrar.addEventListener("click", () => {
        ventanaInicial.style.display = "none";
        ventana2.style.display = "block";
        lanzarAnimacionCantidad(60);
    });

    document.addEventListener("click", (e) => {
        if (e.target && e.target.id === "reiniciar") {
        lanzarAnimacionCantidad(70);
        }
    });

});
