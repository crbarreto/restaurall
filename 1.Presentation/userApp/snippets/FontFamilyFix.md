# Font Family Fixes

## Fix in Searchbar of react-native-papper

For default the font family property isn't editable from the Searchbar component, you have to add it manually, adding the prop in the file `~/node_modules/react-native-paper/src/components/Searchbar.js`

```javascript
...
input: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Rajdhani-Regular',
    paddingLeft: 8,
    alignSelf: 'stretch',
  },
...
```
in the **react-native-paper** plugin version **2.0.1** the line is _189_.