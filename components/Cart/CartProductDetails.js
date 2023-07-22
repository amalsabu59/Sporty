import { Image } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";

function CartProductDetails() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://s3-alpha-sig.figma.com/img/6e2a/6075/d2aebb9b52db31deea621f309362bab4?Expires=1690761600&Signature=Y93jvy3EyECzr8LVU6KOqZrin-RFVEywNvJIJRdXyLCNtCKD1liZlEwpc2t8t5333VI0VJuCvW650kjvn9jet1TH0wFIPSUU-5QnrBbuwRDvNfC20mf5k2KThYd~wDgJX9drGFiRFC6GeNXBOLobCrojcbKEL0G98GLimUbQWPQu6ceR~R33QWUaA9PAThAmtXCbIQLRl0jMT~h9YsjPXNMxzmQGYUKnupIB8hDDJrrG7FVVwwOAv56sgHV5I5IQD3l6csxUlnK4A5bDF-t2bVbR1~LY~AdBnwCJuMl~jxfIAXwHMdxtLcOadwK7Kv-fCE2sYiDN~X9iH10ijlK4oQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
        }}
        height={104}
        width={104}
        resizeMode="contain"
      />
      <View>
        <Text>Pull Over</Text>
        <Text>Pull Over</Text>
      </View>
    </View>
  );
}
export default CartProductDetails;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
});
