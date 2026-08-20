/* =================================================================
   INTERACTIVE LOGIC: PREMIUM BUGIS DIGITAL WEDDING INVITATION
   ================================================================= */

// 1. CONFIGURATION BLOCK (EASY TO CUSTOMIZE)
const CONST_GROOM_NICKNAME = "Ramli";

const WEDDING_CONFIG = {
    weddingDate: "2026-08-24T09:00:00+08:00", // Format: YYYY-MM-DDTHH:mm:ss+timezone
    couple: {
        groom: {
            nickname: "Ramli",
            fullName: "Ramli S.H.",
            father: "Bapak Nawir",
            mother: "Ibu Simra",
            instagram: "Moh_ennur",
            photo: "groom.webp"
        },
        bride: {
            nickname: "Hanum",
            fullName: "Hanum Salsabiela Marsyidi",
            father: "Bapak Muhammad Marsyidi (Alm)",
            mother: "Ibu Hj. Indra Purnamasari",
            instagram: "inishaaal",
            photo: "bride.webp"
        }
    },
    events: {
        akad: {
            date: "Senin, 24 Agustus 2026",
            time: "09.00 WITA (Pagi) - Selesai",
            locationName: "Dusun Bone 1",
            address: "Tinigi Kecamatan Galang",
            mapUrl: "https://maps.app.goo.gl/i6n5ymG64McpqtK39?g_st=atm",
            calendarTitle: "Akad Nikah Ramli & Hanum",
            calendarStart: "2026-08-24T09:00:00"
        },
        resepsi: {
            date: "Jum'at, 28 Agustus 2026",
            time: "19.00 WITA - Selesai",
            locationName: "Kediaman Mempelai Wanita",
            address: "Hanum Salsabiela Marsyidi",
            mapUrl: "https://maps.app.goo.gl/i6n5ymG64McpqtK39?g_st=atm",
            calendarTitle: "Resepsi Pernikahan Ramli & Hanum",
            calendarStart: "2026-08-28T19:00:00"
        }
    },
    gifts: [
        {
            bankName: "BANK MANDIRI",
            accountNumber: "9000027172791",
            accountHolder: "a.n. Ramli",
            id: "bank-acc-1"
        }
    ],
    // Array of 12 gallery images
    gallery: [
        { src: "g1.jpg", caption: "Kebersamaan Ramli & Hanum" },
        { src: "g2.jpg", caption: "Senyuman Hangat Hari Bahagia" },
        { src: "g3.jpg", caption: "Momen Akad Nikah yang Sakral" },
        { src: "g4.jpg", caption: "Adat Bugis yang Agung" },
        { src: "g5.jpg", caption: "Pandangan Penuh Kasih" },
        { src: "g6.jpg", caption: "Langkah Pertama Bersama" },
        { src: "g7.jpg", caption: "Dalam Balutan Busana Tradisional" },
        { src: "g8.jpg", caption: "Kehangatan Cinta & Keluarga" },
        { src: "g9.jpg", caption: "Janji Suci di Hari Bahagia" },
        { src: "g10.jpg", caption: "Senyum Manis Pengantin" },
        { src: "g11.jpg", caption: "Melangkah Menuju Masa Depan" },
        { src: "g12.jpg", caption: "Terima Kasih Atas Doa Restu Anda" }
    ],
    googleSheetUrl: ""
};

document.addEventListener("DOMContentLoaded", () => {
    
    // =================================================================
    // 2. PARSE GUEST NAME FROM URL (SHOWN ON COVER 2)
    // =================================================================
    const parseGuestName = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const guestParam = urlParams.get("to") || urlParams.get("u") || urlParams.get("nama");
        const guestNameEl = document.getElementById("guest-name-cover2");
        
        if (guestNameEl) {
            if (guestParam) {
                // Replace pluses or clean string
                const cleanedName = guestParam.replace(/\+/g, " ").trim();
                guestNameEl.textContent = cleanedName;
            } else {
                guestNameEl.textContent = "Tamu Undangan";
            }
        }
    };
    parseGuestName();

    // =================================================================
    // 3. CONTINUOUS DRAWING REVEAL FOR "UNDANGAN" (NO TYPING CURSOR)
    // =================================================================
    const initTypewriter = () => {
        const textContainer = document.getElementById("typewriter-text");
        const ovalFrame = document.getElementById("oval-frame");
        
        if (textContainer) {
            // Set the full text directly
            textContainer.textContent = "Undangan";
            
            // Trigger the continuous smooth left-to-right carving/drawing animation
            setTimeout(() => {
                textContainer.classList.add("reveal-active");
            }, 500);
        }
        
        // Gently and slowly fade in the oval frame as the text finishes drawing
        setTimeout(() => {
            if (ovalFrame) {
                ovalFrame.classList.add("show");
            }
        }, 2000);
    };
    initTypewriter();

    // =================================================================
    // 4. SLIDE TO UNLOCK LOGIC (REVEALS COVER 2)
    // =================================================================
    let slideshowInterval; // Variable to hold slideshow timer
    
    const initSlider = () => {
        const slider = document.getElementById("lock-slider");
        const handle = document.getElementById("slider-handle");
        const progress = document.getElementById("slider-progress");
        const coverScreen = document.getElementById("cover-screen");
        const coverScreen2 = document.getElementById("cover-screen-2");
        
        let isDragging = false;
        let startX = 0;
        let currentX = 0;
        let maxDrag = slider.clientWidth - handle.clientWidth - 6; // Subtract padding/border
        
        // Recalculate max drag on resize
        window.addEventListener("resize", () => {
            maxDrag = slider.clientWidth - handle.clientWidth - 6;
        });

        // Touch Events (Mobile)
        handle.addEventListener("touchstart", (e) => {
            isDragging = true;
            startX = e.touches[0].clientX - currentX;
            handle.style.transition = "none";
            progress.style.transition = "none";
        }, { passive: true });

        window.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            let touchX = e.touches[0].clientX - startX;
            
            // Constrain within bounds
            if (touchX < 0) touchX = 0;
            if (touchX > maxDrag) touchX = maxDrag;
            
            currentX = touchX;
            handle.style.transform = `translateX(${currentX}px)`;
            
            // Set width of gold progress overlay
            progress.style.width = `${currentX + handle.clientWidth / 2}px`;
            
            // Check if unlocked (at least 92% of the slider path)
            if (currentX >= maxDrag * 0.92) {
                isDragging = false;
                unlockInvitation();
            }
        }, { passive: true });

        window.addEventListener("touchend", () => {
            if (!isDragging) return;
            isDragging = false;
            resetSlider();
        });

        // Mouse Events (Desktop)
        handle.addEventListener("mousedown", (e) => {
            isDragging = true;
            startX = e.clientX - currentX;
            handle.style.transition = "none";
            progress.style.transition = "none";
            e.preventDefault();
        });

        window.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            let mouseX = e.clientX - startX;
            
            if (mouseX < 0) mouseX = 0;
            if (mouseX > maxDrag) mouseX = maxDrag;
            
            currentX = mouseX;
            handle.style.transform = `translateX(${currentX}px)`;
            progress.style.width = `${currentX + handle.clientWidth / 2}px`;
            
            if (currentX >= maxDrag * 0.92) {
                isDragging = false;
                unlockInvitation();
            }
        });

        window.addEventListener("mouseup", () => {
            if (!isDragging) return;
            isDragging = false;
            resetSlider();
        });

        const resetSlider = () => {
            currentX = 0;
            handle.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
            progress.style.transition = "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
            handle.style.transform = "translateX(0px)";
            progress.style.width = "0px";
        };

        const unlockInvitation = () => {
            // Lock handles & full progress bar representation
            handle.style.transform = `translateX(${maxDrag}px)`;
            progress.style.width = "100%";
            
            // Animate Cover 1 out
            coverScreen.classList.add("unlocked");
            
            // Reveal Cover 2
            if (coverScreen2) {
                coverScreen2.classList.remove("hidden");
                // Start Cover 2 image slideshow
                startSlideshow();
            }
        };
    };
    initSlider();

    // =================================================================
    // 4B. COVER 2 & MAIN INVITATION PHOTO SLIDESHOW LOGIC (G1 - G12)
    // =================================================================

    const startSlideshow = () => {
        const slides = document.querySelectorAll("#cover-screen-2 .slide");
        if (slides.length <= 1) return;
        
        let activeIndex = 0;
        slideshowInterval = setInterval(() => {
            slides[activeIndex].classList.remove("active");
            activeIndex = (activeIndex + 1) % slides.length;
            slides[activeIndex].classList.add("active");
        }, 3500); // Cross-fade every 3.5 seconds
    };

    let mainSlideshowInterval;
    const startMainSlideshow = () => {
        const slides = document.querySelectorAll("#main-slideshow .slide");
        if (slides.length <= 1) return;
        
        let activeIndex = 0;
        if (mainSlideshowInterval) clearInterval(mainSlideshowInterval);
        
        mainSlideshowInterval = setInterval(() => {
            slides[activeIndex].classList.remove("active");
            activeIndex = (activeIndex + 1) % slides.length;
            slides[activeIndex].classList.add("active");
        }, 3500); // Cross-fade every 3.5 seconds
    };

    // =================================================================
    // 4C. COVER 2 "BUKA UNDANGAN" BUTTON LOGIC (REVEALS MAIN PAGE & PLAYS MUSIC)
    // =================================================================
    const playBackgroundMusic = () => {
        const bgMusic = document.getElementById("bg-music");
        const audioBtn = document.getElementById("audio-toggle-btn");
        
        if (bgMusic) {
            bgMusic.volume = 0.5; // Moderate pleasant volume
            bgMusic.play().then(() => {
                audioBtn.classList.add("playing");
            }).catch(err => {
                console.log("Audio autoplay blocked by browser, waiting for user toggle:", err);
            });
        }
    };

    const initOpenInvitationButton = () => {
        const btnOpen = document.getElementById("btn-open-invitation");
        const coverScreen2 = document.getElementById("cover-screen-2");
        const mainContent = document.getElementById("main-content");
        const mainSlideshow = document.getElementById("main-slideshow");
        const audioControl = document.getElementById("audio-control");
        
        if (btnOpen) {
            btnOpen.addEventListener("click", () => {
                // Stop Cover 2 slideshow interval to optimize memory & performance
                if (slideshowInterval) {
                    clearInterval(slideshowInterval);
                }
                
                // Animate Cover 2 out
                if (coverScreen2) {
                    coverScreen2.classList.add("unlocked");
                }
                
                // Reveal background photo slideshow (g1 - g12)
                if (mainSlideshow) {
                    mainSlideshow.classList.remove("hidden");
                    startMainSlideshow();
                }
                
                // Reveal main page & floating audio controls
                if (mainContent) {
                    mainContent.classList.remove("hidden");
                    setTimeout(() => {
                        mainContent.classList.add("show");
                        if (audioControl) {
                            audioControl.classList.remove("hidden");
                        }
                        // Start playing the background music
                        playBackgroundMusic();
                        
                        // Reveal hero section immediately on page open
                        const heroElements = document.querySelectorAll("#hero, #hero .scroll-reveal, #hero .scroll-reveal-left, #hero .scroll-reveal-right, #hero .section-title-container");
                        heroElements.forEach(el => {
                            el.classList.add("revealed");
                        });
                        
                        // Start tracking elements for scroll reveal animations on scroll
                        initScrollReveal();
                    }, 100);
                }
            });
        }
    };
    initOpenInvitationButton();

    // =================================================================
    // 5. FLOATING MUSIC TOGGLE
    // =================================================================
    const initAudioToggle = () => {
        const audioBtn = document.getElementById("audio-toggle-btn");
        const bgMusic = document.getElementById("bg-music");
        
        audioBtn.addEventListener("click", () => {
            if (bgMusic.paused) {
                bgMusic.play();
                audioBtn.classList.add("playing");
                audioBtn.innerHTML = '<i class="fas fa-music"></i>';
            } else {
                bgMusic.pause();
                audioBtn.classList.remove("playing");
                audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    };
    initAudioToggle();

    // =================================================================
    // 6. WEDDING COUNTDOWN TIMER (WITH ROLLING DIGITS EFFECT)
    // =================================================================
    const initCountdown = () => {
        const targetDate = new Date(WEDDING_CONFIG.weddingDate).getTime();
        
        // Helper to scroll a single digit strip (0-9)
        const updateRollingDigit = (stripId, digitValue) => {
            const strip = document.getElementById(stripId);
            if (strip) {
                // Since the strip has 10 digits (0-9), each digit takes exactly 10% of height.
                // We multiply the digit value by 10 to get the scroll percentage.
                const percentage = digitValue * 10;
                strip.style.transform = `translateY(-${percentage}%)`;
            }
        };
        
        // Helper to update a 2-digit rolling box
        const updateRollingNumber = (numberPrefix, value) => {
            const safeValue = Math.max(0, Math.floor(value));
            const tens = Math.floor(safeValue / 10);
            const units = safeValue % 10;
            updateRollingDigit(`${numberPrefix}-tens`, tens);
            updateRollingDigit(`${numberPrefix}-units`, units);
        };

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                clearInterval(countdownInterval);
                updateRollingNumber("days", 0);
                updateRollingNumber("hours", 0);
                updateRollingNumber("minutes", 0);
                updateRollingNumber("seconds", 0);
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Call our rolling updates
            updateRollingNumber("days", days);
            updateRollingNumber("hours", hours);
            updateRollingNumber("minutes", minutes);
            updateRollingNumber("seconds", seconds);
        };
        
        // Run once immediately on load
        updateTimer();
        
        // Run every second
        const countdownInterval = setInterval(updateTimer, 1000);
    };
    initCountdown();

    // =================================================================
    // 7. LIGHTBOX GALLERY LOGIC
    // =================================================================
    const initLightbox = () => {
        const modal = document.getElementById("lightbox-modal");
        const modalImg = document.getElementById("lightbox-img");
        const captionText = document.getElementById("lightbox-caption");
        const closeBtn = document.querySelector(".lightbox-close");
        const prevBtn = document.querySelector(".lightbox-prev");
        const nextBtn = document.querySelector(".lightbox-next");
        const galleryItems = document.querySelectorAll(".gallery-item");
        
        let activeIndex = 0;
        const totalImages = WEDDING_CONFIG.gallery.length;

        // Open modal
        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                const index = parseInt(item.getAttribute("data-index"));
                openImage(index);
            });
        });

        const openImage = (index) => {
            activeIndex = index;
            const imgData = WEDDING_CONFIG.gallery[index];
            
            modal.classList.add("show");
            modalImg.src = imgData.src;
            captionText.textContent = imgData.caption;
            
            // Lock body scroll
            document.body.style.overflow = "hidden";
        };

        // Close modal
        const closeModal = () => {
            modal.classList.remove("show");
            document.body.style.overflow = "auto";
        };

        closeBtn.addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal || e.target === document.querySelector(".lightbox-content-wrapper")) {
                closeModal();
            }
        });

        // Navigation
        const showNext = () => {
            activeIndex = (activeIndex + 1) % totalImages;
            updateLightboxContent();
        };

        const showPrev = () => {
            activeIndex = (activeIndex - 1 + totalImages) % totalImages;
            updateLightboxContent();
        };

        const updateLightboxContent = () => {
            // CSS slide transition trigger helper
            modalImg.style.opacity = 0;
            setTimeout(() => {
                const imgData = WEDDING_CONFIG.gallery[activeIndex];
                modalImg.src = imgData.src;
                captionText.textContent = imgData.caption;
                modalImg.style.opacity = 1;
            }, 200);
        };

        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            showNext();
        });
        
        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            showPrev();
        });

        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            if (!modal.classList.contains("show")) return;
            
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
        });
    };
    initLightbox();

    // =================================================================
    // 8. RSVP & GUESTBOOK SYSTEM (LOCALSTORAGE INTEGRATION)
    // =================================================================
    const initGuestbook = () => {
        const rsvpForm = document.getElementById("rsvp-form");
        const commentsList = document.getElementById("comments-list");
        
        // Default mock wishes in case fetch fails or is not set up yet
        let wishes = JSON.parse(localStorage.getItem("wedding_wishes")) || [
            {
                name: "Daeng Malewa",
                status: "Hadir",
                message: "Salama' ki napada salama', Aznur dan Masna. Semoga bahtera rumah tangga kalian dipenuhi berkah (*barakka*) dari Allah SWT, dilimpahi sakinah, mawaddah, warahmah. Amin.",
                time: "2 jam yang lalu"
            },
            {
                name: "Hj. Andi Bau",
                status: "Hadir",
                message: "Selamat menempuh hidup baru anakku. Semoga pernikahan ini menyatukan dua keluarga besar dengan penuh cinta dan kedamaian.",
                time: "4 jam yang lalu"
            },
            {
                name: "Irwan Saputra",
                status: "Masih Ragu",
                message: "Selamat Aznur & Masna! Doa terbaik dari kami sekeluarga di Makassar, semoga dimudahkan segalanya sampai hari H nanti.",
                time: "1 hari yang lalu"
            }
        ];

        const renderComments = () => {
            // Clear current list except placeholder if list empty
            commentsList.innerHTML = "";
            
            if (wishes.length === 0) {
                commentsList.innerHTML = '<p class="text-muted text-center py-4">Belum ada ucapan. Jadilah yang pertama!</p>';
                return;
            }

            // Render wishes in reverse chronological order
            wishes.slice().reverse().forEach(wish => {
                const commentItem = document.createElement("div");
                commentItem.className = "comment-item";
                
                // Set badge color based on status
                let badgeClass = "status-hadir";
                if (wish.status === "Masih Ragu") badgeClass = "status-ragu";
                if (wish.status === "Tidak Hadir") badgeClass = "status-tidak";

                commentItem.innerHTML = `
                    <div class="comment-header">
                        <span class="comment-author">${escapeHTML(wish.name)}</span>
                        <span class="badge ${badgeClass}">${wish.status}</span>
                    </div>
                    <p class="comment-text">${escapeHTML(wish.message)}</p>
                    <span class="comment-time">${wish.time}</span>
                `;
                commentsList.appendChild(commentItem);
            });
        };

        const escapeHTML = (str) => {
            return str.replace(/[&<>'"]/g, 
                tag => ({
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    "'": '&#39;',
                    '"': '&quot;'
                }[tag] || tag)
            );
        };

        // Fetch wishes from Google Sheets if configured
        const loadWishesFromGoogleSheets = () => {
            if (!WEDDING_CONFIG.googleSheetUrl) {
                renderComments();
                return;
            }

            fetch(WEDDING_CONFIG.googleSheetUrl)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        wishes = data;
                        renderComments();
                    }
                })
                .catch(err => {
                    console.error("Gagal memuat ucapan dari Google Sheets:", err);
                    renderComments();
                });
        };

        // Form Submission
        rsvpForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById("form-name").value.trim();
            const statusSelect = document.getElementById("form-status").value;
            const messageInput = document.getElementById("form-message").value.trim();
            
            if (!nameInput || !statusSelect || !messageInput) return;

            const newWish = {
                name: nameInput,
                status: statusSelect,
                message: messageInput,
                time: "Baru saja"
            };

            if (WEDDING_CONFIG.googleSheetUrl) {
                // Submit to Google Sheets
                const submitBtn = rsvpForm.querySelector("button[type='submit']");
                const originalBtnHTML = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

                const params = new URLSearchParams();
                params.append("name", nameInput);
                params.append("status", statusSelect);
                params.append("message", messageInput);

                fetch(WEDDING_CONFIG.googleSheetUrl, {
                    method: "POST",
                    mode: "no-cors",
                    body: params,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                .then(() => {
                    showToast("Ucapan & RSVP berhasil dikirim!");
                    rsvpForm.reset();
                    // Give it a tiny delay for spreadsheet sync before reloading
                    setTimeout(loadWishesFromGoogleSheets, 1500);
                })
                .catch(err => {
                    console.error("Gagal mengirim ke Google Sheets:", err);
                    // Fallback to local storage on error
                    wishes.push(newWish);
                    localStorage.setItem("wedding_wishes", JSON.stringify(wishes));
                    renderComments();
                    showToast("Ucapan terkirim (Penyimpanan Lokal)!");
                    rsvpForm.reset();
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                });
            } else {
                // Fallback to local storage if not configured
                wishes.push(newWish);
                localStorage.setItem("wedding_wishes", JSON.stringify(wishes));
                renderComments();
                rsvpForm.reset();
                showToast("Ucapan & RSVP berhasil dikirim!");
            }
        });

        // Initial load
        loadWishesFromGoogleSheets();
    };
    initGuestbook();

    // =================================================================
    // 9. COPY BANK ACCOUNT TO CLIPBOARD
    // =================================================================
    const initCopyGifts = () => {
        const copyBtns = document.querySelectorAll(".btn-copy");
        
        copyBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const targetId = btn.getAttribute("data-target");
                const accountText = document.getElementById(targetId).textContent;
                
                // Clean the separators (optional, we copy exactly what is shown)
                const cleanAccount = accountText.replace(/-/g, "").trim();
                
                navigator.clipboard.writeText(cleanAccount).then(() => {
                    showToast("Nomor rekening berhasil disalin!");
                    
                    // Add temporary visual feedback on button
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
                    btn.classList.add("copied");
                    
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.classList.remove("copied");
                    }, 2000);
                }).catch(err => {
                    console.error("Failed to copy text: ", err);
                    // Fallback using older execCommand method
                    const tempInput = document.createElement("input");
                    tempInput.value = cleanAccount;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand("copy");
                    document.body.removeChild(tempInput);
                    showToast("Nomor rekening berhasil disalin!");
                });
            });
        });
    };
    initCopyGifts();

    // Helper to display floating Toast
    const showToast = (message) => {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    };

    // =================================================================
    // 10. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    // =================================================================
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll(
            ".section, .hero-section, .mempelai-section, .acara-section, .galeri-section, .rsvp-section, .kado-section, .wedding-footer, .scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-fade, .section-title-container, .couple-card, .groom-card, .bride-card, .event-card, .akad-card, .mapparola-card, .resepsi-card, .bugis-quote-box, .rsvp-form-container, .guestbook-list-container, .gift-card, .gallery-item, .gallery-quote-container, .gallery-marquee-container, .footer-ornament"
        );

        const observerOptions = {
            root: null,
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target); // Stay permanently revealed once triggered!
                }
            });
        }, observerOptions);
        
        revealElements.forEach(el => {
            observer.observe(el);
        });

        // Trigger reveal for elements already in viewport on load
        setTimeout(() => {
            revealElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 30 && rect.bottom > 0) {
                    el.classList.add("revealed");
                }
            });
        }, 150);
    };

    // =================================================================
    // 11. ADD TO CALENDAR LINK LOGIC
    // =================================================================
    const initCalendarLinks = () => {
        const calBtns = document.querySelectorAll(".btn-add-calendar");
        
        calBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const title = btn.getAttribute("data-title");
                const startStr = btn.getAttribute("data-start");
                const loc = btn.getAttribute("data-loc");
                
                // Formulate simple Google Calendar URL
                // Format: YYYYMMDDTHHMMSSZ
                const startDate = new Date(startStr);
                const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // add 2 hours
                
                const formatCalendarDate = (date) => {
                    return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
                };
                
                const datesParam = `${formatCalendarDate(startDate)}/${formatCalendarDate(endDate)}`;
                
                const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${datesParam}&details=${encodeURIComponent("Pernikahan Suci Aznur & Masna - Mohon doa restu Anda.")}&location=${encodeURIComponent(loc)}&sf=true&output=xml`;
                
                window.open(googleCalUrl, "_blank");
            });
        });
    };
    initCalendarLinks();

    // =================================================================
    // 12. SMOOTH PARALLAX SCROLL FOR COUPLE IMAGES (WALKING MOTION)
    // =================================================================
    const initCoupleParallax = () => {
        const coupleImages = document.querySelectorAll(".couple-img");
        
        const updateParallax = () => {
            coupleImages.forEach(img => {
                const rect = img.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                
                // Check if the image is visible in the viewport
                if (rect.top < viewportHeight && rect.bottom > 0) {
                    const totalPath = viewportHeight + rect.height;
                    const currentPos = viewportHeight - rect.top;
                    const percent = currentPos / totalPath; // 0 to 1
                    
                    // Translate vertically from -18px to +18px as we scroll
                    const maxTravel = 18;
                    const translateY = (percent * maxTravel * 2) - maxTravel; // -18px to +18px
                    
                    img.style.transform = `scale(1.05) translateY(${translateY}px)`;
                }
            });
        };
        
        window.addEventListener("scroll", updateParallax, { passive: true });
        // Initial run
        updateParallax();
    };
    initCoupleParallax();

    // =================================================================
    // 13. AUTO-START MAIN INVITATION SLIDESHOW IF VISIBLE
    // =================================================================
    const mainContentEl = document.getElementById("main-content");
    if (mainContentEl && !mainContentEl.classList.contains("hidden")) {
        startMainSlideshow();
    }

});
