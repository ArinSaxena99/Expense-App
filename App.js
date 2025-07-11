import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";
import i18n from "./util/i18n";
import { I18nextProvider } from "react-i18next";
import { useTranslation } from "react-i18next";
import LanguageModal from "./components/UI/LanguageModal";
import { useState } from "react";

const App = () => {
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();
  const { t } = useTranslation();

  function ExpensesOverView() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
      <>
        <BottomTabs.Navigator
          screenOptions={({ navigation }) => ({
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: "white",
            tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            headerRight: ({ tintColor }) => {
              return (
                <View style={{ flexDirection: "row", gap: 8, marginRight: 8 }}>
                  <IconButton
                    icon="globe-outline"
                    size={24}
                    color={tintColor}
                    onPress={() => {
                      setModalVisible(true);
                      // const newLang = i18n.language === "en" ? "hi" : "en";
                      // i18n.changeLanguage(newLang);
                    }}
                  />
                  <IconButton
                    icon="add"
                    size={24}
                    color={tintColor}
                    onPress={() => {
                      navigation.navigate("ManageExpense");
                    }}
                  />
                </View>
              );
            },
          })}
        >
          <BottomTabs.Screen
            name="AllExpenses"
            component={AllExpenses}
            options={{
              title: "All Expenses",
              tabBarLabel: "All Expenses",
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="calendar" size={size} color={color} />
              ),
            }}
          />
          <BottomTabs.Screen
            name="Recent Expenses"
            component={RecentExpenses}
            options={{
              title: "Recent Expenses",
              tabBarLabel: "Recent",
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="hourglass" size={size} color={color} />
              ),
            }}
          />
        </BottomTabs.Navigator>
        {
          <LanguageModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSelect={(lang) => {
              i18n.changeLanguage(lang);
            }}
            options={[
              { code: "en", label: "English" },
              { code: "hi", label: "हिन्दी" },
            ]}
          />
        }
      </>
    );
  }
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <ExpensesContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: "white",
              }}
            >
              <Stack.Screen
                name="ExpensesOverView"
                component={ExpensesOverView}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ManageExpense"
                component={ManageExpense}
                options={{
                  presentation: "modal",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ExpensesContextProvider>
      </I18nextProvider>
      <StatusBar style="light" />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
