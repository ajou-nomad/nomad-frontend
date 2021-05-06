/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bubble = (props) => {

    const renderUsername = () => {
        const username = props.currentMessage.user.name;
        
        if (username) {
            const { containerStyle, wrapperStyle, ...usernameProps } = props;
            if (props.renderUsername) {
                return props.renderUsername(usernameProps);
            }
            return (
                <Text
                    style={[
                        styles.standardFont,
                        styles.headerItem,
                        styles.time,
                        // timeProps.textStyle,
                    ]}
                >{username}</Text>
            );
        }

        return null;
    }

    // const renderTime = () => {
    //     if (props.currentMessage.createdAt) {
    //         const { containerStyle, wrapperStyle, ...timeProps } = props;
    //     }
    // }

    const messageHeader = isSameThread ? null : (
      <View style={styles.headerView}>
        {this.renderUsername()}
        {this.renderTime()}
        {this.renderTicks()}
      </View>
    )

    return (
        <View style={[styles.container, this.props.containerStyle]}>
            <TouchableOpacity
          onLongPress={this.onLongPress}
          accessibilityTraits='text'
          {...this.props.touchableProps}
        >
          <View style={[styles.wrapper, this.props.wrapperStyle]}>
            <View>
              {this.renderCustomView()}
              {messageHeader}
              {this.renderMessageImage()}
              {this.renderMessageText()}
            </View>
          </View>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  standardFont: {
    fontSize: 15,
  },
  slackMessageText: {
    marginLeft: 0,
    marginRight: 0,
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  wrapper: {
    marginRight: 60,
    minHeight: 20,
    justifyContent: 'flex-end',
  },
  username: {
    fontWeight: 'bold',
  },
  time: {
    textAlign: 'left',
    fontSize: 12,
  },
  timeContainer: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  headerItem: {
    marginRight: 10,
  },
  headerView: {
    // Try to align it better with the avatar on Android.
    marginTop: Platform.OS === 'android' ? -2 : 0,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  /* eslint-disable react-native/no-color-literals */
  tick: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  /* eslint-enable react-native/no-color-literals */
  tickView: {
    flexDirection: 'row',
  },
  slackImage: {
    borderRadius: 3,
    marginLeft: 0,
    marginRight: 0,
  },
})


export default Bubble;
