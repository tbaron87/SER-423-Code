import Foundation

/**
 * Recipe 2 support: provides the NativeEventEmitter interface for "UserNameChanged" events.
 * The actual event emission would happen from the native host (e.g., a ViewController).
 * This module satisfies RN's requirement that NativeEventEmitter must wrap a module.
 */
@objc(UserEventManager)
class UserEventManager: RCTEventEmitter {

  override func supportedEvents() -> [String]! {
    return ["UserNameChanged"]
  }

  override static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc override func addListener(_ eventName: String) {
    super.addListener(eventName)
  }

  @objc override func removeListeners(_ count: Double) {
    super.removeListeners(count)
  }
}
