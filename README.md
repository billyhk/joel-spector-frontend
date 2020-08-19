# Joel Spector

## Project Description

Digital art gallery to view Joel Spector's artwork. Admin User can perform CRUD operations with the artwork in the database.

## Wireframes

![Home Page](/public/readme-images/home-page-wireframe-png.png)
![Artwork Main](/public/readme-images/artwork-main-wireframe-png.png)
![Artwork Category](/public/readme-images/artwork-category-wireframe-png.png)
![Artwork Sub-Category](/public/readme-images/artwork-subcategory-all-works-png.png)
![Artwork Detail](/public/readme-images/artwork-detail-individual-png.png)
![Artwork Form](/public/readme-images/artwork-form-png.png)

## User Stories

_**MVP User Stories**_  
-_As a user, I want to view high quality images of Joel Spector's artwork._  
-_As a user, I want to add an work that is not yet in the database._  
-_As a user, I want to be able to submit a donation._

_**Post MVP Stretch Goals**_  
-_As a user, I want to securely create an account._  
-_As a user, I want to add merchandise to my cart and choose a payment method at checkout._

## Sample JSON data

GET api/artwork

```json
[{
    "id": "1",
    "category": "Paintings: People",
    "title": "Portrait of Ari",
    "sizeHeight": "9",
    "sizeWidth": "6",
    "imgUrl": "example.jpg",
},
{
    "id": "2",
    "category": "Paintings: People",
    "title": "Ben",
    "sizeHeight": "24",
    "sizeWidth": "24",
    "imgUrl": "example2.jpg"
}]
```

## React Component Hierarchy

![Component Hierarchy](/public/readme-images/component-tree-png.png)
