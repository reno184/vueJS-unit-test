# project setup
## Modules et providers
***
- **store** est une classe, elle n'utilise pas la dépendance Vuex
  1. user store
  2. todo store
- **ajaxProvider** est aussi une classe, elle n'utilise pas la dépendance Axios
## Pages & features du site
***
### Page Todos list
> Page avec une liste de todos
- Fetch vers typicode.com
- Action **delete** du store uniquement
- Modal add todo affiche texte
### Page user list
> Page avec une liste de todos
- Fetch vers typicode.com
- Action **delete** du store uniquement
### Page About
> Page permettant de tester une fonction matématique

# gmail module
## Source
https://github.com/Code-Pop/build-gmail-clone-with-vue-3/blob/master/src/components/MailTable.vue
## Notes
- le put d'axios va réellement écrire dans db.json
- 


### setup Jest
use [npm jest-fetch-mock](https://www.npmjs.com/package/jest-fetch-mock)

### strategie test *(A reporter dans blogger)*
- D'après Jessica, seul le rendu est à tester, savoir comment le rendu a été généré importe peu...
- Il faut toujours pondérer la criticité d'un module à être tester avec la facilité à le faire, * certains test non critique peuvent être fait si ils sont simples à implémenter
- Les user story sont des tests critiques
- Les tests unitaires critiques peuvent être remplacé ou complété par des test endToEnd

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
 - get on eye on [github repo](https://github.com/AmpleOrganics/vue-test-utils-helpers?utm_source=pocket_reader)
 - regarder la video grafikart
 - lire la 3 parties de https://reno184-wiki.blogspot.com/2021/10/vuemastery-real-word-testing.html?zx=8721610398e46d69 la porte mock vuex
 - https://medium.com/fernandodof/how-to-mock-fetch-calls-with-jest-a666ae1e7752
 - https://github.com/sapegin/jest-cheat-sheet#mock-functions-1
 - https://webdevetc.com/blog/vue-test-utils-advanced-features?__s=xxxxxxx
 - https://github.com/dekadentno/vue-unit-testing-cheat-sheet

-----
voir pour faire les tests de list
savoir mocker, before-each, les error https://medium.com/fernandodof/how-to-mock-fetch-calls-with-jest-a666ae1e7752


