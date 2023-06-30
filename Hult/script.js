// Set random profile for user
function setRandomSeedImage() {
    const img = document.getElementById('useravatar');
    const randomSeed = Math.floor(Math.random() * 1000000) + 1;
    img.src = `https://robohash.org/${randomSeed}`;
};
setRandomSeedImage();


// Add loader to screen 
function addLoader() {
    const loader = document.querySelector('.gearbox');
    if (!loader) {
        const loaderHTML = `
        <div class="gearbox">
            <div class="overlay"></div>
            <div class="gear one">
                <div class="gear-inner">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </div>
            <div class="gear two">
                <div class="gear-inner">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </div>
            <div class="gear three">
                <div class="gear-inner">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </div>
            <div class="gear four large">
                <div class="gear-inner">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </div>
        </div>
        `;
        const body = document.querySelector('body');
        body.insertAdjacentHTML('beforeend', loaderHTML);
    }
}


// Remove loader from body
function removeLoader() {
    const loader = document.querySelector('.gearbox');
    if (loader) {
        loader.remove();
    }
}


// Add notification
function addNotify(query) {
    const notifier = document.querySelector('.notification');
    if (!notifier) {
        const loaderHTML = `
        <figure class = "notification" >
            <svg fill="#0055ff" width="30" height="30" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20,18H4l2-2V10a6,6,0,0,1,5-5.91V3a1,1,0,0,1,2,0V4.09a5.9,5.9,0,0,1,1.3.4A3.992,3.992,0,0,0,18,10v6Zm-8,4a2,2,0,0,0,2-2H10A2,2,0,0,0,12,22ZM18,4a2,2,0,1,0,2,2A2,2,0,0,0,18,4Z"/>
            </svg>
            <div class = "notification_body" >
                ${query}
            </div>
        </figure>`;
        const body = document.querySelector('body');
        body.insertAdjacentHTML('beforeend', loaderHTML);
    }
}


// Remove notification
function remNotify() {
    const loader = document.querySelector('.notification');
    if (loader) {
        loader.remove();
    }
}


// Function to make an HTTP request and render the response in a card
function renderCard(apiUrl, apiMode, id) {
    const cards = document.querySelectorAll(".card");
    if (cards.length > 0) {
        for (let i = 0; i < cards.length; i++) {
            document.body.removeChild(cards[i]);
        }
    }
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const card = `
            <div class="card" id="card-${id}">
               <div class="browser">
                    <div class="chevrons">
                        <button class="chevronsbtn" id="copybtn-${id}">Copy</button>
                    </div>
                    <div class="search-bar">
                        <div class="urltext" id="apimode">${apiMode}</div>
                    </div>
                </div>
                <textarea readonly id="output-${id}">${JSON.stringify(data, null, 2)}</textarea>
            </div>
            `;
            removeLoader();
            document.body.insertAdjacentHTML('beforeend', card);
            const copyButtons = document.getElementById(`copybtn-${id}`);
            copyButtons.addEventListener('click', () => {
                const textarea = document.getElementById(`output-${id}`);
                textarea.select();
                document.execCommand('copy');
                textarea.blur();
                remNotify()
                addNotify("Result saved.")
            });
        }).catch(error => console.error(error));
}


// Add an event listener to the submit button
const submitbtn = document.getElementById("submitbutton");
submitbtn.addEventListener("click", () => {
    const userInput = document.getElementById("userinput").value;
    if (userInput != ``) {
        remNotify()
        addLoader();
        addNotify("Getting Data for you");
        const api1 = `https://networkcalc.com/api/dns/lookup/${userInput}`;
        const api2 = `https://networkcalc.com/api/dns/whois/${userInput}`;
        const api3 = `https://networkcalc.com/api/security/certificate/${userInput}`
        const api4 = `http://ip-api.com/json/${userInput}`
        renderCard(api1, "DNS Lookup", 1);
        renderCard(api2, "DNS Whois", 2);
        renderCard(api3, "TLS/SSL certificate", 3);
        renderCard(api4, "GeoLocation", 4);
    }
});


// Add an event listener to the Clear button for removing result cards
clearBtn = document.getElementById("clear")
clearBtn.addEventListener("click", () => {
    remNotify()
    addNotify("Result cleared.")
    const cards = document.querySelectorAll(".card");
    if (cards.length > 0) {
        for (let i = 0; i < cards.length; i++) {
            document.body.removeChild(cards[i]);
        }
    }
});


// Add an event listener to the about button to show about
aboutbtn = document.getElementById("about")
aboutbtn.addEventListener("click", () => {
    const cards = document.querySelectorAll(".follow-card");
    if (cards.length > 0) {
        for (let i = 0; i < cards.length; i++) {
            document.body.removeChild(cards[i]);
        }
    } else {
        remNotify()
        addNotify("Ask any question :)")
        const followCard = `
        <div class="follow-card" id="follow-card">
            <button class="follow-button" id="follow-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 480 512">
                    <path fill="white" d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z"/>
                </svg>
                Follow
            </button>
            <button class="chat-button" id="chat-button">
                <svg width="25" height="25" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="svg">
                    <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -999.000000)">
                        <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path d="M97.1784026,840.884344 C92.8882915,837.134592 86.2359857,839.256228 84.7592414,844.817545 C84.139128,847.151543 84.7373784,848.235292 84.7373784,849.987037 C84.7373784,851.787636 84,854.395812 84,854.395812 C84,854.714855 84.2832249,855.025921 84.6320386,854.935194 C85.8792217,854.609172 87.8627895,853.964107 90.2349218,854.608175 C98.2119249,856.770688 103.330841,846.261214 97.1784026,840.884344 M103.447113,859 C103.395437,859 103.341773,858.993021 103.287115,858.979063 C96.9806421,857.395812 97.4039887,859.174477 93.8999507,858.237288 C92.8395967,857.954137 91.8746446,857.443669 91.0418642,856.781655 C97.4059763,857.561316 102.710728,852.016948 101.771614,845.487535 C102.732591,846.487535 103.438169,847.72582 103.7363,849.11266 C104.584981,853.048852 102.430484,852.38285 103.983749,858.364905 C104.075176,858.714855 103.765119,859 103.447113,859" id="messages_chat-[#1557]"></path>
                        </g>
                    </g>
                </svg>
                Message
            </button>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', followCard);
        document.getElementById(`follow-card`).classList.add('visible');

        // Add an event listener to the follow button
        followbtn = document.getElementById("follow-button")
        followbtn.addEventListener("click", () => {
            window.open('https://www.github.com/Kourva');
        });

        // Add an event listener to the chat button
        followbtn = document.getElementById("chat-button")
        followbtn.addEventListener("click", () => {
            window.open('https://t.me/Kourva');
        });
    }
});


// Add an event listener to the refresh button
followbtn = document.getElementById("refresh")
followbtn.addEventListener("click", () => {
    setTimeout(function() {
       location.reload();
    }, 0);
});