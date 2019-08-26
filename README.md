# ModuleLoader

Ce système permet le déploiment des différents modules au sein de votre application NodeJS avec express, vous trouverez sur ce repo le serveur "Maître", là ou vous pourrez développer vos modules, ainsi que le serveur "Entité" qui pourra déployer différents modules au sein de son application

## Express ?

Ce système s'appuie sur express, qui va nous servir à gérér différentes "vues" (car tout le système sera tourné vers une version API, libre à vous d'adapter ce système aux vues "conventionnel")

## Prérequis

Pour faire fonctionner ce système, vous devrez avoir une base de données (locale ou distante) qui va nous permettre de gérer le versionning des modules
Un fichier .sql est disponible pour vos différents tests


### Commandes disponible


#### Serveur Maître "MasterServer"

Dans le dossier MasterServer, vous avez accès à plusieurs commandes:

```
npm run start -> Lance le projet
```
```
npm run buildModule -- [NomModule] -> Créer une version pour tout les différents clients (entity server)
```
```
npm run devModule -- [NomModule] -> Créer une version de développement pour tout les différents clients (entity server en mode debug)
```
```
npm run createModule -- [NomModule] -> Créer un module par défaut
```
```
npm run createModule -- [NomModule] -> Créer un module par défaut
```