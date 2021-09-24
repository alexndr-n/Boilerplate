run-client-dev:
	cd client && \
		npm run dev

run-db-dev:
	docker run --name postgres -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=dev -p 5432:5432 -d --rm postgres

run-server-dev:
	cd server && \
		npm run dev

test-all:
	cd server && \
		npm i
	cd server && \
		npm run test

compose:
	docker-compose up -d --force-recreate 

down-compose-dev:
	docker-compose -f docker-compose.yml down

kill-containers:
	docker kill $(docker ps -a -q) 
	docker rm $(docker ps -a -q) 

docker-build-push:
	docker-compose build
	docker-compose push

ssh-server:
	ssh root@68.183.155.239

shell-server:
	docker exec -it server bash