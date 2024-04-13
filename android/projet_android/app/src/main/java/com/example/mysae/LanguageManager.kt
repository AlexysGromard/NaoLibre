package com.example.mysae

import android.app.Activity
import android.content.Context
import android.content.res.Configuration
import android.content.res.Resources
import java.util.Locale

/**
 * Classe permettant de gérer la langue de l'application
 * Cette classe permet de changer la langue de l'application et de récupérer la langue actuelle
 */
object LanguageManager {
    /**
     * Change la langue de l'application
     * @param activity Activité de l'application
     * @param langCode Code de la langue à changer
     */
    fun setLocal(activity: Activity, langCode: String) {
        val sharedPreferences = activity.getSharedPreferences("language", Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        editor.putString("language", langCode)
        editor.apply()

        val locale = Locale(langCode)
        Locale.setDefault(locale)
        val resources: Resources = activity.resources
        val config: Configuration = resources.configuration
        config.setLocale(locale)
        resources.updateConfiguration(config, resources.displayMetrics)
    }


    /**
     * Récupère la langue actuelle de l'application
     * @param context Contexte de l'application
     * @return La langue actuelle de l'application
     */
    fun getLanguage(context: Context): String {
        return context.resources.configuration.locales[0].language
    }

    /**
     * Récupère la langue du système
     * @return La langue du système
     */
    fun getDeviceLanguage(): String {
        return Locale.getDefault().language
    }
}
