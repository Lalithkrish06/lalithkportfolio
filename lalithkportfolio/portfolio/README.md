# Lalith K — Portfolio

A clean, dependency-free portfolio website — plain HTML, CSS, and JS, split into separate files.

## Structure
```
portfolio/
├── index.html              # markup only
├── style.css                # all styling
├── script.js                 # all interactivity (typing effect, scroll reveal, project cards, etc.)
├── assets/
│   └── profile.jpg          # your photo
├── resume/
│   └── PUT_YOUR_RESUME_HERE.txt   # instructions — add Lalith_K_Resume.pdf here
└── README.md
```

## Run locally
Just open `index.html` in a browser. That's it — no build step, no install.

## Add your resume
Drop your PDF into the `resume/` folder and name it `Lalith_K_Resume.pdf`.
The "Download Resume" button already points to `resume/Lalith_K_Resume.pdf`.

## Update project GitHub links
In `script.js`, find `const projects = [` near the top.
Each project object has a `github` field — replace it with the real repo URL once you push that project
(e.g. `https://github.com/Lalithkrish06/your-repo-name`).

## Deploy

### GitHub Pages
1. Create a new GitHub repo and push this whole folder to it.
2. Go to Settings → Pages → Deploy from branch → select `main` / root.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.

### Netlify
1. Go to netlify.com → Add new site → Deploy manually.
2. Drag and drop this whole folder.
3. Live in seconds, with a free `.netlify.app` URL.

### Vercel
1. `npm i -g vercel` (requires Node.js installed).
2. Run `vercel` inside this folder and follow the prompts.

## Customize
- Colors, fonts, and layout: `style.css`.
- Content (skills, projects, timeline, certifications): the JS arrays (`skillsData`, `projects`) at the top of `script.js`.

