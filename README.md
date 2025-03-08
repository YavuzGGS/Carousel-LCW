# Product Carousel Design 

# User Story  

Build a product carousel on https://www.lcwaikiki.com exactly like to the one visible on the website’s product page. (You can find the example in the screenshots) 

To achieve this, you need to retrieve the product list using a GET request from the following URL:  
https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/  
raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json 

The code should only run on the product pages and must be appended after the element with ".product-detail" class within the product page's structure. 

The carousel should include a title with the text "You Might Also Like".  

When a user clicks on a product, the respective product page should open in a new tab. 

Clicking on the heart icon should fill it with a blue color (like in the website example), and this preference should be stored in the local storage. 

When the code runs for the second time after a page refresh, it should retrieve the product list from local storage rather than sending a new fetch request. Additionally, the code should ensure that products marked as favorites before are displayed with filled heart icons. 

The design must be responsive and suitable for all platforms exactly like the website version, including mobile, tablet, and desktop. Viewable product amount might vary according to the resolution.  

# Rules 

➔ The project should be developed using only JavaScript and jQuery (optional). You can include jQuery if the website doesn't already have the library.  

➔ Don’t use any 3rd party library like swiper, bootstrap etc. All the logic should be written by you.  

➔ The project should consist of a single JavaScript (.js) file. This JavaScript code should be executable within the Chrome Developer Tools console. Therefore, you need to create HTML and CSS structures using JavaScript as well. You can refer to the Document Object Model in JavaScript for more information.  

➔ Your code should be well written and readable. Please follow a similar structure that is shared in the example code snippet.  

➔ Every single requirement about the project will earn you extra points. For this reason, if there is a step that you couldn’t finish, we advise you to focus on other steps as well.  

➔ You need create a Github repository to share the project.
