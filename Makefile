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

run-prod:
	docker-compose up -d

kill-containers:
	docker kill $(docker ps -q) 