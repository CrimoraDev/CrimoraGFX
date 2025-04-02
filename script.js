async function getData(name) {
    try {
        const response = await fetch("data.json");
        const data = await response.json();

        if (data[name] !== undefined) {
            return data[name];
        } else {
            console.log("Invalid Key");
            return null;
        }
    } catch (error) {
        console.log("Error:", error);
        return null;
    }
}

// Typewriter
function typewrite(text, elementId, speed) {
    let index = 0;
    const element = document.getElementById(elementId);

    if (!element) return;

    element.innerHTML = "";

    function typewriter() {
        if (index < text.length) {
            document.getElementById(elementId).innerHTML += text.charAt(index);
            index ++;
            setTimeout(typewriter, speed)
        }
    }
    typewriter();
}

// Rolling number
function rollNumber(elementId, start, end, duration, suffix) {
    let startTime;

    function animate(currentTime) {
        if (!startTime) startTime = currentTime
        let progress = (currentTime - startTime) / duration
        let value = Math.floor(progress * (end - start) + start)

        document.getElementById(elementId).textContent = value.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            document.getElementById(elementId).textContent = end.toLocaleString() + suffix;
        }
    }

    requestAnimationFrame(animate);
}

// Create Observer
function createObserver(target, callback) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(target);
}

// Toggle Menu Script
function toggleMenu(object) {
    const path = object.querySelector("svg path");
    const navButtons = document.querySelector(".nav-buttons");
    let closeIcon = "M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z";
    let openIcon = "M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z";
    path.setAttribute("d", path.getAttribute("d") === openIcon ? closeIcon : openIcon);
    navButtons.classList.toggle('top-[9%]')
}

// Attach animations on load
window.addEventListener("DOMContentLoaded", () => {
    const pandemoraLogo = document.getElementById('group-pandemora');
    const peacefulLogo = document.getElementById('group-peaceful');
    const firstGFX = document.getElementById('first-gfx')
    const stat1 = document.getElementById('stat1')
    const stat2 = document.getElementById('stat2')
    const stat3 = document.getElementById('stat3')

    // Home Page
    if (pandemoraLogo) {
        createObserver(document.getElementById('group-pandemora'), () => {
            typewrite("Pandemora", "group-pandemora", 100);
        });
    }

    if (peacefulLogo) {
        createObserver(document.getElementById('group-peaceful'), () => {
            typewrite("Peaceful Petals", "group-peaceful", 100);
        });
    }

    if (firstGFX) {
        createObserver(document.getElementById('first-gfx'), () => {
            typewrite("Started: Jun. 3rd, 2021", "first-gfx", 50);
        });
    }

    if (stat1) {
        createObserver(document.getElementById('stat1'), async () => {
            const commissions = await getData('commissions');        
            rollNumber("stat1", 0, commissions, 1000, '+');
        });
    }

    if (stat2) {
        createObserver(document.getElementById('stat2'), async () => {
            const experience = await getData('experience'); 
            rollNumber("stat2", 0, experience, 1000, '+');
        });
    }

    if (stat3) {
        createObserver(document.getElementById('stat2'), async () => {
            const response = await getData('responseTime'); 
            rollNumber("stat3", 0, response, 1000, ' Hours');
        });
    }
})