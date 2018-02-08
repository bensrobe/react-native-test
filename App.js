import React from 'react';
import { StyleSheet, Text, View, Image, Button, Keyboard } from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const DriverInfo = t.struct({
    hoursWorked: t.Number,
    creditTips: t.Number
});

export default class App extends React.Component {
    constructor(){
        super();
        this.state = {
            totalLabel: '0.00',
            cashLabel: '0.00'
        }
    }

    handleSubmit = () => {
        const value = this._form.getValue(); //get the struct DriverInfo from the form
        var minWage = 9.25;                //minimum wage (MI: Feb. 8, 2018)
        var driverPay = 5.00;

        var totalTips;
        var cashTips;

        console.log(value);

        //check if the user entered any values into the text box, if so process input
        if(value){
            var hours = value.hoursWorked;
            var ccTips = value.creditTips;

            totalTips = hours * (minWage - driverPay);

            //error handling, set total cash tips needed to 0 if user already has enough cc tips
            if(ccTips > totalTips){
                totalTips = ccTips;
                cashTips = 0.00;
            }
            else{
                cashTips = (totalTips - ccTips);
            }

            this.setState({
                totalLabel: totalTips.toFixed(2),
                cashLabel: cashTips.toFixed(2)
            });
        }
        //take the keyboard off the screen
        Keyboard.dismiss();
    }


    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.headStyle}>
                    <HeaderImage />
                    <Text style={styles.headText}>Tip Calculator</Text>
                </View>

                <View style={styles.container}>
                    {/*
                        Render the form using a Struct containing the DriverInfo data
                        see
                    */}
                    <Form ref={c => this._form = c}
                          type={DriverInfo}
                    />
                    <Button style={styles.btn}
                        title="Calculate Tips"
                        onPress={this.handleSubmit}
                    />
                </View>


                <View style={styles.resultContainer}>
                    <View style={styles.resultCard}>
                        <Text style={styles.resultLabel}>Cash Tips</Text>
                        <Text style={styles.resultData}>${this.state.cashLabel}</Text>
                    </View>
                    <View style={styles.resultCard}>
                        <Text style={styles.resultLabel}>Total Tips</Text>
                        <Text style={styles.resultData}>${this.state.totalLabel}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

class HeaderImage extends React.Component {
    render() {
        let pic = {
            uri: 'http://jetspizza.com/img/headerlogo.png'
        };
        return (
            <Image source={pic} style={{width: 234, height: 121}}/>
        );
    }
}



const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        //borderColor: 'red',
        //borderWidth: 1,
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        //borderColor: 'red',
        //borderWidth: 5,
    },

    headStyle: {
        //top: 30,
        justifyContent: 'flex-end',
        flex: 1,
        alignItems: 'center',
        //width: 234,
        //marginBottom: 25,
        //borderColor: 'red',
        //borderWidth: 1,
    },

    headText: {
        fontSize: 30,
    },

    resultContainer: {
        width: '70%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        //borderColor: 'red',
        //borderWidth: 1,
    },

    resultCard: {
        width: '50%',
        flex: 1,
        alignItems: 'center',
        //borderColor: 'red',
        //borderWidth: 1,
        //flexDirection: 'row',
        //justifyContent: 'space-between',
        //borderColor: 'red',
        //borderWidth: 1,
    },

    resultLabel: {
        fontSize: 20,
    },

    resultData: {
        marginTop: 20,
        fontSize: 30,
    },

    btn: {
        backgroundColor: 'cyan',
    },
});
