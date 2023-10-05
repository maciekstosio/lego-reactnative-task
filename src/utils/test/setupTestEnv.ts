import 'react-native-gesture-handler/jestSetup';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

// https://stackoverflow.com/questions/75934507/after-upgrading-to-expo48-meeting-this-error-typeerror-cannot-read-properties
jest.mock("expo-font")
jest.mock("expo-asset")
