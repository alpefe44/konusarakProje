import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';


type Props = {
    isVisible: boolean,
    onConfirm: any,
    onCancel: any
}


const ConfirmModal = ({ isVisible, onConfirm, onCancel }: Props) => {
    return (
        <Modal
            visible={isVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={onCancel}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Favorilerden silmek istediğinizden emin misiniz?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onConfirm} style={[styles.button, { backgroundColor: 'red' }]}>
                            <Text style={styles.buttonText}>Evet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCancel} style={[styles.button, { backgroundColor: 'green' }]}>
                            <Text style={styles.buttonText}>Hayır</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        color : 'black'
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default ConfirmModal;