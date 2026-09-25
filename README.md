# About Vishal · 3D Portfolio

A scroll-driven 3D portfolio for **Vishal Ippili**, Senior Software Engineer in Bengaluru.
Scrolling moves the camera through a 3D scene while the résumé, selected work and toolkit scroll over it.

**Contact:** [ippili.vishal@gmail.com](mailto:ippili.vishal@gmail.com) · [LinkedIn](https://www.linkedin.com/in/vishalippili) · [Résumé (PDF)](web/public/Vishal-Ippili-Resume.pdf)

## Stack

React 18 · TypeScript · React Three Fiber · drei · postprocessing · three.js · framer-motion · zustand · Vite

## Live

https://vishalippili.vercel.app — deployed on Vercel (root directory `web`, Vite preset).

## Run locally

```bash
cd web
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in web/dist
```

## Where things live

| Content | File |
| --- | --- |
| Hero copy | `web/src/App.tsx` (`ABOUT_EN`) |
| Résumé timeline | `web/src/ui/Resume.tsx` |
| Works sections and toolkit | `web/src/data/works.ts` |
| Case-study pages | `web/src/content/works/*.md` |
| Closing section (GitHub, résumé, LinkedIn) | `web/src/ui/Contact.tsx` |
| 3D character | `web/public/models/me.glb` (not committed yet, see below) |

## 3D character

The current character (`web/public/models/me.glb`) is **Sen Zheng's model, used with his permission** (skin tone and
stickers adapted). It is not covered by the MIT licence and will be replaced by Vishal's own character. The site expects `web/public/models/me.glb` with a camera
animation named `CameraAction` and focus anchors `focus-0` … `focus-5` (see `web/src/data/focusPoints.ts`).

## Credits

Built on the open-source [sen-3d-resume](https://github.com/dayinji/sen-3d-resume) by Sen Zheng (MIT licence for code,
see [`LICENSE`](LICENSE) and [`NOTICE`](NOTICE)). All personal content here — name, résumé, case studies — is Vishal's.
Cover photo credits are in `web/public/works/covers/CREDITS.md`.
