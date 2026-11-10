# Habtewolde Bizuayhu — Video Editor Portfolio

A responsive portfolio website built with plain **HTML, CSS and JavaScript**. No framework or build step is required.

## Project structure

```text
habtewolde-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── habtewolde-bizuayhu.jpg
└── videos/
    └── README.txt
```

## Run the website

1. Extract the project ZIP.
2. Open the `habtewolde-portfolio` folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the VS Code **Live Server** extension and click **Go Live**.

## Personalize it before publishing

### Contact and social links
Open `js/script.js` and edit `SITE_CONFIG` near the top. Add your actual email address and profile URLs for Instagram, YouTube and Behance. Until you add them, the links show a helpful message rather than going to a fake address.

### Add your own videos/projects
In `js/script.js`, edit the `PROJECTS` array. For `videoUrl`, you can use:

- A YouTube link (watch links, Shorts and `youtu.be` links are converted to embeds automatically)
- A Vimeo link
- A local MP4 path, such as `videos/brand-film.mp4`

Put local MP4 files in the `videos` folder. Replace the sample project titles and descriptions with your actual work. The four project cards are starter templates, not claims about completed projects.

### Replace your portrait
Your portrait is included at `assets/habtewolde-bizuayhu.jpg`. Replace that file with another image using the same filename to update the website. The **Change photo +** button previews a selected image in the current browser only; replacing the image file makes the change part of the project itself.

## Publish
This is a static website. You can host the complete folder on GitHub Pages, Netlify, or another static web host. Keep the `css`, `js`, `assets` and `videos` folders alongside `index.html`.

For Vercel, deploy the project root without a build command. The source videos in `assets` are excluded from deployments by `.vercelignore`; the smaller browser-ready project previews are stored in `assets/portfolio`.
