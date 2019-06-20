# MONGOOSE BLOG API

This app creates a blog using Mongoose, including the ability to make comments on blog posts.

---

To install:
```
npm install
```

---

To run, start the server:
```
npm start
```

Then you can use Postman to interact with the APIs at http://localhost:8080/ using GETs, POSTs, PUTs, and DELETEs.  The APIs are:

-GET	  /api/users/	    Get all Users
-GET	  /api/users/:id	Get single User	
-POST	  /api/users/	    Create a User
-PUT	  /api/users/:id	Update a User
-DELETE	/api/users/:id	Delete a User

-GET	  /api/blogs/	          Get all Blogs
-GET	  /api/blogs/featured	  Get all FeaturedBlogs
-GET	  /api/blogss/:id	      Get single Blog	
-POST	  /api/blogs/	          Create a Blog
-PUT	  /api/blogs/:id	      Update a Blog
-DELETE	/api/blogs/:id	      Delete a Blog

-GET	  /api/comments/	    Get all Comments
-GET	  /api/comments/:id	  Get single Comment	
-POST	  /api/comments/	    Create a Comment
-PUT	  /api/comments/:id	  Update a Comment
-DELETE	/api/comments/:id	  Delete a Comment

---

To test:
```
npm test
```

