cmd.exe /c npm run compile:prod
cp src\index.html dist
git checkout gh-pages
cp dist\index.html .
mkdir static
cp dist\bundle.js static

git add index.html static
git commit -m "Update bundle"
git push

git checkout master
