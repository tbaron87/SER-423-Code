package com.embeddingdemo

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

/**
 * Recipe 1: Basic Embedding
 *
 * This is the simplest case — a ReactActivity that loads the "BasicEmbed"
 * component registered in index.js. The React Native view fills the entire screen.
 */
class BasicEmbedActivity : ReactActivity() {

    override fun getMainComponentName(): String = "BasicEmbed"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
