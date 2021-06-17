import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
//import firebase from 'firebase';
import db from '../database/firebaseDb'

export default class DetailReu extends Component {

  constructor() {
    super();
    this.state = {
        nom: '',
        participant: '',
        mobile: '',
        duree:'',
        salle:'',
        motif:'',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = db.collection('reunion').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const reu = res.data();
        this.setState({
          key: res.id,
          nom: reu.nom,
          participant: reu.participant,
          mobile: reu.mobile,
          duree: reu.duree,
          salle: reu.salle,
          motif: reu.motif,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateReunion() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = db.collection('reunion').doc(this.state.key);
    updateDBRef.set({
      nom: this.state.nom,
      participant: this.state.participant,
      mobile: this.state.mobile,
      duree: this.state.duree,
      salle: this.state.salle,
      motif: this.state.motif,
    }).then((docRef) => {
      this.setState({
        key: '',
        nom: '',
        participant: '',
        mobile: '',
        duree:'',
        salle:'',
        motif:'',
        isLoading: false,
      });
      this.props.navigation.navigate('liste des Reunions');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteReunion() {
    const dbRef = db.collection('reunion').doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('La réunion a été bien supprimé')
          this.props.navigation.navigate('liste des Reunions');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Supprimer la réunion',
      'Êtes vous sur?',
      [
        {text: 'Yes', onPress: () => this.deleteReunion()},
        {text: 'No', onPress: () => console.log('Opération annulée'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  render() {
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
              placeholder={'Email'}
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
              placeholder={'Durée'}
              value={this.state.duree}
              onChangeText={(val) => this.inputValueUpdate(val, 'duree')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Salle'}
              value={this.state.salle}
              onChangeText={(val) => this.inputValueUpdate(val, 'salle')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Motif de  Réunion'}
              value={this.state.motif}
              onChangeText={(val) => this.inputValueUpdate(val, 'motif')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Update'
            onPress={() => this.updateReunion()} 
            color="#19AC52"
          />
          </View>
         <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="#FF0000"
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

