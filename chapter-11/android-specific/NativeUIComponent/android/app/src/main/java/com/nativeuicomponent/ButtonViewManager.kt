package com.nativeuicomponent

import android.view.View
import android.widget.Button
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.events.RCTEventEmitter

/**
 * ButtonViewManager is a custom native UI component that exposes an Android
 * Button widget to React Native.
 *
 * It extends SimpleViewManager<Button>, which means:
 * - getName() defines the name used in requireNativeComponent('ButtonView') on the JS side
 * - createViewInstance() creates the actual Android View
 * - @ReactProp methods define props that can be set from JavaScript
 * - Events are sent back to JS using RCTEventEmitter
 *
 * In JavaScript, this component is used via:
 *   const ButtonView = requireNativeComponent('ButtonView');
 *   <ButtonView buttonText="Hello" onChange={handler} />
 */
class ButtonViewManager : SimpleViewManager<Button>(), View.OnClickListener {

    override fun getName(): String = "ButtonView"

    override fun createViewInstance(reactContext: ThemedReactContext): Button {
        val button = Button(reactContext)
        button.setOnClickListener(this)
        return button
    }

    /**
     * @ReactProp exposes a prop to JavaScript. When JS sets <ButtonView buttonText="Hello" />,
     * this method is called with the value "Hello".
     */
    @ReactProp(name = "buttonText")
    fun setButtonText(button: Button, text: String) {
        button.text = text
    }

    /**
     * When the button is clicked, we emit a "topChange" event to JavaScript.
     * React Native maps "topChange" to the "onChange" prop on the JS component.
     */
    override fun onClick(v: View) {
        val reactContext = v.context as ReactContext
        val map = Arguments.createMap()
        map.putString("message", "Button clicked!")
        reactContext.getJSModule(RCTEventEmitter::class.java)
            .receiveEvent(v.id, "topChange", map)
    }
}
