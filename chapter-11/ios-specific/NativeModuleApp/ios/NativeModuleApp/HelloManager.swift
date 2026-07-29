import Foundation

/**
 * HelloManager is a custom native module that demonstrates how to expose
 * Swift methods to JavaScript via the React Native bridge.
 *
 * In JavaScript, this module is accessed via:
 *   import { NativeModules } from 'react-native';
 *   const { HelloManager } = NativeModules;
 *   HelloManager.greetUser(name, isAdmin, callback);
 *
 * Key points:
 * - The class must extend NSObject (required by the Obj-C runtime bridge)
 * - @objc attribute exposes methods to Objective-C (which RN's bridge uses)
 * - The companion .m file (HelloManager.m) uses RCT_EXTERN_MODULE and
 *   RCT_EXTERN_METHOD to register the module with React Native's bridge
 */
@objc(HelloManager)
class HelloManager: NSObject {

  /**
   * Any method exposed to JS must be annotated with @objc.
   * Parameters are automatically converted between JS and Swift types.
   * RCTResponseSenderBlock is the callback type that sends data back to JS.
   */
  @objc
  func greetUser(
    _ name: String,
    isAdmin: Bool,
    callback: @escaping RCTResponseSenderBlock
  ) {
    let adminStatus = isAdmin ? "are" : "are not"
    let greeting = "Welcome \(name), you \(adminStatus) an administrator."
    callback([greeting])
  }

  /**
   * Tells React Native that this module's methods should be called on the
   * main thread. Return false if your methods don't touch UI.
   */
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
