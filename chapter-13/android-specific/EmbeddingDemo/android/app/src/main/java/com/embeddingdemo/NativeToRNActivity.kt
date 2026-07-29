package com.embeddingdemo

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.bridge.Arguments
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.modules.core.DeviceEventManagerModule

/**
 * Recipe 2: Native Android → React Native Communication
 *
 * This Activity demonstrates two ways native code sends data to RN:
 * 1. Initial props (passed via getLaunchOptions bundle → becomes component props)
 * 2. Live events (emitted via RCTDeviceEventEmitter → received by NativeEventEmitter)
 *
 * After 3 seconds, it emits a "UserNameChanged" event to simulate
 * the native side updating data that RN is displaying.
 */
class NativeToRNActivity : ReactActivity() {

    override fun getMainComponentName(): String = "NativeToRN"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        object : DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled) {
            override fun getLaunchOptions(): Bundle {
                // Pass initial props to the RN component
                return Bundle().apply {
                    putString("userName", "Student")
                }
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Simulate the native side updating data after 3 seconds
        window.decorView.postDelayed({
            val reactContext = (application as MainApplication)
                .reactNativeHost.reactInstanceManager.currentReactContext

            reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                ?.emit("UserNameChanged", Arguments.createMap().apply {
                    putString("userName", "Professor")
                })
        }, 3000)
    }
}
