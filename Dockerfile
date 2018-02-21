FROM nginx:latest

EXPOSE 80

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

ADD www/ /usr/share/nginx/html/