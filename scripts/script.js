const videoContainer = document.getElementById('video-container');

const loadVideos = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/videos");
        const data = await res.json();
        const videos = data.videos;
        displayVideos(videos);
    } catch (error) {
        console.error("Error loading videos:", error);
    }
};

const displayVideos = (videos) => {
    const container = document.getElementById("video-container");
    container.innerHTML = ""; 

    videos.forEach(video => {
        const {
            thumbnail,
            title,
            authors,
            others: { views, posted_date }
        } = video;

        const author = authors[0];
        const postedTime = formatPostedDate(posted_date);

        const card = document.createElement("div");
        card.classList = "w-[312px] rounded-lg";

        card.innerHTML = `
            <div class="relative mt-6">
                <img src="${thumbnail}" alt="Video Thumbnail" class="w-[312px] h-[200px] object-cover rounded-lg">
                ${postedTime ? `<p class="w-[100px] text-xs bg-gray-800 rounded-sm p-1 text-white absolute bottom-3 right-3">${postedTime}</p>` : ""}
            </div>
            <div class="flex gap-4 mt-4">
                <img src="${author.profile_picture}" alt="Channel Avatar" class="w-10 h-10 rounded-full">
                <div>
                    <h2 class="w-[260px] text-md font-bold">${title}</h2>
                    <div class="flex items-center gap-1 mt-1">
                        <p class="text-xs">${author.profile_name}</p>
                        ${author.verified === true ? `<i class="fas fa-check-circle text-blue-500 text-xs"></i>` : ""}
                    </div>
                    <p class="text-sm text-gray-500 mt-1">${views} views</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
};


function formatPostedDate(seconds) {
    if (!seconds || isNaN(seconds)) return "";
    const sec = parseInt(seconds);
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    return `${hrs}hrs ${mins} min ago`;
}

loadVideos();