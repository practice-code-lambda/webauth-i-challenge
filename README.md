# BACK END DOCS



## END POINTS



## MVP Description
1. User can signup/create an account by providing a unique `username`, a valid mobile `phoneNumber` and a `password`. (mobile, web)
2. User can log in to an authenticated session using the credentials provided at account creation/signup.(mobile, web)
3. Authenticated user can Create, Update and Delete a `plant` object.  At a minimum, each  `plant` must have the following properties (mobile, web):
	- `id`: Integer
	- `nickname`: String
	- `species` : String
	- `h2oFrequency`: Type determined by implementation
	- `image`: optional
4. Authenticated user can view a list of created `plants`. A `plant` can be Deleted or selected to present user with a detail view where user can then update any property of the selected `plant`.(mobile, web)
5. Authenticated user can receive local reminder/notification on their mobile device when when a scheduled `h2oFrequency` is reached. At a minimum, this reminder/notification must display the `nickname` and a short description of the task. (mobile)
6. Authenticated user can update their `phoneNumber` and `password`.
STRETCH
1. Authenticated user can set up Push Notifications to be triggered when an `h2oFrequency` of any `plant` arrives/has elapsed. (mobile, web)
2. Implement a feature that allows an Authenticated user can see an appropriate suggested `h2oFrequency` based on `species` using the API of your choice. (web, mobile)
3. Authenticated user can upload `images` of a `plant`. If no user `image` is provided, a placeholder `image` of a plant of the same `species` populates the view. (web, mobile)

                                                                                                                                                                                                                         
