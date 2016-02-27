run:
	webpack-dev-server --inline --colors --progress --display-error-details --display-cached --port 8080 --content-base src

setup: 
	npm i
	typings i

setup-global: 
	npm i -g typings
	npm i -g webpack
	npm i -g webpack-dev-server
