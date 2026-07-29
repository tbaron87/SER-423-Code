import Foundation

/**
 * Recipe 3: React Native → Native iOS Communication
 *
 * This native module receives method calls FROM React Native.
 * When the RN component calls UserNameManager.setUserName(text),
 * it arrives here. In a real app, you could update native UI,
 * post a notification, save to UserDefaults, etc.
 */
@objc(UserNameManager)
class UserNameManager: NSObject {

  @objc
  func setUserName(_ userName: String) {
    print("Received userName from RN: \(userName)")
    // In a real app: post NSNotification, update native UI, etc.
    NotificationCenter.default.post(
      name: NSNotification.Name("UserNameUpdated"),
      object: nil,
      userInfo: ["userName": userName]
    )
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
