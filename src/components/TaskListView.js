import React, { Component } from 'react';
import { View, SectionList, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';


export default class TaskListView extends Component {

    render() {

        return (
            <SectionList
                renderSectionHeader={(section) => this._renderSectionHeader(section)}
                sections={[
                    {
                        data: this.props.tasks.filter((data) => {
                            return data.priority
                            //  && !data.isDone
                        }),
                        key: "hightPriority",
                        title: 'Hight Priority'
                    },
                    {
                        data: this.props.tasks.filter((data) => {
                            return !data.priority
                            //  && !data.isDone
                        }),
                        key: "lowPriority",
                        title: 'Low Priority'
                    },
                ]}
                renderItem={(data) => this._renderItem(data)} />
        );
    }

    _renderSectionHeader(sectionData) {
        return (
            <View style={styles.headerConteiner}>
                <View style={styles.headerTagConteiner}>
                    <Text
                        style={styles.headerTagText}>{sectionData.section.title.substr(0, 1)}</Text>
                </View>
                <Text style={styles.headerText}>{sectionData.section.title}</Text>
            </View>
        );
    }

    _renderItem(itemData) {
        return (
            <View>
                {itemData.item.isDone ? (
                    
                    <TouchableOpacity>
                        <View style={styles.itemConteinerDone}>
                            <Text style={styles.itemTextTitleDone}>{itemData.item.title}</Text>
                            <Text style={styles.itemTextDescriptionDone}>{itemData.item.resume}</Text>
                        </View>

                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity onPress={() => this._onClickTask(itemData.item)}>

                            <View style={styles.itemConteiner}>
                                <Text style={styles.itemTextTitle}>{itemData.item.title}</Text>
                                <Text style={styles.itemTextDescription}>{itemData.item.resume}</Text>
                            </View>

                        </TouchableOpacity>
                    )}
            </ View>
        )
    }

    _onClickTask(task) {
        const { navigate } = this.props.navigation;
        navigate('pageTask', { task });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10
    },
    headerConteiner: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        borderRadius: 10,
        marginTop: 10
    },
    headerTagConteiner: {
        backgroundColor: '#1976D2',
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    headerTagText: {
        color: '#FFFFFF',
        fontSize: 22
    },
    headerText: {
        fontSize: 16,
        marginLeft: 10,
        color: 'white',
    },
    itemConteiner: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginTop: 5,
        padding: 10,
        height: 75,
        borderRadius: 10
    },
    itemTextTitle: {
        fontSize: 20,
        color: '#1976D2'
    },
    itemTextDescription: {
        color: 'grey'
    },
    itemConteinerDone: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#BDBDBD',
        marginTop: 5,
        padding: 10,
        height: 75,
        borderRadius: 10
    },
    itemTextTitleDone: {
        fontSize: 20,
        color: '#F5F5F5'
    },
    itemTextDescriptionDone: {
        color: '#F5F5F5'
    }
});