import React from 'react'
import { View, Text, StyleSheet, Image, Pressable} from 'react-native'

export default function MatchItem({navigation, item}) {
    

    const openVideoHandler = () => {
        if(item.homeTeam.includes('Telegram')){
            Linking.openURL("https://t.me/nigeria_tv");
            return
        }
        if(item.homeTeam.includes('WhatsApp')){
            Linking.openURL('https://whatsapp.com/channel/0029VaLRcAW9Gv7aWDjGbc3x');
            return
        }
        navigation.navigate('Video', {link: item.link, headers: item.headers});
    }



    if(item.link.includes('m3u8') && item.type <= 50) {
    return (
        <Pressable style={styles.container}
        onPress={openVideoHandler}
        >
            <View style={styles.team}>
               <Text style={styles.text}>{item.homeTeam}</Text>
                <Image
                    style={{width: 50, height: 50, borderRadius: 50/2}}
                    source={{uri: item.homeTeamLogo}}
                />
            </View>
            <View style={styles.vs}><Text style={styles.text}>-</Text></View>
            <View style={styles.team}>
                <Image
                    style={{width: 50, height: 50, borderRadius: 50/2}}
                    source={{uri: item.awayTeamLogo}}
                />
                <Text style={styles.text}>{item.awayTeam}</Text>
            </View>
        </Pressable>
    )
    }
    else if(item.link.includes('m3u8')) {
        return(
        <Pressable style={styles.container}
        onPress={openVideoHandler}>
            <View style={styles.team}>
               <Text style={styles.text}>{item.homeTeam}</Text>
                <Image
                    style={{width: 50, height: 50, borderRadius: 50/2}}
                    source={{uri: item.homeTeamLogo}}
                />
            </View>
        </Pressable>
        )
    }
    else{
        null
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        height: 110,
        width: '95%',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'space-between',
        margin: 10,
    },
    team: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        gap: 10, 
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',   
    },
    vs: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
    }
});