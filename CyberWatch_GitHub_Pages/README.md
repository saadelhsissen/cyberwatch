# CyberWatch — veille cyber et tech personnelle

Une PWA responsive hébergée sur GitHub Pages. Collecte RSS + CISA KEV toutes les 6 heures.

## Installation sur GitHub (sans terminal)
1. Crée un dépôt GitHub **public** nommé `cyberwatch` (branche `main`).
2. Téléverse **le contenu** de ce dossier dans le dépôt, en conservant `.github/workflows/update.yml`.
   Pour conserver les dossiers cachés, le plus simple est `git clone`, copier les fichiers, puis `git add . && git commit -m "init" && git push`.
3. Dans **Settings > Pages > Build and deployment**, sélectionne **GitHub Actions**.
4. Dans **Actions > Collecter et publier CyberWatch**, sélectionne **Run workflow** si nécessaire.
5. Une fois le workflow terminé : `https://TON-PSEUDO.github.io/cyberwatch/`.
6. Sur iPhone : Safari > Partager > Sur l'écran d'accueil. Sur Android : Chrome > Installer l'application.

## Collecte locale

```bash
python -m pip install -r requirements.txt
python scripts/collect.py
python -m http.server 8000 --directory site
```

Ouvre http://localhost:8000 (pour un essai local uniquement).

## Résumés français et IA

Les sources francophones et les fiches CISA KEV ont des résumés en français.
Les publications anglophones conservent leur résumé en anglais **par défaut**, avec une étiquette explicite.
Pour activer les résumés français de nouvelles publications anglophones, configure `OPENAI_API_KEY` dans **Settings > Secrets and variables > Actions > New repository secret**. Cette API peut être payante. Il est possible de modifier `OPENAI_MODEL` dans le workflow.
Les publications déjà stockées en anglais ne sont pas retraduites automatiquement : efface les données antérieures si tu souhaites forcer une nouvelle collecte/traduction, ou adapte le collecteur.

## Données, licences et limitations

- Les descriptions proviennent de flux tiers. Utilisation personnelle, sources et liens crédités ; pas de reproduction intégrale des articles.
- L'app ne dispose pas de backend privé : le dépôt, le site, l'historique publié et les données JSON sont publics.
- Les favoris et le thème sont stockés **localement**, sans synchronisation entre appareils.
- Le cache PWA permet de consulter certains contenus déjà chargés hors ligne, sans garantir l'intégralité des articles originaux.
- Les flux RSS peuvent changer ou disparaître ; les erreurs sont journalisées et ne bloquent pas les autres sources.
- Le workflow planifié par GitHub Actions peut être retardé, désactivé pour inactivité ou échouer si une configuration/permission change.
- En cas d'erreur `git push` (conflit entre deux exécutions), relance le workflow ; le dépôt doit autoriser les écritures pour GitHub Actions.
