import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const App = () => {
  const [activeTab, setActiveTab] = useState('Tab 1');

  const handleTabPress = (tabName:any) => {
    setActiveTab(tabName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Tab 1' && styles.activeTab]}
          onPress={() => handleTabPress('Tab 1')}
        >
          <Text style={styles.tabText}>Tab 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Tab 2' && styles.activeTab]}
          onPress={() => handleTabPress('Tab 2')}
        >
          <Text style={styles.tabText}>Tab 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Tab 3' && styles.activeTab]}
          onPress={() => handleTabPress('Tab 3')}
        >
          <Text style={styles.tabText}>Tab 3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {activeTab === 'Tab 1' && <Text>Content for Tab 1</Text>}
        {activeTab === 'Tab 2' && <Text>Content for Tab 2</Text>}
        {activeTab === 'Tab 3' && <Text>Content for Tab 3</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#6e3b6e',
  },
  tabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
