FROM nginx:latest

EXPOSE 80

RUN apt-get update && apt-get install -y curl gnupg apt-transport-https git
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get install -y nodejs
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

RUN echo '                                                        \n\
server {                                                          \n\
    listen       80;                                              \n\
    server_name  localhost;                                       \n\
                                                                  \n\
    location / {                                                  \n\
        root   /usr/share/nginx/html;                             \n\
        try_files $uri /index.html;                               \n\
    }                                                             \n\
                                                                  \n\
    error_page   500 502 503 504  /50x.html;                      \n\
    location = /50x.html {                                        \n\
        root   /usr/share/nginx/html;                             \n\
    }                                                             \n\
}' > /etc/nginx/conf.d/default.conf

ADD . /eth-kyc-dapp/

RUN cd /eth-kyc-dapp && yarn install && yarn run build:prod && cp -R /eth-kyc-dapp/www/* /usr/share/nginx/html