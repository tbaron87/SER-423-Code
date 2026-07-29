package com.multithreadingapp

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

/**
 * BackgroundTaskManager demonstrates running work on a background thread
 * and communicating progress back to JavaScript via events.
 *
 * Key concepts:
 * - Kotlin Coroutines replace the deprecated AsyncTask
 * - Dispatchers.IO runs work off the main thread
 * - Dispatchers.Main allows emitting events back on the main thread
 * - NativeEventEmitter on the JS side receives "backgroundProgress" events
 *
 * The counter button in JS remains responsive during the 5-second background task,
 * proving that native background threads don't block the JS/UI thread.
 */
class BackgroundTaskManager(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "BackgroundTaskManager"

    /**
     * Launches a background coroutine that simulates a long-running task.
     * Called from JS via: NativeModules.BackgroundTaskManager.loadInBackground()
     */
    @ReactMethod
    fun loadInBackground() {
        CoroutineScope(Dispatchers.IO).launch {
            // Emit "Loading" status immediately
            withContext(Dispatchers.Main) {
                sendEvent("backgroundProgress", "Loading")
            }

            // Simulate a long-running background operation
            delay(5000)

            // Emit "Done" status when complete
            withContext(Dispatchers.Main) {
                sendEvent("backgroundProgress", "Done")
            }
        }
    }

    private fun sendEvent(eventName: String, status: String) {
        val params = Arguments.createMap().apply {
            putString("status", status)
        }
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    /** Required for NativeEventEmitter — suppresses warnings in modern RN */
    @ReactMethod
    fun addListener(eventName: String) {}

    @ReactMethod
    fun removeListeners(count: Int) {}
}
