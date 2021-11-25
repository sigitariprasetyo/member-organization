# Comments and Members API

------

## 1.  HOW TO RUN ?
We need to have docker installed previously.

- ### Runing Comment and Member Services
  ```json
  $ docker compose build
  $ docker compose up
  ```

- ### Runing Testing
  ```json
  $ bash < run_test.sh
  ```

## 2. ROUTES

- ### Comment
  ```json
  Host =>  http://locahost:3005
  ```

  | Method | Routes          | Description                 |
  | :----- | :-------------- | --------------------------- |
  | POST   | /orgs/:organization/comments | - Create new comment to organization         |
  | GET   | /orgs/:organization/comments    | - Get all comments that have been registered against the organization. org  |
  | DELETE   | /orgs/:organization/comments  | - Delete all comments associated with a particular organization |

- ### Members
  ```json
  Host =>  http://locahost:3006
  ```

  | Method | Routes          | Description                 |
  | :----- | :-------------- | --------------------------- |
  | GET   | /orgs/:organization/members    | - Get all member of an organization  |

## 3. Code's Status

- ### Success Code's

  | Code Status | Description |
  | ----------- | ----------- |
  | 200         | - Success   |
  | 201         | - Created   |

- ### Error Code's

  | Code Status | Description                          | Response                                                     |
  | :---------: | ------------------------------------ | ------------------------------------------------------------ |
  |     400     | - Bad Request   | {  "Comment can't null or empty string!" } |                              |
  |     404     | - Not Found           | { "Not Found!" }                                     |
  |     500     | - Internal server error | { "Internal server error" }                                |

## 4. DETAIL REQUEST

- ## Create Comment

  Create comment to spesific github organization.

  - **URL**

    /orgs/:organization/comments

  - **Method:**

    `POST`

  - **Parameter**

    | Name | Type | In | Description |
    | ------- | ------- | ----- | ------------ |
    | organization | string | path | Github organization name |

  - **Data Body**

    ```
    comment=[string] required
    ```

  - **Sample Request:**
      ```json
      POST /orgs/xendit/comments
      body: {
              "comment" : "Sample comment!"
            }
      ```

  - **Success Response:**

    - **Code:** 201 <br />
      **Content:** 

      ```json
      {
        "msg" : "Comment has been created!"
      }
      ```

  - **Error Response:**
    - **Code:** 400 <br />
        **Content:** 

        ```json
        {
          "msg" : "Comment can't null or empty string!"
        }
        ```

- ## Get All Comment

  Get all comment form spesific github organization.

  - **URL**

    /orgs/:organization/comments

  - **Method:**

    `GET`

  - **Parameter**

    | Name | Type | In | Description |
    | ------- | ------- | ----- | ------------ |
    | organization | string | path | Github organization name |

  - **Data Body**

    ```
    none
    ```

  - **Sample Request:**
      ```json
      GET /orgs/xendit/comments
      ```

  - **Success Response:**

    - **Code:** 200 <br />
      **Content:** 

      ```json
      [
        {
          "id": 3,
          "comment": "First comment!",
          "orgs": "xendit",
          "deleted": false,
          "createdAt": "2021-11-24T15:06:17.173Z",
          "updatedAt": "2021-11-24T15:06:17.173Z"
        },
        {
          "id": 4,
          "comment": "Second comment!",
          "orgs": "xendit",
          "deleted": false,
          "createdAt": "2021-11-24T15:06:22.299Z",
          "updatedAt": "2021-11-24T15:06:22.299Z"
        }
      ]
      ```

    - **Code:** 200 (if comment not found)<br />
      **Content:** 

      ```json
      []
      ```

- ## Delete Comments

  Delete all comment with spesific github organization.

  - **URL**

    /orgs/:organization/comments

  - **Method:**

    `DELETE`

  - **Parameter**

    | Name | Type | In | Description |
    | ------- | ------- | ----- | ------------ |
    | organization | string | path | Github organization name |

  - **Data Body**

    ```
    none
    ```

  - **Sample Request:**
      ```json
      DELETE /orgs/xendit/comments
      ```

  - **Success Response:**

    - **Code:** 200 <br />
      **Content:** 

      ```json
      {
        "msg" : "Comment has been deleted!"
      }
      ```

  - **Error Response:**
    - **Code:** 404 <br />
        **Content:** 

        ```json
        {
          "msg" : "Comment for this organization not found!"
        }
        ```

- ## Get Members Github Organization

  Get all members github organization. Will get data members with largest follower on top.

  - **URL**

    /orgs/:organization/members

  - **Method:**

    `GET`

  - **Parameter**

    | Name | Type | In | Description |
    | ------- | ------- | ----- | ------------ |
    | organization | string | path | Github organization name |

  - **Data Body**

    ```
    none
    ```

  - **Sample Request:**
      ```json
      GET /orgs/xendit/members
      ```

  - **Success Response:**

    - **Code:** 200 <br />
      **Content:** 

      ```json
      [
        {
          "id": 5,
          "orgs": "xendit",
          "login": "mkamadeus",
          "avatar_url": "https://avatars.githubusercontent.com/u/40513202?v=4",
          "followers": 30,
          "following": 30,
          "createdAt": "2021-11-24T08:42:31.794Z",
          "updatedAt": "2021-11-24T08:42:31.794Z"
        },
        {
          "id": 4,
          "orgs": "xendit",
          "login": "mychaelgo",
          "avatar_url": "https://avatars.githubusercontent.com/u/4651658?v=4",
          "followers": 27,
          "following": 26,
          "createdAt": "2021-11-24T08:42:31.794Z",
          "updatedAt": "2021-11-24T08:42:31.794Z"
        },
        {
          "id": 8,
          "orgs": "xendit",
          "login": "bxcodec",
          "avatar_url": "https://avatars.githubusercontent.com/u/11002383?v=4",
          "followers": 25,
          "following": 30,
          "createdAt": "2021-11-24T08:42:31.794Z",
          "updatedAt": "2021-11-24T08:42:31.794Z"
        }
      ]
      ```

  - **Error Response:**
    - **Code:** 404 <br />
        **Content:** 

        ```json
        {
          "message": "Not Found"
        }
        ```