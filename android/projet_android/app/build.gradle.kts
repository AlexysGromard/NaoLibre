plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id( "kotlinx-serialization")
    id( "kotlin-parcelize")

}

android {
    namespace = "com.example.mysae"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.mysae"
        minSdk = 33
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
}

dependencies {

    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.11.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
    implementation("androidx.gridlayout:gridlayout:1.0.0")

    implementation( "io.ktor:ktor-client-android:2.3.6")
    implementation( "io.ktor:ktor-client-okhttp-jvm:2.3.6")
    implementation( "io.ktor:ktor-client-logging:2.3.6")
    implementation( "io.ktor:ktor-client-core:2.3.6")
    implementation( "com.squareup.picasso:picasso:2.8")
    implementation( "com.squareup.picasso:picasso:2.8")
    implementation("org.jsoup:jsoup:1.11.3")
    implementation( "org.jetbrains.kotlinx:kotlinx-serialization-json:1.4.1")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
}