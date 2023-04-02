## Cheap Ryan Air Tickets Finder 
### Cheap Ryan Air tickets to anywhere from destination according to your budget.
#### https://gtcalifornia.github.io/

This repository contains a JavaScript program that searches for cheap flights on Ryanair airlines. The program sends a GET request to the Ryanair API with user-specified search parameters and returns a list of one-way fares that match the criteria.

### How to use
Clone the repository or download the code files.
Open the index.html file in a web browser.
Enter your search parameters in the input fields and click the "Search" button.
The search results will be displayed on the page. You can sort the results by departure location or price by clicking the corresponding button.
Dependencies
This program uses the Axios library to send HTTP requests to the Ryanair API. You must have Axios installed to run the program. If you do not have Axios installed, you can install it using the following command:

```sh
npm install axios
```

### How it works
The program uses an async function called doGetRequest() to send a GET request to the Ryanair API with the user's search parameters. The API returns a list of one-way fares that match the criteria. The program then sorts the search results by price (ascending by default) and displays them on the page.

The user can sort the search results by departure location or price by clicking the corresponding button. The program uses JavaScript's sort() method to sort the search results by the specified criteria.

The program uses the convertToFloat() function to convert the price strings returned by the API to floating-point numbers so they can be sorted correctly.

### License
This code is released under the MIT License.
