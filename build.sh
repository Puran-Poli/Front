#!/bin/sh
rm -rf node_modules && rm -rf yarn.lock && rm -rf package-lock.json
# nvm use 14
yarn
yarn build
docker stop chanakya-frontend
docker rm chanakya-frontend
docker build -t chanakya-frontend .
docker run --name chanakya-frontend -p 3000:3000 -d chanakya-frontend