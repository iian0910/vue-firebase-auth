set -e
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/iian0910/vue-firebase-auth.git master:gh-pages
cd -