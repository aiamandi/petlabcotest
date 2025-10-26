# SOLUTION

## Estimation

Estimated: 6 hours
Spent: 6 hours

## Solution

First of all, apologies for exporting the project over to github but I have had issues with bitbucket and it was taking too long to debug it.
My approach to this project has been the following:

1. Create reusable components: Since I would do this as part of my daily role, I thought of doing the same here. For future implementations such as making the card and the filter a reusable component, I have created these separately from the product dashboard. I have also added an extra component that wasn't necessarily part of the solution and that is the Icon component. Since this project is heavily based on filtering and the background image provided was a bit too gray for my liking, I have decided to add the different icons based on the categories that a product fits in.
2. Create a types folder: This is where I would have my product interfaces and since we only have 1 type in our API, I have only created one file called Product.ts . The reason for using this is so I can use the interface in multiple places such as the productAPI and the component. It's also easier to use than creating a separate props component as part of the ProductCard and a separate one in the productApi. I usually use zod in order to validate the data but since this is a very small project, I did not want to overcomplicate things.
3. I have used inline tailwind for this project but for a bigger project I would create separate css files (this is my personal preference since I usually my css separate from the rest of my code since it tends to get lengthy). It would also take a bit of time to set up postcss and making the preprocessors work.
4. My productAPI file is the one handling the logic of getting my data from the API. Since we have a json server that is hosted locally, I have used my API_BASE_URL as localhost and then constructed my API as I would do with an external one. For an external API, I usually use graphQL and apollo server as part of my day to day job, however since this is a local server I have used a simple fetch. My preference for fetch here is because it's a native browser API making this call lighter and more efficient (axios for example would have been too much here since it's a simple web app with a local json).
   I have 3 get requests here, one to get all the products, one to get only filtered products since we have unpublished products, duplicated tags etc (to cleanse the data) and another get for all the filtering options. The reason why I put my getFilterOptions function here is for separation of concerns and also for easier mapping since we already have the getAllProducts function here for example.
5. My product dashboard file contains the ProductFilters on the left hand side and the filtered products. Since we only have 11 published products, I have filtered around the "published" property in order to show only 11 products and not 13. I have added to my product cards data that I have considered important such as product title, price, provider (I have added this as well since I know that some companies have a different vendor for their products - ex: ASOS, Amazon so this gives the customer the choice to get an own brand product instead for example), an add to cart button with the price and another button which should take our customer to the product page to see the full product description.
6. One of the requirements was also adding pagination so I have limited the products shown per page to 9. This is something that I could have done more elegantly and add this as a reusable component but due to time constraints, I have added this directly to the dashboard file.
7. Responsive design: due to the time constraints, I haven't created the most responsive solution for mobile. If I had more time, I would add a hamburger menu item that would pop from the left when opened.

Some other tests than can be implemented are:

1. When I don't have a product that fits the tag, the page should not load any cards and the pagination should not show.
2. When I deselect the checkbox, the page should show the original number of products and pagination items.
3. When I click on the pagination items at the bottom, they should take me to the corresponding page and show the appropriate number of items left.
