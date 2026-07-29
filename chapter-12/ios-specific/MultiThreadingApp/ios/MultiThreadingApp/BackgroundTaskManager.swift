import Foundation

/**
 * BackgroundTaskManager demonstrates running work on a background thread (GCD)
 * and communicating progress back to JavaScript via events.
 *
 * Key concepts:
 * - Grand Central Dispatch (GCD) replaces manual NSThread management
 * - DispatchQueue.global(qos:) runs work off the main thread
 * - DispatchQueue.main.async sends events back on the main thread
 * - NativeEventEmitter on the JS side receives "backgroundProgress" events
 *
 * The counter button in JS remains responsive during the 5-second background task,
 * proving that native background threads don't block the JS/UI thread.
 *
 * In JavaScript:
 *   const emitter = new NativeEventEmitter(NativeModules.BackgroundTaskManager);
 *   emitter.addListener('backgroundProgress', (event) => { ... });
 *   NativeModules.BackgroundTaskManager.loadInBackground();
 */
@objc(BackgroundTaskManager)
class BackgroundTaskManager: RCTEventEmitter {

  override func supportedEvents() -> [String]! {
    return ["backgroundProgress"]
  }

  override static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc
  func loadInBackground() {
    // Dispatch to a background queue (equivalent of Kotlin's Dispatchers.IO)
    DispatchQueue.global(qos: .userInitiated).async { [weak self] in
      // Emit "Loading" status
      self?.sendEvent(withName: "backgroundProgress", body: ["status": "Loading"])

      // Simulate a long-running background operation
      Thread.sleep(forTimeInterval: 5.0)

      // Return to the main queue to emit "Done" status
      DispatchQueue.main.async {
        self?.sendEvent(withName: "backgroundProgress", body: ["status": "Done"])
      }
    }
  }

  // Required for NativeEventEmitter
  @objc override func addListener(_ eventName: String) {
    super.addListener(eventName)
  }

  @objc override func removeListeners(_ count: Double) {
    super.removeListeners(count)
  }
}
