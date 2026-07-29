import Foundation
import MediaPlayer

/**
 * MediaManager demonstrates a native iOS module that:
 * 1. Presents the system music picker (MPMediaPickerController)
 * 2. Plays the selected song using MPMusicPlayerController
 * 3. Sends the song title back to JavaScript via an event
 *
 * This shows native-to-JS event communication using RCTEventEmitter.
 *
 * In JavaScript:
 *   const emitter = new NativeEventEmitter(NativeModules.MediaManager);
 *   emitter.addListener('SongPlaying', (title) => { ... });
 *   NativeModules.MediaManager.showSongs();
 */
@objc(MediaManager)
class MediaManager: RCTEventEmitter, MPMediaPickerControllerDelegate {

  private var mediaPicker: MPMediaPickerController?
  private let musicPlayer = MPMusicPlayerController.systemMusicPlayer

  override func supportedEvents() -> [String]! {
    return ["SongPlaying"]
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc
  func showSongs() {
    DispatchQueue.main.async {
      self.mediaPicker = MPMediaPickerController(mediaTypes: .anyAudio)
      self.mediaPicker?.delegate = self
      self.mediaPicker?.allowsPickingMultipleItems = false
      self.mediaPicker?.showsCloudItems = false
      self.mediaPicker?.prompt = "Select a song"

      guard let picker = self.mediaPicker,
            let rootVC = UIApplication.shared.connectedScenes
              .compactMap({ $0 as? UIWindowScene })
              .flatMap({ $0.windows })
              .first(where: { $0.isKeyWindow })?
              .rootViewController else { return }

      rootVC.present(picker, animated: true)
    }
  }

  // MARK: - MPMediaPickerControllerDelegate

  func mediaPicker(
    _ mediaPicker: MPMediaPickerController,
    didPickMediaItems mediaItemCollection: MPMediaItemCollection
  ) {
    let mediaItem = mediaItemCollection.items[0]
    let title = mediaItem.title ?? "Unknown"

    musicPlayer.setQueue(with: mediaItemCollection)
    musicPlayer.play()

    sendEvent(withName: "SongPlaying", body: title)
    dismissPicker()
  }

  func mediaPickerDidCancel(_ mediaPicker: MPMediaPickerController) {
    dismissPicker()
  }

  private func dismissPicker() {
    DispatchQueue.main.async {
      UIApplication.shared.connectedScenes
        .compactMap { $0 as? UIWindowScene }
        .flatMap { $0.windows }
        .first { $0.isKeyWindow }?
        .rootViewController?
        .dismiss(animated: true)
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
