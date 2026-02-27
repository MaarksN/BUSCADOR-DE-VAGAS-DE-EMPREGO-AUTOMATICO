.PHONY: setup worker-dev worker-build worker-test web-dev

setup:
	cd worker && npm install

worker-dev:
	cd worker && npm run dev

worker-build:
	cd worker && npm run build

worker-test:
	cd worker && npm test

web-dev:
	python -m http.server 5500
