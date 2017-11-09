# What is "Nozama"?
"Nozama" is an eCommerce application designed by Team "Git It And Quit It" ([Hilary Brown](https://github.com/hilarybrown), [Brian DiStefano](https://github.com/BrianLM), [Rachel Jagodowski](https://github.com/jago425) and [Jeff Keilman](https://github.com/jeffkeilman)). It's an app where customers can browse and purchase items from a selection of products.  Purchasing is really easy!  Users can just browse through the items and only need to create an account when they want to add items to their cart.  Any completed purchases are saved in each customer's purchase history which can be conveniently accessed.



# Links

[Nozama Deployed Client](https://giaqi.github.io/nozama-front-end/)

[Nozama Backend-End Repository](https://github.com/giaqi/nozama-express-api)

[Nozama Deployed API](https://thawing-scrubland-72649.herokuapp.com/)

# Technologies Used

* [Javascript](https://www.javascript.com/)
* [Handlebars](http://handlebarsjs.com/expressions.html)
* [Bootstrap](http://getbootstrap.com/)
* HTML
* scss



# Wireframes
[Original Wireframes](https://imgur.com/a/bU12q)

# Planning and Development Strategy
We started out by creating epics, beginning with planning and ending with finishing touches.  Feature epics were split by resource functionality and we tasked out the user stories as a team.  In order to manage the project, we used PivotalTracker which made it easy for us to move tasks and keep up-to-date on the progress of the project.

The team had two stand-ups a day and programming was always done in pairs.  Pair programming was more challenging than we expected because, as it turns out, it's really hard to be the one NOT coding (or at least not physically).  It's also hard to work on a project as a team as opposed to individually.

The hardest part of this project for us was the cart.  After spending hours on it, we realized we were overthinking it and overcomplicating it.  We decided to scrap the cart resource and add the cart as an array to the user resource.

[Nozama Team Sprint Board](https://www.pivotaltracker.com/n/projects/2123553)
# User Stories
### Authentication
As a user...
1. I want be able to sign-up.
2. I want to be able to sign-in.
3. I want to be able to change my password.
4. I want to be able to logout.
5. I want to be notified if sign-up, login, change password or logout fails.
### Products
As a user...
1. I want to be able to view all the site's products without logging in.
2. I want to be able to search for products.
3. I want to see a short description of each product.
4. I want to be able to select a product and see a long description.

As a site administrator...
1. I want to be able to add products to the site.
2. I want to be able to delete products from the site.
3. I want to be able to update products (description, price, etc.).
4. I don't want non-admin users to be able to add, remove or update products.
### Shopping Cart
As a user...
1. I want to be able to store items I want to purchase in a cart.
2. I want to be able to update the quantity of one or many items in my cart.
3. I want to be able to add and remove items from my cart.
4. I want to be able to checkout and purchase from my cart.
5. I want to be able to see all the items in my cart.
6. I want to authenticate when I'm ready to add to, view or alter my cart.
7. I want items I've purchased to be cleared from my cart.
### Purchases
1. I want to be able to purchase items I've put in my cart.
2. I want to be able to view my past completed purchases.
3. I want to be able to update my account information.
4. I want to be able to view individual purchase items and details.
5. I don't want others to see my purchase history.
6. I don't want others to see my account information.
7. I want to be able to save my billing information.
# Future Enhancements and Issue Fixes
1. Add more styling
2. Add user ratings to products
3. Enhance search criteria
4. Add product sub-categories
5. Enhance purchases to allow "purchase again"
6. Dynamic tokenization of credit cards
7. Add ability to save billing information
8. Make the site more responsive
9. Items in cart are being sorted by the last updated item
