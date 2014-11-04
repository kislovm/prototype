Frontend prototype

Основная идея прототипа – единые модели данных на сервере, в шаблонах и клиентских скриптах.

Последовательность обработки запроса:
1) Создание инстанса контроллера, в соответствии с path запроса
2) Вызова action контролллера
3) Получение данных из services (источников данных), с использованием service-container
4) Маппинг данных из источников на модели
5) Шаблонизация, каждый блок получает в контексте соответствующую модель
6) Автоматическая инициализация моделей на клиенте и биндинг необходимых полей на соответсвтующие элементы интерфейса
7) Поддержка fullREST для синхронизации моделей с сервером

1. Роутер

Разбирает path, создает инстанс контроллера и вызывает action, из соответсвущей секции (GET/POST/PUT/DELETE),
с необходимыми параметрами.

Примеры:

1) GET http://direct.yandex.ru/campaign/show/1

Будет создан инстанс контроллера campaign и вызван метод show(id) из секции GET

2) POST http://direct.yandex.ru/campaign/

Будет создан инстанс контроллера campaign и вызван метод index() из секции POST

2) PUT http://direct.yandex.ru/note/save/32/test

Будет создан инстанс контроллера note и вызван метод save(id, text) из секции PUT

2. Маппинг

Маппинг позволяет описать соответствие данных, получаемых из некоторого источника (набора источников) и полей модели.
У каждой модели есть файл *.map.js, который определяет маппинг (хэш, набор полей которого, опредляет правила маппинга).
Поле хэша (правило маппинга) соответствуют полю модели.

Правило маппинга, может быть:

1) Строкой

В случае однозначного соответствия поля модели полю данных источника

{
    bannerId: 'bid'
    ...
}

2) Функцией

Если требуется агрегировать или каким-то образом форматировать данные источника

{
    title: function(ctx) {

        return ctx.name + ' (' + ctx.bid + ')';
    }
    ...
}

3) Объектом

Полный формат. Необходим для задания полей, являющихся экземляром модели или коллекцией моделей.
Поле type определяет тип поля (simple - примитив (аналогично пунктам 1 и 2), model – модель, collection – коллекция).
Поле model определяет название модели для типов model и collection.
Поле ctx опредлеяет правила преобразования (аналогично пунктам 1 и 2)

{
    phrases: {
        type: 'collection',
        model: 'phrase',
        ctx: 'phrases'
    }
    ...
}

Для преобразования данных из источников в модель необходимо вызвать метод map модуля mapping, который принимает на вход
наименование модели и исходные данные (object|promise) вторым параметром, и возвращает инстанс модели

Пример:
bannerModel = map('model', data);

3. Service Container

Модуль, позволяющий ассихронно получать данные из различных истоников и разрешать внешние зависимости между источниками.

4. Модели и Коллекции

Документация – http://backbonejs.ru/














