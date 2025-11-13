import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const EmailIcon = require('../assets/resources/Email.png');
const LockIcon = require('../assets/resources/Lock.png');
const User = require('../assets/resources/User.png'); 
const LogoIcon = require('../assets/resources/smarthome-icon.png'); 

const SmartHomeLogo = () => (
    <View style={styles.logoContainer}>
        <Image 
            source={LogoIcon} 
            style={styles.logoImage}
            resizeMode="contain"
        />
    </View>
);

type AuthTab = "signIn" | "register";

const AuthScreen = () => {
    const [activeTab, setActiveTab] = useState<AuthTab>("signIn"); 
    const [loginEmailOrUsername, setLoginEmailOrUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false); 

    const [regUsername, setRegUsername] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    const router = useRouter();

    const handleAuth = () => {
        if (activeTab === "signIn") {
            console.log("Attempting Sign In with:", loginEmailOrUsername, loginPassword);
            
            router.replace('/(tabs)/home');

        } else {
            console.log("Attempting Registration with:", regUsername, regEmail, regPassword);
            setActiveTab("signIn");
        }
    }

    const handleSwitch = (tab: AuthTab) => {
        setActiveTab(tab);
        setLoginEmailOrUsername("");
        setLoginPassword("");
        setRegUsername("");
        setRegEmail("");
        setRegPassword("");
        setRememberMe(false);
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <SmartHomeLogo />

                <View style={styles.header}>
                    <Text style={[styles.headerText, styles.unnaFontBold]}>
                        {activeTab === "signIn" ? "LOGIN" : "REGISTER"}
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    {activeTab === "signIn" ? (
                        <>
                            {/* Input 1: Email or Username */}
                            <View style={styles.inputContainer}>
                                <Image source={EmailIcon} style={styles.imageIcon} />
                                <TextInput
                                    style={[styles.inputField, styles.unnaFontRegular]}
                                    placeholder="Email or Username"
                                    placeholderTextColor="#888" 
                                    value={loginEmailOrUsername}
                                    onChangeText={setLoginEmailOrUsername}
                                    autoCapitalize="none"
                                />
                            </View>

                            {/* Input 2: Password */}
                            <View style={styles.inputContainer}>
                                <Image source={LockIcon} style={styles.imageIcon} />
                                <TextInput
                                    style={[styles.inputField, styles.unnaFontRegular]}
                                    placeholder="Password"
                                    placeholderTextColor="#888" 
                                    value={loginPassword}
                                    onChangeText={setLoginPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />
                            </View>
                            
                            <View style={styles.loginOptionsRow}>
                                <TouchableOpacity 
                                    style={styles.rememberMeContainer} 
                                    onPress={() => setRememberMe(!rememberMe)} 
                                >
                                    <View style={[styles.checkbox, rememberMe && styles.checkedCheckbox]}>
                                        {rememberMe && <Text style={styles.checkboxText}>✓</Text>}
                                    </View>
                                    <Text style={styles.rememberMeText}>Remember Me</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log("Forgot Password Pressed")}>
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <>
                            {/* Input 1: Username (using User.png asset) */}
                            <View style={styles.inputContainer}>
                                <Image source={User} style={styles.imageIcon} />
                                <TextInput
                                    style={[styles.inputField, styles.unnaFontRegular]}
                                    placeholder="Username"
                                    placeholderTextColor="#888" 
                                    value={regUsername}
                                    onChangeText={setRegUsername}
                                    autoCapitalize="none"
                                />
                            </View>
                            
                            {/* Input 2: Email */}
                            <View style={styles.inputContainer}>
                                <Image source={EmailIcon} style={styles.imageIcon} />
                                <TextInput
                                    style={[styles.inputField, styles.unnaFontRegular]}
                                    placeholder="Email"
                                    placeholderTextColor="#888" 
                                    value={regEmail}
                                    onChangeText={setRegEmail}
                                    autoCapitalize="none"
                                />
                            </View>
                            
                            {/* Input 3: Password */}
                            <View style={styles.inputContainer}>
                                <Image source={LockIcon} style={styles.imageIcon} />
                                <TextInput
                                    style={[styles.inputField, styles.unnaFontRegular]}
                                    placeholder="Password"
                                    placeholderTextColor="#888" 
                                    value={regPassword}
                                    onChangeText={setRegPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />
                            </View>
                        </>
                    )}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleAuth}>
                        <Text style={[styles.buttonText, styles.unnaFontBold]}>
                            {activeTab === "signIn" ? "LOGIN" : "REGISTER"}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.footerLinkContainer}>
                        {activeTab === "signIn" ? (
                            <Text style={[styles.accountText, styles.unnaFontRegular]}>
                                Don't have an account?{' '}
                                <Text style={styles.linkText} onPress={() => handleSwitch("register")}>
                                    Sign Up
                                </Text>
                            </Text>
                        ) : (
                            <Text style={[styles.accountText, styles.unnaFontRegular]}>
                                Already have an account?{' '}
                                <Text style={styles.linkText} onPress={() => handleSwitch("signIn")}>
                                    Login
                                </Text>
                            </Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default AuthScreen

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: '#1c1e22', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: 'white',
        fontSize: 20,
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#1c1e22", 
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingVertical: 50,
    },
    
    unnaFontBold: {
        fontFamily: "Unna_700Bold",
    },
    unnaFontRegular:{
        fontFamily: "Unna_400Regular",
    },

    logoContainer: {
        marginBottom: 40,
        width: 60, 
        height: 60, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 112,
        height: 112,
        tintColor: '#FF8C00',
    },

    header: {
        marginBottom: 30,
        marginTop: 10,
    },
    headerText: {
        color: "white",
        fontSize: 32,
        letterSpacing: 3,
    },
    
    formContainer: {
        width: "100%",
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        height: 55,
        marginVertical: 10,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: '#FF8C00',
        paddingHorizontal: 20,
        backgroundColor: '#2A2A2A', 
    },
    inputIcon: {
        fontSize: 18,
        color: '#FF8C00', 
        marginRight: 15,
    },
    imageIcon: {
        width: 24, 
        height: 24,
        tintColor: '#FF8C00', 
        marginRight: 15,
        resizeMode: 'contain',
    },
    inputField: {
        flex: 1,
        color: '#E0E0E0', 
        fontSize: 18,
        paddingVertical: 0, 
    },

    loginOptionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
        paddingHorizontal: 5,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#FF8C00', 
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: 'transparent',
    },
    checkedCheckbox: {
        backgroundColor: '#4CAF50', 
        borderColor: '#4CAF50',
    },
    checkboxText: {
        color: 'white',
        fontSize: 16, 
        lineHeight: 18,
    },
    rememberMeText: {
        color: '#E0E0E0',
        fontFamily: "Unna_400Regular",
        fontSize: 16,
    },
    forgotPasswordText: {
        color: '#FF8C00', 
        fontFamily: "Unna_700Bold",
        fontSize: 16,
        textDecorationLine: 'underline',
    },

    buttonContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#4CAF50", 
        width: "100%",
        paddingVertical: 15,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 24,
        textAlign: 'center',
        letterSpacing: 1.5,
    },

    footerLinkContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    accountText: {
        color: "#E0E0E0", 
        fontSize: 16,
    },
    linkText: {
        color: "#FF8C00",
        fontFamily: "Unna_700Bold",
        textDecorationLine: 'underline',
    },
});