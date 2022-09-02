Pour lancer le projet :

//Créer une DB sur mongoDB ---

//Se rendre dans dossier server et installer toutes les dépendances :

cd server/ && npm i

//Ensuite,remplir les champs.env : 

MONGODB_CONNECTION=
CLIENT_URL=http://localhost:3000 
JWTKEY=''
PORT=4200

//Ensuite, lancer le server :

npm start

//Enfin, pour lancer le Front, ouvrir un nouveau terminal et se rendre dans le dossier client

cd client/ && npm i

//Ensuite,remplir les champs.env :

REACT_APP_PUBLIC_FOLDER = http://localhost:4200/images/
REACT_APP_API_BASE_URL=http://localhost:4200

//puis lancer react

npm start

