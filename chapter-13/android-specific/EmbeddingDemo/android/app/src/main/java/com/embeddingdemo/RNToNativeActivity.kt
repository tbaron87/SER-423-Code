package com.embeddingdemo

import android.util.Log
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

/**
 * Recipe 3: React Native → Native Android Communication
 *
 * This Activity hosts the "RNToNative" component. The RN side calls
 * NativeModules.UserNameManager.setUserName(text) as the user types.
 *
 * The UserNameManager native module (registered via EmbeddingPackage)
 * receives the call and logs it. In a real app, this could update
 * native UI, save to SharedPreferences, etc.
 */
class RNToNativeActivity : ReactActivity() {

    override fun getMainComponentName(): String = "RNToNative"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
