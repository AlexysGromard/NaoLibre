package com.example.mysae.controller

import android.content.Context
import android.content.ContextWrapper
import android.content.Intent
import android.content.res.Configuration
import android.os.Bundle
import android.view.MenuItem
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.mysae.LanguageManager
import com.example.mysae.R
import java.util.Locale


class SettingsActivity : AppCompatActivity(){
    lateinit var languageSpinner: Spinner
    private var isFirstSelection = true

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)

        // Configuration de la Toolbar
        setSupportActionBar(findViewById(R.id.toolbar))
        supportActionBar?.setTitle(R.string.settings)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        // Configuration des composants UI
        spinnerLanguage()
    }

    /**
     * Fonction appelée lors de la sélection d'un élément du menu
     */
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (item.itemId == android.R.id.home) {
            finish()
            return true
        }
        return super.onOptionsItemSelected(item)
    }

    /**
     * Met en place le Spinner pour choisir la langue de l'application
     */
    fun spinnerLanguage(){
        languageSpinner = findViewById(R.id.languageSpinner)

        // Création des différentes langues
        val systemLanguage = getString(R.string.system_language)
        val languages = arrayOf(systemLanguage, "\uD83C\uDDEB\uD83C\uDDF7 Français", "\uD83C\uDDFA\uD83C\uDDF8 English")

        // Création de l'adapter pour le spinner
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, languages)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)

        // Ajout de l'adapter au spinner
        languageSpinner.adapter = adapter

        // Récupération de la langue actuelle (si définie)
        val currentLanguage = loadLanguage()
        if (currentLanguage.isNotEmpty()) {
            val index = when (currentLanguage) {
                "default" -> 0
                "fr" -> 1
                "en" -> 2
                else -> 0
            }
            languageSpinner.setSelection(index)
        }

        onClickSpinner()
    }

    /**
     * Fonction appelée lors de la sélection d'un élément du spinner
     * Permet de changer la langue de l'application et de redémarrer l'application
     */
    fun onClickSpinner() {
        languageSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                if (!isFirstSelection) { // Vérifiez si c'est la première sélection ou non
                    val selectedItem = parent?.getItemAtPosition(position).toString()
                    val actualLanguage = LanguageManager.getLanguage(applicationContext)
                    val context: Context = applicationContext
                    when(selectedItem) {
                        getString(R.string.system_language) -> {
                            LanguageManager.setLocal(this@SettingsActivity, LanguageManager.getDeviceLanguage())
                            restartApplication()
                        }
                        "\uD83C\uDDEB\uD83C\uDDF7 Français" -> {
                            LanguageManager.setLocal(this@SettingsActivity, "fr")
                            restartApplication()
                        }
                        "\uD83C\uDDFA\uD83C\uDDF8 English" -> {
                            LanguageManager.setLocal(this@SettingsActivity, "en")
                            restartApplication()
                        }
                    }
                } else {
                    isFirstSelection = false
                }
            }

            override fun onNothingSelected(parent: AdapterView<*>?) {
                // Ne rien faire
            }
        }
    }

    /**
     * Charge la langue actuelle de l'application
     */
    private fun loadLanguage(): String {
        val sharedPreferences = getSharedPreferences("language", Context.MODE_PRIVATE)
        return sharedPreferences.getString("language", "") ?: ""
    }

    /**
     * Redémarre l'application pour appliquer les changements de langue
     */
    private fun restartApplication() {
        val intent = Intent(this, SearchActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK)
        startActivity(intent)
        finish()
    }
}