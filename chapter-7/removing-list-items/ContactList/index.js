import { useState } from 'react';
import { FlatList } from 'react-native';
import ContactItem from './ContactItem';

const initialData = [
  { id: 1, name: 'Jon Snow' },
  { id: 2, name: 'Luke Skywalker' },
  { id: 3, name: 'Bilbo Baggins' },
  { id: 4, name: 'Bob Labla' },
  { id: 5, name: 'Mr. Magoo' },
];

export default function ContactList() {
  const [contacts, setContacts] = useState(initialData);
  const [swiping, setSwiping] = useState(false);

  const handleRemoveContact = (contact) => {
    setContacts((prev) => prev.filter((item) => item.id !== contact.id));
  };

  const handleToggleSwipe = () => {
    setSwiping((prev) => !prev);
  };

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => String(item.id)}
      scrollEnabled={!swiping}
      renderItem={({ item }) => (
        <ContactItem
          contact={item}
          onRemove={handleRemoveContact}
          onDragEnd={handleToggleSwipe}
          onDragStart={handleToggleSwipe}
        />
      )}
    />
  );
}
