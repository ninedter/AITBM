# AITBM static site — served by nginx. No build step.
FROM nginx:1.27-alpine
# If your network blocks Docker Hub, swap the line above for the public mirror:
#   FROM mirror.gcr.io/library/nginx:1.27-alpine

# Static assets
COPY . /usr/share/nginx/html

# Site-specific nginx config (custom 404, sane caching, security headers)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Drop files that don't belong in the web root
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/nginx.conf \
          /usr/share/nginx/html/docker-compose.yml \
          /usr/share/nginx/html/README.md

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1
