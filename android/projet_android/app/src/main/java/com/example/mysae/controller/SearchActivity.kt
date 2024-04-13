package com.example.mysae.controller

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.os.Parcelable
import android.view.View
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.ProgressBar
import android.widget.SeekBar
import android.widget.SeekBar.OnSeekBarChangeListener
import android.widget.Spinner
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.mysae.LanguageManager
import com.example.mysae.R
import com.example.mysae.dao.Recipe
import com.example.mysae.dao.Request
import com.example.mysae.fragment.MenuFragment
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

/**
 * Activité de recherche d'articles
 * Cette activité permet à l'utilisateur de rechercher des articles en fonction de différents critères
 * @constructor Crée une activité de recherche d'articles
 */
class SearchActivity : AppCompatActivity() {

    private lateinit var spinner: Spinner
    private lateinit var seekbarNumber: SeekBar
    private lateinit var seekbarValue: TextView
    private lateinit var searchButton: Button
    private lateinit var random_button: Button
    private lateinit var loadingProgressBar: ProgressBar

    private lateinit var recipes: MutableList<Recipe>

    /**
     * Fonction appelée lors de la création de l'activité
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        // Changement de la langue de l'application si elle a été modifiée
        val sharedPreferences = getSharedPreferences("language", Context.MODE_PRIVATE)
        if (sharedPreferences.getString("language", "") != LanguageManager.getDeviceLanguage()) {
            LanguageManager.setLocal(this, sharedPreferences.getString("language", "").toString())
        }

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_search)

        // Configuration de la Toolbar
        setSupportActionBar(findViewById(R.id.toolbar))
        supportActionBar?.setTitle(R.string.search_title)

        // Ajouter le fragment de menu
        val fragmentTransaction = supportFragmentManager.beginTransaction()
        fragmentTransaction.add(R.id.fragment_container, MenuFragment())
        fragmentTransaction.commit()


        // Configuration des composants UI
        setUpLoadingProgressBar()
        setUpSpinner()
        setUpSeekBar()
        setUpSearchButton()
        clickOnRandom()
    }

    /**
     * Met en place le Spinner pour choisir le type lors de la recherche
     */
    private fun setUpSpinner() {
        spinner = findViewById(R.id.search_spinner_type)

        val typeList = arrayOf(
            getString(R.string.all_categories),
            "French",
            "Italian",
            "Marocan",
            "Japanese",
            "American"
        )
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, typeList)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)

        spinner.adapter = adapter
        spinner.setSelection(0)
    }

    /**
     * Met en place le bouton de recherche aléatoire
     * Redirige vers la page de détail de la recette aléatoire
     */
    fun clickOnRandom() {

        random_button = findViewById<Button>(R.id.random_button)
        val req = Request()
        random_button.setOnClickListener {
            val intentRandom = Intent(this, RecipeActivity::class.java)

            val mutableRecipe = mutableListOf<Recipe>(req.getRandomRecipe())

            intentRandom.putParcelableArrayListExtra("recipe", mutableRecipe as java.util.ArrayList<out Parcelable>)

            startActivity(intentRandom)
        }
    }
    /**
     * Met en place la SeekBar pour choisir le nombre lors de la recherche
     */
    private fun setUpSeekBar() {
        seekbarNumber = findViewById(R.id.search_seekBar_number)
        seekbarValue = findViewById(R.id.search_seekBar_value)

        seekbarNumber.setOnSeekBarChangeListener(object : OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: SeekBar, progress: Int, fromUser: Boolean) {
                // Mettre à jour le TextView avec la valeur actuelle de la SeekBar
                seekbarValue.text = progress.toString()
            }

            override fun onStartTrackingTouch(seekBar: SeekBar) {
                // Ne rien faire
            }

            override fun onStopTrackingTouch(seekBar: SeekBar) {
                // Ne rien faire
            }
        })
    }

    /**
     * Met en place le bouton de recherche
     * Redirige vers la page de résultats de recherche
     */
    private fun setUpSearchButton() {
        searchButton = findViewById(R.id.search_button)
        searchButton.setOnClickListener {
            // Afficher la barre de chargement
            runOnUiThread {
                loadingProgressBar.visibility = View.VISIBLE
            }

            // Rendre les boutons inactifs
            searchButton.isEnabled = false
            random_button.isEnabled = false

            // Lancer la recherche des recettes dans un coroutine
            CoroutineScope(Dispatchers.Main).launch {
                try {
                    val req = Request()

                    // Arguments de recherche
                    val keyword = findViewById<EditText>(R.id.editTextText).text.toString()
                    val number = findViewById<SeekBar>(R.id.search_seekBar_number).progress.toString()
                    var origine = findViewById<Spinner>(R.id.search_spinner_type).selectedItem.toString()
                    if (origine == getString(R.string.all_categories)) {
                        origine = ""
                    }

                    val recipes = withContext(Dispatchers.IO) {
                        // Exécuter la fonction getRecipe de manière asynchrone
                        req.getRecipe(
                            keyword,
                            number,
                            origine
                        )
                    }

                    // Démarrer l'activité de résultats de recherche avec les recettes obtenues
                    val intent = Intent(this@SearchActivity, ResultActivity::class.java)
                    intent.putParcelableArrayListExtra("recipes", recipes as ArrayList<out Parcelable>)
                    startActivity(intent)
                } catch (e: Exception) {
                    // Afficher un message d'erreur en cas d'exception
                    val toast = Toast.makeText(applicationContext, R.string.error_search, Toast.LENGTH_SHORT)
                    toast.show()
                } finally {
                    // Cacher la barre de chargement après la fin de la recherche
                    loadingProgressBar.visibility = View.INVISIBLE
                    // Rendre les boutons actifs
                    searchButton.isEnabled = true
                    random_button.isEnabled = true
                }
            }

        }
    }

    private fun setUpLoadingProgressBar() {
        loadingProgressBar = findViewById(R.id.loadingProgressBar)
        loadingProgressBar.visibility = ProgressBar.INVISIBLE
    }


}
