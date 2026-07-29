import UIKit

/**
 * ButtonViewManager is a custom native UI component that exposes a UIButton
 * to React Native.
 *
 * It extends RCTViewManager, which means:
 * - view() creates the actual UIKit view
 * - Properties set from JS are received via the companion .m file's RCT_EXPORT_VIEW_PROPERTY
 * - Events are sent back to JS by calling the onChange block (mapped to 'topChange')
 *
 * In JavaScript, this component is used via:
 *   const ButtonView = requireNativeComponent('ButtonView');
 *   <ButtonView buttonText="Hello" onChange={handler} />
 */
@objc(ButtonViewManager)
class ButtonViewManager: RCTViewManager {

  override func view() -> UIView! {
    let button = NativeButton()
    return button
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

/**
 * NativeButton is a UIButton subclass that:
 * - Accepts a buttonText prop (sets the title)
 * - Has an onChange callback block (called when tapped, sends event to JS)
 */
class NativeButton: UIButton {

  @objc var buttonText: String = "" {
    didSet {
      setTitle(buttonText, for: .normal)
    }
  }

  /// This block is called by React Native's event system when we fire it.
  /// RN maps 'onChange' prop on the JS side to this block.
  @objc var onChange: RCTBubblingEventBlock?

  override init(frame: CGRect) {
    super.init(frame: frame)
    setup()
  }

  required init?(coder: NSCoder) {
    super.init(coder: coder)
    setup()
  }

  private func setup() {
    backgroundColor = .systemBlue
    setTitleColor(.white, for: .normal)
    addTarget(self, action: #selector(handleTap), for: .touchUpInside)
  }

  @objc private func handleTap() {
    onChange?(["message": "Button clicked!"])
  }
}
