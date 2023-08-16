const form = document.querySelector("form");
const URLbody = document.querySelector(".urls");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch("https://url-shortner-sepia-omega.vercel.app/", {
        method: "POST",
        body: JSON.stringify({
            url: formData.get("url")
        }),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            storeURLs(data);
            mapUrls();
        })
        .catch((error) => console.log(error))
})


const storeURLs = (url) => {
    const res = localStorage.getItem("urls");
    let data = [];

    if (res) {
        data = JSON.parse(res);
    }

    data.push(url);
    localStorage.setItem("urls", JSON.stringify(data));
}

const getUrls = () => {
    const res = localStorage.getItem("urls");

    if (res) {
        return JSON.parse(res);
    }

    return [];
}

const mapUrls = () => {
    const HTML = getUrls().slice().reverse().map((item) => `
    <div>
        <h3>Original URL : ${item.original}</h3>
        Short URL : <a target="_blank" href="${item.url}">${item.url}</a>
    </div>
    `).join(",");
    URLbody.innerHTML = HTML;
}

mapUrls();