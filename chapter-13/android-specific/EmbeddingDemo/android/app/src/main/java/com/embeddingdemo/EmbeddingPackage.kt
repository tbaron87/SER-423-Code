package com.embeddingdemo

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

/**
 * Registers the native modules used by the embedding recipes:
 * - UserEventManager: for Recipe 2 (native → RN events; provides addListener/removeListeners)
 * - UserNameManager: for Recipe 3 (RN → native method call)
 */
class EmbeddingPackage : ReactPackage {

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): List<ViewManager<*, *>> = emptyList()

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): List<NativeModule> = listOf(
        UserEventManager(reactContext),
        UserNameManager(reactContext),
    )
}
