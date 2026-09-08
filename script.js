document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURACIÓN
       ===================================================== */

    const PHONE = "";
    const WHATSAPP = "";


    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    const heroButtons = document.getElementById("heroButtons");

    const navLinks = document.querySelectorAll("#navMenu a");
    const sections = document.querySelectorAll("section[id]");

    const phoneLinks = document.querySelectorAll(".js-phone");
    const whatsappLinks = document.querySelectorAll(".js-whatsapp");


    /* =====================================================
       TOAST / AVISO
       ===================================================== */

    function toast(message) {

        let toastElement = document.getElementById("toast");

        if (!toastElement) {

            toastElement = document.createElement("div");

            toastElement.id = "toast";

            Object.assign(toastElement.style, {

                position: "fixed",
                left: "50%",
                bottom: "80px",
                transform: "translateX(-50%)",

                zIndex: "5000",

                padding: "12px 17px",

                borderRadius: "10px",

                background: "#171d21",

                color: "#ffffff",

                fontSize: "11px",

                fontWeight: "800",

                textAlign: "center",

                maxWidth: "calc(100% - 30px)",

                border: "1px solid rgba(255,255,255,.10)",

                boxShadow: "0 12px 35px rgba(0,0,0,.45)"

            });

            document.body.appendChild(toastElement);

        }

        toastElement.textContent = message;

        clearTimeout(toastElement._timeout);

        toastElement._timeout = setTimeout(() => {

            toastElement.remove();

        }, 2800);

    }


    /* =====================================================
       TELÉFONO
       ===================================================== */

    phoneLinks.forEach(link => {

        if (PHONE.trim() !== "") {

            link.href = `tel:+${PHONE}`;

        } else {

            link.href = "#";

            link.addEventListener("click", event => {

                event.preventDefault();

                toast(
                    "El número de teléfono todavía no está configurado."
                );

            });

        }

    });


    /* =====================================================
       WHATSAPP
       ===================================================== */

    whatsappLinks.forEach(link => {

        if (WHATSAPP.trim() !== "") {

            link.href = `https://wa.me/${WHATSAPP}`;

            link.target = "_blank";

            link.rel = "noopener noreferrer";

        } else {

            link.href = "#";

            link.addEventListener("click", event => {

                event.preventDefault();

                toast(
                    "El número de WhatsApp todavía no está configurado."
                );

            });

        }

    });


    /* =====================================================
       MENÚ MÓVIL
       ===================================================== */

    function closeMenu() {

        if (!navMenu || !menuBtn) return;

        navMenu.classList.remove("open");

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        const icon = menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    }


    function openMenu() {

        if (!navMenu || !menuBtn) return;

        navMenu.classList.add("open");

        menuBtn.setAttribute(
            "aria-expanded",
            "true"
        );

        const icon = menuBtn.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        }

    }


    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", event => {

            event.stopPropagation();

            const isOpen =
                navMenu.classList.contains("open");

            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        });


        navLinks.forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

    }


    /* Cerrar al hacer clic fuera */

    document.addEventListener("click", event => {

        if (!navMenu || !menuBtn) return;

        if (
            navMenu.classList.contains("open") &&
            !navMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            closeMenu();

        }

    });


    /* Cerrar con ESC */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });


    /* =====================================================
       BOTONES FIJOS DEL HERO
       ===================================================== */

    let fixedPoint = 0;


    function calculateFixedPoint() {

        if (!heroButtons) return;

        const wasFixed =
            heroButtons.classList.contains("is-fixed");


        if (wasFixed) {

            heroButtons.classList.remove("is-fixed");

        }


        fixedPoint =
            heroButtons.getBoundingClientRect().top +
            window.scrollY +
            35;


        if (wasFixed) {

            heroButtons.classList.add("is-fixed");

        }

    }


    function updateFixedButtons() {

        if (!heroButtons) return;

        heroButtons.classList.toggle(
            "is-fixed",
            window.scrollY > fixedPoint
        );

    }


    if (heroButtons) {

        calculateFixedPoint();

        updateFixedButtons();


        window.addEventListener(
            "scroll",
            updateFixedButtons,
            { passive: true }
        );


        window.addEventListener(
            "resize",
            () => {

                calculateFixedPoint();

                updateFixedButtons();

            }
        );

    }


    /* =====================================================
       SECCIÓN ACTIVA DEL MENÚ
       ===================================================== */

    function updateActiveSection() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionBottom =
                section.offsetTop +
                section.offsetHeight -
                150;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection = section.id;

            }

        });


        navLinks.forEach(link => {

            const target =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === `#${currentSection}`
            );

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveSection,
        { passive: true }
    );


    updateActiveSection();


    /* =====================================================
       LIGHTBOX GALERÍA
       ===================================================== */

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");


    const galleryItems =
        document.querySelectorAll(".gallery-item");


    galleryItems.forEach(item => {

        item.addEventListener("click", () => {

            if (!lightbox || !lightboxImage) return;

            const image =
                item.dataset.image;

            if (!image) return;


            lightboxImage.src = image;

            lightbox.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");

        document.body.style.overflow = "";


        setTimeout(() => {

            if (lightboxImage) {

                lightboxImage.src = "";

            }

        }, 250);

    }


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       ESC PARA CERRAR LIGHTBOX
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                lightbox?.classList.contains("active")
            ) {

                closeLightbox();

            }

        }
    );


    /* =====================================================
       AÑO AUTOMÁTICO
       ===================================================== */

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       HEADER AL HACER SCROLL
       ===================================================== */

    const header =
        document.querySelector(".header");


    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


});
