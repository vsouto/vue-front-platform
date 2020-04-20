#!/bin/bash
circleci config process .circleci/config.yml > .circleci/config.yml.local
circleci local execute --config .circleci/config.yml.local --job "deploy_dev"