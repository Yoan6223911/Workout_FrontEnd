# Workout — Front end

Application React + Vite, en français, avec thème clair/sombre et affichage responsive.

## Démarrage

```sh
npm ci
npm run dev
```

Ouvrir l'adresse affichée par Vite (normalement http://127.0.0.1:5173).
Le front appelle directement **https://workout-api-eqyt.kennhosting.app**.
Il ne nécessite pas de backend local ni de proxy Vite.

Pour changer d'API, copier `.env.example` vers `.env`, modifier `VITE_API_URL`,
puis redémarrer Vite. En production, cette valeur est injectée pendant le build.

Les données sont chargées et enregistrées exclusivement via l’API distante.
Aucune donnée métier n’est conservée dans le navigateur. Les anciennes données
de démonstration sont supprimées au démarrage. Le choix du thème reste en mémoire
pour la session React, sans stockage persistant.

## Structure

```text
src/
├── App.jsx                         # Composition de la page
├── main.jsx                        # Point d'entrée React
├── components/
│   ├── layout/                     # Header et Footer
│   ├── home/                       # Hero, statistiques et motivation
│   ├── library/                    # Bibliothèque, recherche, cartes et détails
│   ├── forms/                      # Modale d'édition et champs des formulaires
│   └── ui/                         # Modale native réutilisable
├── config/
│   └── api.js                      # Adresse de l'API
├── constants/
│   └── muscleGroups.js             # Libellés des groupes musculaires
├── hooks/
│   ├── useWorkoutApp.js            # Navigation, état et actions utilisateur
│   └── useResource.js              # Chargement, erreurs et rechargement
├── services/
│   └── api/
│       ├── httpClient.js           # fetch, JSON et erreurs HTTP
│       └── workoutRepository.js    # Endpoints workouts et exercices
└── styles/
    └── global.css                  # Styles, thèmes et règles responsive

tests/
├── integration/App.test.jsx        # Création et modification via l'interface
├── hooks/useResource.test.jsx      # Chargement et réponses obsolètes
└── services/repository.test.js     # Contrats API
```

## Communication avec l'API

Le parcours est : **composant → useWorkoutApp → workoutRepository → httpClient → API distante**.
Les composants affichent les données ; le hook orchestre les actions ; les
services construisent et exécutent les requêtes HTTP.

| Action               | Requête                                           |
| -------------------- | ------------------------------------------------- |
| Lister les séances   | `GET /workouts`                                   |
| Lister les exercices | `GET /exercices`                                  |
| Afficher un détail   | `GET /workouts/:id` ou `GET /exercices/:id`       |
| Créer                | `POST /workouts` ou `POST /exercices`             |
| Modifier             | `PATCH /workouts/:id` ou `PATCH /exercices/:id`   |
| Supprimer            | `DELETE /workouts/:id` ou `DELETE /exercices/:id` |
| Ajouter un exercice  | `POST /workouts/:id/exercices`                    |
| Retirer un exercice  | `DELETE /workouts/:id/exercices/:exerciceId`      |

L'API ne propose pas de PATCH pour les associations. Modifier les séries et
répétitions effectue DELETE puis POST, avec tentative de restauration si le
POST échoue. Ces deux requêtes ne sont pas atomiques.

## CORS et déploiement

Le serveur distant doit autoriser l'origine du front pour les appels directs.
Le middleware CORS est configuré dans `nodejs_stage/src/server.js`. Redéployer
le backend pour activer cette correction à distance.
Toutes les origines sont autorisées avec `Access-Control-Allow-Origin: *`,
y compris localhost sur tous les ports et les fronts déployés.
La variable `CORS_ORIGINS` n'est plus utilisée.

## Vérifications et présentation du code

```sh
npm test
npm run build
npm run format
npm run format:check
```

Prettier formate JSX, JavaScript, HTML, CSS, JSON et Markdown. `index.html`
contient le document HTML et le point de montage ; l'interface est construite
par React. Le build produit `dist/`, qui contient des fichiers optimisés.

Les tests utilisent des réponses HTTP simulées : ils ne modifient
pas les données de l'API distante. `npm run preview` prévisualise le build.
Les polices DM Sans et Manrope viennent de Google Fonts, avec repli système.
Le visuel d'haltère est réalisé en CSS.
