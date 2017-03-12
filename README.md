# Go Go Power Ranger API
## Documentation
### /api/user
    GET     /api/user/:id

### /api/filters
    GET     /api/filters/:managerId
    POST    /api/filters/update

### /api/comments/
    GET     /api/comments/:managerId
    POST    /api/comments/add

### Post data sample 

```
{
    "manager_id" : 1112,
    "hotel_entities" : [ 
        {
            "hotel_id" : 801235,
            "comments" : [ 
                {
                    "user_id" : 1,
                    "text" : "Lack of a 1"
                }
            ]
        }
    ]
}
```