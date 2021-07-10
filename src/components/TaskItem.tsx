import React, { useState, useRef, useEffect } from 'react';
import { 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  View, 
  TextInput 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/pen/pen.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  task: Task,
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskTitle: string) => void;
}

export function TaskItem({ 
  task, 
  toggleTaskDone, 
  removeTask, 
  editTask 
}: TaskItemProps) {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [editedTask, setEditedTask] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);
  
  function handleStartEditing() {
    setIsBeingEdited(true);
  }

  function handleCancelEditing() {
    setEditedTask(task.title);
    setIsBeingEdited(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, editedTask);
    setIsBeingEdited(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isBeingEdited) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();   
      }
    }
  }, [isBeingEdited]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${task.id}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${task.id}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker} 
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            ref={textInputRef}
            value={editedTask}
            onChangeText={setEditedTask}
            editable={isBeingEdited}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText} 
          />
        </TouchableOpacity>
      </View>
              
      <View style={styles.buttonsContainer}>
        { isBeingEdited ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={handleStartEditing}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        ) }

        <View 
          style={{ 
            width: 1, 
            backgroundColor: 'rgba(196, 196, 196, 0.24)',
          }} 
        />

        <TouchableOpacity
          testID={`trash-${task.id}`}
          style={{ paddingHorizontal: 24, opacity: isBeingEdited ? 0.2 : 1 }}
          onPress={() => removeTask(task.id)}
          disabled={isBeingEdited}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
 taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },

  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },

  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
