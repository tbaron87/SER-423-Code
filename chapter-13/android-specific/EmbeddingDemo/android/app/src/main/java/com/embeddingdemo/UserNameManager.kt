package com.embeddingdemo

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * Recipe 3: React Native → Native Communication
 *
 * This native module receives method calls FROM React Native.
 * When the RN component calls UserNameManager.setUserName(text),
 * it arrives here. In a real app, you could update native UI,
 * save to SharedPreferences, trigger a broadcast, etc.
 */
class UserNameManager(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "UserNameManager"

    @ReactMethod
    fun setUserName(userName: String) {
        Log.d("UserNameManager", "Received userName from RN: $userName")
        // In a real app: update native UI, broadcast to other components, etc.
    }
}
