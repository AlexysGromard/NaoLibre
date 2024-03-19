#!/bin/bash
tsc

for file in ./dist/**/*.js; do
    mv "$file" "${file%.js}.mjs"
done


# si parametre 1 est pas vide
if [ -n "$1" ]; then
    node ./dist/$1
fi
