import * as React from 'react';
import {useEffect} from 'react';
import {Button, StyleSheet} from 'react-native';
import * as Linking2 from 'expo-linking';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import * as WebBrowser from 'expo-web-browser';

export default function TabOneScreen() {

    const _handleOpenWithLinking = () => {
        // Linking.openURL('https://expo.io');
        Linking2.openURL('twitter://post?message=hello%20world');
    };

    const _handleOpenWithWebBrowser = () => {
        WebBrowser.openBrowserAsync('https://expo.io');
    };


    const _handleUrl = (event: { url: string }) => {
        console.log("App already open", {event});
        const parsed = Linking2.parse(event.url);
        const { path, queryParams } = parsed;
        console.log("Parsed", {parsed});
        alert(`Linked to app with path: ${path} and data: ${JSON.stringify(queryParams)}`);
    };

    useEffect(() => {
        Linking2.addEventListener('url', _handleUrl);
        Linking2.parseInitialURLAsync()
            .then(data => {
                console.log("App was closed success", {data});
                alert("App was closed");
            })
            .catch(error => {
                console.error("App was closed failed", {error});
            });
        return () => Linking2.removeEventListener('url', _handleUrl);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab Onex</Text>
            <Button
                title="ReactNative.Linking"
                onPress={_handleOpenWithLinking}
            />
            <Button
                title="Open URL with Expo.WebBrowser"
                onPress={_handleOpenWithWebBrowser}
            />
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <EditScreenInfo path="/screens/TabOneScreen.tsx"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
