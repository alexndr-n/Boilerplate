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

run-compose-prod:
	docker-compose up -d

run-compose-dev:
	docker-compose up -d

down-compose-dev:
	docker-compose -f docker-compose.yml down

kill-containers:
	docker kill $(docker ps -a -q) 
	docker rm $(docker ps -a -q) 

ssh-server:
	ssh root@68.183.155.239