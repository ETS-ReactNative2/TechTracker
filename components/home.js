import React from 'react';
import {
    ScrollView,
    Text,
    StyleSheet,
    SafeAreaView
} from "react-native";
import { Header } from "react-native-elements";

const HomeScreen = () => {

    const [state, setState] = React.useState({
        name: '',
    })

    React.useEffect(() => {
        (async () => {
            let userToken = await AsyncStorage.getItem("userToken");

            setState({ name: userToken.firstName });
        })();
    }, []);

    return (
        <SafeAreaView>
            <Header
                centerComponent={{ text: `Welcome home, ${state.name}`, style: { color: '#fff' } }}
            />
            <ScrollView>
                <Text>
                    Congratulations on doing yourself a favor, and taking the time to use this app.
                    The interface is incredibly simple, but it has the potential to be very impactful.
                    The simple act of visualizing how you spend your time an energy can bring about huge changes
                    in all aspects of your life; admittedly, most of us are simply unaware that we are wasting time.

                    Taking a moment to create and end a session will influence how you spend that time, whether
                    it be watching television, using Facebook, or even meditating. We'll keep track of how much time you
                    spend doing all these things. So at the end of the day, you can know for sure how you used
                    the 24 hours we are all equally bestowed.

                    Simply choose an activity that you have pre-created, or create a new activity. Then, just push start session.
                    When you are done with this activity, push the end button. That's it. The magic is that you were aware of your activity,
                    nothing more than that. As you continue to log sessions, you'll be able to visualize how often or seldom you do that activity.
                    Just choose an activity on the statistics page and you will see all the daily, weekly, and monthly usage.

                    The very last page features inspirational content. You may or may not read it, but as you continue to create sessions, you may
                    find yourself with more time on your hands. On this page, you can enrich your mind with new ideas and find new ways to
                    use that extra time.

                    My hope is that by using this app, you might start to see a brighter, more spacious, and conscious side of life simply by noticing how
                    you spend your time and energy. If you have any questions, you can reach out to me personally, at ryan.lindsey27@gmail.com.

                    Have a blessed day. Namaste.
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    null: null
})

export default HomeScreen;