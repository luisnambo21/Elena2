import React, {useEffect, useState} from 'react';
import {Button, StyleSheet} from 'react-native';
import {ListItem, Avatar} from "react-native-elements";
import {ScrollView} from "react-native-gesture-handler"
import firebase from '../database/firebase'

const UserList = (props) => {
    const [users, setUsers] = useState([])

useEffect(() => {
    firebase.db.collection('usuarios').onSnapshot(querySnapshot => {
        const users = [];
       querySnapshot.docs.forEach((doc) => {
           const {nombre, correo, telefono} = doc.data();
           users.push({
               id: doc.id,
               nombre,
               correo,
               telefono,
               carrera,
               pago,
           });
       });
       setUsers(users);
    });
}, []);

return(
   <ScrollView>
        <Button
          onPress={() =>props.navigation.navigate("CreateUserScreen")}
          title="crear usuario"
        />
        {users.map((user) =>{
            return(
                <ListItem
                key={user.id}
                bottomDivider
                onPress={() => {
                    props.navigation.navigate("UserDetailScreen" ,{
                        userId: user.id,
                    });
                }}
                >
                <ListItem.Chevron/>
                  <Avatar
                    source={{
                        url: 
                        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                    }}
                    rounded
                />  

                <ListItem.Content>
                      <ListItem.Title>{user.nombre}</ListItem.Title>
                      <ListItem.Subtitle>{user.correo}</ListItem.Subtitle>
                </ListItem.Content>
                </ListItem>
            );
        })}
   </ScrollView> 
)
};

export default UserList;