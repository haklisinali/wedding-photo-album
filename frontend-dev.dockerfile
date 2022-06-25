# This dockerfile is meant to be used by frontend applications
FROM 007396608401.dkr.ecr.eu-west-1.amazonaws.com/hitax-dev-frontend:1.5.0

# set workdir in the container
WORKDIR /home/user/cache

# copy project files
COPY package*.json ./

# run aws login in order to point registry to code artifact
RUN aws codeartifact login --tool npm --repository hitax --domain taxit --region eu-west-1

# install dependencies
#RUN npm install

# set code as the workdir
WORKDIR /hitax/code

# startup script is included in hitax-dev-frontend container
# the script relies on two environment variables: PORT and PUBLIC_HOST (atrema address)
# both variables might be passed via docker run command
CMD [ "/bin/bash" ]
