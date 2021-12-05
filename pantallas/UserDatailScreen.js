import React, {useEffect, useState} from "react";
import {ScrollView, Button, View, Alert, ActivityIndicator, StyleSheet} from "react-native";
import {TextInput} from "react-native-gesture-handler";

import firebase from "../database/firebase";

const UserDetailScreen = (props) =>{
    const initalState = {
        id: "",
        nombre: "",
        correo: "",
        telefono: "",
        carrera: "",
        pago: "",
    };

    const [user, setUser]= useState(initalState);
    const [loading, setLoading] = useState(true);

    const handleTextChange = (value, prop) => {
        setUser({ ...user, [prop]: value});
    };

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection("usuarios").doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({ ...user, id: doc.id});
        setLoading(false);
    };

    const deleteUser = async () => {
        setLoading(true)
        const dbRef = firebase.db.collection("usuarios").doc(props.route.params.userId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("UserList");
    };



    const openConfirmationAlert = () => {
        Alert.alert(
            "Eliminar usuario",
            "Estas seguro?",
            [
                {text: "Yes", onPress: () => deleteUser()},
                {text: "No", onPress: () => console.log("Cancelado")},
            ],
            {
                cancelable: true,
            }
        );
    };

    const updateUser = async () => {
        const userRef = firebase.db.collection("usuarios").doc(user.id);
        await userRef.set({
            nombre: user.nombre,
            correo: user.correo,
            telefono: user.telefono,
            carrera: user.carrera,
            pago: user.pago,
        });
        setUser(initalState);
        props.navigation.navigate("UserList");
    };

    useEffect(() => {
        getUserById(props.route.params.userId);
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <TextInput
                    placeholder="Nombre"
                    
                    style={styles.inputGroup}
                    value={user.nombre}
                    onChangeText={(value)=> handleTextChange(value, "nombre")}
                />
            </View>
            <View>
            <TextInput
                    placeholder="Email"
                    
                    style={styles.inputGroup}
                    value={user.correo}
                    onChangeText={(value)=> handleTextChange(value, "correo")}
                />
            </View>
            <View>
            <TextInput
                    placeholder="Telefono"
                    
                    style={styles.inputGroup}
                    value={user.telefono}
                    onChangeText={(value)=> handleTextChange(value, "telefono")}
                />
            </View>
            <View>
            <TextInput
                    placeholder="Carrera"
                    
                    style={styles.inputGroup}
                    value={user.carrera}
                    onChangeText={(value)=> handleTextChange(value, "carrera")}
                />
            </View>
            <View>
            <TextInput
                    placeholder="Pago"
                    
                    style={styles.inputGroup}
                    value={user.pago}
                    onChangeText={(value)=> handleTextChange(value, "pago")}
                />
            </View>
            <View style={styles.btn}>
                <Button
                  title="Borrar"
                  onPress={() => openConfirmationAlert()}
                  color="#E37399"
                  />
            </View>
            <View>
                <Button title="Actualizar" onPress={() => updateUser()} color="#19AC52"/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    loader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
    btn: {
        marginBottom: 7,
    },
});

export default UserDetailScreen;