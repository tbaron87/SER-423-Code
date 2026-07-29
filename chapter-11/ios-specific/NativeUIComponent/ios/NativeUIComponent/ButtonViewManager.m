//
//  ButtonViewManager.m
//  NativeUIComponent
//
//  This Objective-C file registers the Swift ViewManager with React Native's bridge.
//  Since React Native's view management system is built in Obj-C, Swift ViewManagers
//  need this companion file.
//
//  RCT_EXTERN_MODULE declares the ViewManager name (must match @objc(ButtonViewManager))
//  RCT_EXPORT_VIEW_PROPERTY declares props that can be set from JavaScript
//

#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(ButtonViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(buttonText, NSString)
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)

@end
