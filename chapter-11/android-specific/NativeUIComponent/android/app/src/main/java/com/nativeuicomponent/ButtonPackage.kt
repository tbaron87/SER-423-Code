package com.nativeuicomponent

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

/**
 * ButtonPackage registers our custom ViewManager with the React Native runtime.
 *
 * Unlike a native module (which goes in createNativeModules), a native UI component
 * is registered via createViewManagers. This tells React Native that 'ButtonView'
 * is a valid native component name that can be used with requireNativeComponent().
 */
class ButtonPackage : ReactPackage {

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): List<ViewManager<*, *>> = listOf(ButtonViewManager())

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): List<NativeModule> = emptyList()
}
