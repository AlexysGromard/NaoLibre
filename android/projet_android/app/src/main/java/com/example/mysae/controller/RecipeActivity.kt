package com.example.mysae.controller

import android.os.Bundle
import android.view.MenuItem
import android.widget.CheckBox
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.mysae.R
import com.example.mysae.dao.Recipe
import com.example.mysae.dao.Request
import com.example.mysae.fragment.MenuFragment
import com.squareup.picasso.Picasso
import org.jsoup.Jsoup

// exemple d'information pour un id d'une recette : https://api.spoonacular.com/recipes/16015/information?apiKey=494664f29dd1486996c26818904b2437

/**
 * Activité de détail d'une recette
 * Cette activité affiche les détails d'une recette selon les informations récupérées
 * @constructor Crée une activité de détail d'une recette
 */
class RecipeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_recipe)
        var recipe = intent.getParcelableArrayListExtra<Recipe>("recipe")?.get(0) as Recipe
        val req = Request()
        recipe = req.getRecipeDetail(recipe.id.toString())
        // met l'image de la recette
        val image = findViewById<ImageView>(R.id.recipe_image)
        Picasso.get().load(recipe.image).into(image);

        // met le nom de la recette
        val title = findViewById<TextView>(R.id.textView)
        title.text = recipe.title

        // met le temps de preparation
        val time = findViewById<TextView>(R.id.recipe_preparation_text)
        time.text = getString(R.string.preparation_recipe) + recipe.readyInMinutes + getString(R.string.minutes)


        // met les instructions
        val instructions = findViewById<TextView>(R.id.textView3)
        instructions.text = "Instructions :  \n \n"+ recipe.instructions.replace(Regex("<.*?>"), "")

        // checkbox vegan

        val vegCheck = findViewById<CheckBox>(R.id.recipe_vegan)
        if (recipe.vegan == true) {
            vegCheck.setChecked(true)
        }
        // checkbox vegan
        val vegetarCheck = findViewById<CheckBox>(R.id.recipe_vegetarian)

        if (recipe.vegetarian == true) {
            vegetarCheck.setChecked(true)
        }
        // Configuration de la Toolbar
        setSupportActionBar(findViewById(R.id.toolbar))
        supportActionBar?.setTitle(R.string.recipe_title)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        // Ajouter le fragment de menu
        val fragmentTransaction = supportFragmentManager.beginTransaction()
        fragmentTransaction.add(R.id.fragment_container, MenuFragment())
        fragmentTransaction.commit()
    }

    /**
     * Fonction appelée lors de la sélection d'un élément du menu
     * @param item L'élément sélectionné
     * @return true si l'élément a été traité, false sinon
     */
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            android.R.id.home -> {
                onBackPressed()
                return true
            }
        }
        return super.onOptionsItemSelected(item)
    }

}

/*
{
  "vegetarian": false,
  "vegan": false,
  "glutenFree": true,
  "dairyFree": true,
  "veryHealthy": false,
  "cheap": false,
  "veryPopular": false,
  "sustainable": false,
  "lowFodmap": false,
"id": 16015,
  "title": "Lamb Chops With Dried Cherries And Port",
  "readyInMinutes": 30,
  "servings": 2,
  "image": "https://img.spoonacular.com/recipes/16015-556x370.jpg",
    "summary": "Lamb..."
    }
* */