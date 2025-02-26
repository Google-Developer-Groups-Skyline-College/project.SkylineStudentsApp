// ClubsList.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchClubsData } from './clubsService';

export default function ClubsList() {
  const [clubs, setClubs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClubs = async () => {
      try {
        const data = await fetchClubsData();
        setClubs(data);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadClubs();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading clubs...</Text>
      </View>
    );
  }

  if (!clubs || Object.keys(clubs).length === 0) {
    return (
      <View style={styles.center}>
        <Text>No clubs available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {Object.entries(clubs).map(([clubName, clubInfo]) => (
        <View key={clubName} style={styles.clubCard}>
          <Text style={styles.clubTitle}>{clubName}</Text>
          <Text>{clubInfo.description}</Text>
          <Text>{clubInfo.meetingLocation}</Text>
          <Text>{clubInfo.meetingTime}</Text>
          {/* If your clubInfo contains image URLs, you could add an <Image> component here */}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  clubCard: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  clubTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
