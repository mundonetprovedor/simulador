# Usar imagem oficial ultra-leve do Nginx baseada em Alpine Linux
FROM nginx:alpine

# Copiar todos os arquivos estáticos do projeto para a pasta pública do Nginx
COPY . /usr/share/nginx/html

# Garantir que arquivos ocultos do Git e scripts locais não sejam expostos publicamente
RUN rm -rf /usr/share/nginx/html/.git \
    && rm -rf /usr/share/nginx/html/node_modules \
    && rm -rf /usr/share/nginx/html/mupdf \
    && rm -f /usr/share/nginx/html/mupdf.zip \
    && rm -f /usr/share/nginx/html/*.zip \
    && rm -f /usr/share/nginx/html/*.py \
    && rm -f /usr/share/nginx/html/*.js-extractor

# Expor a porta padrão 80 do Nginx
EXPOSE 80

# Iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
