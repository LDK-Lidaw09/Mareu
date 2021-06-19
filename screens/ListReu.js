import "react-native-gesture-handler";
import React, { Component } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { FloatingAction } from "react-native-floating-action";
import db from "../database/firebaseDb";
//import { FlatList } from "react-native";

const actions = [
  {
    text: "Add a reunion",
    icon: require("../assets/add.png"),
    name: "btn_add",
    position: 1,
  },
];

export default class ListReu extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.firestoreRef = db.collection("reunion");
    this.state = {
      isLoading: true,
      reuArr: [],
    };
  }
  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const reuArr = [];
    querySnapshot.forEach((res) => {
      const { nom, participant, mobile, heure, salle, motif } = res.data();
      reuArr.push({
        key: res.id,
        res,
        nom,
        participant,
        mobile,
        heure,
        salle,
        motif,
      });
    });
    this.setState({
      reuArr,
      isLoading: false,
    });
  };
  getRandomcolor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };
  handleEdit = (item) => {
    console.log("Clicked");
    this.props.navigation.navigate("ReunionDetail", {
      userkey: item.key,
    });
  };
  handledelete = (item) => {
    const dbRef = db.collection("reunion").doc(item.key);
    dbRef.delete().then((res) => {
      alert("La réunion a été bien supprimé");
      this.props.navigation.navigate("liste des Reunions");
    });
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator color="#9E9E9E" />
        </View>
      );
    }

    return (
      <React.Fragment>
        <View style={styles.container}>
          {this.state.reuArr.map((item, i) => {
            return (
              <React.Fragment>
                <ListItem key={item.key} bottomDivider>
                  <Icon
                    name="lens"
                    size={50}
                    type="material"
                    color={this.getRandomcolor()}
                  />

                  <ListItem.Content>
                    <ListItem.Title>{item.nom}</ListItem.Title>
                    <ListItem.Subtitle>
                      {item.participant},{item.motif},{item.heure},{item.salle}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <Icon
                    name="delete"
                    onClick={() => this.handledelete(item)}
                    size={30}
                    color="#e33057"
                  />
                  <Icon
                    name="edit"
                    onClick={() => this.handleEdit(item)}
                    size={30}
                    color="#0000FF"
                  />
                  <ListItem.Chevron />
                </ListItem>
              </React.Fragment>
            );
          })}
        </View>
        <FloatingAction
          actions={actions}
          onPressItem={(name) => {
            if (name == "btn_add") {
              this.navigation.navigate("AddReu");
            }
          }}
        />
        <StatusBar style="auto" />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22,
    backgroundColor: "#fff",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
