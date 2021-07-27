import React from 'react';
import { WebView } from 'react-native-webview';

const InspirationScreen = (props) => {
    return (
        <WebView
            source={{ uri: 'https://www.ryanlindseysportfolio.com/blog/welcome-to-my-blog' }}
        />
    )
}

export default InspirationScreen;

