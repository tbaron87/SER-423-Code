package com.embeddingdemo

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

/**
 * MainActivity is a plain Android Activity (NOT a ReactActivity).
 * It serves as a menu to launch each recipe's Activity.
 *
 * This demonstrates that the host app is a regular native Android app —
 * React Native views are embedded into specific Activities, not the whole app.
 */
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val layout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(40, 100, 40, 40)
        }

        val title = TextView(this).apply {
            text = "RN Embedding Recipes"
            textSize = 24f
            setPadding(0, 0, 0, 40)
        }
        layout.addView(title)

        val recipes = listOf(
            "1. Basic Embed" to BasicEmbedActivity::class.java,
            "2. Native → RN" to NativeToRNActivity::class.java,
            "3. RN → Native" to RNToNativeActivity::class.java,
            "4. Deep Link" to DeepLinkActivity::class.java,
        )

        for ((label, activityClass) in recipes) {
            val button = Button(this).apply {
                text = label
                setOnClickListener { startActivity(Intent(this@MainActivity, activityClass)) }
            }
            layout.addView(button)
        }

        setContentView(layout)
    }
}
