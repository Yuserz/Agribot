# AgriBot — developer shortcuts
# Run `make help` to list available commands.

.DEFAULT_GOAL := help
.PHONY: help install dev start android ios web lint clean reset

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies (pnpm install)
	pnpm install

dev: ## Start the Expo dev server (alias for start)
	pnpm start

start: ## Start the Expo dev server
	pnpm start

android: ## Run on Android emulator/device
	pnpm android

ios: ## Run on iOS simulator/device
	pnpm ios

web: ## Run in the browser
	pnpm web

lint: ## Lint with expo lint (ESLint)
	pnpm lint

clean: ## Clear the Expo/Metro cache and restart dev server
	pnpm start --clear

reset: ## Reset project to a blank app/ (destructive)
	pnpm reset-project
