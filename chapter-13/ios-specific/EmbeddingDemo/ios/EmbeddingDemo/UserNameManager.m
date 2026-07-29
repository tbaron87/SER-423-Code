//
//  UserNameManager.m — Bridge registration
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(UserNameManager, NSObject)

RCT_EXTERN_METHOD(setUserName:(NSString *)userName)

@end
