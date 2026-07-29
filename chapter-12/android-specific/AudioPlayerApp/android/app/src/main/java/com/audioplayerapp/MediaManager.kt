package com.audioplayerapp

import android.app.Activity
import android.content.Intent
import android.media.AudioAttributes
import android.media.MediaMetadataRetriever
import android.media.MediaPlayer
import android.net.Uri
import android.provider.MediaStore
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

/**
 * MediaManager is a native module that demonstrates:
 * 1. Calling native Android APIs (MediaPlayer, Intent) from JavaScript
 * 2. Sending events FROM native code BACK to JavaScript (NativeEventEmitter pattern)
 *
 * Flow:
 * - JS calls MediaManager.showSongs() → opens Android audio picker
 * - User selects a song → onActivityResult fires
 * - Native code plays the song and emits "SongPlaying" event with metadata
 * - JS receives the event via NativeEventEmitter subscription
 */
class MediaManager(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    private var mediaPlayer: MediaPlayer? = null
    private var mediaMetadataRetriever: MediaMetadataRetriever? = null

    companion object {
        private const val PICK_AUDIO_REQUEST = 10
    }

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String = "MediaManager"

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        mediaPlayer?.stop()
        mediaPlayer?.release()
        mediaPlayer = null
        mediaMetadataRetriever?.release()
        mediaMetadataRetriever = null
    }

    /**
     * Opens the Android system audio picker.
     * Called from JS via: NativeModules.MediaManager.showSongs()
     */
    @ReactMethod
    fun showSongs() {
        val activity = currentActivity ?: return
        val intent = Intent(Intent.ACTION_PICK, MediaStore.Audio.Media.EXTERNAL_CONTENT_URI)
        activity.startActivityForResult(intent, PICK_AUDIO_REQUEST)
    }

    /**
     * Required for NativeEventEmitter — tells RN how many listeners exist.
     * Without this, you'll get a warning in modern RN.
     */
    @ReactMethod
    fun addListener(eventName: String) {
        // No-op: required for NativeEventEmitter
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // No-op: required for NativeEventEmitter
    }

    /**
     * Called when the user selects a song from the picker.
     */
    override fun onActivityResult(
        activity: Activity?,
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {
        if (requestCode == PICK_AUDIO_REQUEST && data?.data != null) {
            playSong(data.data!!)
        }
    }

    override fun onNewIntent(intent: Intent?) {}

    private fun playSong(uri: Uri) {
        try {
            if (mediaPlayer != null) {
                mediaPlayer?.stop()
                mediaPlayer?.reset()
            } else {
                mediaPlayer = MediaPlayer().apply {
                    setAudioAttributes(
                        AudioAttributes.Builder()
                            .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                            .setUsage(AudioAttributes.USAGE_MEDIA)
                            .build()
                    )
                }
                mediaMetadataRetriever = MediaMetadataRetriever()
            }

            mediaPlayer?.setDataSource(reactContext, uri)
            mediaPlayer?.prepare()
            mediaPlayer?.start()

            mediaMetadataRetriever?.setDataSource(reactContext, uri)
            val artist = mediaMetadataRetriever?.extractMetadata(
                MediaMetadataRetriever.METADATA_KEY_ARTIST
            ) ?: "Unknown Artist"
            val title = mediaMetadataRetriever?.extractMetadata(
                MediaMetadataRetriever.METADATA_KEY_TITLE
            ) ?: "Unknown Title"

            // Emit event to JavaScript
            val params = Arguments.createMap().apply {
                putString("songPlaying", "$artist - $title")
            }
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("SongPlaying", params)

        } catch (ex: Exception) {
            ex.printStackTrace()
        }
    }
}
