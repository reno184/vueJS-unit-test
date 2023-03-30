# project setup

## test components features

###  About View
See Official doc [vue-test-util-wrapper](https://test-utils.vuejs.org/api/#trigger)
See [digitalocean](https://www.digitalocean.com/community/tutorials/vuejs-vue-testing)
 - Test component exist - sanitize
 - Test HTML contain some specific text
 - Test set data
 - Test prop
 - Test button click - message success
 - Test button click - message error
 - Test class exist

###  HelloWord
This component show the utilisation of test helpers function 
See Official doc [vue-test-util-wrapper](https://test-utils.vuejs.org/api/#trigger)
See this helpers function [github dekadentno](https://github.com/dekadentno/vue-unit-testing-cheat-sheet)
Some examples
 - hasAttribute
 - find
 - isHidden
 - domHasLength

## layer services
Test two exported function into utilities files, with [jest snapshot](https://jestjs.io/docs/snapshot-testing)

## todo
 - read jest snapshot documentation, seem to be very interesting to compare (html, data, whole component, whole page) with cached result
 - finish to read and understand this [github repo](https://github.com/dekadentno/vue-unit-testing-cheat-sheet)
 - get on eye on [github repo] (https://github.com/AmpleOrganics/vue-test-utils-helpers?utm_source=pocket_reader)
 - regarder la video grafikart


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
