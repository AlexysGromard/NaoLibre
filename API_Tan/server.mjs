'use strict'



//pour lire le .env
import dotenv from 'dotenv'
dotenv.config()

//import du framework express
import express from 'express'


//port serveur http
const serverPort = process.env.PORT || 8080

//environnement PROD ou DEV ou TEST
const env = (new URL(import.meta.url)).searchParams.get('ENV') ||process.env.ENV || 'PROD'
console.log(`env : ${env}`)

    //import de l'application

    const {default: app}  = await import ('./app.mjs')

    //lancement du serveur http
    const server = app.listen(serverPort, () =>
        console.log(`Example app listening on port ${serverPort}`)
    )


    // //Pour les interrucptions utilisateur
    // for (let signal of ["SIGTERM", "SIGINT"])
    //     process.on(signal,  () => {
    //         console.info(`${signal} signal received.`)
    //         console.log("Closing http server.");
    //         server.close(async (err) => {
    //             console.log("Http server closed.")
    //             await mongoose.connection.close()
    //             console.log("MongoDB connection  closed.")
    //             process.exit(err ? 1 : 0)
    //         });
    //     });


export default server

