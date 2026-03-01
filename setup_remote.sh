#!/bin/bash
set -e

# 5. Create repo via gh cli
echo "Creating private repository 'buscador-vagas'..."
gh repo create buscador-vagas --private --confirm

# 6. Configure remote origin
# gh repo create typically adds the remote, but we ensure it here
if ! git remote | grep -q origin; then
    echo "Adding remote origin..."
    gh repo view buscador-vagas --web || true
    git remote add origin $(gh repo view buscador-vagas --json sshUrl -q .sshUrl)
fi

# 8. Push para main
echo "Pushing to main branch..."
git push -u origin main

# 9. Configurar proteção de branch main
echo "Configuring branch protection for main..."
# Requires admin privileges on the repo
gh api -X PUT repos/:owner/buscador-vagas/branches/main/protection \
    -H "Accept: application/vnd.github+json" \
    -f required_status_checks='{"strict":true,"contexts":[]}' \
    -f enforce_admins=true \
    -f required_pull_request_reviews='{"dismiss_stale_reviews":true,"require_code_owner_reviews":false,"required_approving_review_count":1}' \
    -f restrictions=null

# 10. Validar arquivos no remoto
echo "Validating remote files..."
gh repo view buscador-vagas --json files
