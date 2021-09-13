ENV=staging

build-local:
	docker build -t boilerplate-backend .

docker-run:
	docker run -dp 3000:3000 boilerplate-backend .

run-local:
	-cd database && \
		npx sequelize db:create
	-cd database && \
		npx sequelize db:migrate
