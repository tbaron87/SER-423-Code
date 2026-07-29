package com.nativemoduleapp

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * HelloManager is a custom native module that demonstrates how to expose
 * Kotlin/Java methods to JavaScript via the React Native bridge.
 *
 * In JavaScript, this module is accessed via:
 *   import { NativeModules } from 'react-native';
 *   const { HelloManager } = NativeModules;
 *   HelloManager.greetUser(name, isAdmin, callback);
 */
class HelloManager(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    /**
     * The name returned here is what JavaScript uses to access this module:
     * NativeModules.HelloManager
     */
    override fun getName(): String = "HelloManager"

    /**
     * Any method annotated with @ReactMethod is callable from JavaScript.
     * Parameters are automatically converted between JS and Kotlin types.
     * The Callback parameter allows returning data back to JavaScript.
     */
    @ReactMethod
    fun greetUser(name: String, isAdmin: Boolean, callback: Callback) {
        val adminStatus = if (isAdmin) "are" else "are not"
        val greeting = "Welcome $name, you $adminStatus an administrator"
        callback.invoke(greeting)
    }
}
