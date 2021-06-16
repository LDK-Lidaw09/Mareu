import 'react-native-gesture-handler';
import React from 'react';
import firebase from 'firebase';
import { StyleSheet,TextInput, Dimensions,ScrollView, ActivityIndicator, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default class FormReu extends React.Component {
    constructor() {
        super();
        this.dbRef = firebase.firestore().collection('reunion');
        this.state = {
          name: '',
          email: '',
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
        if(this.state.name === ''){
         alert('Veuillez entrer le nom de la reunion!')
        } else {
          this.setState({
            isLoading: true,
          });      
          this.dbRef.add({
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            duree: this.state.duree,
            salle: this.state.salle,
            motif: this.state.motif,
          }).then((res) => {
            this.setState({
              name: '',
              email: '',
              mobile: '',
              duree:'',
              salle:'',
              motif:'',
              isLoading: false,
            });
            this.props.navigation.navigate('ListReu')
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
                value={this.state.name}
                onChangeText={(val) => this.inputValueUpdate(val, 'name')}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder={'Email-participant'}
                value={this.state.email}
                onChangeText={(val) => this.inputValueUpdate(val, 'email')}
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
                value={this.state.mobile}
                onChangeText={(val) => this.inputValueUpdate(val, 'duree')}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
                placeholder={'Salle de la réunion'}
                value={this.state.mobile}
                onChangeText={(val) => this.inputValueUpdate(val, 'salle')}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
                placeholder={'Motif de la reunion'}
                value={this.state.mobile}
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