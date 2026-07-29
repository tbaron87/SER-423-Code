package com.embeddingdemo

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

/**
 * Recipe 4: Handling Deep Link Invocation
 *
 * This Activity is declared in AndroidManifest.xml with an intent-filter
 * for the "embeddingdemo://" URL scheme. When an external app (or adb) opens
 * that URL, Android launches this Activity, and the RN Linking API
 * receives the URL.
 *
 * Test with: adb shell am start -a android.intent.action.VIEW -d "embeddingdemo://test"
 */
class DeepLinkActivity : ReactActivity() {

    override fun getMainComponentName(): String = "DeepLink"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
