package com.example.mysae.dao

import android.os.Parcel
import android.os.Parcelable
import kotlinx.parcelize.Parceler
import kotlinx.parcelize.Parcelize
import kotlinx.serialization.Serializable


// API KEY : 494664f29dd1486996c26818904b2437
@Parcelize
data class Recipe(
    val id: Int,
    val image: String,
    val readyInMinutes: Int = 0,
    val servings: Int = 0,
    val instructions: String = "",
    val title: String,
    val vegan: Boolean = false,
    val vegetarian: Boolean = false,


) : Parcelable {

     override fun toString() : String {
         return title
     }
}