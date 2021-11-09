FROM mysql:latest
COPY . /home/kennely_db/
WORKDIR /home/kennely_db/
RUN chmod +x ./migrate.sh
RUN ./migrate.sh


# Create image with imported migration file and push to dockerhup