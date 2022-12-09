# Your Story

Live Deployment: https://your-story.onrender.com

Github: https://github.com/RuneDelamont/YourStory

## Set up
1. Clone this repository
2. Install dependencies 
      - In the app directory run:
      
      ```bash
      pipenv install
      pipenv shell
      flask db init
      flask db migrate
      flask seed all
      ```
      - In the react-app directory run:
      
      ```
      npm install
      ```
3. Run Environment
      - After the dependencies are installed run in the app directory
      
      ```
      flask run
      ```
      - In react app run
      
      ```
      npm start
      ```

# Your Story

This app allows users to create books under authors that they create.  The primary features enabled are the creation of authors and books.  You will be able to create, update, read and delete them.  You will be able to read each individual book chapter by chapter.
<br>

## Landing Page

The landing page allows you to create a new user, login or just try with the built in demo user.

![intro_page](https://user-images.githubusercontent.com/69321727/206790763-88f80e31-4eba-4a16-bb42-55fa3a8633bd.png)

## Main page

The main page allows you to peruse the potential selection of available authors and books via a carousel component.

![main_page](https://user-images.githubusercontent.com/69321727/206791149-f0f8bf08-b497-43dd-a45f-ca0ac81a0323.png)

## Profile Page

User profile is accessible via the profile logo in the top right corner.  Click to open the dropdown menu and then click on the my profile button.

![profile_page](https://user-images.githubusercontent.com/69321727/206791886-a941a033-c6a8-429f-890d-4edb08e79f82.png)


## Authors and Books pages

Both authors and books each have their own individual page list all available authors and books.  Click on either in the navigation and you can view their listing.

![authors_page](https://user-images.githubusercontent.com/69321727/206792406-8a93ae01-c0af-49a2-9c50-a21b1ad68f05.png)


## Author, Book and Chapter pages

Each author, book and chapter have their own individual pages.  Authors will give you relevant author information as well as a list of books.  Each Book will have information on the book as well as the list of chapters.  Each chapter will have each page available for reading.  If the user has ownership over any of the above items, you will have the option to edit or delete each item.

![edit_delete_pic](https://user-images.githubusercontent.com/69321727/206793069-ee582731-4ab5-4683-b718-7a112e58ee4b.png)


## Logout

Logging out is easy.  You can simply log out by clicking on the profile button on the navigation and clicking on the logout button.

![logout](https://user-images.githubusercontent.com/69321727/206793542-ad65de68-0a67-4750-a445-59c0815c7ef1.png)
