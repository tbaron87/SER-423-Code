package com.nativemoduleapp

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

/**
 * HelloPackage registers our custom native modules with the React Native runtime.
 * This class is referenced in MainApplication.kt's getPackages() method.
 *
 * Every custom native module needs a corresponding ReactPackage to be discovered
 * by the React Native bridge at startup.
 */
class HelloPackage : ReactPackage {

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): List<ViewManager<*, *>> = emptyList()

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): List<NativeModule> = listOf(HelloManager(reactContext))
}
