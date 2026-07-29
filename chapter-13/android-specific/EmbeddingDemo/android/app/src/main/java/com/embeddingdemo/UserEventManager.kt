package com.embeddingdemo

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * Recipe 2 support: provides the NativeEventEmitter interface for "UserNameChanged" events.
 * The actual event emission happens in NativeToRNActivity — this module just satisfies
 * RN's requirement that a NativeEventEmitter must wrap a module with addListener/removeListeners.
 */
class UserEventManager(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "UserEventManager"

    @ReactMethod
    fun addListener(eventName: String) {}

    @ReactMethod
    fun removeListeners(count: Int) {}
}
