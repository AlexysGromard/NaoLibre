# Compilation des fichiers TypeScript
tsc

# Renommage des fichiers JavaScript en .mjs


# Renommage des fichiers JavaScript en .mjs (y compris les sous-dossiers)
# Renommer les fichiers JavaScript en .mjs en écrasant les fichiers existants
Get-ChildItem ./dist -Filter *.js | ForEach-Object { Rename-Item -Path $_.FullName -NewName ($_.Name -replace '\.js$', '.mjs') -Force }

# Vérification de la présence d'un paramètre
if ($args.Count -gt 0) {
    # Exécution du fichier JavaScript spécifié
    node "./dist/$($args[0])"
}
