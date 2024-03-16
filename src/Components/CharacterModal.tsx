import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, } from 'react-native';
import { Characters } from '../Types';

import IconFeat from 'react-native-vector-icons/Feather'
import IconFont from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { addFavorite } from '../utils/slice/favoriteSlice';



type Props = {
    isVisible: boolean,
    onClose: any,
    character: Characters
}


const CharacterModal = ({ isVisible, onClose, character }: Props) => {


    const dispatch = useDispatch()

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Image source={{ uri: character.image }} style={{ width: 50, height: 50, borderRadius: 16 }}></Image>
                    <Text style={styles.characterName}>{character.name}</Text>
                    <View style={{ alignItems: 'center', gap: 15 }}>
                        <View style={styles.itemContainer}>
                            <Text style={styles.characterStatus}>{character.status}</Text>
                            <IconFeat size={18} name='activity' color={character.status === 'Alive' ? 'green' : 'red'} ></IconFeat>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.characterSpecies}>{character.species}</Text>
                            <IconFont size={18} name='user' color={'black'}></IconFont>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.characterSpecies}>{character.gender}</Text>
                            <IconFont size={18} name={character.gender === 'Male' ? 'male' : 'female'} color={'black'}></IconFont>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.characterSpecies}>{character.location.name}</Text>
                            <IconFeat size={18} name='map-pin' color={'black'}></IconFeat>
                        </View>
                        <View style={styles.itemContainer}>
                            <Text style={styles.characterSpecies}>{character.origin.name === 'unknown' ? 'Bilinmiyor' : character.origin.name}</Text>
                            <IconFeat size={18} name='globe' color={'black'}></IconFeat>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dispatch(addFavorite({ item: character }))} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Add Favorite</Text>
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
    itemContainer: {
        alignItems: 'center',
        gap: 10,
        flexDirection: 'row'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 15,
        gap: 15
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 32,
        borderRadius: 10,
        alignItems: 'center',
    },
    characterName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    characterStatus: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
    },
    characterSpecies: {
        color: 'black',
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: '#2c450a',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#f7efcb',
        fontWeight: 'bold',
    },
});

export default CharacterModal;