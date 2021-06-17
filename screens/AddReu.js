import 'react-native-gesture-handler';

import firebase from 'firebase';
import React, { Component } from 'react';
import { Button,StyleSheet,TextInput, Dimensions,ScrollView, ActivityIndicator, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default class FormReu extends Component {
    constructor() {
        super();
        this.dbRef = firebase.firestore().collection('reunion');
        this.state = {
          nom: '',
          participant: '',
          mobile: '',
          duree:'',
          salle:'',
          motif:'',
          isLoading: false
        };
      }
      inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }
    
      storeReunion() {
        if(this.state.nom === ''){
         alert('Veuillez entrer le nom de la reunion!')
        } else {
          this.setState({
            isLoading: true,
          });      
          this.dbRef.add({
            nom: this.state.nom,
            participant: this.state.participant,
            mobile: this.state.mobile,
            duree: this.state.duree,
            salle: this.state.salle,
            motif: this.state.motif,
          }).then((res) => {
            this.setState({
              nom: '',
              participant: '',
              mobile: '',
              duree:'',
              salle:'',
              motif:'',
              isLoading: false,
            });
            this.props.navigation.navigate("liste des Reunions")
          })
          .catch((err) => {
            console.error("Error found: ", err);
            this.setState({
              isLoading: false,
            });
          });
        }
      }
    
 render (){
    if(this.state.isLoading){
        return(
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
          </View>
        )
      }
      return (
        <ScrollView style={styles.container}>
          <View style={styles.inputGroup}>
            <TextInput
                placeholder={'Name'}
                value={this.state.nom}
                onChangeText={(val) => this.inputValueUpdate(val, 'nom')}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder={'Email-participant'}
                value={this.state.participant}
                onChangeText={(val) => this.inputValueUpdate(val, 'participant')}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
                placeholder={'Mobile'}
                value={this.state.mobile}
                onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
                placeholder={'Durée de la réunion'}
                value={this.state.duree}
                onChangeText={(val) => this.inputValueUpdate(val, 'duree')}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
                placeholder={'Salle de la réunion'}
                value={this.state.salle}
                onChangeText={(val) => this.inputValueUpdate(val, 'salle')}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
                placeholder={'Motif de la reunion'}
                value={this.state.motif}
                onChangeText={(val) => this.inputValueUpdate(val, 'motif')}
            />
          </View>
          <View style={styles.button}>
            <Button
              title='Add Reunion'
              onPress={() => this.storeReunion()} 
              color="#19AC52"
            />
          </View>
        </ScrollView>
      );
   
 }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7, 
  }
})
