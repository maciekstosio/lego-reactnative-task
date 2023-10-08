import {StyleSheet, Pressable} from 'react-native';
import {legoRed} from '@/utils/theme'

interface CardProps {
    onPress?: () => void;
    checked?: boolean;
    children: React.ReactNode;
    testID?: string;
}

const Card =  ({children, checked, onPress, testID}: CardProps) => (
    <Pressable
        onPress={onPress}
        testID={`card.${testID}`}
        style={[styles.card, checked && styles.selected]}
        accessibilityState={{
            selected: checked,
        }}
    >
        {children}
    </Pressable>
)

const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 40,
        borderRadius: 40,
        marginHorizontal: 10,
        backgroundColor: '#fff',
    },
    selected: {
        shadowColor: legoRed,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6.27,
        elevation: 10,
    }
})

export default Card