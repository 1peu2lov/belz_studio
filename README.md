# Belz Studio

Site officiel du studio créatif **Belz Studio** — création de sites web sur mesure, identité visuelle et design pour entrepreneurs et indépendants (Bordeaux & à distance).

## Stack

- Next.js (App Router)
- React + TypeScript (strict)
- CSS natif + CSS Modules
- ESLint
- pnpm

## Démarrage

```bash
pnpm install
pnpm dev
```

Copier `.env.example` vers `.env.local` et ajuster `NEXT_PUBLIC_SITE_URL` si besoin.

## Commandes

| Commande | Description |
| --- | --- |
| `pnpm dev` | Serveur de développement |
| `pnpm build` | Build de production |
| `pnpm start` | Serveur de production |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Vérification TypeScript |

## Architecture

```text
src/
├── app/                 # Routes (App Router) + CSS Modules de page
├── components/
│   ├── Header/          # Mise en page
│   ├── Footer/
│   ├── Navigation/      # Client isolé (état actif)
│   ├── ui/              # Composants réutilisables
│   └── effects/         # Réservé aux futurs effets (shaders, R3F…)
├── data/                # Données statiques (navigation, etc.)
├── hooks/               # Hooks React (à venir)
├── lib/                 # Config site & SEO
├── types/               # Types TypeScript partagés
└── utils/               # Utilitaires purs
```

- Alias d’import : `@/*` → `src/*`
- `globals.css` : reset, variables, html/body, a11y, utilitaires globaux
- SEO centralisé dans `src/lib/site.ts` et `src/lib/metadata.ts`
- Typographie : **Supreme** (corps / UI) + **Pirulen** (gros titres display)
- Fichiers dans `src/fonts/`, chargés via `next/font/local` (`src/fonts/index.ts`)
- Composants serveur par défaut ; `"use client"` uniquement si nécessaire

## Pages

- `/` — Accueil
- `/projets` — Projets
- `/services` — Services
- `/le-studio` — Le studio
- `/contact` — Contact
