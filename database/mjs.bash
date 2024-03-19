#!/bin/bash
tsc

find ./dist -type f -name '*.js' -exec sh -c 'mv "$0" "${0%.js}.mjs"' {} \;



# si parametre 1 est pas vide
if [ -n "$1" ]; then
    node ./dist/$1
fi
