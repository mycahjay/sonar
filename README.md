## sonarqube test project

__set up auditboard-dev-env for environment variables et al.__

verify correct path is sourced in `.envrc`

__install global npm packages under correct node version__

```
nvm install // Now using node v15.14.0

npm install -g pm2 yarn
```

__install all the things__

```
yarn install
```

__docker up!__

```
docker compose -f docker-compose.sonar.yml up -d
```

__dashboard__

log in at `localhost:8080`

```
username: admin
password: admin
```

generate token at `localhost:8080/account/security` and paste in `sonar.js`

__analyze__

```
yarn run test // runs unit tests and then sonarqube

or

yarn run sonar // to just run sonarqube
```

results at `localhost:8080/dashboard?id=sonar-project`

unit tests at `localhost:8080/component_measures?id=sonar-project&metric=tests&view=list`
