package com.example.mysae.dao


import android.util.Log

import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.engine.okhttp.OkHttp
import io.ktor.client.plugins.HttpTimeout
import io.ktor.client.plugins.logging.LogLevel
import io.ktor.client.plugins.logging.Logging
import io.ktor.client.plugins.observer.ResponseObserver
import io.ktor.client.request.get
import io.ktor.util.logging.Logger
import io.ktor.util.reflect.typeInfo
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import org.json.JSONObject
import org.slf4j.LoggerFactory
import kotlin.reflect.typeOf

// exemple de recherche par nom de recette , origine, nombre de recette :
// https://api.spoonacular.com/recipes/complexSearch?apiKey=494664f29dd1486996c26818904b2437&number=10&query=chick&cuisine=italian
class Request {

    companion object {
        val kTorClient = HttpClient(OkHttp) {
            install(HttpTimeout) {
                requestTimeoutMillis = 15000L
                connectTimeoutMillis = 15000L
                socketTimeoutMillis = 15000L
            }

            install(ResponseObserver) {
                onResponse { response ->
                    println("HTTP status: ${response.status.value}")
                }
            }
        }
    }

    fun getRecipe(recipe : String, number : String, origine : String) : MutableList<Recipe> {
        lateinit var result : String
        val recipes = mutableListOf<Recipe>()
        runBlocking(Dispatchers.IO) {
            val response = kTorClient.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=494664f29dd1486996c26818904b2437&number=$number&query=$recipe&cuisine=$origine")

            print("https://api.spoonacular.com/recipes/complexSearch?apiKey=494664f29dd1486996c26818904b2437&number=$number&query=$recipe&cuisine=$origine")
            result = response.body<String>()

           // val jsonData = org.json.JSONObject(result)
            val jsonData = JSONObject(result)

            val resultsArray = jsonData.getJSONArray("results")



            for (i in 0 until resultsArray.length()) {
                val resultObject = resultsArray.getJSONObject(i)
                val id = resultObject.getInt("id")
                val title = resultObject.getString("title")
                val image = resultObject.getString("image")

                val recipe = Recipe(id = id, title = title, image = image)
                recipes.add(recipe)
            }


        }

        return recipes
    }

    fun getRecipeDetail(id:String) : Recipe{
        lateinit var result : String
        val recipe : Recipe
        runBlocking(Dispatchers.IO) {
            val response = kTorClient.get("https://api.spoonacular.com/recipes/$id/information?apiKey=494664f29dd1486996c26818904b2437")
            result = response.body<String>()

            // val jsonData = org.json.JSONObject(result)
            val jsonData = JSONObject(result)
            recipe = Recipe(
                id = jsonData["id"] as Int,
                image = jsonData["image"] as String,
                readyInMinutes = jsonData["readyInMinutes"] as Int,
                servings = jsonData["servings"] as Int,
                instructions = jsonData["instructions"] as String,
                title = jsonData["title"] as String,
                vegan = jsonData["vegan"] as Boolean,
                vegetarian = jsonData["vegetarian"] as Boolean,

            )


        }
        return recipe
    }

    fun getRandomRecipe():Recipe {

        val url = "https://api.spoonacular.com/recipes/random?apiKey=494664f29dd1486996c26818904b2437"
        lateinit var result : String
        val recipe : Recipe
        runBlocking(Dispatchers.IO) {
            val resp = kTorClient.get(url)
            result=resp.body<String>()

            var jsonData = JSONObject(result)
            val js = jsonData["recipes"] as org.json.JSONArray
            val data = js[0] as org.json.JSONObject

            recipe = Recipe(
                id = data["id"] as Int,
                image = data["image"] as String,
                readyInMinutes = data["readyInMinutes"] as Int,
                servings = data["servings"] as Int,
                instructions = data["instructions"] as String,
                title = data["title"] as String,
                vegan = data["vegan"] as Boolean,
                vegetarian = data["vegetarian"] as Boolean,
                )
        }

        return recipe
    }


}

