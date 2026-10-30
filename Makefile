# Server settings go in local.mk (see local.mk.example).
-include local.mk

HA_SSH ?= $(error HA_SSH is not set, see local.mk.example)
HA_CONTAINER ?= homeassistant
HA_RESTART ?= docker restart $(HA_CONTAINER)
REF ?= HEAD

# Fail the deploy if git archive fails.
SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c

.PHONY: help deploy check restart secrets shell exec lint

help:
	@echo "make deploy [REF=branch]  copy the committed files into /config"
	@echo "make check                check the configuration on the server"
	@echo "make restart              restart Home Assistant"
	@echo "make secrets              edit secrets.yaml on the server"
	@echo "make shell                open a shell in the container"
	@echo "make exec CMD=...         run a command in the container"
	@echo "make lint                 run the same lint checks as CI"

deploy:
	git archive $(REF) | ssh $(HA_SSH) docker exec -i $(HA_CONTAINER) tar -x -C /config

check:
	ssh $(HA_SSH) docker exec $(HA_CONTAINER) python -m homeassistant --script check_config -c /config

restart:
	ssh -t $(HA_SSH) $(HA_RESTART)

secrets:
	ssh -t $(HA_SSH) docker exec -it $(HA_CONTAINER) vi /config/secrets.yaml

shell:
	ssh -t $(HA_SSH) docker exec -it $(HA_CONTAINER) bash

exec:
	ssh $(HA_SSH) docker exec $(HA_CONTAINER) $(CMD)

lint:
	yamllint --strict .
	python .github/scripts/check_references.py
