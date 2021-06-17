import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { FloatingAction } from "react-native-floating-action";
import db from '../database/firebaseDb';

const actions = [
    {
    text: "Add",
    icon: require("../assets/add.png"),
    name: "btn_add",
    position: 1
    },
    
   ];

export default class ListReu extends Component {
    constructor(props) {
        super(props);
        this.navigation= props.navigation
        this.firestoreRef = db.collection('reunion');
        this.state = {
          isLoading: true,
          userArr: []
        };
      }
      componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
      }
    
      componentWillUnmount(){
        this.unsubscribe();
      }
    
      getCollection = (querySnapshot) => {
        const userArr = [];
        querySnapshot.forEach((res) => {
          const { nom, participant, mobile, duree, salle , motif} = res.data();
          userArr.push({
            key: res.id,
            res,
            nom,
            participant,
            mobile,
            duree,
            salle,
            motif,
          });
        });
        this.setState({
          userArr,
          isLoading: false,
       });
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
        
            <React.Fragment>
       <View style={styles.container}>
              {
                this.state.userArr.map((item, i) => {
                  return (
                    
                    <ListItem
                      key={i}
                      chevron
                      bottomDivider
                      title={item.nom}
                      subtitle={item.partcipant}
                      onPress={() => {
                        this.props.navigation.navigate('ReunionDetail', {
                          userkey: item.key
                        });
                      }}/>
                      
                  );
                  
                })
                
              }  
              
          </View>
          <FloatingAction
            actions={actions}
            onPressItem={name => {
                if(name == 'btn_add'){
                    this.navigation.navigate('AddReu')
                }
 
 }}
 />
          </React.Fragment>
          
        );
      }
    
  }
  
  const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingBottom: 22,
     backgroundColor: '#fff',
    
    },
    preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
  
  