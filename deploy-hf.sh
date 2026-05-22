#!/usr/bin/env bash
# Usage: bash deploy-hf.sh "optional commit message"
set -e

TMPDIR=$(mktemp -d)
trap "rm -rf $TMPDIR" EXIT

cp backend/main.py \
   backend/knowledge.py \
   backend/requirements.txt \
   backend/Dockerfile \
   backend/README.md \
   backend/.gitignore \
   "$TMPDIR/"

cd "$TMPDIR"
git init -b main
git config user.email "mdfaisaljamalkhan@gmail.com"
git config user.name "Faisal"
git remote add origin https://huggingface.co/spaces/Anal-ist/Faisal-website-backend
git add .
git commit -m "${1:-Deploy backend}"
git push --force origin main

echo ""
echo "Done. HF Space is rebuilding (~3-5 min)."
echo "Check: curl https://Anal-ist-Faisal-website-backend.hf.space/api/health"
