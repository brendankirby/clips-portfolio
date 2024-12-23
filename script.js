// File containing the TikTok URLs
const fileUrl = 'tiktok_urls.txt';

// Function to fetch and display TikTok embeds
async function displayTikToks() {
    try {
        const response = await fetch(fileUrl);
        const urls = await response.text();
        const urlArray = urls.split('\n').filter(url => url.trim() !== ''); // Remove empty lines

        const container = document.getElementById('tiktok-container');
        urlArray.forEach(url => {
            const videoIdMatch = url.match(/video\/(\d+)/);
            if (videoIdMatch) {
                const videoId = videoIdMatch[1];
                // Create the embed block
                const blockquote = document.createElement('blockquote');
                blockquote.className = 'tiktok-embed';
                blockquote.setAttribute('cite', url);
                blockquote.setAttribute('data-video-id', videoId);
                blockquote.style = 'max-width: 605px;min-width: 325px;';

                const section = document.createElement('section');
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.textContent = 'Watch on TikTok';

                section.appendChild(link);
                blockquote.appendChild(section);
                container.appendChild(blockquote);
            }
        });

        // Reload TikTok embed script to process dynamically added embeds
        const script = document.createElement('script');
        script.src = 'https://www.tiktok.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
    } catch (error) {
        console.error('Error loading TikTok URLs:', error);
    }
}

// Call the function to display TikToks
displayTikToks();

