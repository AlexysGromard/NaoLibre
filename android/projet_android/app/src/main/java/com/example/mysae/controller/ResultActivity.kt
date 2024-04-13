package com.example.mysae.controller

import android.content.Intent
import android.os.Bundle
import android.os.Parcelable
import android.view.MenuItem
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.ListView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.mysae.R
import com.example.mysae.dao.Recipe
import com.example.mysae.fragment.MenuFragment

/**
 * Activité de résultat de recherche
 * Cette activité affiche les résultats de la recherche effectuée par l'utilisateur dans une liste
 */
class ResultActivity : AppCompatActivity() {
    lateinit var resultListview: ListView
    lateinit var resultOrder: Button
    lateinit var adapter: ArrayAdapter<Any>
    lateinit var defaultOrder: Button
    lateinit var exempleList: Array<String>
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_result)

        val recipes = intent.getParcelableArrayListExtra<Recipe>("recipes")


        // Configuration de la Toolbar
        setSupportActionBar(findViewById(R.id.toolbar))
        supportActionBar?.setTitle(R.string.result_title)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        // Ajouter le fragment de menu
        val fragmentTransaction = supportFragmentManager.beginTransaction()
        fragmentTransaction.add(R.id.fragment_container, MenuFragment())
        fragmentTransaction.commit()



        // Configuration des composants UI
        setUpListView(recipes)

        resultOrder = findViewById(R.id.result_order)
        resultOrder.setOnClickListener {
            val recipes2 = recipes!!.sortedBy { it.title }
            adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, recipes2)
            resultListview.adapter = adapter
            adapter.notifyDataSetChanged()
        }

        val default_order = findViewById<Button>(R.id.default_order)
        default_order.setOnClickListener {
            adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, recipes!!.toList())
            resultListview.adapter = adapter
            adapter.notifyDataSetChanged()
        }

        resultListview.setOnItemClickListener { parent, view, position, id ->
            val item = adapter.getItem(position) as Recipe

            val intent = Intent(this, RecipeActivity::class.java)
            var listofrecipe =mutableListOf<Recipe>(item)
            intent.putParcelableArrayListExtra("recipe", listofrecipe as ArrayList<Parcelable> )
            startActivity(intent)
        }
    }

    private fun setUpListView(recipes :  ArrayList<Recipe>?) {
        resultListview = findViewById(R.id.result_listview)

        adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, recipes!!.toList())

        resultListview.adapter = adapter
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