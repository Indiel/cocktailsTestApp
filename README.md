# Test Task «Cocktail DB»

Тестовое задание в компанию.

Стек технологий:
  1. React Native
  2. Redux
  3. Redux Thunk
  4. React Navigation

## Запуск проекта

### `npm i`
### `npm run android` or `npm run ios`

## Задание

Вывести список коктейлей, полученных из [API CocktailDB](https://www.thecocktaildb.com/api.php). Также нужно учитывать фильтр.

Приложение должно содержать два экрана(страницы):

**Drinks**
Список доступных коктейлей, разделенных по категориям.

  - Заголовок в котором будет указана категория, например: Ordinary Drink
  - Содержит фотографию и название напитка. Действия по нажатию нет.
  - Используете пагинацию для последовательной загрузки элементов:
    - Загружается первый список коктейлей. 
    - При достижении пользователем конца списка будет загружен следующий список коктейлей.
    - Если списки закончились обработать этот кейс в коде.

- Сделать запрос на сервер и получить нужный список коктейлей
- Вывести полученный список коктейлей
    - Показываем заголовок. Например: Ordinary Drink
    - Показываем все полученные элементы

**Filters**
Фильтр в котором мы можем выбрать категории которые хотим отобразить на главном экране.

  - Отображает checkbox и название фильтра

- Сделать запрос на сервер и получить нужные фильтры
- Вывести эти фильтры в список
