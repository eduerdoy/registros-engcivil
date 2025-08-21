import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: '#687076'
        },
        tabBarActiveTintColor: 'rgb(28, 174, 204)',
        tabBarStyle: {
          backgroundColor: '#f2f4f7',
          height: 60,             
          paddingTop: 10,         
          paddingBottom: 10,      
        },
      }}
      initialRouteName="perguntas"
    >
      <Tabs.Screen
        name="perguntas"
        options={{
          title: 'Página inicial',
          headerShown: true,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <AntDesign size={25} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="registros"
        options={{
          title: 'Registros',
          headerShown: true,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <AntDesign name="database" size={25} color={color} 
          />,
        }}
      />
      <Tabs.Screen
        name="lixeira"
        options={{
          title: 'Lixeira',
          headerShown: true,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <AntDesign name="delete" size={25} color={color} 
          />,
        }}
      />
    </Tabs>
  );
}
