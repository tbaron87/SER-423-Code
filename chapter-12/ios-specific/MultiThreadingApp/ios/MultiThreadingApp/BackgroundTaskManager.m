//
//  BackgroundTaskManager.m — Bridge registration for Swift native module
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(BackgroundTaskManager, RCTEventEmitter)

RCT_EXTERN_METHOD(loadInBackground)
RCT_EXTERN_METHOD(addListener:(NSString *)eventName)
RCT_EXTERN_METHOD(removeListeners:(double)count)

@end
