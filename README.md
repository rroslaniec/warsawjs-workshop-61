# Opis aplikacji

Aplikacja newsowa. Pozwala wyświetlić prostą listę zajawek artykułów, konkretny artykuł oraz komentarze do niego.

Funkcjonalności:
- pobieranie dancyh z sieci
- zapisywanie odwiedzonych artykułów w pamięci telefonu
- lazy-loading komentarzy
- dodawanie komentarzy

# Wymagania
1. npm
2. expo
3. mockoon

## expo

Projekt używa ekosystemu [Expo](https://expo.io/), który pozwala w łatwy sposób tworzyć aplikację oraz testować na urządzeniach mobilnych.

## Mockoon

[Narzędzie](https://mockoon.com/) do uruchomienia prostego, testowego API. W folderze mockoon znajduje się plik konfiguracyjny (`config.json`), którego należy użyć w celu uruchomienia API. Proces importowania konfiguracji został opisany [tu](https://mockoon.com/docs/latest/mockoon-data-files/import-export-openapi-format/).

# Uruchomienie projektu

## Pre-instalacja

Zanim uruchomimy aplikację należy zainstalować wymagane narzędzia:
* [npm](https://nodejs.org/en/download/) (instalowany wraz z Node.js)
* [expo](https://docs.expo.dev/get-started/installation/)
* [Mockoon](https://mockoon.com/download/)

## Instalacja

1. `npm install`
2. [Importujemy konfigurację aplikacji Mockoon](https://mockoon.com/docs/latest/mockoon-data-files/import-export-openapi-format/) z pliku `./mockoon/config.json`.

## Uruchomienie projektu

1. Przed uruchomieniem projektu należy postawić serwer dostarczający dane do aplikacji. W tym celu musimy [uruchomić serwer Mockoon](https://mockoon.com/docs/latest/gui-cheat-sheet/) klikając ikonę ▶️. Ważne by aplikacja i serwer działały w jednej sieci (w celu testowania wersji mobilnej).
2. Jeśli chcemy przetestować aplikację na telefonie to w pliku `app.json` znajduje się adres serwera do którego aplikacja będzie nawiązywać połączenie. W ramach sieci wi-fi należy poznać [lokalny adres IP](https://www.whatismybrowser.com/detect/what-is-my-local-ip-address) i zamienić `localhost` na odpowiedni adres IP.
3. `npm run start`


