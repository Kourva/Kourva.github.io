// Github: Kourva

$(document).ready(async function() {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    $("#current-ip-area").attr("placeholder", "Your IP: " + data.ip);
});

async function getProxies() {
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://proxyspider-proxy-spider-proxies-v1.p.rapidapi.com/proxies.example.json',
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b99fbf92bamsh8f425725f1304e9p119c55jsn98dd1febc9d8',
            'X-RapidAPI-Host': 'proxyspider-proxy-spider-proxies-v1.p.rapidapi.com'
        }
    };

    // Remove existing cards
    const cards = document.querySelectorAll(".card");
    if (cards.length > 0) {
        for (let i = 0; i < cards.length; i++) {
            document.body.removeChild(cards[i]);
        }
    }

    // Add loader
    let loader = document.querySelector(".loader");
    if (!loader) {
        loader = document.createElement("div");
        loader.classList.add("loader");
        const span = document.createElement("span");
        loader.appendChild(span);
        document.body.appendChild(loader);
    }

    // Fetch new proxies from the API
    $.ajax(settings).done(function(response) {
        const proxies = response.data.proxies;

        // Sort proxies by response time
        proxies.sort((a, b) => {
            if (a.response_time === "fast" && b.response_time === "fast") {
                return 0;
            } else if (a.response_time === "fast") {
                return -1;
            } else if (b.response_time === "fast") {
                return 1;
            } else if (a.response_time === "mediumms" && b.response_time === "mediumms") {
                return 0;
            } else if (a.response_time === "mediumms") {
                return -1;
            } else if (b.response_time === "mediumms") {
                return 1;
            } else {
                return a.response_time - b.response_time;
            }
        });

        for (let i = 0; i < proxies.length; i++) {
            const proxy = proxies[i];
            const pingTime = proxy.response_time === "fast" ? "fast" : `${proxy.response_time}ms`;
            const card = createCard(proxy.ip, proxy.port, proxy.protocols.join('/'), `response time: ${pingTime}`, proxy.country_code);
            document.body.appendChild(card);

            // Add copy-to-clipboard functionality to the button on each card
            const button = card.querySelector('.card-button');
            button.addEventListener("click", function() {
                copyToClipboard(`${proxy.ip}:${proxy.port}`);
            });
        }

        // Remove loader
        document.body.removeChild(loader);
    });
}


function createCard(ip, port, protocol, responseTime, countryCode) {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardImg = document.createElement("div");
    cardImg.classList.add("card-img");

    const button = document.createElement("button");
    button.classList.add("card-button");
    button.textContent = "Copy";
    button.addEventListener("click", function() {
        copyToClipboard(`${ip}:${port}`);
    });
    cardImg.appendChild(button);

    // Add image flag
    const imageFlag = document.createElement("div");
    imageFlag.classList.add("image-flag");
    const img = document.createElement("img");
    img.src = `https://flagcdn.com/36x27/${countryCode.toLowerCase()}.png`;
    imageFlag.appendChild(img);
    cardImg.appendChild(imageFlag);

    card.appendChild(cardImg);

    const textBox = document.createElement("div");
    textBox.classList.add("card-textBox");
    card.appendChild(textBox);

    const textContent = document.createElement("div");
    textContent.classList.add("card-textContent");
    textBox.appendChild(textContent);

    const h1 = document.createElement("p");
    h1.classList.add("card-h1");
    h1.textContent = `${ip}:${port}`;
    textContent.appendChild(h1);

    const span = document.createElement("span");
    span.classList.add("card-span");
    span.textContent = protocol;
    textBox.appendChild(span);

    const p = document.createElement("p");
    p.classList.add("card-p");
    p.textContent = responseTime;

    let response_color = "";
    if (responseTime === "response time: fast") {
        response_color = "#00ff00";
    } else if (responseTime === "response time: mediumms") {
        response_color = "#ffff00";
    } else {
        response_color = "#ff0000";
    }
    p.style.color = response_color;
    textBox.appendChild(p);

    return card;
}

function copyToClipboard(text) {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("value", text);
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
}