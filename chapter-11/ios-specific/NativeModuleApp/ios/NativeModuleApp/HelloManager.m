//
//  HelloManager.m
//  NativeModuleApp
//
//  This Objective-C file registers the Swift native module with React Native's bridge.
//  Since React Native's module system is built in Obj-C, Swift modules need this
//  companion file to declare their existence to the bridge.
//
//  RCT_EXTERN_MODULE declares the module name (must match @objc(HelloManager) in Swift)
//  RCT_EXTERN_METHOD declares each method signature exposed to JavaScript
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(HelloManager, NSObject)

RCT_EXTERN_METHOD(
  greetUser:(NSString *)name
  isAdmin:(BOOL)isAdmin
  callback:(RCTResponseSenderBlock)callback
)

@end
